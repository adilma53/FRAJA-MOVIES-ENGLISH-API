import mongoose from 'mongoose';
const { Schema } = mongoose;

import User from './userModel.js';

const commentSchema = new Schema(
  {
    content: String,

    upVote: Number,
    downVote: Number,

    hidden: Boolean,

    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    responses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

const Comment = mongoose.model('comment', commentSchema);

export default Comment;
