import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { assets } from '../assets/assets'
import { MenuIcon, SearchIcon, XIcon, ChevronDown } from 'lucide-react'
import ProfileMenu from './ProfileMenu'
import { useAuth } from '../context/AuthContext'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user } = useAuth()

  const location = useLocation()
  const isHome = location.pathname === "/"   // <-- detect home page

  return (
    <div
      className={`
        fixed top-0 left-0 z-50 w-full flex items-center justify-between
        px-5 md:px-16 lg:px-36 py-3 transition-all duration-300

        ${isHome 
            ? "bg-transparent backdrop-blur-0"  // Home page = transparent
            : "bg-gray-900 backdrop-blur"}      // Other pages = blurred bg
      `}
    >
      <Link to='/' className='max:md:flex-1'>
        <img src={assets.logomy} alt="" className='w-30 relative left-[-50px] h-auto'/>
      </Link>

      <div className={`
        max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg 
        z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 
        min-md:px-8 py-3 max-md:h-screen min-md:rounded-full 
        backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 
        overflow-hidden transition-[width] duration-300

        ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}
      `}>
        <XIcon 
          className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' 
          onClick={() => setIsOpen(!isOpen)} 
        />
        <Link onClick={() => {scrollTo(0,0); setIsOpen(false)}} to='/'>Home</Link>
        <Link onClick={() => {scrollTo(0,0); setIsOpen(false)}} to='/movies'>Movies</Link>
        <Link onClick={() => {scrollTo(0,0); setIsOpen(false)}} to='/theatres'>Theaters</Link>
        <Link onClick={() => {scrollTo(0,0); setIsOpen(false)}} to=''>Releases</Link>
        <Link onClick={() => {scrollTo(0,0); setIsOpen(false)}} to='/favourites'>Favourites</Link>
      </div>

      <div className='flex gap-4 items-center relative'>
        <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer'/>

        {user ? (
          <div className="relative flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="flex items-center gap-2 px-2 py-1 rounded-full focus:outline-none"
              aria-label="User menu"
            >
              <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-black uppercase font-medium overflow-hidden transition-transform duration-150 hover:scale-105">
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="w-full h-full object-cover"/>
                ) : (
                  user.name ? user.name.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U')
                )}
              </div>

              <ChevronDown
                className={`w-4 h-4 text-white transition-transform duration-200 ${menuOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>

            {menuOpen && <ProfileMenu onClose={() => setMenuOpen(false)} />}
          </div>
        ) : (
          <Link
            to='/login'
            onClick={() => { scrollTo(0,0); setIsOpen(false); }}
            className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'
          >
            Login
          </Link>
        )}
      </div>

      <MenuIcon 
        className='max:md:ml-4 md:hidden w-8 h-8 cursor-pointer' 
        onClick={() => setIsOpen(!isOpen)} 
      />
    </div>
  )
}

export default NavBar