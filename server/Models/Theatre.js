const mongoose = require('mongoose');
const { dbAuth } = require('./db'); // same connection as Movie model

const TheatreSchema = new mongoose.Schema({
  theatreName: { type: String, required: true },
  city: { type: String, required: true },
  location: { type: String },

  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie"
    }
  ],

  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  }

}, { timestamps: true });

const TheatreModel = dbAuth.model("Theatre", TheatreSchema);
module.exports = TheatreModel;