const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const router = express.Router();
const app = express();

const Router = require("../meaningRouter");
const config = require("../config");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(Router);
app.use("/.netlify/functions/api", Router);

mongoose
  .connect(config.DB, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

module.exports.handler = serverless(app);
