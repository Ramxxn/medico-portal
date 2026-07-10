import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { HiOutlineBadgeCheck, HiOutlineLocationMarker, HiOutlineCurrencyRupee } from 'react-icons/hi'

const DoctorProfile = () => {
  const { docToken, profileData, setProfileData, getDoctorProfileData, backendUrl } = useContext(DoctorContext)
  const { currencySymbol } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => { if (docToken) getDoctorProfileData() }, [docToken])

  const updateProfile = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        { address: profileData.address, fees: profileData.fees, available: profileData.available },
        { headers: { docToken } }
      )
      if (data.success) { toast.success('Profile updated'); setIsEdit(false); getDoctorProfileData() }
      else toast.error(data.message)
    } catch (err) { toast.error(err.message) }
  }

  if (!profileData) return (
    <div className='flex-1 flex items-center justify-center min-h-screen bg-bg-page'>
      <div className='w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin'></div>
    </div>
  )

  return (
    <div className='flex-1 p-6 bg-bg-page min-h-screen'>
      <div className='mb-6'>
        <h1 className='text-xl font-bold text-tx-1'>My Profile</h1>
        <p className='text-tx-4 text-sm mt-0.5'>Manage your practitioner profile</p>
      </div>

      <div className='card max-w-3xl overflow-hidden'>
        {/* Header */}
        <div className='bg-bg-card px-6 py-6 border-b border-border flex flex-col sm:flex-row items-center gap-5'>
          <img src={profileData.image} alt='' className='w-24 h-28 rounded-xl bg-bg-page object-contain shadow-card' />
          <div>
            <div className='flex items-center gap-2 mb-1'>
              <p className='text-xl font-bold text-tx-1'>{profileData.name}</p>
              <HiOutlineBadgeCheck className='w-5 h-5 text-primary' />
            </div>
            <p className='text-tx-3 text-sm'>{profileData.degree} · {profileData.speciality}</p>
            <span className='badge-primary mt-2 inline-block'>{profileData.experiance}</span>
          </div>
        </div>

        <div className='p-6 space-y-6'>
          {/* About */}
          <div>
            <p className='text-xs font-semibold text-tx-4 uppercase tracking-wider mb-2'>About</p>
            <p className='text-sm text-tx-3 leading-relaxed'>{profileData.about}</p>
          </div>

          <div className='divider'></div>

          {/* Fees */}
          <div className='flex items-center gap-2'>
            <HiOutlineCurrencyRupee className='w-4 h-4 text-primary' />
            <span className='text-sm text-tx-3'>Consultation Fee:</span>
            {isEdit
              ? <input type='number' className='input w-28 ml-1' value={profileData.fees}
                  onChange={e => setProfileData(p => ({ ...p, fees: e.target.value }))} />
              : <span className='font-bold text-tx-1 ml-1'>{currencySymbol}{profileData.fees}</span>
            }
          </div>

          {/* Address */}
          <div className='flex items-start gap-2'>
            <HiOutlineLocationMarker className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
            <div className='flex-1'>
              <p className='text-sm text-tx-3 mb-1'>Address</p>
              {isEdit ? (
                <div className='space-y-2'>
                  <input className='input' value={profileData.address.line1}
                    onChange={e => setProfileData(p => ({ ...p, address: { ...p.address, line1: e.target.value } }))} placeholder='Address line 1' />
                  <input className='input' value={profileData.address.line2}
                    onChange={e => setProfileData(p => ({ ...p, address: { ...p.address, line2: e.target.value } }))} placeholder='Address line 2' />
                </div>
              ) : (
                <p className='text-sm text-tx-2'>{profileData.address.line1}{profileData.address.line2 && `, ${profileData.address.line2}`}</p>
              )}
            </div>
          </div>

          {/* Availability */}
          <div className='flex items-center gap-3'>
            <button
              onClick={() => isEdit && setProfileData(p => ({ ...p, available: !p.available }))}
              className={`relative w-10 h-5 rounded-full transition-colors ${isEdit ? 'cursor-pointer' : 'cursor-default'} ${profileData.available ? 'bg-primary' : 'bg-border-md'}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${profileData.available ? 'translate-x-5' : 'translate-x-0.5'}`}></span>
            </button>
            <span className={`text-sm font-medium ${profileData.available ? 'text-primary-dk' : 'text-tx-4'}`}>
              {profileData.available ? 'Available for appointments' : 'Not available'}
            </span>
          </div>

          {/* Actions */}
          <div className='flex justify-end gap-3 pt-4 border-t border-border'>
            {isEdit ? (
              <>
                <button onClick={() => { setIsEdit(false); getDoctorProfileData() }} className='btn-ghost'>Cancel</button>
                <button onClick={updateProfile} className='btn-primary'>Save Changes</button>
              </>
            ) : (
              <button onClick={() => setIsEdit(true)} className='btn-outline'>Edit Profile</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
