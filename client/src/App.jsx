import React from 'react'
import NavBar from './components/Navbar'
import {Route, Routes, useLocation} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favourite from './pages/Favourite'
import {Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
const App = () => {
  const pathname = useLocation().pathname;
  const isAdminRoute = pathname === '/login' || pathname === '/signup' || pathname.startsWith('/admin')
  return (
    <>
      <Toaster/>
      {!isAdminRoute && <NavBar/>}
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/movies/:id' element={<MovieDetails/>}/>
        <Route path='/movies/:id/:date' element={<SeatLayout/>}/>
        <Route path='/my-bookings' element={<MyBookings/>}/>
        <Route path='/favourite' element={<Favourite/>}/>
      </Routes>
      {!isAdminRoute && <Footer/>}
    </>
  )
}

export default App
