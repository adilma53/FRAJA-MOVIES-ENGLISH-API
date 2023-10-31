const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { Comment } = require('./commentModel');

const personalCollectionSchema = new Schema(
  {
    name: String,

    isPublic: Boolean,

    shows: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Show' }],
  },
  {
    timestamps: true,
  }
);

const PersonalCollection = mongoose.model(
  'personalCollection',
  personalCollectionSchema
);

module.exports = { PersonalCollection };
