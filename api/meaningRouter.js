const express = require("express");
const Router = express.Router();
const axios = require("axios");
const Meaning = require("./meaningModel");

Router.route("/get/:word").get((req, res) => {
  let dictApi = " https://api.dictionaryapi.dev/api/v2/entries/en/";
  let word = req.params.word;
  dictApi += word;
  axios
    .get(dictApi)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((e) => {
      res.status(404).json(e.message);
    });
});

Router.route("/save").post((req, res) => {
  let newMeaning = new Meaning(req.body);
  newMeaning
    .save()
    .then(() => {
      res.status(200).send("meaning added");
    })
    .catch((e) => {
      res.status(400).send("unable to add meaning");
    });
});

Router.route("/all").get((req, res) => {
  Meaning.find({}, function(err, meanings) {
    if (err) {
      res.json(err);
    } else {
      res.json(meanings);
    }
  });
});

module.exports = Router;
