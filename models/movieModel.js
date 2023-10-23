const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { Comment } = require('../models/commentModel');

const movieSchema = new Schema(
  {
    tmdbId: String,

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model('movie', movieSchema);

module.exports = { Movie };
