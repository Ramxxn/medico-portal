import React, { useEffect, useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {
  const { adminToken, appointmentList, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, currencySymbol } = useContext(AppContext)

  useEffect(() => { if (adminToken) getAllAppointments() }, [adminToken])

  return (
    <div className='flex-1 p-6 bg-bg-page min-h-screen'>
      <div className='mb-6'>
        <h1 className='text-xl font-bold text-tx-1'>All Appointments</h1>
        <p className='text-tx-4 text-sm mt-0.5'>{appointmentList.length} total appointments</p>
      </div>

      <div className='card overflow-hidden'>
        {/* Header row */}
        <div className='hidden sm:grid grid-cols-[2rem_2fr_1fr_2fr_2fr_1fr_1fr] gap-3 px-5 py-3 bg-bg-page border-b border-border text-xs font-semibold text-tx-4 uppercase tracking-wider'>
          <span>#</span><span>Patient</span><span>Age</span>
          <span>Date & Time</span><span>Practitioner</span><span>Fees</span><span>Status</span>
        </div>

        {appointmentList.length === 0 ? (
          <div className='text-center py-16 text-tx-4 text-sm'>No appointments found</div>
        ) : (
          <div className='divide-y divide-border'>
            {appointmentList.map((item, i) => (
              <div key={i} className='flex flex-wrap sm:grid sm:grid-cols-[2rem_2fr_1fr_2fr_2fr_1fr_1fr] gap-3 items-center px-5 py-4 hover:bg-bg-page transition-colors text-sm'>
                <span className='hidden sm:block text-tx-4 text-xs'>{i + 1}</span>
                <div className='flex items-center gap-2.5'>
                  <img className='w-8 h-8 rounded-full object-cover border border-border' src={item.userData.image} alt='' />
                  <span className='font-medium text-tx-1 text-sm'>{item.userData.name}</span>
                </div>
                <span className='text-tx-3 text-sm'>{calculateAge(item.userData.dob)} yrs</span>
                <div>
                  <p className='text-tx-2 text-sm'>{item.slotDate}</p>
                  <p className='text-tx-4 text-xs'>{item.slotTime}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <img className='w-7 h-7 rounded-full object-cover border border-border' src={item.docData.image} alt='' />
                  <span className='text-tx-2 text-sm'>{item.docData.name}</span>
                </div>
                <span className='font-medium text-tx-1'>{currencySymbol}{item.amount}</span>
                <div>
                  {item.cancelled
                    ? <span className='badge-error'>Cancelled</span>
                    : item.isCompleted
                      ? <span className='badge-success'>Completed</span>
                      : <button onClick={() => cancelAppointment(item._id)} className='btn-danger text-xs px-3 py-1.5'>Cancel</button>
                  }
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AllAppointments
