import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
dotenv.config();

/**
 * Store ID: buyne6949586debb4e
Store Password (API/Secret Key): buyne6949586debb4e@ssl


Merchant Panel URL: https://sandbox.sslcommerz.com/manage/ (Credential as you inputted in the time of registration)


 
Store name: testbuyneapzl
Registered URL: www.buyNest.com
Session API to generate transaction: https://sandbox.sslcommerz.com/gwprocess/v3/api.php
Validation API: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?wsdl
Validation API (Web Service) name: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php
 */

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.get("/", (req, res) => {
    res.send("The Tools Project Server is running!");
});

export default app;