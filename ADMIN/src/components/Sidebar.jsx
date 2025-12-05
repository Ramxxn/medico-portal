import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
    const { adminToken } = useContext(AdminContext)
    const { docToken } = useContext(DoctorContext)
    const [open, setOpen] = useState(true)

    return (
        <div className={`md:min-w-${open ? '64' : '24'} min-h-screen bg-white border border-r-gray-300 transition-all duration-300`}>

            {adminToken &&
                <ul className="flex flex-col gap-4 md:mt-0">
                    <NavLink to="/admin-dashboard" onClick={() => setOpen(!open)} className={({ isActive }) => `flex items-center justify-start gap-3 px-3 py-4 text-gray-700 cursor-pointer ${isActive ? 'bg-blue-50 border-r-4 border-primary' : ''}`}>
                        <img src={assets.menu_icon} className="w-8 h-8" />
                        {/* <img src={assets.home_icon} className="w-6 h-6" /> */}
                        {open && <p className="hidden md:block">Dashboard</p>}
                    </NavLink>
                    <NavLink to="/all-allappointments" className={({ isActive }) => `flex items-center justify-start gap-3 px-3 py-4 text-gray-700 cursor-pointer ${isActive ? 'bg-blue-50 border-r-4 border-primary' : ''}`}>
                        <img src={assets.appointment_icon} className="w-6 h-6" />
                        {open && <p className="hidden md:block">Appointments</p>}
                    </NavLink>
                    <NavLink to="/add-doctor" className={({ isActive }) => `flex items-center justify-start gap-3 px-3 py-4 text-gray-700 cursor-pointer ${isActive ? 'bg-blue-50 border-r-4 border-primary' : ''}`}>
                        <img src={assets.add_icon} className="w-6 h-6" />
                        {open && <p className="hidden md:block">Add Doctor</p>}
                    </NavLink>
                    <NavLink to="/doctor-list" className={({ isActive }) => `flex items-center justify-start gap-3 px-3 py-4 text-gray-700 cursor-pointer ${isActive ? 'bg-blue-50 border-r-4 border-primary' : ''}`}>
                        <img src={assets.people_icon} className="w-6 h-6" />
                        {open && <p className="hidden md:block">Doctor List</p>}
                    </NavLink>
                </ul>
            }

            {docToken &&
                <ul className="flex flex-col gap-4 md:mt-0">
                    <NavLink to="/doctor-dashboard" onClick={() => setOpen(!open)} className={({ isActive }) => `flex justify-start items-center gap-3 px-3 py-3 text-gray-700 cursor-pointer ${isActive ? 'bg-blue-50 border-r-4 border-primary' : ''}`}>
                    <img src={assets.menu_icon} className="w-8 h-8" />
                    {open && <p className="hidden md:block">Dashboard</p>}</NavLink>
                    <NavLink to="/doctor-appointments" className={({ isActive }) => `flex justify-start items-center gap-3 px-3 py-4 text-gray-700 cursor-pointer ${isActive ? 'bg-blue-50 border-r-4 border-primary' : ''}`}><img src={assets.appointment_icon} className="w-6 h-6" />{open && <p className="hidden md:block">Appointments</p>}</NavLink>
                    <NavLink to="/doctor-profile" className={({ isActive }) => `flex justify-start items-center gap-3 px-3 py-4 text-gray-700 cursor-pointer ${isActive ? 'bg-blue-50 border-r-4 border-primary' : ''}`}><img src={assets.add_icon} className="w-6 h-6" />{open && <p className="hidden md:block">Profile</p>}</NavLink>
                </ul>
            }
        </div>
    )
}

export default Sidebar
