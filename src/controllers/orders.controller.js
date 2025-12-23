import { ordersCollection } from "../models/orders.models.js";
import { ObjectId } from "mongodb";


// create order
export const createOrder = async (req, res) => {
    try {
        const order = req.body;
        const { transactionID } = order;

        // Validate that transactionID is provided
        if (!transactionID) {
            return res.status(400).send({ message: "Transaction ID is required" });
        }

        // Check if an order with the same transactionID already exists
        const existingOrder = await ordersCollection.findOne({ transactionID });
        if (existingOrder) {
            return res.status(400).send({ message: "Order with the same transactionID already exists" });
        }

        const result = await ordersCollection.insertOne(order);
        res.send(result);

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

// get all orders
export const getAllOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = 10;
        const skip = page * limit;

        const orders = await ordersCollection.find()
            .skip(skip)
            .limit(limit)
            .toArray();

        const total = await ordersCollection.estimatedDocumentCount();

        res.send({
            total,
            page,
            limit,
            data: orders
        });

        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}

// Update order status
export const updateOrderStatus = async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;
    try {
        const filter = { _id: new ObjectId(orderId) };
        const updateDoc = {
            $set: {
                status: status
            },
        };
        const options = { upsert: true };
        const result = await ordersCollection.updateOne(filter, updateDoc, options);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}

// get user specific orders
export const getUserOrders = async (req, res) => {
    const userEmail = req.params.email;
    const query = { email : userEmail};
    const page = parseInt(req.query.page) || 0;
    const limit = 10;
    const skip = page * limit;

    if (!userEmail) {
        return res.status(400).send({ message: "User email is required" });
    }

    try {
        const orders = await ordersCollection.find(query)
            .skip(skip)
            .limit(limit)
            .toArray();

        const total = await ordersCollection.estimatedDocumentCount();

        res.send({
            total,
            page,
            limit,
            data: orders
        });
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}


// delete order
export const deleteOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const query = { _id: new ObjectId(orderId) };
        const result = await ordersCollection.deleteOne(query);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}