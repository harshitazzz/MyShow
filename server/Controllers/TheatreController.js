const TheatreModel = require("../Models/Theatre");

// Admin adds theatre
const addTheatre = async (req, res) => {
  try {
    const { theatreName, city, location, movies } = req.body;

    const addedBy = req.user?.id || null;

    const theatre = await TheatreModel.create({
      theatreName,
      city,
      location,
      movies, // Array of movieIds
      addedBy
    });

    res.status(201).json({
      message: "Theatre added successfully",
      success: true,
      theatre
    });

  } catch (err) {
    console.log("Add Theatre Error:", err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Get all theatres
const getAllTheatres = async (req, res) => {
  try {
    const theatres = await TheatreModel.find()
      .populate("movies")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, theatres });

  } catch (err) {
    console.log("Get Theatres Error:", err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Get theatres by movie ID
const getTheatresByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const theatres = await TheatreModel.find({ movies: movieId }).populate("movies");

    res.status(200).json({ success: true, theatres });

  } catch (err) {
    console.log("Fetch theatres by movie error:", err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Get single theatre by ID
const getTheatreById = async (req, res) => {
  try {
    const { id } = req.params;
    const theatre = await TheatreModel.findById(id).populate("movies");
    if (!theatre) return res.status(404).json({ message: "Theatre not found", success: false });
    res.status(200).json({ success: true, theatre });
  } catch (err) {
    console.log("Get Theatre Error:", err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Update theatre
const updateTheatre = async (req, res) => {
  try {
    const { id } = req.params;
    const { theatreName, city, location, movies } = req.body;

    const updated = await TheatreModel.findByIdAndUpdate(
      id,
      { theatreName, city, location, movies },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Theatre not found", success: false });

    res.status(200).json({ success: true, message: "Theatre updated", theatre: updated });

  } catch (err) {
    console.log("Update Theatre Error:", err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
const deleteTheatre = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await TheatreModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Theatre not found" });
    }

    res.status(200).json({
      success: true,
      message: "Theatre deleted successfully"
    });

  } catch (err) {
    console.log("Delete Theatre Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = { addTheatre, getAllTheatres, getTheatresByMovie, getTheatreById, updateTheatre,deleteTheatre };