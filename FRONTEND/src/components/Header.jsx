import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineArrowRight, HiOutlineSearch } from 'react-icons/hi'

const slides = [
  {
    title: 'Premium care that feels calm, clear, and personal.',
    desc: 'Book trusted consultations across Ayurveda, physiotherapy, psychology, pediatrics, and more.',
    image: '/images/heroSection/hero-1.jpg',
    badge: 'Modern healthcare, grounded in expertise',
  },
  {
    title: 'Find the right specialist without the stress.',
    desc: 'Explore verified practitioners and schedule appointments with confidence in minutes.',
    image: '/images/heroSection/hero-2.jpg',
    badge: 'Trusted by patients across every specialty',
  },
  {
    title: 'Support for recovery, prevention, and everyday wellbeing.',
    desc: 'From natural therapies to evidence-led rehabilitation, we help you take the next step with clarity.',
    image: '/images/heroSection/hero-3.jpg',
    badge: 'Flexible advice for modern wellness needs',
  },
  {
    title: 'A thoughtful clinic experience from first click to follow-up.',
    desc: 'Search services, compare practitioners, and book appointments in a streamlined experience.',
    image: '/images/heroSection/hero-4.jpg',
    badge: 'A confident, accessible path to care',
  },
]

const Header = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className='relative overflow-hidden rounded border border-border bg-white shadow-card' aria-label='Hero'>
      <div className='relative min-h-[560px] overflow-hidden'>
        {slides.map((slide, i) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <img src={slide.image} alt={slide.title} className='h-full w-full object-cover' loading={i === 0 ? 'eager' : 'lazy'} />
            <div className='absolute inset-0 bg-black/45' />
            <div className='absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
              <div className='w-full max-w-6xl rounded border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md sm:p-8 lg:p-10'>
                <div className='grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center'>
                  <div className='text-white'>
                    <span className='inline-flex items-center rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]'>ICBR</span>
                    <h1 className='mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl'>{slide.title}</h1>
                    <p className='mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base'>{slide.desc}</p>
                    <div className='mt-6 flex flex-wrap gap-3'>
                      <Link to='/doctors' className='inline-flex items-center gap-2 rounded bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dk'>Book appointment <HiOutlineArrowRight className='w-4 h-4' /></Link>
                      <Link to='/services' className='inline-flex items-center gap-2 rounded border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/20'>Explore services</Link>
                    </div>
                  </div>
                  <div className='rounded border border-white/20 bg-white/90 p-4 text-tx-1 shadow-lg'>
                    <div className='rounded border border-border bg-white p-4'>
                      <div className='flex items-center gap-2 rounded border border-border bg-surface-2 px-3 py-3'>
                        <HiOutlineSearch className='w-4 h-4 text-tx-3' />
                        <Link to='/doctors' className='text-sm text-tx-3'>Search practitioners, services, or wellness needs</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='absolute bottom-28 left-1/2 flex -translate-x-1/2 gap-1.5 rounded border border-white/20 bg-black/20 px-3 py-2 backdrop-blur-sm'>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/60'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Header
