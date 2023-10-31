const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { Word } = require('../models/wordModel');

const historySchema = new Schema(
  {
    word: { type: mongoose.Schema.Types.ObjectId, ref: 'Word' },
  },
  { timestamps: true }
);

const History = mongoose.model('history', historySchema);

module.exports = { History };
