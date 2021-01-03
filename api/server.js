const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const serveStatic = require("serve-static");

const PORT = process.env.PORT || 4000;

const app = express();
app.use(serveStatic(path.join(__dirname, "dist")));

const Router = require("./meaningRouter");
const config = require("./config");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/word", Router);

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

app.listen(PORT, () => {
  console.log("server running on port: " + PORT);
});
