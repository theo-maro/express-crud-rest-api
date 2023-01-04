import { appDebugger } from "../index.js";
import { v4 as uuidV4 } from "uuid";
import {
  validateProduct,
  handlingValidationErrors,
} from "../utilities/products.js";

const products = [];

export const createProduct = (req, res) => {
  // validate the user entries
  let product = req.body;
  const { error, value } = validateProduct(product);
  if (error) handlingValidationErrors(error, res, appDebugger);

  // add a new product to the products database
  product = { ...value, _id: uuidV4() };
  products.push(product);

  // return response to client
  appDebugger(`A new product with id: "${product._id}" was added to database.`);
  res.status(201).send(`"${product.name}" was added to the database.`);
};

export const getProducts = (req, res) => {
  res.send("All products were retrieved");
};

export const getProduct = (req, res) => {
  res.send(`A product with id: ${req.params.id} was retrieved`);
};

export const updateProduct = (req, res) => {
  res.send(`A product with id: ${req.params.id} was updated`);
};

export const deleteProduct = (req, res) => {
  res.send(`A product with id: ${req.params.id} was deleted`);
};

export const deleteProducts = (req, res) => {
  res.send("All products were deleted");
};
