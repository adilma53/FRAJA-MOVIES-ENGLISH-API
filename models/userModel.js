const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { Movie } = require('../models/movieModel');
const { HistoryUnit } = require('../models/historyUnitModel');
const { Comment } = require('../models/commentModel');

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

    history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HistoryUnit' }],
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);

module.exports = { User };
