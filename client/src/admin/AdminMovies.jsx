import React, { useEffect, useState } from 'react';
import API from '../libs/api';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const res = await API.get('/admin/movies');
      if (res.data.success) setMovies(res.data.movies);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch movies');
    }
  };

  const deleteMovie = async (id) => {
    if (!confirm('Delete this movie?')) return;
    try {
      await API.delete(`/admin/movies/${id}`);
      toast.success('Movie deleted');
      fetchMovies();
    } catch (err) {
      console.error(err);
      toast.error('Delete failed');
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Movies</h2>
        <Link to="/admin/movies/add" className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Add Movie</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map(m => (
          <div key={m._id} className="bg-gray-800 rounded-lg shadow overflow-hidden hover:scale-105 transition">
            <img src={m.imageUrl} alt={m.movieName} className="w-full h-56 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{m.movieName}</h3>
              <p className="text-sm text-gray-400">{m.genre} • {m.releaseYear}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-yellow-400 font-semibold">★ {m.imdbRating}</span>
                <div className="flex gap-2">
                  <button onClick={() => navigate(`/admin/movies/edit/${m._id}`)} className="text-yellow-400">Edit</button>
                  <button onClick={() => deleteMovie(m._id)} className="text-red-400">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {movies.length === 0 && <p className="text-gray-400 mt-6">No movies yet.</p>}
    </div>
  );
};

export default AdminMovies;