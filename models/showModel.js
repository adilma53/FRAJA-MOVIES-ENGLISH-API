import mongoose from 'mongoose';
const { Schema } = mongoose;
import Comment from './commentModel.js';
import autopopulate from 'mongoose-autopopulate';

const showSchema = new Schema(
  {
    tmdbId: String,

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        autopopulate: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

showSchema.plugin(autopopulate);

const Show = mongoose.model('Show', showSchema);

export default Show;
