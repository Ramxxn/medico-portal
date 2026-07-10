import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { HiOutlineArrowRight } from 'react-icons/hi'

const Banner = () => {
  const navigate = useNavigate()
  return (
    <section className='my-16 rounded-2xl hero-gradient overflow-hidden'>
      <div className='flex flex-col md:flex-row items-center'>
        <div className='md:w-3/5 px-8 md:px-14 lg:px-20 py-14 md:py-16'>
          <p className='text-white/60 text-sm font-medium mb-3 uppercase tracking-wider'>Ready to start?</p>
          <h2 className='text-3xl md:text-4xl font-bold text-white leading-tight'>
            Book Appointments with<br />
            <span className='text-secondary'>Certified Bio-Remedy Experts</span>
          </h2>
          <p className='text-white/65 mt-4 text-sm leading-relaxed max-w-md'>
            Take the first step towards natural wellness. Our practitioners are verified, experienced, and ready to guide your healing journey.
          </p>
          <div className='flex flex-wrap gap-3 mt-8'>
            <button
              onClick={() => { navigate('/login'); scrollTo(0, 0) }}
              className='inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg text-sm hover:bg-gray-100 transition-colors'
            >
              Create Free Account <HiOutlineArrowRight className='w-4 h-4' />
            </button>
            <button
              onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
              className='border border-white/30 text-white font-medium px-6 py-3 rounded-lg text-sm hover:bg-white/10 transition-colors'
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
