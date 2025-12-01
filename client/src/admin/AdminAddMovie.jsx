import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AdminAddMovie = () => {
  const [form, setForm] = useState({
    movieName: "",
    trailerUrl: "",
    imageUrl: "",
    imdbRating: "",
    genre: "",
    releaseYear: ""
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('adminToken')
      if (!token) return toast.error("Not authenticated")

      const payload = { ...form }
      if (payload.imdbRating) payload.imdbRating = Number(payload.imdbRating)
      if (payload.releaseYear) payload.releaseYear = Number(payload.releaseYear)

      const res = await axios.post('http://localhost:8080/admin/movies/add', payload, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.data.success) {
        toast.success("Movie Added Successfully!")
        setForm({
          movieName: "",
          trailerUrl: "",
          imageUrl: "",
          imdbRating: "",
          genre: "",
          releaseYear: ""
        })
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      console.error(err)
      const msg = err.response?.data?.message || "Failed to add movie"
      toast.error(msg)
    }
  }

  return (
    <div className='max-w-xl'>
      <h1 className='text-2xl mb-4 font-bold'>Add New Movie</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input value={form.movieName} onChange={(e) => setForm({ ...form, movieName: e.target.value })} placeholder="Movie Name" className='p-3 bg-gray-800 rounded' />
        <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="Image URL" className='p-3 bg-gray-800 rounded' />
        <input value={form.trailerUrl} onChange={(e) => setForm({ ...form, trailerUrl: e.target.value })} placeholder="Trailer URL" className='p-3 bg-gray-800 rounded' />
        <input value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} placeholder="Genre" className='p-3 bg-gray-800 rounded' />
        <input type="number" value={form.imdbRating} onChange={(e) => setForm({ ...form, imdbRating: e.target.value })} placeholder="IMDb Rating (0-10)" className='p-3 bg-gray-800 rounded' />
        <input type="number" value={form.releaseYear} onChange={(e) => setForm({ ...form, releaseYear: e.target.value })} placeholder="Release Year" className='p-3 bg-gray-800 rounded' />

        <button className='bg-red-600 py-2 rounded'>Submit</button>
      </form>
    </div>
  )
}

export default AdminAddMovie