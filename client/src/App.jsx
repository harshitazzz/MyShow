import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import NavBar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Movies from './pages/Movies'
import Favourite from './pages/Favourite'

// ⭐ ADMIN PAGES
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import AdminMovies from './admin/AdminMovies'
import AdminAddMovie from './admin/AdminAddMovie'
import AdminEditMovie from './admin/AdminEditMovie'
import AdminLayout from './admin/AdminLayout'

// ⭐ AUTH CONTEXT
import { AuthProvider } from './context/AuthContext'

const Inner = () => {
  const pathname = useLocation().pathname

  const hideNav =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname.startsWith('/admin')

  return (
    <>
      <Toaster />
      {!hideNav && <NavBar />}

      <Routes>
        {/* USER ROUTES */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/movies/:id/:date' element={<SeatLayout />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/favourite' element={<Favourite />} />

        {/* ADMIN ROUTES */}
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path='movies' element={<AdminMovies />} />
          <Route path='movies/add' element={<AdminAddMovie />} />
          <Route path='movies/edit/:id' element={<AdminEditMovie />} />
        </Route>
      </Routes>

      {!hideNav && <Footer />}
    </>
  )
}

const App = () => (
  <AuthProvider>
    <Inner />
  </AuthProvider>
)

export default App