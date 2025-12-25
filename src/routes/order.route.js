import express from "express";
import { createOrder, deleteOrder, getAllOrders, getSingleOrder, getUserOrders, updateOrderStatus } from "../controllers/orders.controller.js";
import { verifyFBToken } from "../middlewares/verifyFBToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
const orderRouter = express.Router();

orderRouter.post("/", verifyFBToken, createOrder)
orderRouter.get('/paginated-orders', verifyFBToken, verifyAdmin, getAllOrders);
orderRouter.patch('/status/:id', verifyFBToken, verifyAdmin, updateOrderStatus);
orderRouter.get('/user-orders/:email', verifyFBToken, getUserOrders);
orderRouter.delete('/delete/:id', verifyFBToken, deleteOrder )
orderRouter.get("/singleOrder/:id", verifyFBToken, getSingleOrder);

export default orderRouter;