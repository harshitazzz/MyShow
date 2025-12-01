import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'

const AdminSignup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const signupAdmin = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post('http://localhost:8080/admin/signup', {
                username,
                email,
                password
            })

            if (res.data.success) {
                toast.success('Admin Signed Up! Please Login.')
                navigate('/admin/login')
            } else toast.error(res.data.message)
        } catch (err) {
            toast.error('Signup failed')
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-900 text-white'>
            <form className='bg-gray-800 p-8 w-96 rounded' onSubmit={signupAdmin}>
                <h2 className='text-2xl mb-4 text-center'>Admin Signup</h2>

                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"
                    className='w-full p-3 bg-gray-700 rounded mb-3' />

                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                    className='w-full p-3 bg-gray-700 rounded mb-3' />

                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                    className='w-full p-3 bg-gray-700 rounded mb-3' />

                <button className='w-full bg-red-600 py-2 rounded mt-2'>Signup</button>

                <p className='mt-4 text-center text-gray-400'>
                    Already have an account? <Link to="/admin/login" className='text-red-500'>Login</Link>
                </p>
            </form>
        </div>
    )
}

export default AdminSignup
