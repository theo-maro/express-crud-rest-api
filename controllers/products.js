import { appDebugger } from "../index.js";
import { v4 as uuidV4 } from "uuid";
import {
  validateProduct,
  handlingValidationErrors,
} from "../utilities/products.js";

const products = [];

export const createProduct = (req, res) => {
  // validate the user entries
  const { error, value } = validateProduct(req.body);
  if (error) {
    handlingValidationErrors(error, res, appDebugger);
  }

  // add a new product to the products database
  const product = {
    _id: uuidV4(),
    name: value.name,
    brand: value.brand,
    type: value.type,
    color: value.color,
    price: value.price,
    monthly_price: value.monthly_price,
    rating: value.rating,
    limits: value.limits,
    cancel_penalty: value.cancel_penalty,
    sales_tax: value.sales_tax,
    additional_tarriffs: value.additional_tarriffs,
    warranty_years: value.warranty_years,
    term_years: value.term_years,
    available: value.available,
    for: value.for,
  };

  products.push(product);

  res.send(product);
  appDebugger(`A new Product with id: ${product._id} was created`);
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
