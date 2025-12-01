// Routes/MovieRouter.js
const express = require('express');
const { getMoviesPublic } = require('../Controllers/MovieController');

const router = express.Router();

// Public endpoint: GET /movies?page=1&genre=Action&year=2020&minRating=7&sortBy=rating
router.get('/', getMoviesPublic);

module.exports = router;
