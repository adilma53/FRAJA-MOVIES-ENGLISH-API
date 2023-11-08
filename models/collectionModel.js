import mongoose from 'mongoose';
const { Schema } = mongoose;
import Comment from './commentModel.js';

const collectionSchema = new Schema(
  {
    name: String,

    shows: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Show' }],
  },
  {
    timestamps: true,
  }
);

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;
