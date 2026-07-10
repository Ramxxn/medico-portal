import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { HiOutlinePhotograph } from 'react-icons/hi'

const SPECIALITIES = [
  'General Physician (GP)', 'Psychologist', 'Yogatherapist', 'Physiotherapist',
  'Ayurvedacharya', 'Naturopath', 'Homeopath', 'Pediatrician (Child Specialist)', 'Other',
]
const EXP = Array.from({ length: 12 }, (_, i) => `${i + 1} Year${i > 0 ? 's' : ''}`).concat(['More than 12 Years'])

const Field = ({ label, required, children }) => (
  <div>
    <label className='label'>{label}{required && <span className='text-error ml-0.5'>*</span>}</label>
    {children}
  </div>
)

const AddDoctor = () => {
  const { backendUrl, adminToken } = useContext(AdminContext)
  const [docImg, setDocImg] = useState(null)
  const [form, setForm] = useState({
    name: '', email: '', password: '', speciality: 'General Physician (GP)',
    degree: '', experiance: '1 Year', fees: '', about: '', address1: '', address2: '',
  })
  const [loading, setLoading] = useState(false)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const onSubmit = async e => {
    e.preventDefault()
    if (!docImg) return toast.error('Please upload a practitioner photo')
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('image', docImg)
      fd.append('name', form.name); fd.append('email', form.email)
      fd.append('password', form.password); fd.append('speciality', form.speciality)
      fd.append('degree', form.degree); fd.append('experiance', form.experiance)
      fd.append('fees', Number(form.fees)); fd.append('about', form.about)
      fd.append('address', JSON.stringify({ line1: form.address1, line2: form.address2 }))
      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', fd, { headers: { adminToken } })
      if (data.success) {
        toast.success(data.message)
        setDocImg(null)
        setForm({ name: '', email: '', password: '', speciality: 'General Physician (GP)', degree: '', experiance: '1 Year', fees: '', about: '', address1: '', address2: '' })
      } else toast.error(data.message)
    } catch (err) { toast.error(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div className='flex-1 p-6 bg-bg-page min-h-screen'>
      <div className='mb-6'>
        <h1 className='text-xl font-bold text-tx-1'>Add Practitioner</h1>
        <p className='text-tx-4 text-sm mt-0.5'>Add a new practitioner to the ICRB platform</p>
      </div>

      <form onSubmit={onSubmit} className='card p-6 max-w-4xl'>
        {/* Photo */}
        <div className='flex items-center gap-5 mb-8 pb-6 border-b border-border'>
          <label htmlFor='doc-img' className='cursor-pointer'>
            <div className='w-24 h-24 rounded-2xl bg-bg-card border-2 border-dashed border-border flex items-center justify-center overflow-hidden hover:border-primary transition-colors'>
              {docImg
                ? <img className='w-full h-full object-cover' src={URL.createObjectURL(docImg)} alt='' />
                : <HiOutlinePhotograph className='w-8 h-8 text-tx-4' />
              }
            </div>
            <input id='doc-img' type='file' hidden accept='image/*' onChange={e => setDocImg(e.target.files[0])} />
          </label>
          <div>
            <p className='font-medium text-tx-1 text-sm'>Practitioner Photo</p>
            <p className='text-xs text-tx-4 mt-1'>JPG, PNG or WEBP. Max 5MB.</p>
          </div>
        </div>

        <div className='grid md:grid-cols-2 gap-5'>
          <Field label='Full Name' required><input className='input' value={form.name} onChange={e => set('name', e.target.value)} placeholder='Dr. Full Name' required /></Field>
          <Field label='Email Address' required><input className='input' type='email' value={form.email} onChange={e => set('email', e.target.value)} placeholder='doctor@email.com' required /></Field>
          <Field label='Password' required><input className='input' type='password' value={form.password} onChange={e => set('password', e.target.value)} placeholder='Min. 8 characters' required /></Field>
          <Field label='Speciality' required>
            <select className='input' value={form.speciality} onChange={e => set('speciality', e.target.value)}>
              {SPECIALITIES.map(s => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label='Qualification / Degree' required><input className='input' value={form.degree} onChange={e => set('degree', e.target.value)} placeholder='e.g. BAMS, MD, BPT' required /></Field>
          <Field label='Experience' required>
            <select className='input' value={form.experiance} onChange={e => set('experiance', e.target.value)}>
              {EXP.map(o => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label='Consultation Fees (₹)' required><input className='input' type='number' value={form.fees} onChange={e => set('fees', e.target.value)} placeholder='e.g. 500' required /></Field>
          <Field label='Address Line 1' required><input className='input' value={form.address1} onChange={e => set('address1', e.target.value)} placeholder='Clinic name & street' required /></Field>
          <Field label='Address Line 2'><input className='input' value={form.address2} onChange={e => set('address2', e.target.value)} placeholder='City, State, PIN Code' /></Field>
        </div>

        <div className='mt-5'>
          <Field label='About the Practitioner' required>
            <textarea className='input resize-none' rows={4} value={form.about} onChange={e => set('about', e.target.value)} placeholder='Brief professional bio...' required />
          </Field>
        </div>

        <div className='mt-6 flex justify-end'>
          <button type='submit' disabled={loading} className='btn-primary'>
            {loading ? 'Adding...' : 'Add Practitioner'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddDoctor
