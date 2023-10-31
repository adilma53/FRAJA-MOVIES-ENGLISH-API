import mongoose from 'mongoose';
const { Schema } = mongoose;

import Show from './showModel.js';
import HistoryUnit from './historyUnitModel.js';
import Comment from './commentModel.js';
import PersonalCollection from './personalCollectionModel.js';

const userSchema = new Schema(
  {
    name: String,

    password: String,
    email: { type: String, unique: true },

    token: String,

    // ------------

    avatar: String,

    isOnline: Boolean,
    isHidden: Boolean,

    watched: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Show' }],
    watchLater: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Show' }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Show' }],

    collections: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalCollection' },
    ],

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],

    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HistoryUnit' }],
  },
  { timestamps: true }
);

class userClass {
  // profile
  updateProfile(name) {
    this.name = name;

    return this.save;
  }

  changePassword(password) {
    this.password = password;
    return this.save;
  }

  changeEmail(email) {
    this.email = email;
    return this.save;
  }

  changeAvatar(avatar) {
    this.avatar = avatar;
    return this.save;
  }

  setIsOnline(isOnline) {
    this.isOnline = isOnline;
    return this.save;
  }
  changeIsHidden(isHidden) {
    this.isHidden = isHidden;
    return this.save;
  }
  // ---------------------------------------------------------------------------

  //list crud
  addToList(whichList, objectId) {
    this[whichList].push(objectId);

    return this.save();
  }

  deleteFromList(whichList, deletedId) {
    this[whichList] = this[whichList].filter(
      (item) => String(item) !== String(deletedId)
    );

    return this.save();
  }
}

userSchema.loadClass(userClass);

const User = mongoose.model('user', userSchema);

export default User;
