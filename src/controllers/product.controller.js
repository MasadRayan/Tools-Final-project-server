import { ObjectId } from "mongodb";
import { productCollection } from "../models/products.models.js";

export const createProducts = async (req, res) => {
    const product = req.body;
    const result = await productCollection.insertOne(product);
    res.send(result);
}