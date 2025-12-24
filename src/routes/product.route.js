import express from "express";
import { createProducts, getAllProducts, addManyProduct, paginatedProducts, getSingleProduct, getProductByTransactionID, deleteProduct, updateProduct } from "../controllers/product.controller.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyFBToken } from "../middlewares/verifyFBToken.js";
const productRouter = express.Router();

productRouter.post("/", verifyFBToken, verifyAdmin, createProducts);
productRouter.get("/all", getAllProducts);
productRouter.post("/many", verifyAdmin, addManyProduct);
productRouter.get("/products-paginated", paginatedProducts)
productRouter.get("/transaction/:id", verifyFBToken, getProductByTransactionID);
productRouter.delete("/delete/:id", verifyFBToken, verifyAdmin, deleteProduct)
productRouter.get("/:id", verifyFBToken, getSingleProduct);
productRouter.patch("/update/:id", verifyFBToken, verifyAdmin, updateProduct);

export default productRouter;