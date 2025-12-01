const mongoose = require('mongoose');
const { dbAuth } = require('./db');

const MovieSchema = new mongoose.Schema({
  movieName: { type: String, required: true },
  trailerUrl: { type: String },
  imageUrl: { type: String },
  imdbRating: { type: Number, min: 0, max: 10 },
  genre: { type: String },
  releaseYear: { type: Number },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true });

const MovieModel = dbAuth.model('Movie', MovieSchema);
module.exports = MovieModel;