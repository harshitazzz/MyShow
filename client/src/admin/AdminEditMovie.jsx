import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const AdminEditMovie = () => {
  const { id } = useParams()
  const [form, setForm] = useState({
    movieName: "",
    trailerUrl: "",
    imageUrl: "",
    imdbRating: "",
    genre: "",
    releaseYear: ""
  })
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) return navigate('/admin/login')

    axios.get(`http://localhost:8080/admin/movies/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const m = res.data.movie
        setForm({
          movieName: m.movieName || "",
          trailerUrl: m.trailerUrl || "",
          imageUrl: m.imageUrl || "",
          imdbRating: m.imdbRating || "",
          genre: m.genre || "",
          releaseYear: m.releaseYear || ""
        })
      })
      .catch(err => toast.error("Failed to fetch movie"))
  }, [id])

  const updateMovie = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('adminToken')
      if (!token) return toast.error("Not authenticated")

      const payload = { ...form }
      if (payload.imdbRating) payload.imdbRating = Number(payload.imdbRating)
      if (payload.releaseYear) payload.releaseYear = Number(payload.releaseYear)

      const res = await axios.put(`http://localhost:8080/admin/movies/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.data.success) {
        toast.success("Movie Updated")
        navigate('/admin/movies')
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      toast.error("Update failed")
    }
  }

  return (
    <div className='max-w-xl'>
      <h1 className='text-2xl mb-4 font-bold'>Edit Movie</h1>
      <form className='flex flex-col gap-4' onSubmit={updateMovie}>
        <input value={form.movieName} onChange={(e) => setForm({ ...form, movieName: e.target.value })} placeholder="Movie Name" className='p-3 bg-gray-800 rounded' />
        <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="Image URL" className='p-3 bg-gray-800 rounded' />
        <input value={form.trailerUrl} onChange={(e) => setForm({ ...form, trailerUrl: e.target.value })} placeholder="Trailer URL" className='p-3 bg-gray-800 rounded' />
        <input value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} placeholder="Genre" className='p-3 bg-gray-800 rounded' />
        <input type="number" value={form.imdbRating} onChange={(e) => setForm({ ...form, imdbRating: e.target.value })} placeholder="IMDb Rating (0-10)" className='p-3 bg-gray-800 rounded' />
        <input type="number" value={form.releaseYear} onChange={(e) => setForm({ ...form, releaseYear: e.target.value })} placeholder="Release Year" className='p-3 bg-gray-800 rounded' />

        <button className='bg-red-600 py-2 rounded'>Update</button>
      </form>
    </div>
  )
}

export default AdminEditMovie