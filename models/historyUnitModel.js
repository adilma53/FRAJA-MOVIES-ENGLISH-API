import mongoose from 'mongoose';
const { Schema } = mongoose;
import Show from './showModel.js';

const historyUnitSchema = new Schema(
  {
    show: { type: Number, ref: 'Show' },
  },
  {
    timestamps: true,
  }
);

const HistoryUnit = mongoose.model('historyUnit', historyUnitSchema);

export default HistoryUnit;
