import React, { useState } from 'react'
import API from '../libs/api'
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const loginAdmin = async (e) => {
    e.preventDefault()

    try {
      const res = await API.post('/admin/login', {
        email,
        password
      })

      if (res.data.success) {
        localStorage.setItem('adminToken', res.data.token)
        toast.success('Admin Logged In')
        navigate('/admin')
      } else toast.error(res.data.message)
    } catch (err) {
      toast.error('Login failed')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 text-white'>
      <form className='bg-gray-800 p-8 w-96 rounded' onSubmit={loginAdmin}>
        <h2 className='text-2xl mb-4 text-center'>Admin Login</h2>

        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
          className='w-full p-3 bg-gray-700 rounded mb-3' />

        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
          className='w-full p-3 bg-gray-700 rounded mb-3' />

        <button className='w-full bg-red-600 py-2 rounded mt-2'>Login</button>

        <p className='mt-4 text-center text-gray-400'>
          New Admin? <Link to="/admin/signup" className='text-red-500'>Signup</Link>
        </p>
      </form>
    </div>
  )
}

export default AdminLogin