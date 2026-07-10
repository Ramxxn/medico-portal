import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { HiOutlineArrowRight } from 'react-icons/hi'

const slides = [
  {
    title: 'Natural Healing, Modern Access',
    desc: 'Connect with certified Ayurveda, naturopathy, and holistic practitioners. Book appointments in minutes.',
    img: assets.header_img1,
    badge: 'Trusted by 10,000+ patients',
  },
  {
    title: 'Your Wellness Journey Starts Here',
    desc: 'Explore verified bio-remedy experts tailored to your health goals and lifestyle.',
    img: assets.header_img2,
    badge: '500+ certified practitioners',
  },
  {
    title: 'Holistic Care, Simplified',
    desc: 'From Ayurveda to homeopathy — find the right specialist and schedule with ease.',
    img: assets.header_img3,
    badge: 'Online & offline consultations',
  },
]

const Header = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className='relative overflow-hidden rounded-2xl hero-gradient' aria-label='Hero'>
      <div
        className='flex transition-transform duration-700 ease-in-out'
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className='min-w-full flex flex-col md:flex-row items-center px-8 md:px-14 lg:px-20 py-12 md:py-0 gap-8'>
            {/* Left */}
            <div className='md:w-1/2 flex flex-col gap-5 text-white py-10 md:py-20'>
              <span className='inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 text-xs font-medium px-3.5 py-1.5 rounded-full w-fit border border-white/20'>
                <span className='w-1.5 h-1.5 bg-secondary rounded-full'></span>
                {slide.badge}
              </span>
              <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight'>
                {slide.title}
              </h1>
              <p className='text-white/70 text-base leading-relaxed max-w-md'>
                {slide.desc}
              </p>
              <div className='flex flex-wrap gap-3 mt-1'>
                <a href='#speciality' className='inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg text-sm hover:bg-gray-100 transition-colors'>
                  Book Appointment <HiOutlineArrowRight className='w-4 h-4' />
                </a>
                <a href='/doctors' className='inline-flex items-center gap-2 border border-white/30 text-white font-medium px-6 py-3 rounded-lg text-sm hover:bg-white/10 transition-colors'>
                  Browse Practitioners
                </a>
              </div>
              <div className='flex items-center gap-3 mt-1'>
                <img className='w-20' src={assets.group_profiles} alt='Patients' />
                <p className='text-white/60 text-sm'>Join thousands who trust ICRB</p>
              </div>
            </div>

            {/* Right */}
            <div className='md:w-1/2 flex justify-center md:justify-end'>
              <img
                className='w-full max-w-xs md:max-w-md h-auto object-contain md:self-end'
                src={slide.img}
                alt={slide.title}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className='absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5'>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/35'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Header
