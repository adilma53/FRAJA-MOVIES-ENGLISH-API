import mongoose from 'mongoose';
const { Schema } = mongoose;
import autopopulate from 'mongoose-autopopulate';

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

    watched: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Show', autopopulate: true },
    ],
    watchLater: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Show', autopopulate: true },
    ],
    favorites: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Show', autopopulate: true },
    ],

    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonalCollection',
        autopopulate: true,
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        autopopulate: true,
      },
    ],

    friends: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true },
    ],

    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HistoryUnit',
        autopopulate: true,
      },
    ],
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
  // ---------------------------------------------------------------------------

  // add comment to user
  // remove comment from user
}

userSchema.plugin(autopopulate);

userSchema.loadClass(userClass);

const User = mongoose.model('user', userSchema);

export default User;
