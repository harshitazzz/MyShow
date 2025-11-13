import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const rawUser = localStorage.getItem('user')
    const rawToken = localStorage.getItem('token')
    if (rawUser && rawToken) {
      try {
        setUser(JSON.parse(rawUser))
        setToken(rawToken)
      } catch {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    }
  }, [])

  const signinLocal = (userObj, jwt) => {
    localStorage.setItem('user', JSON.stringify(userObj))
    localStorage.setItem('token', jwt)
    setUser(userObj)
    setToken(jwt)
  }

  const signout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
  }

  // helper that calls backend login endpoint and signs in on success
  const login = async ({ email, password }) => {
    const res = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Login failed')
    signinLocal(data.user, data.token)
    return data
  }

  // helper that calls backend signup endpoint and signs in on success
  const signup = async ({ username, email, password }) => {
    const res = await fetch('http://localhost:8080/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Signup failed')
    signinLocal(data.user, data.token)
    return data
  }

  return (
    <AuthContext.Provider value={{ user, token, login, signup, signout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (ctx === undefined || ctx === null) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}