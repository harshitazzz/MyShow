import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-red-500 mb-4">Welcome, Admin</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/admin/movies" className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-lg shadow hover:scale-105 transition">
          <h3 className="text-xl font-semibold">Manage Movies</h3>
          <p className="text-sm text-gray-300 mt-2">Add / Edit / Delete movies</p>
        </Link>

        <Link to="/admin/theatres" className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-lg shadow hover:scale-105 transition">
          <h3 className="text-xl font-semibold">Manage Theatres</h3>
          <p className="text-sm text-gray-300 mt-2">Assign movies to theatres</p>
        </Link>

        <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Quick Actions</h3>
          <p className="text-sm text-gray-300 mt-2">Use the left menu to navigate</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;