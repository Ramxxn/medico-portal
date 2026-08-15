import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineArrowRight } from 'react-icons/hi'

const Articles = () => (
  <div className='page'>
    <nav className='mb-6 flex items-center gap-2 text-xs text-tx-3'>
      <Link to='/' className='hover:text-primary transition-colors'>Home</Link>
      <span>/</span>
      <span className='text-tx-2'>Articles</span>
    </nav>

    <div className='text-center mb-10'>
      <p className='section-label mb-2'>Knowledge Hub</p>
      <h1 className='text-3xl md:text-4xl font-semibold text-tx-1'>Editorial content will appear here</h1>
      <p className='mt-4 text-sm md:text-base text-tx-2 max-w-2xl mx-auto'>Our blog library is managed from the admin dashboard so fresh articles can be published, scheduled, and previewed with ease.</p>
    </div>

    <div className='rounded-lg border border-border bg-white p-8 text-center shadow-card'>
      <h2 className='text-xl font-semibold text-tx-1'>No public articles yet</h2>
      <p className='mt-3 text-sm text-tx-2 max-w-lg mx-auto'>New articles will appear here once they are published from the admin panel.</p>
      <Link to='/services' className='mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white'>Explore services <HiOutlineArrowRight className='w-4 h-4' /></Link>
    </div>
  </div>
)

export default Articles
