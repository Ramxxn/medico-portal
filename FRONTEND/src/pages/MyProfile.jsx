import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { HiOutlineCamera } from 'react-icons/hi'

const MyProfile = () => {
  const { userData, token, backendUrl, getUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [d, setD] = useState(null)
  const [image, setImage] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => { if (userData) setD({ ...userData }) }, [userData])

  const set = (k, v) => setD(p => ({ ...p, [k]: v }))
  const setAddr = (k, v) => setD(p => ({ ...p, address: { ...p.address, [k]: v } }))

  const save = async () => {
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('name', d.name || '')
      fd.append('phone', d.phone || '')
      fd.append('address', JSON.stringify(d.address || {}))
      fd.append('gender', d.gender || '')
      fd.append('dob', d.dob || '')
      if (image) fd.append('image', image)
      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, fd, { headers: { token } })
      if (data.success) { toast.success(data.message); await getUserProfileData(); setIsEdit(false); setImage(null) }
      else toast.error(data.message)
    } catch { toast.error('Profile update failed') }
    finally { setSaving(false) }
  }

  if (!d) return null

  return (
    <div className='page max-w-3xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-text-primary'>My Profile</h1>
        <p className='text-text-secondary text-sm mt-1'>Manage your personal information and preferences.</p>
      </div>

      <div className='card overflow-hidden'>
        {/* Header */}
        <div className='bg-surface-2 px-6 py-8 flex flex-col sm:flex-row items-center gap-5 border-b border-border'>
          <div className='relative'>
            {isEdit ? (
              <label htmlFor='profile-img' className='cursor-pointer block relative'>
                <img className='w-24 h-24 object-cover rounded-full ring-4 ring-white shadow-card' src={image ? URL.createObjectURL(image) : d.image} alt='Profile' />
                <div className='absolute inset-0 bg-black/30 rounded-full flex items-center justify-center'>
                  <HiOutlineCamera className='w-6 h-6 text-white' />
                </div>
                <input id='profile-img' type='file' hidden accept='image/*' onChange={e => setImage(e.target.files[0])} />
              </label>
            ) : (
              <img className='w-24 h-24 object-cover rounded-full ring-4 ring-white shadow-card' src={d.image} alt='Profile' />
            )}
          </div>
          <div className='text-center sm:text-left'>
            {isEdit
              ? <input type='text' value={d.name} onChange={e => set('name', e.target.value)} className='text-xl font-bold text-text-primary border-b-2 border-primary bg-transparent focus:outline-none' />
              : <p className='text-xl font-bold text-text-primary'>{d.name}</p>
            }
            <p className='text-text-muted text-sm mt-1'>{d.email}</p>
          </div>
        </div>

        <div className='p-6 space-y-8'>
          {/* Contact */}
          <div>
            <p className='text-xs font-semibold text-text-muted uppercase tracking-wider mb-4'>Contact Information</p>
            <div className='grid sm:grid-cols-2 gap-4'>
              <div>
                <label className='label'>Email</label>
                <p className='text-sm text-text-secondary'>{d.email}</p>
              </div>
              <div>
                <label className='label'>Phone</label>
                {isEdit ? <input type='text' value={d.phone || ''} onChange={e => set('phone', e.target.value)} className='input' /> : <p className='text-sm text-text-secondary'>{d.phone || '—'}</p>}
              </div>
              <div className='sm:col-span-2'>
                <label className='label'>Address Line 1</label>
                {isEdit ? <input value={d.address?.line1 || ''} onChange={e => setAddr('line1', e.target.value)} className='input' placeholder='Street address' /> : <p className='text-sm text-text-secondary'>{d.address?.line1 || '—'}</p>}
              </div>
              <div className='sm:col-span-2'>
                <label className='label'>Address Line 2</label>
                {isEdit ? <input value={d.address?.line2 || ''} onChange={e => setAddr('line2', e.target.value)} className='input' placeholder='City, State, PIN' /> : <p className='text-sm text-text-secondary'>{d.address?.line2 || '—'}</p>}
              </div>
            </div>
          </div>

          {/* Basic */}
          <div>
            <p className='text-xs font-semibold text-text-muted uppercase tracking-wider mb-4'>Basic Information</p>
            <div className='grid sm:grid-cols-2 gap-4'>
              <div>
                <label className='label'>Gender</label>
                {isEdit
                  ? <select value={d.gender} onChange={e => set('gender', e.target.value)} className='input'>
                      <option value='not selected'>Not Selected</option>
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                      <option value='other'>Other</option>
                    </select>
                  : <p className='text-sm text-text-secondary capitalize'>{d.gender || '—'}</p>
                }
              </div>
              <div>
                <label className='label'>Date of Birth</label>
                {isEdit ? <input type='date' value={d.dob || ''} onChange={e => set('dob', e.target.value)} className='input' /> : <p className='text-sm text-text-secondary'>{d.dob || '—'}</p>}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className='flex justify-end gap-3 pt-4 border-t border-border'>
            {isEdit ? (
              <>
                <button onClick={() => { setIsEdit(false); setD({ ...userData }); setImage(null) }} className='btn-ghost'>Cancel</button>
                <button onClick={save} disabled={saving} className='btn-primary'>{saving ? 'Saving...' : 'Save Changes'}</button>
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

export default MyProfile
