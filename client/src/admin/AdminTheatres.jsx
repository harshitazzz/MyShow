import React, { useEffect, useState } from 'react';
import API from '../libs/api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const AdminTheatres = () => {
  const [theatres, setTheatres] = useState([]);

  const fetch = async () => {
    try {
      const res = await API.get('/theatres');
      if (res.data.success) setTheatres(res.data.theatres);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch theatres");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const deleteTheatre = async (id) => {
    if (!window.confirm("Are you sure you want to delete this theatre?")) return;

    try {
      const res = await API.delete(`/theatres/${id}`);
      if (res.data.success) {
        toast.success("Theatre deleted");
        setTheatres((prev) => prev.filter((t) => t._id !== id));
      } else {
        toast.error(res.data.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Theatres</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {theatres.map((t) => (
          <div key={t._id} className="bg-gray-800 p-4 rounded shadow relative">

            {/* Theatre Info */}
            <h3 className="text-lg font-semibold">{t.theatreName}</h3>
            <p className="text-gray-400">{t.city} • {t.location}</p>

            {/* Movies */}
            <div className="mt-3">
              <h4 className="font-medium">Movies</h4>
              <ul className="list-disc ml-5 mt-2 text-sm text-gray-300">
                {t.movies?.map((m) => (
                  <li key={m._id}>{m.movieName}</li>
                ))}
              </ul>
            </div>

            {/* Edit + Delete Buttons */}
            <div className="flex gap-3 mt-4">

              <Link
                to={`/admin/theatres/edit/${t._id}`}
                className="bg-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                Edit
              </Link>

              <button
                onClick={() => deleteTheatre(t._id)}
                className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>
        ))}
      </div>

      {theatres.length === 0 && (
        <p className="text-gray-400 mt-4">No theatres yet.</p>
      )}
    </div>
  );
};

export default AdminTheatres;