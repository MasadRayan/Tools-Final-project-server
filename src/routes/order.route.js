import express from "express";
import { createOrder, getAllOrders, updateOrderStatus } from "../controllers/orders.controller.js";
import { verifyFBToken } from "../middlewares/verifyFBToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
const orderRouter = express.Router();

orderRouter.post("/", verifyFBToken, createOrder)
orderRouter.get('/paginated-orders', verifyFBToken, verifyAdmin, getAllOrders);
orderRouter.patch('/status/:id', verifyFBToken, verifyAdmin, updateOrderStatus)

export default orderRouter;