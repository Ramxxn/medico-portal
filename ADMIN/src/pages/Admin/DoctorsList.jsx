import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, adminToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => { if (adminToken) getAllDoctors() }, [adminToken])

  return (
    <div className='flex-1 p-6 bg-bg-page min-h-screen'>
      <div className='mb-6'>
        <h1 className='text-xl font-bold text-tx-1'>Practitioners</h1>
        <p className='text-tx-4 text-sm mt-0.5'>{doctors.length} practitioners registered</p>
      </div>

      {doctors.length === 0 ? (
        <div className='card text-center py-20'>
          <p className='text-tx-3 font-medium'>No practitioners yet</p>
          <p className='text-tx-4 text-sm mt-1'>Add your first practitioner to get started.</p>
        </div>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {doctors.map(item => (
            <div key={item._id} className='card-hover overflow-hidden group'>
              <div className='bg-bg-card h-40 flex items-end justify-center overflow-hidden'>
                <img
                  className='h-full w-full object-contain group-hover:scale-105 transition-transform duration-500'
                  src={item.image} alt={item.name}
                />
              </div>
              <div className='p-4'>
                <p className='font-semibold text-tx-1 text-sm leading-tight'>{item.name}</p>
                <p className='text-tx-4 text-xs mt-0.5 mb-3'>{item.speciality}</p>
                {/* Toggle */}
                <button
                  onClick={() => changeAvailability(item._id)}
                  className='flex items-center gap-2 group/toggle'
                >
                  <div className={`relative w-9 h-5 rounded-full transition-colors ${item.available ? 'bg-primary' : 'bg-border-md'}`}>
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.available ? 'translate-x-4' : 'translate-x-0.5'}`}></span>
                  </div>
                  <span className={`text-xs font-medium ${item.available ? 'text-primary-dk' : 'text-tx-4'}`}>
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DoctorsList
