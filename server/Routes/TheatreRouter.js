const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/AdminAuth");
const { addTheatre, getAllTheatres, getTheatresByMovie, getTheatreById, updateTheatre, deleteTheatre } = require("../Controllers/TheatreController");

// Admin adds theatres
router.post("/add", adminAuth, addTheatre);

// Get all theatres
router.get("/", getAllTheatres);

// Get theatres where a movie is running
router.get("/movie/:movieId", getTheatresByMovie);

// Get single theatre
router.get("/:id", getTheatreById);

// Update theatre
router.put("/:id", adminAuth, updateTheatre);

// Delete theatre
router.delete("/:id", adminAuth, deleteTheatre);
module.exports = router;