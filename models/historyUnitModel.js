import mongoose from 'mongoose';
const { Schema } = mongoose;
import Show from './showModel.js';
import autopopulate from 'mongoose-autopopulate';

const historyUnitSchema = new Schema(
  {
    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Show',
      autopopulate: true,
    },
  },
  {
    timestamps: true,
  }
);

historyUnitSchema.plugin(autopopulate);

const HistoryUnit = mongoose.model('historyUnit', historyUnitSchema);

export default HistoryUnit;
