import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

    const { adminToken, setAdminToken } = useContext(AdminContext)
    const {docToken, setDocToken} = useContext(DoctorContext)

    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        adminToken && setAdminToken('')
        adminToken && localStorage.removeItem('adminToken')
        docToken && setDocToken('')
        docToken && localStorage.removeItem('docToken')
    }
    
    return (
        <div className="w-full bg-white shadow-md border border-gray-300 py-2 px-4 gap-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <img src={assets.admin_logo} alt="" className="h-16 w-auto" />
                <p className="text-sm md:text-lg rounded bg-slate-100 px-3 py-2 font-medium text-gray-700"> {adminToken ? 'Admin' : 'Doctor'} / Dashboard </p>
            </div>
            <button onClick={logout} className="bg-red-600 text-white px-4 py-1 rounded hover:scale-105 transition">
                Logout
            </button>
        </div>
    )
}

export default Navbar
