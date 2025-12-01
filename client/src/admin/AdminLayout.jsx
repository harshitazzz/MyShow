import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const AdminLayout = () => {
  const navigate = useNavigate()

  return (
    <div className='flex min-h-screen bg-gray-900 text-white'>

      {/* SIDEBAR */}
      <div className='w-64 bg-gray-800 p-6 flex flex-col gap-6'>
        <h1 className='text-2xl font-bold text-red-500'>Admin Panel</h1>

        <nav className='flex flex-col gap-4'>
          <Link to="/admin" className='hover:text-red-400'>Dashboard</Link>
          <Link to="/admin/movies" className='hover:text-red-400'>Movies</Link>
          <Link to="/admin/movies/add" className='hover:text-red-400'>Add Movie</Link>
        </nav>

        <button
          className='mt-auto bg-red-600 hover:bg-red-700 py-2 rounded'
          onClick={() => navigate('/admin/login')}
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className='flex-1 p-10'>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout