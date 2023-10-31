const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { Show } = require('./showModel');

const historyUnitSchema = new Schema(
  {
    show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show' },
  },
  {
    timestamps: true,
  }
);

const HistoryUnit = mongoose.model('historyunit', historyUnitSchema);

module.exports = { HistoryUnit };
