import { ObjectId } from "mongodb";
import { productCollection } from "../models/products.models.js";
import { sslPaymentCollection } from "../models/sslPayment.models.js";

// create product
export const createProducts = async (req, res) => {
    const product = req.body;
    const result = await productCollection.insertOne(product);
    res.send(result);
}

// get all products
export const getAllProducts = async (req, res) => {
    const result = await productCollection.find().toArray();
    res.send(result);
}

// add many product
export const addManyProduct = async (req, res) => {
    const products = req.body;
    const result = await productCollection.insertMany(products);
    res.send(result);
}

// get paginated products
export const paginatedProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = 9;
        const skip = page * limit;

        const products = await productCollection.find()
            .skip(skip)
            .limit(limit)
            .toArray();

        const total = await productCollection.estimatedDocumentCount();

        res.send({
            total,
            page,
            limit,
            data: products
        });
    } catch (error) {

    }
}

// get single Data
export const getSingleProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }
        const result = await productCollection.findOne(query);
        res.send(result);
    } catch (error) {
        console.error("Error fetching class:", error);
        res.status(500).send({ message: "Internal server error" });
    }
}

// get product by transaction id
export const getProductByTransactionID = async (req, res) => {
    try {
        const transactionID = req.params.id;
        const query = { transactionID: transactionID }
        const paymentInfo = await sslPaymentCollection.findOne(query);
        const { productId } = paymentInfo;
        const productInfo = await productCollection.findOne({ _id: new ObjectId(productId) });
        const updatedQuantity = productInfo.quantity - paymentInfo.quantity;
        const updateProductQuantity = await productCollection.updateOne(
            { _id: new ObjectId(productId) },
            {
                $set: {
                    quantity: updatedQuantity
                }
            },
            {
                upsert: true
            }
        );
        res.send({ paymentInfo, productInfo, updateProductQuantity });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

// delete product
export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await productCollection.deleteOne(query);
    res.send(result);
}

// update product
export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const {
            price,
            discountedPrice,
            quantity,
            rating
        } = req.body;

        // Build update object dynamically
        const updateFields = {};

        if (price !== undefined) updateFields.price = Number(price);
        if (discountedPrice !== undefined) updateFields.discountedPrice = Number(discountedPrice);
        if (quantity !== undefined) updateFields.quantity = Number(quantity);
        if (rating !== undefined) updateFields.rating = Number(rating);

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).send({ message: "No valid fields provided for update" });
        }

        const result = await productCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send({ message: "Product not found" });
        }

        res.send(result);

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal server error" });
    }
};