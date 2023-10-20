const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  tmdbId: String,
});

const commentSchema = new Schema(
  {
    content: String,

    author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    likes: Number,
    dislikes: Number,

    hidden: Boolean,

    response: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    name: String,

    email: String,
    password: String,

    firebaseId: String,

    hidden: Boolean,

    watched: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    watchLater: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);
const Movie = mongoose.model('movie', movieSchema);
const Comment = mongoose.model('comment', commentSchema);

module.exports = { User, Movie, Comment };
