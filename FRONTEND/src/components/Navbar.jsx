import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { AppContext } from '../context/AppContext'
import { HiOutlineMenu, HiOutlineX, HiOutlineChevronDown, HiOutlineUser, HiOutlineCalendar, HiOutlineLogout } from 'react-icons/hi'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/doctors', label: 'Find Practitioners' },
  { to: '/services', label: 'Services' },
  { to: '/articles', label: 'Articles' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const navigate = useNavigate()
  const { token, setToken, userData } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)

  const logout = () => { setToken(false); localStorage.removeItem('token') }

  return (
    <header className='sticky top-0 z-50 bg-white border-b border-border shadow-card'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <img onClick={() => navigate('/')} className='h-9 w-auto cursor-pointer' src={assets.logo} alt='ICRB' />

          <nav className='hidden lg:flex items-center gap-0.5'>
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive ? 'text-primary-dk bg-bg-card' : 'text-tx-3 hover:text-tx-1 hover:bg-surface-3'
                  }`
                }>{label}</NavLink>
            ))}
            <a href='http://localhost:5174/' className='ml-2 px-3.5 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-bg-card transition-colors'>
              Staff Panel
            </a>
          </nav>

          <div className='flex items-center gap-2'>
            {token && userData ? (
              <div className='relative group cursor-pointer'>
                <div className='flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-3 transition-colors'>
                  <img className='w-8 h-8 object-cover rounded-full ring-2 ring-border' src={userData.image} alt={userData.name} />
                  <HiOutlineChevronDown className='w-3.5 h-3.5 text-tx-4' />
                </div>
                <div className='hidden group-hover:block absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-dropdown border border-border py-1.5 z-50'>
                  <div className='px-4 py-2.5 border-b border-border'>
                    <p className='text-sm font-semibold text-tx-1 truncate'>{userData.name}</p>
                    <p className='text-xs text-tx-4 truncate'>{userData.email}</p>
                  </div>
                  <button onClick={() => navigate('/my-profile')} className='w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-tx-3 hover:bg-surface-3 hover:text-tx-1 transition-colors'>
                    <HiOutlineUser className='w-4 h-4' /> My Profile
                  </button>
                  <button onClick={() => navigate('/my-appointments')} className='w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-tx-3 hover:bg-surface-3 hover:text-tx-1 transition-colors'>
                    <HiOutlineCalendar className='w-4 h-4' /> My Appointments
                  </button>
                  <div className='border-t border-border mt-1 pt-1'>
                    <button onClick={logout} className='w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-error hover:bg-error-bg transition-colors'>
                      <HiOutlineLogout className='w-4 h-4' /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={() => navigate('/login')} className='hidden md:block btn-primary'>Sign In</button>
            )}
            <button onClick={() => setShowMenu(true)} className='lg:hidden p-2 rounded-lg text-tx-3 hover:bg-surface-3 transition-colors'>
              <HiOutlineMenu className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${showMenu ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity ${showMenu ? 'opacity-100' : 'opacity-0'}`} onClick={() => setShowMenu(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-72 bg-white shadow-dropdown transition-transform duration-300 ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='flex items-center justify-between px-5 py-4 border-b border-border'>
            <img className='h-8 w-auto' src={assets.logo} alt='ICRB' />
            <button onClick={() => setShowMenu(false)} className='p-2 rounded-lg hover:bg-surface-3'><HiOutlineX className='w-5 h-5 text-tx-3' /></button>
          </div>
          <nav className='px-3 py-4 flex flex-col gap-0.5'>
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to} onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive ? 'text-primary-dk bg-bg-card' : 'text-tx-3 hover:bg-surface-3 hover:text-tx-1'}`
                }>{label}</NavLink>
            ))}
            <a href='http://localhost:5174/' className='px-4 py-3 text-sm font-medium text-primary border border-primary rounded-lg mt-2 text-center'>Staff Panel</a>
            {!token && <button onClick={() => { navigate('/login'); setShowMenu(false) }} className='mt-2 btn-primary w-full'>Sign In</button>}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
