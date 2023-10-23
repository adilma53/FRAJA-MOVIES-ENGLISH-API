const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { User } = require('../models/userModel');

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

module.exports = { Comment };
