import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const onSubmitHandler = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const endpoint = state === 'Sign Up' ? '/api/user/register' : '/api/user/login'
      const payload = state === 'Sign Up' ? { name, password, email } : { password, email }
      const { data } = await axios.post(backendUrl + endpoint, payload)
      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (token) navigate('/') }, [token])

  return (
    <div className='min-h-[80vh] flex items-center justify-center py-12 page'>
      <div className='w-full max-w-md'>
        <div className='card p-8'>
          <div className='text-center mb-8'>
            <h1 className='text-2xl font-bold text-text-primary'>
              {state === 'Sign Up' ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className='text-text-secondary text-sm mt-2'>
              {state === 'Sign Up'
                ? 'Join ICRB to book appointments with certified practitioners'
                : 'Sign in to manage your appointments and profile'}
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className='space-y-4'>
            {state === 'Sign Up' && (
              <div>
                <label className='label'>Full Name</label>
                <input type='text' value={name} onChange={e => setName(e.target.value)} placeholder='Your full name' required className='input' />
              </div>
            )}
            <div>
              <label className='label'>Email Address</label>
              <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='your@email.com' required className='input' />
            </div>
            <div>
              <label className='label'>Password</label>
              <div className='relative'>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder='Minimum 8 characters'
                  required
                  className='input pr-10'
                />
                <button type='button' onClick={() => setShowPass(p => !p)} className='absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary'>
                  {showPass ? <HiOutlineEyeOff className='w-4 h-4' /> : <HiOutlineEye className='w-4 h-4' />}
                </button>
              </div>
            </div>
            <button type='submit' disabled={loading} className='btn-primary w-full mt-2'>
              {loading ? 'Please wait...' : state === 'Sign Up' ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className='mt-6 text-center'>
            {state === 'Sign Up'
              ? <p className='text-sm text-text-secondary'>Already have an account? <button onClick={() => setState('Login')} className='text-primary font-medium hover:underline'>Sign In</button></p>
              : <p className='text-sm text-text-secondary'>Don't have an account? <button onClick={() => setState('Sign Up')} className='text-primary font-medium hover:underline'>Create one</button></p>
            }
          </div>
        </div>
        <p className='text-center text-xs text-text-muted mt-4'>
          By continuing, you agree to our <Link to='/terms' className='text-primary hover:underline'>Terms</Link> and <Link to='/privacy-policy' className='text-primary hover:underline'>Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
