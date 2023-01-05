import {
  getProductIndex,
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
  notReached,
} from "../controllers/products.js";
import { Router } from "express";

const productsRouter = Router();

// Product index endpoint
productsRouter.get("/", getProductIndex);

// HTTP CRUD operations endpoints
productsRouter.post("/products", createProduct);
productsRouter.get("/products", getProducts);
productsRouter.get("/products/:_id", getProduct);
productsRouter.patch("/products/:_id", updateProduct);
productsRouter.delete("/products/:_id", deleteProduct);
productsRouter.delete("/products", deleteProducts);

// Unreached endpoints
productsRouter.all("*", notReached);

export default productsRouter;
