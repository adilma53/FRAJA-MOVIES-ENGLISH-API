const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { Comment } = require('./commentModel');

const showSchema = new Schema(
  {
    tmdbId: String,

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
);

const Show = mongoose.model('show', showSchema);

module.exports = { Show };
