import mongoose from 'mongoose';
const { Schema } = mongoose;
import autopopulate from 'mongoose-autopopulate';

import Show from './showModel.js';
import HistoryUnit from './historyUnitModel.js';
import Comment from './commentModel.js';
import Collection from './collectionModel.js';

const userSchema = new Schema(
  {
    name: String,

    email: { type: String, unique: true },
    password: String,

    token: String,

    // ------------

    avatar: String,

    isOnline: Boolean,
    isHidden: Boolean,

    watched: [{ type: Number, ref: 'Show', autopopulate: true }],
    watchLater: [{ type: Number, ref: 'Show', autopopulate: true }],
    favorites: [{ type: Number, ref: 'Show', autopopulate: true }],

    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
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

    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'historyUnit',
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
      (item) => String(item._id) !== String(deletedId)
    );

    return this.save();
  }
  // ---------------------------------------------------------------------------

  // add comment to user
  // remove comment from user
}

userSchema.plugin(autopopulate);

userSchema.loadClass(userClass);

const User = mongoose.model('User', userSchema);

export default User;
