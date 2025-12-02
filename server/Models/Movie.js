// Models/Movie.js
const mongoose = require('./db');

const MovieSchema = new mongoose.Schema({
  movieName: { type: String, required: true },
  trailerUrl: String,
  imageUrl: String,
  imdbRating: { type: Number, min: 0, max: 10 },
  genre: String,
  releaseYear: Number,
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true });

module.exports = mongoose.model('Movie', MovieSchema);