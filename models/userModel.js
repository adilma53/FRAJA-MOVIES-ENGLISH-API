const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { Movie } = require('../models/movieModel');

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

const userSchema = new Schema(
  {
    name: String,
    email: String,
    avatar: String,

    firebaseId: String,

    hidden: Boolean,

    watched: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    watchLater: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],

    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);

const Comment = mongoose.model('comment', commentSchema);

module.exports = { User, Comment };
