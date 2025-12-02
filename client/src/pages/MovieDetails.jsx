import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovie = async () => {
    try {
      const response = await fetch(`http://localhost:8080/movies/${id}`);
      const data = await response.json();
      if (data.success) setMovie(data.movie);
    } catch (err) {
      console.error("Error fetching movie:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (loading) return <p className="text-white p-4">Loading...</p>;
  if (!movie) return <p className="text-white p-4">Movie not found</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-36 flex flex-col items-center">
      {/* Movie Poster */}
      <img
        src={movie.imageUrl}
        alt={movie.movieName}
        className="w-full max-w-5xl h-[600px] object-cover rounded-lg shadow-lg"
      />

      {/* Controls + Title Row */}
      <div className="w-full max-w-5xl mt-6 flex items-center justify-between px-4 md:px-0">
        {/* Left: Play Trailer */}
        {movie.trailerUrl && (
          <button
            onClick={() => window.open(movie.trailerUrl, "_blank")}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-105"
          >
            ▶ Play Trailer
          </button>
        )}

        {/* Center: Movie Name */}
        <h1 className="text-1xl md:text-5xl font-bold text-center text-gray/30 flex-1 mx-4">
          {movie.movieName}
        </h1>

        {/* Right: View Theatres */}
        <button
          onClick={() => navigate(`/movies/${movie._id}/theatres`)}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-105"
        >
          🎦 View Theatres
        </button>
      </div>

      {/* Optional Movie Info */}
      <div className="max-w-5xl mt-4 text-gray-300 px-4 md:px-0 text-center">
        <p className="text-lg">
          {movie.genre} • {movie.releaseYear} • ⭐ IMDb: {movie.imdbRating}
        </p>
        {movie.description && <p className="mt-2">{movie.description}</p>}
      </div>
    </div>
  );
};

export default MovieDetails;