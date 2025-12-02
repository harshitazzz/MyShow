import React, { useState } from 'react';
import API from '../libs/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminAddMovie = () => {
  const [form, setForm] = useState({
    movieName: '',
    trailerUrl: '',
    imageUrl: '',
    imdbRating: '',
    genre: '',
    releaseYear: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      if (payload.imdbRating) payload.imdbRating = Number(payload.imdbRating);
      if (payload.releaseYear) payload.releaseYear = Number(payload.releaseYear);

      const res = await API.post('/admin/movies/add', payload);
      if (res.data.success) {
        toast.success('Movie added');
        navigate('/admin/movies');
      } else {
        toast.error(res.data.message || 'Failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Add movie failed');
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Add New Movie</h2>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input required value={form.movieName} onChange={e => setForm({ ...form, movieName: e.target.value })} placeholder="Movie Name" className="w-full p-3 bg-gray-800 rounded" />
        <input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} placeholder="Image URL" className="w-full p-3 bg-gray-800 rounded" />
        <input value={form.trailerUrl} onChange={e => setForm({ ...form, trailerUrl: e.target.value })} placeholder="Trailer URL" className="w-full p-3 bg-gray-800 rounded" />
        <input value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} placeholder="Genre" className="w-full p-3 bg-gray-800 rounded" />
        <div className="grid grid-cols-2 gap-3">
          <input type="number" value={form.imdbRating} onChange={e => setForm({ ...form, imdbRating: e.target.value })} placeholder="IMDb Rating" className="p-3 bg-gray-800 rounded" />
          <input type="number" value={form.releaseYear} onChange={e => setForm({ ...form, releaseYear: e.target.value })} placeholder="Release Year" className="p-3 bg-gray-800 rounded" />
        </div>
        <button className="bg-red-600 px-4 py-2 rounded">Add Movie</button>
      </form>
    </div>
  );
};

export default AdminAddMovie;