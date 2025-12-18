import { ObjectId } from "mongodb";
import { productCollection } from "../models/products.models.js";

export const createProducts = async (req, res) => {
    const product = req.body;
    const result = await productCollection.insertOne(product);
    res.send(result);
}

export const getAllProducts = async (req, res) => {
    const result = await productCollection.find().toArray();
    res.send(result);
}

export const addManyProduct = async (req, res) => {
    const products = req.body;
    const result = await productCollection.insertMany(products);
    res.send(result);
}