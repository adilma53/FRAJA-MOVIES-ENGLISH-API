import mongoose from 'mongoose';
const { Schema } = mongoose;
import Comment from './commentModel.js';

const showSchema = new Schema(
  {
    tmdbId: String,

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
);

const Show = mongoose.model('show', showSchema);

export default Show;
