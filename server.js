const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const router = express.Router();
const app = express();
const PORT = process.env.PORT || 4000;
const Router = require("./meaningRouter");
const config = require("./config");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", Router);

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
app.listen(PORT, function() {
  console.log("app running on port" + PORT);
});
