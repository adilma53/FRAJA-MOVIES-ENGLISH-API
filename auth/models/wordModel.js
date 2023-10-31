const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema(
  {
    wordId: String,
  },
  {
    timestamps: true,
  }
);

const Word = mongoose.model('Word', wordSchema);

module.exports = { Word };
