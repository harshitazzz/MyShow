import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
  const [username, setUsername] = useState('')   // 🔧 changed from name → username
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      // 🔧 send 'username' not 'name'
      await signup({ username, email: email.trim().toLowerCase(), password })
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-login-gradient">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-gray-300/10 rounded-xl p-8">
        <div className="flex flex-col items-center gap-4 mb-6">
          <img src={assets.logomy} alt="logo" className="w-28 h-auto"/>
          <h1 className="text-2xl font-semibold text-white">Sign up</h1>
          <p className="text-sm text-gray-300">Create an account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            required
            value={username}                         // 🔧 changed
            onChange={(e)=>setUsername(e.target.value)} // 🔧 changed
            placeholder="Username"                   // 🔧 changed
            className="px-4 py-3 rounded-md bg-white/5 border border-gray-300/10 text-white placeholder-gray-400"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"
            className="px-4 py-3 rounded-md bg-white/5 border border-gray-300/10 text-white placeholder-gray-400"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password"
            className="px-4 py-3 rounded-md bg-white/5 border border-gray-300/10 text-white placeholder-gray-400"
          />

          {error && <div className="text-sm text-red-400">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 px-4 py-3 bg-primary hover:bg-primary-dull rounded-full text-white font-medium"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>

          <div className="text-center text-sm text-gray-300">
            Already have an account? <Link to="/login" className="text-white underline">Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup