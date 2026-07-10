import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'

export const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const { setAdminToken, backendUrl } = useContext(AdminContext)
  const { setDocToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const onSubmitHandler = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) { localStorage.setItem('adminToken', data.token); setAdminToken(data.token); navigate('/admin-dashboard') }
        else toast.error(data.message)
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) { localStorage.setItem('docToken', data.token); setDocToken(data.token); navigate('/doctor-dashboard') }
        else toast.error(data.message)
      }
    } catch (error) { toast.error(error.message) }
    finally { setLoading(false) }
  }

  return (
    <div className='min-h-screen bg-surface-2 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <img src={assets.admin_logo} alt='ICRB' className='h-12 w-auto mx-auto mb-4' />
          <h1 className='text-2xl font-bold text-text-primary'>ICRB Staff Portal</h1>
          <p className='text-text-secondary text-sm mt-1'>Sign in to manage your dashboard</p>
        </div>

        {/* Role Toggle */}
        <div className='flex bg-surface-3 rounded-xl p-1 mb-6'>
          {['Admin', 'Doctor'].map(role => (
            <button key={role} onClick={() => setState(role)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                state === role ? 'bg-white text-primary shadow-card' : 'text-text-muted hover:text-text-secondary'
              }`}>
              {role === 'Admin' ? 'Administrator' : 'Doctor'}
            </button>
          ))}
        </div>

        <div className='card p-8'>
          <form onSubmit={onSubmitHandler} className='space-y-4'>
            <div>
              <label className='label'>Email Address</label>
              <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='your@email.com' required className='input' />
            </div>
            <div>
              <label className='label'>Password</label>
              <div className='relative'>
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter your password' required className='input pr-10' />
                <button type='button' onClick={() => setShowPass(p => !p)} className='absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary'>
                  {showPass ? <HiOutlineEyeOff className='w-4 h-4' /> : <HiOutlineEye className='w-4 h-4' />}
                </button>
              </div>
            </div>
            <button type='submit' disabled={loading} className='btn-primary w-full mt-2'>
              {loading ? 'Signing in...' : `Sign in as ${state}`}
            </button>
          </form>
        </div>
        <p className='text-center text-xs text-text-muted mt-4'>ICRB Bio Remedies · Staff Access Only</p>
      </div>
    </div>
  )
}
