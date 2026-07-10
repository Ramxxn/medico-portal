import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctor from '../components/RelatedDoctor'
import { toast } from 'react-toastify'
import axios from 'axios'
import { HiOutlineBadgeCheck, HiOutlineLocationMarker, HiOutlineCurrencyRupee } from 'react-icons/hi'

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData, userData } = useContext(AppContext)
  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [booking, setBooking] = useState(false)

  useEffect(() => {
    setDocInfo(doctors.find(d => d._id === docId) || null)
  }, [docId, doctors])

  useEffect(() => {
    if (!docInfo?.slots_booked) return
    setDocSlots([])
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const cur = new Date(today)
      cur.setDate(today.getDate() + i)
      const end = new Date(cur)
      end.setHours(21, 0, 0, 0)
      if (today.getDate() === cur.getDate()) {
        cur.setHours(cur.getHours() > 10 ? cur.getHours() + 1 : 10)
        cur.setMinutes(cur.getMinutes() > 30 ? 30 : 0)
      } else {
        cur.setHours(10, 0)
      }
      const slots = []
      while (cur < end) {
        const time = cur.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const slotDate = `${cur.getDate()} ${cur.toLocaleString('default', { month: 'short' })} ${cur.getFullYear()}`
        if (!(docInfo.slots_booked[slotDate]?.includes(time))) slots.push({ dateTime: new Date(cur), time })
        cur.setMinutes(cur.getMinutes() + 30)
      }
      setDocSlots(prev => [...prev, slots])
    }
  }, [docInfo])

  const bookAppointment = async () => {
    if (!token) { toast.warn('Please sign in to book an appointment'); return navigate('/login') }
    if (!slotTime) return toast.warn('Please select a time slot')
    setBooking(true)
    try {
      const date = docSlots[slotIndex][0].dateTime
      const slotDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`
      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime, userId: userData._id, userData, docData: docInfo, amount: docInfo.fees, date: date.getTime() },
        { headers: { token } }
      )
      if (data.success) { toast.success(data.message); getDoctorsData(); navigate('/my-appointments') }
      else toast.error(data.message)
    } catch (error) { toast.error(error.message) }
    finally { setBooking(false) }
  }

  if (!docInfo) return (
    <div className='flex items-center justify-center min-h-[60vh]'>
      <div className='w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin'></div>
    </div>
  )

  return (
    <div className='page'>
      <nav className='text-xs text-text-muted mb-6 flex items-center gap-2'>
        <Link to='/' className='hover:text-primary transition-colors'>Home</Link>
        <span>/</span>
        <Link to='/doctors' className='hover:text-primary transition-colors'>Practitioners</Link>
        <span>/</span>
        <span className='text-text-secondary'>{docInfo.name}</span>
      </nav>

      {/* Doctor Info */}
      <div className='flex flex-col sm:flex-row gap-6 mb-8'>
        <div className='sm:w-52 flex-shrink-0'>
          <img className='w-full sm:w-52 h-64 object-contain rounded-xl bg-surface-2' src={docInfo.image} alt={docInfo.name} />
        </div>
        <div className='flex-1 card p-6'>
          <div className='flex items-center gap-2 mb-1'>
            <h1 className='text-2xl font-bold text-text-primary'>{docInfo.name}</h1>
            <HiOutlineBadgeCheck className='w-5 h-5 text-primary flex-shrink-0' />
          </div>
          <p className='text-text-secondary text-sm mb-3 flex items-center gap-2 flex-wrap'>
            <span>{docInfo.degree} · {docInfo.speciality}</span>
            <span className='badge-primary'>{docInfo.experiance}</span>
          </p>
          <div className='mb-4'>
            <p className='text-sm font-semibold text-text-primary mb-1'>About</p>
            <p className='text-sm text-text-secondary leading-relaxed'>{docInfo.about}</p>
          </div>
          <div className='flex flex-wrap gap-6 pt-4 border-t border-border'>
            <div className='flex items-center gap-1.5'>
              <HiOutlineCurrencyRupee className='w-4 h-4 text-primary' />
              <div>
                <p className='text-xs text-text-muted'>Consultation Fee</p>
                <p className='font-bold text-primary'>{currencySymbol}{docInfo.fees}</p>
              </div>
            </div>
            {docInfo.address?.line1 && (
              <div className='flex items-start gap-1.5'>
                <HiOutlineLocationMarker className='w-4 h-4 text-text-muted mt-0.5 flex-shrink-0' />
                <div>
                  <p className='text-xs text-text-muted'>Location</p>
                  <p className='text-sm text-text-secondary'>{docInfo.address.line1}</p>
                  {docInfo.address.line2 && <p className='text-xs text-text-muted'>{docInfo.address.line2}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking */}
      <div className='card p-6 mb-8'>
        <h2 className='font-semibold text-text-primary mb-5'>Select Appointment Slot</h2>
        <div className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-5'>
          {docSlots.map((daySlots, i) => (
            <button key={i} onClick={() => { setSlotIndex(i); setSlotTime('') }}
              className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                slotIndex === i ? 'bg-primary text-white' : 'border border-border text-text-secondary hover:border-primary hover:text-primary'
              }`}>
              <span className='text-xs'>{daySlots[0] && DAYS[daySlots[0].dateTime.getDay()]}</span>
              <span className='text-lg font-bold'>{daySlots[0] && daySlots[0].dateTime.getDate()}</span>
            </button>
          ))}
        </div>
        {docSlots[slotIndex]?.length > 0 ? (
          <div className='flex flex-wrap gap-2 mb-6'>
            {docSlots[slotIndex].map((slot, i) => (
              <button key={i} onClick={() => setSlotTime(slot.time)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  slotTime === slot.time ? 'bg-primary text-white' : 'border border-border text-text-secondary hover:border-primary hover:text-primary'
                }`}>
                {slot.time.toLowerCase()}
              </button>
            ))}
          </div>
        ) : (
          <p className='text-sm text-text-muted mb-6'>No slots available for this day.</p>
        )}
        <button onClick={bookAppointment} disabled={booking || !slotTime} className='btn-primary disabled:opacity-50 disabled:cursor-not-allowed'>
          {booking ? 'Booking...' : 'Confirm Appointment'}
        </button>
      </div>

      <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment
