import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { HiOutlineArrowRight } from 'react-icons/hi'

const DoctorCard = ({ item }) => {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
      className='card-hover cursor-pointer overflow-hidden group'
    >
      <div className='bg-surface-2 h-44 flex items-end justify-center overflow-hidden'>
        <img
          className='h-full w-full object-contain group-hover:scale-105 transition-transform duration-500'
          src={item.image}
          alt={item.name}
          loading='lazy'
        />
      </div>
      <div className='p-4'>
        <div className={`flex items-center gap-1.5 text-xs font-medium mb-2 ${item.available ? 'text-success' : 'text-error'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-success' : 'bg-error'}`}></span>
          {item.available ? 'Available' : 'Unavailable'}
        </div>
        <p className='font-semibold text-text-primary text-sm leading-tight'>{item.name}</p>
        <p className='text-text-muted text-xs mt-0.5'>{item.speciality}</p>
        {item.fees && <p className='text-primary text-xs font-medium mt-2'>₹{item.fees} / session</p>}
      </div>
    </div>
  )
}

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <section className='py-16'>
      <div className='flex items-end justify-between mb-8'>
        <div>
          <p className='section-label mb-1.5'>Our Practitioners</p>
          <h2 className='section-title'>Top Practitioners</h2>
        </div>
        <button
          onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
          className='hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors'
        >
          View all <HiOutlineArrowRight className='w-4 h-4' />
        </button>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {doctors.slice(0, 10).map(item => <DoctorCard key={item._id} item={item} />)}
      </div>

      <div className='text-center mt-8 sm:hidden'>
        <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='btn-outline'>
          View All Practitioners
        </button>
      </div>
    </section>
  )
}

export default TopDoctors
