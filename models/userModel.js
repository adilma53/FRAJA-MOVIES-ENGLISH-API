// Import necessary libraries and define the "Card" model
const mongoose = require('mongoose');

// Define the schema for the "Card" model with three fields: title, description, and image
const cardSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter card title'], // Require a title field with a validation message
    },
    description: {
      type: String,
      required: [true, 'Please enter card description'], // Require a description field with a validation message
    },
    image: {
      type: String,
      required: [true, 'Please enter card image'], // Require an image field with a validation message
    },
  },
  {
    timestamps: true, // Enable timestamps for created and updated date fields
  }
);

// Create the "Card" model using the schema
const User = mongoose.model('User', cardSchema);

module.exports = User;
