import mongoose from 'mongoose';
const { Schema } = mongoose;
import Show from './showModel.js';

const historyUnitSchema = new Schema(
  {
    show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show' },
  },
  {
    timestamps: true,
  }
);

const HistoryUnit = mongoose.model('historyunit', historyUnitSchema);

export default HistoryUnit;
