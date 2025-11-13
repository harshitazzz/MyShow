import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProfileMenu = ({ onClose }) => {
  const { user, signout } = useAuth()
  const navigate = useNavigate()
  const ref = useRef(null)

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [onClose])

  return (
    <div ref={ref} className="absolute right-0 mt-2 w-56 z-50">
      <div className="absolute -top-1 right-4 w-3 h-3 bg-[#0b0b0b]/90 border border-gray-800 transform rotate-45"></div>

      <div className="bg-[#0b0b0b]/90 border border-gray-800 rounded-lg shadow-lg py-3 backdrop-blur-md transform transition duration-150 ease-out">
        <div className="px-4 pb-2 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-black font-medium overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" className="w-full h-full object-cover"/>
              ) : (
                <span className="text-lg">
                  {user?.name ? user.name.charAt(0).toUpperCase() : (user?.email ? user.email.charAt(0).toUpperCase() : 'U')}
                </span>
              )}
            </div>
            <div className="text-sm">
              <div className="text-white font-medium">{user?.username || 'User'}</div>
              <div className="text-gray-400 text-xs truncate">{user?.email}</div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 flex flex-col gap-2">
          {/* <button
            onClick={() => { onClose(); navigate('/profile') }}
            className="text-left text-sm text-gray-200 hover:text-white"
          >
            View profile
          </button> */}
          <button
            onClick={() => {
                    signout()
                    navigate('/login')
                }}
            className="mt-2 w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileMenu;