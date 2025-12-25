import { ObjectId } from "mongodb";
import { reviewCollection } from "../models/review.models.js";

// add new review
export const addReview = async (req, res) => {
    const review = req.body;
    const result = await reviewCollection.insertOne(review);
    res.send(result);
}

// get All reviews
export const getAllReviews = async (req, res) => {
    const result = await reviewCollection.find().toArray();
    res.send(result);
}