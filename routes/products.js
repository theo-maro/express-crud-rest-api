import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
} from "../controllers/products.js";
import { Router } from "express";

const productsRouter = Router();

// HTTP CRUD operations endpoints
productsRouter.post("/", createProduct);
productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProduct);
productsRouter.patch("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);
productsRouter.delete("/", deleteProducts);

export default productsRouter;
