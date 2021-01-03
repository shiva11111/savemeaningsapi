const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Meaning = new Schema(
  {
    word: {
      type: String,
    },
    definitions: {
      type: Array,
    },
    examples: {
      type: Array,
    },
    synonyms: {
      type: Array,
    },
  },
  {
    collection: "meanings",
  }
);

module.exports = mongoose.model("Meaning", Meaning);
