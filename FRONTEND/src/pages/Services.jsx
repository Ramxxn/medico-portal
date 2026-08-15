import React from 'react'
import { Link } from 'react-router-dom'
import { serviceCatalog } from '../data/serviceContent'
import { HiOutlineArrowRight } from 'react-icons/hi'

const Services = () => (
  <div className='page'>
    <nav className='mb-6 flex items-center gap-2 text-xs text-tx-3'>
      <Link to='/' className='hover:text-primary transition-colors'>Home</Link>
      <span>/</span>
      <span className='text-tx-2'>Services</span>
    </nav>

    <div className='text-center mb-10'>
      <p className='section-label mb-2'>What We Offer</p>
      <h1 className='text-3xl md:text-4xl font-semibold text-tx-1'>Care pathways designed to feel grounded-lg and modern</h1>
      <p className='mt-4 text-sm md:text-base text-tx-2 max-w-2xl mx-auto'>Explore our specialized services and discover a professional, welcoming path to support your health and wellbeing.</p>
    </div>

    <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3 mb-12'>
      {serviceCatalog.map((service) => (
        <Link key={service.slug} to={`/services/${service.slug}`} className='group overflow-hidden rounded-lg border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover'>
          <div className='overflow-hidden'>
            <img src={service.image} alt={service.title} className='h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105' loading='lazy' />
          </div>
          <div className='p-6'>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-primary'>{service.speciality}</p>
            <h2 className='mt-2 text-xl font-semibold text-tx-1'>{service.title}</h2>
            <p className='mt-3 text-sm leading-7 text-tx-2'>{service.tagline}</p>
            <div className='mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary'>Learn more <HiOutlineArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-1' /></div>
          </div>
        </Link>
      ))}
    </div>

    <div className='rounded-lg border border-border bg-surface-2 p-8 text-center'>
      <h2 className='text-2xl font-semibold text-tx-1'>Need help choosing a service?</h2>
      <p className='mt-3 text-sm text-tx-2 max-w-lg mx-auto'>Browse practitioners by speciality and book a consultation that matches your current health needs.</p>
      <Link to='/doctors' className='mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white'>Browse all practitioners <HiOutlineArrowRight className='w-4 h-4' /></Link>
    </div>
  </div>
)

export default Services
