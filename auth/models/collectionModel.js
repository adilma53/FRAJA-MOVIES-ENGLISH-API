const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { Word } = require('../models/wordModel');

const collectionSchema = new Schema(
  {
    name: String,

    hidden: Boolean,

    words: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Word' }],
  },
  { timestamps: true }
);

const Collection = mongoose.model('collection', collectionSchema);

module.exports = { Collection };
