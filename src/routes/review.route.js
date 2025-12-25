import express from "express";
const reviewRouter = express.Router();

import { addReview } from "../controllers/review.controller.js";

reviewRouter.post("/", addReview);

export default reviewRouter