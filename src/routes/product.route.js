import express from "express";
import { createProducts, getAllProducts, addManyProduct } from "../controllers/product.controller.js";
const productRouter = express.Router();

productRouter.post("/", createProducts);
productRouter.get("/", getAllProducts);
productRouter.post("/many", addManyProduct);


export default productRouter;