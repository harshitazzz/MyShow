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

            if (data.success) {
                setMovie(data.movie);
            } else {
                console.error("Failed to get movie:", data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMovie();
    }, [id]);

    if (loading) {
        return <p className="text-white p-4">Loading...</p>;
    }

    if (!movie) {
        return <p className="text-white p-4">Movie not found</p>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 pt-24 flex flex-col items-center">
            {/* Movie Poster */}
            <img
                src={movie.imageUrl}
                alt={movie.movieName}
                className="w-[300px] h-[450px] object-cover rounded-lg shadow-lg"
            />

            {/* Info Section */}
            <div className="max-w-2xl mt-6 text-center">
                <h1 className="text-4xl font-bold text-red-500">{movie.movieName}</h1>

                <p className="text-gray-400 mt-2 text-lg">
                    {movie.genre} • {movie.releaseYear}
                </p>

                <p className="text-yellow-400 text-xl font-semibold mt-2">
                    ⭐ IMDb: {movie.imdbRating}
                </p>

                {/* Play Trailer */}
                {movie.trailerUrl && (
                    <button
                        onClick={() => window.open(movie.trailerUrl, "_blank")}
                        className="mt-6 bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700 transition text-lg font-semibold"
                    >
                        ▶ Play Trailer
                    </button>
                )}

                {/* Nearest Theatres */}
                <button
                    onClick={() => navigate(`/movies/${movie._id}/theatres`)}
                    className="mt-4 bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
                >
                    🎦 View Theatres
                </button>

                {/* Description (optional if you add later) */}
                {movie.description && (
                    <p className="text-gray-300 mt-6 text-md">{movie.description}</p>
                )}
            </div>
        </div>
    );
};

export default MovieDetails;