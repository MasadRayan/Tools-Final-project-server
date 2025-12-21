import express from "express";
import { createProducts, getAllProducts, addManyProduct, paginatedProducts, getSingleProduct } from "../controllers/product.controller.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyFBToken } from "../middlewares/verifyFBToken.js";
const productRouter = express.Router();

productRouter.post("/", verifyFBToken, verifyAdmin, createProducts);
productRouter.get("/", getAllProducts);
productRouter.post("/many", verifyAdmin, addManyProduct);
productRouter.get("/products-paginated", paginatedProducts)
productRouter.get("/:id", verifyFBToken, getSingleProduct)

export default productRouter;