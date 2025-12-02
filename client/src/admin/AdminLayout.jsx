import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <aside className="w-72 bg-gray-800 p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-red-500 mb-6">Admin Panel</h1>

        <nav className="flex-1 space-y-3 text-sm">
          <Link to="/admin" className="block px-3 py-2 rounded hover:bg-gray-700">Dashboard</Link>
          <Link to="/admin/movies" className="block px-3 py-2 rounded hover:bg-gray-700">Movies</Link>
          <Link to="/admin/movies/add" className="block px-3 py-2 rounded hover:bg-gray-700">Add Movie</Link>
          <Link to="/admin/theatres" className="block px-3 py-2 rounded hover:bg-gray-700">Theatres</Link>
          <Link to="/admin/theatres/add" className="block px-3 py-2 rounded hover:bg-gray-700">Add Theatre</Link>
        </nav>

        <div className="mt-auto">
          <button onClick={logout} className="w-full bg-red-600 py-2 rounded hover:bg-red-700">Logout</button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;