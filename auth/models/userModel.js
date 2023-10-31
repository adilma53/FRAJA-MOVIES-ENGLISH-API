import mongoose from 'mongoose';
const { Schema } = mongoose;
import { Collection } from '../models/collectionModel.js';

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,

    token: String,
  },
  { timestamp: true }
);
// const userSchema = new Schema(
//   {
//     fname: String,
//     sname: String,

//     email: String,
//     avatar: String,

//     firebaseId: String, // to be changed to auth implementation

//     hidden: Boolean,

//     history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'History' }],

//     collections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],
//   },
//   { timestamps: true }
// );

const User = mongoose.model('user', userSchema);

export default { User };
