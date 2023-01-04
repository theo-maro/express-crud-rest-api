import { appDebugger } from "../index.js";
import { v4 as uuidV4 } from "uuid";
import {
  validateProduct,
  handlingValidationErrors,
} from "../utilities/products.js";
import { checkItemsInArray } from "../utilities/utilities.js";

let products = [
  {
    name: "AC3 Phone",
    brand: "ACME",
    type: "phone",
    price: 200,
    rating: 3.8,
    warranty_years: 1,
    available: true,
    _id: "9b36e27c-8832-4d36-992e-d13ec153d95b",
  },
  {
    name: "AC7 Phone",
    brand: "ACME",
    type: "phone",
    price: 320,
    rating: 4,
    warranty_years: 1,
    available: false,
    _id: "a99c30e7-4cce-43b4-b926-95d5b1fa905d",
  },
  {
    name: "AC3 Series Charger",
    type: ["accessory", "charger"],
    price: 19,
    rating: 2.8,
    warranty_years: 0.25,
    for: ["ac3", "ac7", "ac9"],
    _id: "66ec37d2-f1d3-4ef6-8698-268ad954eb7b",
  },
  {
    name: "AC3 Case Green",
    type: ["accessory", "case"],
    color: "green",
    price: 12,
    rating: 1,
    warranty_years: 0,
    _id: "405e7100-618c-4636-ae96-f44805b6295a",
  },
  {
    name: "AC3 Case Black",
    type: ["accessory", "case"],
    color: "black",
    price: 12.5,
    rating: 2,
    warranty_years: 0.25,
    available: false,
    for: "ac3",
    _id: "52dad520-5cbb-400d-b26b-6da219f98c77",
  },
  {
    name: "AC3 Case Red",
    type: ["accessory", "case"],
    color: "red",
    price: 12,
    rating: 4,
    warranty_years: 0.25,
    available: true,
    for: "ac3",
    _id: "0bb77831-3ff0-4634-b950-b99558756d16",
  },
  {
    name: "Cable TV Basic Service Package",
    type: "tv",
    monthly_price: 50,
    rating: 3.9,
    term_years: 2,
    cancel_penalty: 25,
    sales_tax: true,
    additional_tarriffs: [
      { kind: "federal tarriff", amount: { percent_of_service: 0.06 } },
      { kind: "misc tarriff", amount: 2.25 },
    ],
  },
  {
    name: "Phone Extended Warranty",
    type: "warranty",
    price: 38,
    rating: 5,
    warranty_years: 2,
    for: ["ac3", "ac7", "ac9", "qp7", "qp8", "qp9"],
    _id: "c130ef2a-55de-407f-82c4-4d079e2ef33f",
  },
  {
    name: "Phone Service Basic Plan",
    type: "service",
    monthly_price: 40,
    rating: 3,
    limits: {
      voice: {
        units: "minutes",
        n: 400,
        over_rate: 0.05,
      },
      data: {
        units: "gigabytes",
        n: 20,
        over_rate: 1,
      },
      sms: {
        units: "texts sent",
        n: 100,
        over_rate: 0.001,
      },
    },
    term_years: 2,
    _id: "39655352-fb14-44cf-a263-9caeb76af1cb",
  },
  {
    name: "Phone Service Family Plan",
    type: "service",
    monthly_price: 90,
    rating: 4,
    limits: {
      voice: { units: "minutes", n: 1200, over_rate: 0.05 },
      data: { n: "unlimited", over_rate: 0 },
      sms: { n: "unlimited", over_rate: 0 },
    },
    sales_tax: true,
    term_years: 2,
  },
  {
    name: "Phone Service Core Plan",
    type: "service",
    monthly_price: 60,
    rating: 3,
    limits: {
      voice: {
        units: "minutes",
        n: 1000,
        over_rate: 0.05,
      },
      data: {
        n: "unlimited",
        over_rate: 0,
      },
      sms: {
        n: "unlimited",
        over_rate: 0,
      },
    },
    term_years: 1,
    _id: "90054d75-5ff0-4b7e-95fa-89d95cc52884",
  },
];

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
  const queryStringKeys = Object.keys(req.query);

  if (products.length === 0) {
    appDebugger(`${products.length} products retrieved"`);
    return res.status(200).send("No product was found!!");
  }

  // ** RETRIEVE LIMITED number of results
  if (checkItemsInArray(queryStringKeys, ["limit"])) {
    if (req.query.limit > products.length)
      return res.status(306).send("Exceeded maximum capacity");

    const limitedProducts = products.slice(0, req.query.limit);

    appDebugger(`${limitedProducts.length} products retrieved"`);
    return res.status(302).send(limitedProducts);
  }

  // ** RETRIEVE specific fields
  if (checkItemsInArray(queryStringKeys, ["fields"])) {
    const fields = req.query.fields.split(",");
    if (fields.length >= 7)
      return res.status(400).send("Exceed maximum number of query parameters");

    const newProducts = [];
    products.forEach((oldProduct) => {
      const newProduct = {};
      fields.forEach((field) => {
        newProduct[field] = oldProduct[field];
      });
      newProducts.push(newProduct);
    });

    appDebugger(`${newProducts.length} products retrieved"`);
    return res.status(302).send(newProducts);
  }

  //  ** SORTING the results
  if (checkItemsInArray(queryStringKeys, ["sort"])) {
    const fields = req.query.sort.split(",");

    products.sort((a, b) =>
      a[fields[0]] > b[fields[0]]
        ? 1
        : a[fields[0]] === b[fields[0]]
        ? a[fields[1]] > b[fields[1]]
          ? 1
          : -1
        : -1
    );

    return res.status(200).send(products);
  }

  // FILTERING results
  if (!checkItemsInArray(queryStringKeys, ["limit", "fields", "sort"])) {
    //

    if (queryStringKeys.length >= 4)
      return res.status(400).send("Exceed maximum number of query parameters");

    let filteredProduct = [];
    queryStringKeys.forEach((prop) => {
      filteredProduct = products.filter(
        (product) => String(product[prop]) === req.query[prop]
      );
    });

    if (filteredProduct.length === 0) {
      appDebugger(`${filteredProduct.length} product found`);
      return res.status(404).send(`${filteredProduct.length} product found`);
    }

    appDebugger(`${filteredProduct.length} product found`);
    return res.status(200).send(filteredProduct);
  }

  appDebugger(`${products.length} products retrieved"`);
  res.status(302).send(products);
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
