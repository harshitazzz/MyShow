import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const AdminMovies = () => {
  const [movies, setMovies] = useState([])

  const fetchMovies = async () => {
    const res = await axios.get('http://localhost:8080/admin/movies')
    setMovies(res.data.movies)
  }

  const deleteMovie = async (id) => {
    await axios.delete(`http://localhost:8080/admin/movies/${id}`)
    toast.success("Movie deleted")
    fetchMovies()
  }

  useEffect(() => { fetchMovies() }, [])

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>All Movies</h1>

      <table className='w-full bg-gray-800 rounded'>
        <thead>
          <tr className='text-left bg-gray-700'>
            <th className='p-3'>Image</th>
            <th className='p-3'>Title</th>
            <th className='p-3'>Genre</th>
            <th className='p-3'>Actions</th>
          </tr>
        </thead>

        <tbody>
          {movies.map(m => (
            <tr key={m._id} className='border-b border-gray-700'>
              <td><img src={m.image} className='h-20 w-16 object-cover'/></td>
              <td className='p-3'>{m.title}</td>
              <td className='p-3'>{m.genre}</td>
              <td className='p-3 flex gap-4'>
                <Link to={`/admin/movies/edit/${m._id}`} className='text-yellow-400'>Edit</Link>
                <button className='text-red-400' onClick={() => deleteMovie(m._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminMovies