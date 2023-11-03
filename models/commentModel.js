import mongoose from 'mongoose';
const { Schema } = mongoose;
import User from './userModel.js';
import autopopulate from 'mongoose-autopopulate';

const commentSchema = new Schema(
  {
    content: String,

    upVote: Number,
    downVote: Number,

    hidden: Boolean,

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },

    responses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        autopopulate: true,
      },
    ],
  },
  { timestamps: true }
);

commentSchema.plugin(autopopulate);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
