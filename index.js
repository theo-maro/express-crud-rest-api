import fs from "fs";
import path from "path";
import * as url from "url";
import express from "express";
import config from "config";
import logger from "morgan";
import debug from "debug";

const app = express();
const PORT = process.env.PORT || config.get("port");
const appDebugger = debug("app:db");
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// middleware
app.use(express.json());

if (app.get("env") === "development") {
  app.use(logger("dev"));
  appDebugger("Morgan logger enabled");
}

// TODO : save logs to a file
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

app.listen(PORT, (err) => {
  if (err) appDebugger(err);
  appDebugger(`Server is listening on port ${PORT}`);
});
