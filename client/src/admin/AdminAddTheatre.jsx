import React, { useEffect, useState } from 'react';
import API from "../libs/api";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminAddTheatre = () => {
    const [form, setForm] = useState({ theatreName: '', city: '', location: '' });
    const [movies, setMovies] = useState([]);
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();

    const fetchMovies = async () => {
        try {
            const res = await API.get('/admin/movies');
            if (res.data.success) setMovies(res.data.movies);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchMovies(); }, []);

    const toggle = (id) => {
        setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!form.theatreName || !form.city) return toast.error('Please fill required fields');
        try {
            const res = await API.post('/theatres/add', { ...form, movies: selected });
            if (res.data.success) {
                toast.success('Theatre added');
                navigate('/admin/theatres');
            } else toast.error(res.data.message || 'Failed');
        } catch (err) {
            console.error(err);
            toast.error('Add theatre failed');
        }
    };

    return (
        <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Add Theatre</h2>

            <form onSubmit={submit} className="space-y-3">
                <input required value={form.theatreName} onChange={e => setForm({ ...form, theatreName: e.target.value })} placeholder="Theatre Name" className="w-full p-3 bg-gray-800 rounded" />
                <input required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="City" className="w-full p-3 bg-gray-800 rounded" />
                <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Location" className="w-full p-3 bg-gray-800 rounded" />

                <div>
                    <h3 className="font-semibold mb-2">Assign Movies</h3>
                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-auto p-2 bg-gray-900 rounded">
                        {movies.map(m => (
                            <label key={m._id} className={`p-2 rounded border ${selected.includes(m._id) ? 'border-red-500' : 'border-transparent'} cursor-pointer flex items-center gap-2`}>
                                <input type="checkbox" checked={selected.includes(m._id)} className="accent-red-500" onChange={() => toggle(m._id)} />
                                <img src={m.imageUrl} alt={m.movieName} className="w-10 h-14 object-cover rounded" />
                                <div className="text-sm">
                                    <div className="font-medium">{m.movieName}</div>
                                    <div className="text-gray-400 text-xs">{m.genre}</div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <button className="bg-red-600 px-4 py-2 rounded">Create Theatre</button>
            </form>
        </div>
    );
};

export default AdminAddTheatre;