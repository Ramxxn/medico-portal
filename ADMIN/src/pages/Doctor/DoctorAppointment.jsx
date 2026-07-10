import React, { useEffect, useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorAppointment = () => {
  const { docToken, appointments, getAllAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, currencySymbol } = useContext(AppContext)

  useEffect(() => { if (docToken) getAllAppointments() }, [docToken])

  return (
    <div className='flex-1 p-6 bg-bg-page min-h-screen'>
      <div className='mb-6'>
        <h1 className='text-xl font-bold text-tx-1'>My Appointments</h1>
        <p className='text-tx-4 text-sm mt-0.5'>{appointments.length} total appointments</p>
      </div>

      <div className='card overflow-hidden'>
        <div className='hidden sm:grid grid-cols-[2rem_2fr_2fr_1fr_2.5fr_1fr_1fr] gap-3 px-5 py-3 bg-bg-page border-b border-border text-xs font-semibold text-tx-4 uppercase tracking-wider'>
          <span>#</span><span>Patient</span><span>Payment</span>
          <span>Age</span><span>Date & Time</span><span>Fees</span><span>Action</span>
        </div>

        {appointments.length === 0 ? (
          <div className='text-center py-16 text-tx-4 text-sm'>No appointments found</div>
        ) : (
          <div className='divide-y divide-border'>
            {[...appointments].reverse().map((item, i) => (
              <div key={i} className='flex flex-wrap sm:grid sm:grid-cols-[2rem_2fr_2fr_1fr_2.5fr_1fr_1fr] gap-3 items-center px-5 py-4 hover:bg-bg-page transition-colors text-sm'>
                <span className='hidden sm:block text-tx-4 text-xs'>{i + 1}</span>
                <div className='flex items-center gap-2.5'>
                  <img className='w-8 h-8 rounded-full object-cover border border-border' src={item.userData.image} alt='' />
                  <span className='font-medium text-tx-1 text-sm'>{item.userData.name}</span>
                </div>
                <span className={`text-xs font-medium ${item.payment ? 'text-success' : 'text-warning'}`}>
                  {item.payment ? 'Online' : 'Cash'}
                </span>
                <span className='text-tx-3 text-sm'>{calculateAge(item.userData.dob)} yrs</span>
                <div>
                  <p className='text-tx-2 text-sm'>{item.slotDate}</p>
                  <p className='text-tx-4 text-xs'>{item.slotTime}</p>
                </div>
                <span className='font-medium text-tx-1'>{currencySymbol}{item.amount}</span>
                <div className='flex gap-1.5'>
                  {item.cancelled
                    ? <span className='badge-error'>Cancelled</span>
                    : item.isCompleted
                      ? <span className='badge-success'>Completed</span>
                      : <>
                          <button onClick={() => cancelAppointment(item._id)} className='btn-danger text-xs px-2.5 py-1.5'>Cancel</button>
                          <button onClick={() => completeAppointment(item._id)} className='btn-outline text-xs px-2.5 py-1.5'>Done</button>
                        </>
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

export default DoctorAppointment
