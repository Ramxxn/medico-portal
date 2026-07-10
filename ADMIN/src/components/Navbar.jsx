import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'
import { HiOutlineLogout, HiOutlineChevronDown } from 'react-icons/hi'

const Navbar = () => {
  const { adminToken, setAdminToken } = useContext(AdminContext)
  const { docToken, setDocToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    if (adminToken) { setAdminToken(''); localStorage.removeItem('adminToken') }
    if (docToken) { setDocToken(''); localStorage.removeItem('docToken') }
  }

  return (
    <header className='sticky top-0 z-50 bg-white border-b border-border shadow-card'>
      <div className='flex items-center justify-between px-5 h-16'>
        <div className='flex items-center gap-3'>
          <img src={assets.admin_logo} alt='ICRB Admin' className='h-9 w-auto' />
          <div className='hidden sm:block'>
            <p className='text-xs text-text-muted leading-none'>ICRB Platform</p>
            <p className='text-sm font-semibold text-text-primary leading-tight'>
              {adminToken ? 'Admin Panel' : 'Doctor Portal'}
            </p>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <span className='hidden sm:inline-flex items-center gap-1.5 badge-primary'>
            <span className='w-1.5 h-1.5 bg-primary rounded-full'></span>
            {adminToken ? 'Administrator' : 'Doctor'}
          </span>
          <button onClick={logout} className='flex items-center gap-2 btn-ghost text-error hover:bg-error-bg hover:text-error border border-border'>
            <HiOutlineLogout className='w-4 h-4' />
            <span className='hidden sm:inline'>Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
