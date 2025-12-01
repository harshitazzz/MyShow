import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const fetchMovies = async () => {
        try {
            const response = await fetch('http://localhost:8080/movie/all');
            const data = await response.json();
            if (data.success) {
                setMovies(data.movies);
            } else {
                console.error('Failed to fetch movies:', data.message);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
            <h1 className="text-4xl font-bold mb-8 text-center text-red-500">Now Showing</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {movies.map((movie) => (
                    <div
                        key={movie._id}
                        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => navigate(`/movies/${movie._id}`)}
                    >
                        <img
                            src={movie.image}
                            alt={movie.title}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                            <p className="text-gray-400 text-sm mb-2">{movie.genre}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-yellow-500 font-bold">★ {movie.rating}</span>
                                <button className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition-colors text-sm">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {movies.length === 0 && (
                <div className="text-center text-gray-400 mt-12">
                    <p>No movies currently showing.</p>
                </div>
            )}
        </div>
    );
};

export default Movies;
