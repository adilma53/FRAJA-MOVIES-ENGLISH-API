const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    tmdbId: String,
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model('movie', movieSchema);

module.exports = { Movie };
