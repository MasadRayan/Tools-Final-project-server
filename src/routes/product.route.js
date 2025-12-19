import express from "express";
import { createProducts, getAllProducts, addManyProduct, paginatedProducts } from "../controllers/product.controller.js";
import { verifyTeacher } from "../middlewares/verifyAdmin.js";
const productRouter = express.Router();

productRouter.post("/", verifyTeacher, createProducts);
productRouter.get("/", getAllProducts);
productRouter.post("/many", verifyTeacher, addManyProduct);
productRouter.get("/products-paginated", paginatedProducts)

export default productRouter;