import React from 'react'
import { Link } from 'react-router-dom'
import { serviceData } from '../assets/assets'
import { HiOutlineArrowRight } from 'react-icons/hi'

const ZenCard = ({ name, image, desc, speciality }) => (
  <Link
    to={`/doctors/${speciality}`}
    onClick={() => scrollTo(0, 0)}
    className='group flex flex-col items-center bg-white rounded-3xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer'
  >
    {/* Large rounded image area */}
    <div className='w-full aspect-square bg-surface-2 flex items-center justify-center p-8 rounded-3xl overflow-hidden'>
      <img
        src={image}
        alt={name}
        className='w-full h-full object-contain group-hover:scale-105 transition-transform duration-500'
        loading='lazy'
      />
    </div>

    {/* Name + desc below */}
    <div className='w-full px-5 py-4 text-center'>
      <p className='font-semibold text-text-primary text-base leading-tight'>{name}</p>
      <p className='text-xs text-text-muted mt-1 leading-relaxed'>{desc}</p>
      <span className='inline-flex items-center gap-1 text-xs font-medium text-primary mt-3 group-hover:gap-2 transition-all'>
        Find Practitioners <HiOutlineArrowRight className='w-3 h-3' />
      </span>
    </div>
  </Link>
)

const Services = () => (
  <div className='page'>
    <nav className='text-xs text-text-muted mb-6 flex items-center gap-2'>
      <Link to='/' className='hover:text-primary transition-colors'>Home</Link>
      <span>/</span>
      <span className='text-text-secondary'>Services</span>
    </nav>

    <div className='text-center mb-12'>
      <p className='section-label mb-2'>What We Offer</p>
      <h1 className='text-4xl font-bold text-text-primary'>Our Services</h1>
      <p className='mt-4 text-text-secondary max-w-xl mx-auto'>
        Comprehensive natural healthcare services delivered by certified practitioners — from ancient Ayurveda to modern physiotherapy.
      </p>
    </div>

    {/* Zen Cards Grid */}
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-16'>
      {serviceData.map(s => <ZenCard key={s.speciality} {...s} />)}
    </div>

    {/* CTA */}
    <div className='hero-gradient rounded-2xl p-10 text-center text-white'>
      <h2 className='text-2xl font-bold mb-3'>Not Sure Which Service You Need?</h2>
      <p className='text-white/70 mb-6 max-w-md mx-auto text-sm'>
        Browse all our certified practitioners and read their profiles to find the best match for your health goals.
      </p>
      <Link
        to='/doctors'
        className='inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg text-sm hover:bg-gray-100 transition-colors'
      >
        Browse All Practitioners <HiOutlineArrowRight className='w-4 h-4' />
      </Link>
    </div>
  </div>
)

export default Services
