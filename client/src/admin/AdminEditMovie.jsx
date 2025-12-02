import React, { useEffect, useState } from 'react';
import API from '../libs/api';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminEditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    movieName: '',
    trailerUrl: '',
    imageUrl: '',
    imdbRating: '',
    genre: '',
    releaseYear: ''
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await API.get(`/admin/movies/${id}`);
        if (res.data.success) setForm(res.data.movie);
      } catch (err) {
        toast.error('Failed to load movie');
      }
    };
    fetchMovie();
  }, [id]);

  const updateMovie = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      if (payload.imdbRating) payload.imdbRating = Number(payload.imdbRating);
      if (payload.releaseYear) payload.releaseYear = Number(payload.releaseYear);

      const res = await API.put(`/admin/movies/${id}`, payload);
      if (res.data.success) {
        toast.success('Updated');
        navigate('/admin/movies');
      } else toast.error(res.data.message || 'Update failed');
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Edit Movie</h2>
      <form className="space-y-3" onSubmit={updateMovie}>
        <input value={form.movieName} onChange={e => setForm({ ...form, movieName: e.target.value })} placeholder="Movie Name" className="w-full p-3 bg-gray-800 rounded" />
        <input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} placeholder="Image URL" className="w-full p-3 bg-gray-800 rounded" />
        <input value={form.trailerUrl} onChange={e => setForm({ ...form, trailerUrl: e.target.value })} placeholder="Trailer URL" className="w-full p-3 bg-gray-800 rounded" />
        <input value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} placeholder="Genre" className="w-full p-3 bg-gray-800 rounded" />
        <div className="grid grid-cols-2 gap-3">
          <input type="number" value={form.imdbRating} onChange={e => setForm({ ...form, imdbRating: e.target.value })} placeholder="IMDb Rating" className="p-3 bg-gray-800 rounded" />
          <input type="number" value={form.releaseYear} onChange={e => setForm({ ...form, releaseYear: e.target.value })} placeholder="Release Year" className="p-3 bg-gray-800 rounded" />
        </div>
        <button className="bg-red-600 px-4 py-2 rounded">Update Movie</button>
      </form>
    </div>
  );
};

export default AdminEditMovie;