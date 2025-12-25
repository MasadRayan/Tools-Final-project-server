import express from "express";
const reviewRouter = express.Router();

import { addReview, getAllReviews } from "../controllers/review.controller.js";
import { verifyFBToken } from "../middlewares/verifyFBToken.js";

reviewRouter.post("/", verifyFBToken, addReview);
reviewRouter.get("/getAllData", getAllReviews);

export default reviewRouter