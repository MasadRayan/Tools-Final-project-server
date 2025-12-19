import express from "express";
import { createProducts, getAllProducts, addManyProduct, paginatedProducts } from "../controllers/product.controller.js";
const productRouter = express.Router();

productRouter.post("/", createProducts);
productRouter.get("/", getAllProducts);
productRouter.post("/many", addManyProduct);
productRouter.get("/products-paginated", paginatedProducts)

export default productRouter;