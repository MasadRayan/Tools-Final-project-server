import e from "express";
import express from "express";

const paymentTouter = express.Router();

paymentTouter.post("/ssl-payment");

export default paymentTouter;