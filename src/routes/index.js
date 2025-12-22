import express from "express";
import userRouter from "./user.route.js";
import productRouter from "./product.route.js";
import paymentTouter from "./ssl-payment.js";
const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/", paymentTouter);

export default router;