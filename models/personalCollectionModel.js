import mongoose from 'mongoose';
const { Schema } = mongoose;
import Comment from './commentModel.js';

const personalCollectionSchema = new Schema(
  {
    name: String,

    isPublic: Boolean,

    shows: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Show' }],
  },
  {
    timestamps: true,
  }
);

const PersonalCollection = mongoose.model(
  'personalCollection',
  personalCollectionSchema
);

export default PersonalCollection;
