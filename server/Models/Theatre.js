// Models/Theatre.js
const mongoose = require('./db');

const TheatreSchema = new mongoose.Schema({
  theatreName: { type: String, required: true },
  city: { type: String, required: true },
  location: String,
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
}, { timestamps: true });

module.exports = mongoose.model("Theatre", TheatreSchema);