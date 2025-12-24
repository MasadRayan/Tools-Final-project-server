import { userCollection } from "../models/user.models.js";
import { productCollection } from "../models/products.models.js";
import { ordersCollection } from "../models/orders.models.js";
import { sslPaymentCollection } from "../models/sslPayment.models.js";

export const getAdminDashboardData = async (req, res) => {
    try {
        // total users
        const totalUsers = await userCollection.estimatedDocumentCount();

        // total products
        const totalProduct = await productCollection.estimatedDocumentCount();

        // total orders
        const totalOrders = await ordersCollection.estimatedDocumentCount();

        // total payments
        const totalPayments = await sslPaymentCollection.estimatedDocumentCount();

        // total revenue
        const amountAggregate = await sslPaymentCollection.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: { $toInt: "$totalAmount"} }
                }
            }
        ]).toArray()
        const totalAmountEarned = amountAggregate[0]?.totalAmount || 0;

        // total delivered orders
        const totalDeliveredOrders = await ordersCollection.countDocuments({ orderStatus: "delivered" });

        // Income for last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const incomeLast7DaysAggregate = await sslPaymentCollection.aggregate([
            {
                $match: {
                    createdAt: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: { $toInt: "$totalAmount" } }
                }
            }
        ]).toArray();
        const totalIncomeLast7Days = incomeLast7DaysAggregate[0]?.totalAmount || 0;


        res.send({
            totalUsers,
            totalProduct,
            totalOrders,
            totalPayments,
            totalAmountEarned,
            totalDeliveredOrders,
            totalIncomeLast7Days
        })


    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}