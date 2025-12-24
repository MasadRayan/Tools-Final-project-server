import { userCollection } from "../models/user.models.js";
import { productCollection } from "../models/products.models.js";
import { ordersCollection } from "../models/orders.models.js";
import { sslPaymentCollection } from "../models/sslPayment.models.js";

export const getAdminDashboardData = async (req, res) => {
    try {

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const [
            totalUsers,
            totalProduct,
            totalOrders,
            totalPayments,
            totalSuccessFulDelivary,

            paymentStats,
            weeklyRevenue,
            monthlySales,
            categorySales,
            orderStatusStats,
            recentOrders
        ] = await Promise.all([

            userCollection.estimatedDocumentCount(),
            productCollection.estimatedDocumentCount(),
            ordersCollection.estimatedDocumentCount(),
            sslPaymentCollection.estimatedDocumentCount(),
            ordersCollection.countDocuments({ status: "delivered" }),

            // TOTAL & LAST 7 DAYS REVENUE
            sslPaymentCollection.aggregate([
                {
                    $facet: {
                        totalRevenue: [
                            { $match: { status: "success" } },
                            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
                        ],
                        last7Days: [
                            { $match: { status: "success", date: { $gte: sevenDaysAgo.toISOString() } } },
                            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
                        ]
                    }
                }
            ]).toArray(),

            // WEEKLY REVENUE + ORDERS
            sslPaymentCollection.aggregate([
                { $match: { status: "success" } },
                {
                    $addFields: {
                        paymentDate: { $toDate: "$date" },
                        day: { $dayOfWeek: { $toDate: "$date" } }
                    }
                },
                {
                    $group: {
                        _id: "$day",
                        revenue: { $sum: "$totalAmount" },
                        orders: { $sum: 1 }
                    }
                }
            ]).toArray(),

            // MONTHLY SALES
            sslPaymentCollection.aggregate([
                { $match: { status: "success" } },
                {
                    $addFields: {
                        month: { $month: { $toDate: "$date" } }
                    }
                },
                {
                    $group: {
                        _id: "$month",
                        sales: { $sum: "$totalAmount" }
                    }
                },
                { $sort: { _id: 1 } }
            ]).toArray(),

            // CATEGORY DISTRIBUTION
            sslPaymentCollection.aggregate([
                { $match: { status: "success" } },
                {
                    $group: {
                        _id: "$productCategory",
                        total: { $sum: "$totalAmount" }
                    }
                }
            ]).toArray(),

            // ORDER STATUS
            ordersCollection.aggregate([
                {
                    $group: {
                        _id: "$status",
                        count: { $sum: 1 }
                    }
                }
            ]).toArray(),

            // RECENT ORDERS
            ordersCollection.find()
                .sort({ _id: -1 })
                .limit(5)
                .project({
                    name: 1,
                    totalAmount: 1,
                    status: 1,
                    date: 1
                })
                .toArray()
        ]);

        // -----------------------------
        // DATA FORMATTING
        // -----------------------------

        const totalAmountEarned = paymentStats[0]?.totalRevenue[0]?.total || 0;
        const totalIncomeLast7Days = paymentStats[0]?.last7Days[0]?.total || 0;

        const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const revenueData = weeklyRevenue.map(d => ({
            name: dayMap[d._id - 1],
            revenue: d.revenue,
            orders: d.orders
        }));

        const monthMap = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthlyData = monthlySales.map(m => ({
            month: monthMap[m._id],
            sales: m.sales,
            target: Math.round(m.sales * 0.9)
        }));

        const categoryTotal = categorySales.reduce((s, c) => s + c.total, 0);
        const categoryData = categorySales.map(c => ({
            name: c._id,
            value: Math.round((c.total / categoryTotal) * 100)
        }));

        const orderTotal = orderStatusStats.reduce((s, o) => s + o.count, 0);
        const orderStatusData = orderStatusStats.map(o => ({
            name: o._id.charAt(0).toUpperCase() + o._id.slice(1),
            value: Math.round((o.count / orderTotal) * 100)
        }));

        const recentOrdersFormatted = recentOrders.map(o => ({
            id: `#ORD-${o._id.toString().slice(-4)}`,
            customer: o.name,
            amount: o.totalAmount,
            status: o.status,
            time: new Date(o.date).toLocaleString()
        }));

        // -----------------------------
        // FINAL RESPONSE
        // -----------------------------

        res.send({
            totalUsers,
            totalProduct,
            totalOrders,
            totalPayments,
            totalSuccessFulDelivary,
            totalAmountEarned,
            totalIncomeLast7Days,
            revenueData,
            monthlyData,
            categoryData,
            orderStatusData,
            recentOrders: recentOrdersFormatted
        });

    } catch (error) {
        res.status(500).json({ message: "Dashboard Error", error: error.message });
    }
};
