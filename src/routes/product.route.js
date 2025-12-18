import express from "express";
import { createProducts } from "../controllers/product.controller.js";
const productRouter = express.Router();

productRouter.post("/", createProducts);


export default productRouter;