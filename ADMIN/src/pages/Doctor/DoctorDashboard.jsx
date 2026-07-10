import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { HiOutlineCalendar, HiOutlineCurrencyRupee, HiOutlineUsers } from 'react-icons/hi'

const StatCard = ({ icon: Icon, value, label }) => (
  <div className='card p-5 flex items-center gap-4 hover:shadow-card-hover transition-shadow'>
    <div className='w-11 h-11 rounded-xl bg-bg-card flex items-center justify-center flex-shrink-0'>
      <Icon className='w-5 h-5 text-primary-dk' />
    </div>
    <div>
      <p className='text-2xl font-bold text-tx-1'>{value}</p>
      <p className='text-sm text-tx-4'>{label}</p>
    </div>
  </div>
)

const DoctorDashboard = () => {
  const { docToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { currencySymbol } = useContext(AppContext)

  useEffect(() => { if (docToken) getDashData() }, [docToken])

  if (!dashData) return (
    <div className='flex-1 flex items-center justify-center min-h-screen bg-bg-page'>
      <div className='w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin'></div>
    </div>
  )

  return (
    <div className='flex-1 p-6 bg-bg-page min-h-screen'>
      <div className='mb-6'>
        <h1 className='text-xl font-bold text-tx-1'>My Dashboard</h1>
        <p className='text-tx-4 text-sm mt-0.5'>Your practice overview</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
        <StatCard icon={HiOutlineCurrencyRupee} value={`${currencySymbol}${dashData.earnings}`} label='Total Earnings' />
        <StatCard icon={HiOutlineCalendar} value={dashData.appointments} label='Total Appointments' />
        <StatCard icon={HiOutlineUsers} value={dashData.patients} label='Unique Patients' />
      </div>

      <div className='card overflow-hidden'>
        <div className='flex items-center gap-3 px-5 py-4 border-b border-border bg-bg-page'>
          <HiOutlineCalendar className='w-4 h-4 text-primary' />
          <h2 className='font-semibold text-tx-1 text-sm'>Latest Appointments</h2>
        </div>

        {dashData.latestAppointment.length === 0 ? (
          <div className='text-center py-12 text-tx-4 text-sm'>No appointments yet</div>
        ) : (
          <div className='divide-y divide-border'>
            {dashData.latestAppointment.map((item, i) => (
              <div key={i} className='flex items-center justify-between gap-4 px-5 py-4 hover:bg-bg-page transition-colors'>
                <div className='flex items-center gap-3'>
                  <img src={item.userData.image} alt='' className='w-9 h-9 object-cover rounded-full border border-border' />
                  <div>
                    <p className='font-medium text-tx-1 text-sm'>{item.userData.name}</p>
                    <p className='text-xs text-tx-4'>{item.slotDate} · {item.slotTime}</p>
                  </div>
                </div>
                <div className='flex gap-2'>
                  {item.cancelled
                    ? <span className='badge-error'>Cancelled</span>
                    : item.isCompleted
                      ? <span className='badge-success'>Completed</span>
                      : <>
                          <button onClick={() => cancelAppointment(item._id)} className='btn-danger text-xs px-3 py-1.5'>Cancel</button>
                          <button onClick={() => completeAppointment(item._id)} className='btn-outline text-xs px-3 py-1.5'>Complete</button>
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

export default DoctorDashboard
