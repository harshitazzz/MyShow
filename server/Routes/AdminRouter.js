// Routes/AdminRouter.js
const express = require('express');
const { adminSignupValidation, adminLoginValidation } = require('../middleware/AdminValidation');
const { adminSignup, adminLogin } = require('../Controllers/AdminAuthController');
const { addMovie, getMoviesAdmin, updateMovie, deleteMovie } = require('../Controllers/MovieController');
const adminAuth = require('../middleware/AdminAuth');

const router = express.Router();

// Public admin auth endpoints
router.post('/signup', adminSignupValidation, adminSignup);
router.post('/login', adminLoginValidation, adminLogin);

// Protected admin movie management
router.post('/movies/add', adminAuth, addMovie);
router.get('/movies', adminAuth, getMoviesAdmin);
router.put('/movies/:id', adminAuth, updateMovie);
router.delete('/movies/:id', adminAuth, deleteMovie);

module.exports = router;