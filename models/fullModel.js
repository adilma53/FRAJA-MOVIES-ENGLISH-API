// const mongoose = require('mongoose');

// const movieSchema = new mongoose.Schema({
//   tmdbId: String,
// });

// const commentSchema = new mongoose.Schema(
//   {
//     content: String,

//     author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

//     likes: Number,
//     dislikes: Number,

//    hidden:Boolean,

//     response: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
//   },
//   { timestamps: true }
// );

// const userSchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Please enter card title'],
//     },

// email: String,
// password: String,

// firebaseId: String,

//     watched: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
//     watchLater: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
//     favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],

//     comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
//   },
//   { timestamps: true }
// );

// const User = mongoose.model('User', userSchema);
// const Movie = mongoose.model('Movie', movieSchema);
// const Comment = mongoose.model('Comment', commentSchema);

// module.exports = { User, Movie, Comment };

// module.exports = { User };
