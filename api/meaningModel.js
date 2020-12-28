const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Meaning = new Schema(
  {
    word: {
      type: String,
    },
    definition: {
      type: String,
    },
    example: {
      type: String,
    },
    synonyms: {
      type: String,
    },
  },
  {
    collection: "meanings",
  }
);

module.exports = mongoose.model("Meaning", Meaning);
