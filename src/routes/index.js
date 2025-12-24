import express from "express";
import userRouter from "./user.route.js";
import productRouter from "./product.route.js";
import paymentTouter from "./ssl-payment.route.js";
import orderRouter from "./order.route.js";
import adminAggerateRouter from "./adminAggerate.route.js";
const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/ssl-payment", paymentTouter);
router.use("/orders", orderRouter);
router.use("/admin", adminAggerateRouter);

export default router;