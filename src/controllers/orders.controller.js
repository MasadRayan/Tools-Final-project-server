import { ordersCollection } from "../models/orders.models.js";
import { ObjectId } from "mongodb";


// create order
export const createOrder = async (req, res) => {
    try {
        const order = req.body;
        const {transactionID} = order;

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
        const result = await ordersCollection.find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}