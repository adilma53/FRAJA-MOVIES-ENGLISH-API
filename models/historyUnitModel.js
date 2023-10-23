const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { Movie } = require('../models/movieModel');

const historyUnitSchema = new Schema(
  {
    show: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  },
  {
    timestamps: true,
  }
);

const HistoryUnit = mongoose.model('historyunit', historyUnitSchema);

module.exports = { HistoryUnit };
