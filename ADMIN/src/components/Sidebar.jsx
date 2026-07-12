import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import {
  HiOutlineHome, HiOutlineCalendar, HiOutlinePlusCircle,
  HiOutlineUserGroup, HiOutlineUser, HiOutlineMail
} from 'react-icons/hi'

const ADMIN_LINKS = [
  { to: '/admin-dashboard', label: 'Dashboard', icon: HiOutlineHome },
  { to: '/appointments', label: 'Appointments', icon: HiOutlineCalendar },
  { to: '/add-doctor', label: 'Add Practitioner', icon: HiOutlinePlusCircle },
  { to: '/doctor-list', label: 'Practitioners', icon: HiOutlineUserGroup },
  { to: '/contact-requests', label: 'Support Requests', icon: HiOutlineMail },
]

const DOCTOR_LINKS = [
  { to: '/doctor-dashboard', label: 'Dashboard', icon: HiOutlineHome },
  { to: '/doctor-appointments', label: 'Appointments', icon: HiOutlineCalendar },
  { to: '/doctor-profile', label: 'My Profile', icon: HiOutlineUser },
]

const SidebarLink = ({ to, label, icon: Icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface-3 hover:text-text-primary'
      }`
    }
  >
    <Icon className='w-5 h-5 flex-shrink-0' />
    <span className='hidden md:block'>{label}</span>
  </NavLink>
)

const Sidebar = () => {
  const { adminToken } = useContext(AdminContext)
  const { docToken } = useContext(DoctorContext)
  const links = adminToken
  ? ADMIN_LINKS
  : docToken
  ? DOCTOR_LINKS
  : [];

  return (
    <aside className='w-14 md:w-56 min-h-[calc(100vh-64px)] bg-white border-r border-border flex-shrink-0'>
      <nav className='p-2 md:p-3 flex flex-col gap-0.5 pt-4'>
        {links.map(link => <SidebarLink key={link.to} {...link} />)}
      </nav>
    </aside>
  )
}

export default Sidebar
