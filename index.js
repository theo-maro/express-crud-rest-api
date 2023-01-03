import fs from "fs";
import path from "path";
import * as url from "url";
import config from "config";
import logger from "morgan";
import debug from "debug";
import express from "express";
import productsRouter from "./routes/products.js";

const app = express();
const PORT = process.env.PORT || config.get("port");
export const appDebugger = debug("app:db");
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// middleware
app.use(express.json());

if (app.get("env") === "development") {
  app.use(logger("dev"));
  appDebugger("Morgan logger enabled");
}

if (app.get("env") === "production") {
  // create a write stream (in append mode)
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
  );

  // setup the logger
  app.use(logger("combined", { stream: accessLogStream }));
  app.use(logger("combined"));
}

// homepage
app.get("/api", (req, res) => {
  res.send("GET request to the homepage");
});

// Product Router
app.use("/api/products", productsRouter);

// listening to incoming calls
app.listen(PORT, (err) => {
  if (err) appDebugger(err);
  appDebugger(`Server is listening on port ${PORT}`);
});
