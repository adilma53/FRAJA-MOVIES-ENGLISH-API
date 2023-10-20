const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema for the "Card" model with three fields: title, description, and image
const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: false, // Require a title field with a validation message
    },
    description: {
      type: String,
      required: false, // Require a description field with a validation message
    },
  },
  {
    timestamps: true, // Enable timestamps for created and updated date fields
  }
);

// Create the "Card" model using the schema
const User = mongoose.model('user', cardSchema);

module.exports = User;
