import { ordersCollection } from "../models/orders.models.js";
import { sslPaymentCollection } from "../models/sslPayment.models.js";
import { userCollection } from "../models/user.models.js";

export const userAggregateData = async (req, res) => {
    const email = req.params.email;

    if (!email) {
        return res.status(400).send({ message: "User email is required" });
    }

    try {
        const [
            userInfo,
            totalOrders,
            deliveredOrders,
            totalPayments,
            moneyAggregate,
            recentOrders,
            recentPayments
        ] = await Promise.all([

            // user info
            userCollection.findOne({ email }),

            // total orders
            ordersCollection.countDocuments({ email }),

            // delivered orders
            ordersCollection.countDocuments({ email, status: "delivered" }),

            // successful payments only
            sslPaymentCollection.countDocuments({ email, status: "success" }),

            // total money spent
            sslPaymentCollection.aggregate([
                { $match: { email } },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$totalAmount" }
                    }
                }
            ]).toArray(),

            // recent 3 orders
            ordersCollection.find({ email })
                .sort({ date: -1 })
                .limit(3)
                .toArray(),

            // recent 3 payments
            sslPaymentCollection.find({ email, status: "success" })
                .sort({ date: -1 })
                .limit(3)
                .toArray()
        ]);

        if (!userInfo) {
            return res.status(404).send({ message: "User not found" });
        }

        const totalMoneySpent = moneyAggregate[0]?.total || 0;

        res.send({
            userInfo,
            totalOrders,
            deliveredOrders,
            totalPayments,
            totalMoneySpent,
            recentOrders,
            recentPayments
        });

    } catch (error) {
        console.error("User aggregate error:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};
