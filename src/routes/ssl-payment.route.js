import express from "express";
import { createSSLPayment, sslPaymentSuccess } from "../controllers/ssl-payment.controller.js";
import { verifyFBToken } from "../middlewares/verifyFBToken.js";

const paymentTouter = express.Router();

paymentTouter.post("/", verifyFBToken, createSSLPayment);
paymentTouter.post("/success-payment", sslPaymentSuccess);
export default paymentTouter;