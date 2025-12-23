import express from "express";
import { createSSLPayment, getAllPayments, getUserPayments, sslPaymentSuccess } from "../controllers/ssl-payment.controller.js";
import { verifyFBToken } from "../middlewares/verifyFBToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const paymentTouter = express.Router();

paymentTouter.post("/", verifyFBToken, createSSLPayment);
paymentTouter.post("/success-payment", sslPaymentSuccess);
paymentTouter.get("/user/:email", verifyFBToken, getUserPayments);
paymentTouter.get("/allPayment", verifyFBToken, verifyAdmin, getAllPayments)
export default paymentTouter;