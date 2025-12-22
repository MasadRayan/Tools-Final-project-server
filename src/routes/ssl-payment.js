import express from "express";
import { createSSLPayment } from "../controllers/ssl-payment.controller.js";
import { verifyFBToken } from "../middlewares/verifyFBToken.js";

const paymentTouter = express.Router();

paymentTouter.post("/", verifyFBToken, createSSLPayment);

export default paymentTouter;