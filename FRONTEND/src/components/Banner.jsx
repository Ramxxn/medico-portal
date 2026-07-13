import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { HiOutlineArrowRight } from 'react-icons/hi'

const Banner = () => {
  const navigate = useNavigate()
  return (
    <section className='my-16 overflow-hidden rounded border border-border bg-white shadow-card'>
      <div className='flex flex-col md:flex-row items-center'>
        <div className='md:w-3/5 px-8 md:px-14 lg:px-20 py-14 md:py-16'>
          <p className='text-primary text-sm font-semibold mb-3 uppercase tracking-[0.24em]'>Ready to start?</p>
          <h2 className='text-3xl md:text-4xl font-semibold text-tx-1 leading-tight'>
            Book with trusted clinicians who make care feel calm and clear.
          </h2>
          <p className='text-tx-2 mt-4 text-sm leading-7 max-w-md'>
            Begin your next appointment with a professional team that values clarity, privacy, and a more thoughtful wellness experience.
          </p>
          <div className='flex flex-wrap gap-3 mt-8'>
            <button
              onClick={() => { navigate('/login'); scrollTo(0, 0) }}
              className='inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded text-sm hover:bg-primary-dk transition-colors'
            >
              Create Free Account <HiOutlineArrowRight className='w-4 h-4' />
            </button>
            <button
              onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
              className='border border-primary text-primary font-medium px-6 py-3 rounded text-sm hover:bg-surface-2 transition-colors'
            >
              Browse Practitioners
            </button>
          </div>
        </div>
        <div className='md:w-2/5 flex justify-center md:justify-end relative h-48 md:h-auto'>
          <img className='w-full max-w-xs md:max-w-sm object-contain md:absolute md:bottom-0' src={assets.appointment_img} alt='Book appointment' />
        </div>
      </div>
    </section>
  )
}

export default Banner
