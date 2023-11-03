import mongoose from 'mongoose';
const { Schema } = mongoose;
import Comment from './commentModel.js';
import autopopulate from 'mongoose-autopopulate';

const collectionSchema = new Schema(
  {
    name: String,

    isPublic: Boolean,

    shows: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Show', autopopulate: true },
    ],
  },
  {
    timestamps: true,
  }
);

collectionSchema.plugin(autopopulate);

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;
