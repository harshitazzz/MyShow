import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AdminAddMovie = () => {
  const [form, setForm] = useState({
    title: "",
    image: "",
    genre: "",
    rating: "",
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:8080/admin/movies', form)
    toast.success("Movie Added")
    navigate('/admin/movies')
  }

  return (
    <div className='max-w-xl'>
      <h1 className='text-2xl mb-4 font-bold'>Add New Movie</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {Object.keys(form).map(key => (
          <input
            key={key}
            value={form[key]}
            placeholder={key}
            onChange={(e) => setForm({...form, [key]: e.target.value})}
            className='p-3 bg-gray-800 rounded'
          />
        ))}

        <button className='bg-red-600 py-2 rounded'>Submit</button>
      </form>
    </div>
  )
}

export default AdminAddMovie