// Controllers/MovieController.js
const MovieModel = require('../Models/Movie');

// Admin adds a movie
const addMovie = async (req, res) => {
  try {
    const { movieName, trailerUrl, imageUrl, imdbRating, genre, releaseYear } = req.body;
    const addedBy = req.user && req.user.id ? req.user.id : null; // admin id from token

    const movie = await MovieModel.create({ movieName, trailerUrl, imageUrl, imdbRating, genre, releaseYear, addedBy });

    res.status(201).json({ message: 'Movie added', success: true, movie });
  } catch (err) {
    console.error('Add movie error:', err);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

// Admin gets movies (optionally can be used by admin to view all)
const getMoviesAdmin = async (req, res) => {
  try {
    const movies = await MovieModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, movies });
  } catch (err) {
    console.error('Get movies admin error:', err);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

// Get single movie by ID
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await MovieModel.findById(id);
    if (!movie) return res.status(404).json({ message: 'Movie not found', success: false });
    res.status(200).json({ success: true, movie });
  } catch (err) {
    console.error('Get movie by id error:', err);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

// Admin updates a movie
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const movie = await MovieModel.findByIdAndUpdate(id, updates, { new: true });
    if (!movie) return res.status(404).json({ message: 'Movie not found', success: false });
    res.status(200).json({ message: 'Movie updated', success: true, movie });
  } catch (err) {
    console.error('Update movie error:', err);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

// Admin deletes a movie
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await MovieModel.findByIdAndDelete(id);
    if (!movie) return res.status(404).json({ message: 'Movie not found', success: false });
    res.status(200).json({ message: 'Movie deleted', success: true });
  } catch (err) {
    console.error('Delete movie error:', err);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

// Public (user) gets movies with filters + pagination
// const getMoviesPublic = async (req, res) => {
//   try {
//     let { page = 1, genre, year, minRating, sortBy } = req.query;
//     page = parseInt(page, 10) || 1;
//     const limit = 10;
//     const skip = (page - 1) * limit;

//     const query = {};
//     if (genre) query.genre = genre;
//     if (year) query.releaseYear = parseInt(year, 10);
//     if (minRating) query.imdbRating = { $gte: parseFloat(minRating) };

//     let q = MovieModel.find(query);

//     // Sorting
//     if (sortBy === 'rating') q = q.sort({ imdbRating: -1 });
//     else if (sortBy === 'newest') q = q.sort({ releaseYear: -1 });
//     else q = q.sort({ createdAt: -1 });

//     const total = await MovieModel.countDocuments(query);
//     const movies = await q.skip(skip).limit(limit).exec();

//     res.status(200).json({ success: true, page, perPage: limit, totalPages: Math.ceil(total / limit), total, movies });
//   } catch (err) {
//     console.error('Get movies public error:', err);
//     res.status(500).json({ message: 'Internal Server Error', success: false });
//   }
// };
// Controllers/MovieController.js

const getMoviesPublic = async (req, res) => {
  try {
    let { page = 1, genre, year, minRating, sortBy, search } = req.query;
    page = parseInt(page, 10) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const query = {};
    if (genre) query.genre = genre;
    if (year) query.releaseYear = parseInt(year, 10);
    if (minRating) query.imdbRating = { $gte: parseFloat(minRating) };
    if (search) query.movieName = { $regex: search, $options: 'i' }; // <-- search support

    let q = MovieModel.find(query);

    // Sorting
    if (sortBy === 'rating') q = q.sort({ imdbRating: -1 });
    else if (sortBy === 'newest') q = q.sort({ releaseYear: -1 });
    else q = q.sort({ createdAt: -1 });

    const total = await MovieModel.countDocuments(query);
    const movies = await q.skip(skip).limit(limit).exec();

    res.status(200).json({
      success: true,
      page,
      perPage: limit,
      totalPages: Math.ceil(total / limit),
      total,
      movies
    });
  } catch (err) {
    console.error('Get movies public error:', err);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

module.exports = { addMovie, getMoviesAdmin, updateMovie, deleteMovie, getMoviesPublic, getMovieById };