import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const AdminEditMovie = () => {
  const { id } = useParams()
  const [form, setForm] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8080/admin/movies/${id}`)
      .then(res => setForm(res.data.movie))
  }, [id])

  const updateMovie = async (e) => {
    e.preventDefault()
    await axios.put(`http://localhost:8080/admin/movies/${id}`, form)
    toast.success("Movie Updated")
    navigate('/admin/movies')
  }

  return (
    <div className='max-w-xl'>
      <h1 className='text-2xl mb-4 font-bold'>Edit Movie</h1>
      <form className='flex flex-col gap-4' onSubmit={updateMovie}>
        {Object.keys(form).map(key => (
          <input
            key={key}
            value={form[key]}
            placeholder={key}
            onChange={(e) => setForm({...form, [key]: e.target.value})}
            className='p-3 bg-gray-800 rounded'
          />
        ))}

        <button className='bg-red-600 py-2 rounded'>Update</button>
      </form>
    </div>
  )
}

export default AdminEditMovie