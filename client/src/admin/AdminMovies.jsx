import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const AdminMovies = () => {
  const [movies, setMovies] = useState([])

  const fetchMovies = async () => {
    const token = localStorage.getItem('adminToken')
    if (!token) return

    try {
      const res = await axios.get('http://localhost:8080/admin/movies', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMovies(res.data.movies)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteMovie = async (id) => {
    const token = localStorage.getItem('adminToken')
    if (!token) return toast.error("Not authenticated")

    try {
      await axios.delete(`http://localhost:8080/admin/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success("Movie deleted")
      fetchMovies()
    } catch (err) {
      toast.error("Delete failed")
    }
  }

  useEffect(() => { fetchMovies() }, [])

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>All Movies</h1>

      <table className='w-full bg-gray-800 rounded'>
        <thead>
          <tr className='text-left bg-gray-700'>
            <th className='p-3'>Image</th>
            <th className='p-3'>Trailer</th>
            <th className='p-3'>Movie-Name</th>
            <th className='p-3'>Genre</th>
            <th className='p-3'>Actions</th>
          </tr>
        </thead>

        <tbody>
          {movies.map(m => (
            <tr key={m._id} className='border-b border-gray-700'>
              <td><img src={m.imageUrl} className='h-20 w-16 object-cover' /></td>
              <td className="p-3 text-xs text-blue-400 underline">
  <a href={m.trailerUrl} target="_blank" rel="noopener noreferrer">
    Watch Trailer
  </a>
</td>
              <td className='p-3'>{m.movieName}</td>
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