import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { HiOutlineCalendar, HiOutlineLocationMarker } from 'react-icons/hi'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) setAppointments(data.appointments.reverse())
    } catch (error) { toast.error(error.message) }
    finally { setLoading(false) }
  }

  const cancelAppointment = async (appointmentId) => {
    if (!window.confirm('Cancel this appointment?')) return
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) { toast.success(data.message); getUserAppointments(); getDoctorsData() }
      else toast.error(data.message)
    } catch (error) { toast.error(error.message) }
  }

  useEffect(() => { if (token) getUserAppointments() }, [token])

  const getStatus = item => {
    if (item.isCompleted) return <span className='badge-success'>Completed</span>
    if (item.cancelled) return <span className='badge-error'>Cancelled</span>
    if (item.payment) return <span className='badge-info'>Paid</span>
    return <span className='badge-warning'>Pending Payment</span>
  }

  return (
    <div className='page max-w-4xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-text-primary'>My Appointments</h1>
        <p className='text-text-secondary text-sm mt-1'>Manage and track all your booked appointments.</p>
      </div>

      {loading ? (
        <div className='flex items-center justify-center py-20'>
          <div className='w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin'></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className='card text-center py-20'>
          <HiOutlineCalendar className='w-12 h-12 text-text-muted mx-auto mb-3' />
          <p className='text-text-secondary font-medium'>No appointments yet</p>
          <p className='text-text-muted text-sm mt-1'>Book your first appointment with a certified practitioner.</p>
          <Link to='/doctors' className='mt-5 inline-block btn-primary'>Find a Practitioner</Link>
        </div>
      ) : (
        <div className='space-y-4'>
          {appointments.map((item, i) => (
            <div key={i} className='card p-5 flex flex-col sm:flex-row gap-5'>
              <div className='sm:w-28 flex-shrink-0'>
                <img src={item.docData.image} alt={item.docData.name} className='w-full h-28 object-contain rounded-lg bg-surface-2' />
              </div>
              <div className='flex-1 min-w-0'>
                <div className='flex flex-wrap items-start justify-between gap-2 mb-2'>
                  <div>
                    <p className='font-semibold text-text-primary'>{item.docData.name}</p>
                    <p className='text-sm text-text-muted'>{item.docData.speciality}</p>
                  </div>
                  {getStatus(item)}
                </div>
                <div className='grid sm:grid-cols-2 gap-2 text-sm text-text-secondary mb-4'>
                  <div className='flex items-center gap-2'>
                    <HiOutlineCalendar className='w-4 h-4 text-text-muted flex-shrink-0' />
                    <span>{item.slotDate} at {item.slotTime}</span>
                  </div>
                  {item.docData.address?.line1 && (
                    <div className='flex items-center gap-2'>
                      <HiOutlineLocationMarker className='w-4 h-4 text-text-muted flex-shrink-0' />
                      <span className='truncate'>{item.docData.address.line1}</span>
                    </div>
                  )}
                </div>
                {!item.cancelled && !item.isCompleted && (
                  <div className='flex flex-wrap gap-2'>
                    {!item.payment && <button className='btn-primary text-xs px-4 py-2'>Pay Online</button>}
                    <button onClick={() => cancelAppointment(item._id)} className='btn-danger text-xs px-4 py-2'>Cancel Appointment</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyAppointments
