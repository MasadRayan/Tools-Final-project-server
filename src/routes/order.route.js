import express from "express";
import { createOrder } from "../controllers/orders.controller.js";
import { verifyFBToken } from "../middlewares/verifyFBToken.js";
const orderRouter = express.Router();

orderRouter.post("/", verifyFBToken, createOrder)

export default orderRouter;