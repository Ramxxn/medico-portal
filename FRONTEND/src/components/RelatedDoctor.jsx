import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctor = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()
  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (doctors.length > 0)
      setRelDoc(doctors.filter(d => d.speciality.toLowerCase() === speciality.toLowerCase() && d._id !== docId))
  }, [docId, speciality, doctors])

  if (!relDoc.length) return null

  return (
    <section className='py-14'>
      <div className='mb-8'>
        <p className='section-label mb-1.5'>Similar Practitioners</p>
        <h2 className='text-2xl font-bold text-text-primary'>Related Practitioners</h2>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {relDoc.slice(0, 5).map(item => (
          <div
            key={item._id}
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
            className='card-hover cursor-pointer overflow-hidden group'
          >
            <div className='bg-surface-2 h-40 flex items-end justify-center overflow-hidden'>
              <img className='h-full w-full object-contain group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} loading='lazy' />
            </div>
            <div className='p-3'>
              <div className={`flex items-center gap-1.5 text-xs font-medium mb-1 ${item.available ? 'text-success' : 'text-error'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-success' : 'bg-error'}`}></span>
                {item.available ? 'Available' : 'Unavailable'}
              </div>
              <p className='font-semibold text-text-primary text-sm'>{item.name}</p>
              <p className='text-text-muted text-xs mt-0.5'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RelatedDoctor
