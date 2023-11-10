import mongoose from 'mongoose';
const { Schema } = mongoose;
import Comment from './commentModel.js';

const collectionSchema = new Schema(
  {
    name: String,
    shows: [{ type: Number, ref: 'Show' }],
  },
  {
    timestamps: true,
  }
);

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;
