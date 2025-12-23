import express from "express";
import userRouter from "./user.route.js";
import productRouter from "./product.route.js";
import paymentTouter from "./ssl-payment.route.js";
const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/ssl-payment", paymentTouter);

export default router;