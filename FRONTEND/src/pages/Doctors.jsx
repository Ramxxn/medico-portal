import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { HiOutlineSearch, HiOutlineX, HiOutlineAdjustments } from 'react-icons/hi'

const SPECIALITIES = [
  'General Physician (GP)', 'Psychologist', 'Yogatherapist', 'Physiotherapist',
  'Ayurvedacharya', 'Naturopath', 'Homeopath', 'Pediatrician (Child Specialist)', 'Other',
]

const Doctors = () => {
  const { speciality } = useParams()
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [search, setSearch] = useState('')
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)

  const applyFilter = useCallback(() => {
    let result = doctors
    if (speciality) result = result.filter(d => d.speciality.toLowerCase() === speciality.toLowerCase())
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.speciality.toLowerCase().includes(q) ||
        (d.address?.line1 || '').toLowerCase().includes(q) ||
        (d.address?.line2 || '').toLowerCase().includes(q)
      )
    }
    setFilterDoc(result)
  }, [doctors, speciality, search])

  useEffect(() => { applyFilter() }, [applyFilter])

  return (
    <div className='page'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-text-primary'>Find a Practitioner</h1>
        <p className='text-text-secondary text-sm mt-1'>Browse verified natural health practitioners by speciality or search by name.</p>
      </div>

      {/* Search */}
      <div className='relative mb-6 max-w-lg'>
        <HiOutlineSearch className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted' />
        <input
          type='text'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search by name, speciality, or location...'
          className='input pl-10 pr-10'
        />
        {search && (
          <button onClick={() => setSearch('')} className='absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary'>
            <HiOutlineX className='w-4 h-4' />
          </button>
        )}
      </div>

      <div className='flex flex-col sm:flex-row gap-6'>
        {/* Sidebar */}
        <aside className='sm:w-48 flex-shrink-0'>
          <button
            className='sm:hidden flex items-center gap-2 text-sm font-medium text-primary border border-primary px-4 py-2 rounded-lg mb-3'
            onClick={() => setShowFilter(p => !p)}
          >
            <HiOutlineAdjustments className='w-4 h-4' />
            {showFilter ? 'Hide Filters' : 'Filters'}
          </button>

          <div className={`flex-col gap-0.5 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
            <p className='label px-1 mb-2 uppercase tracking-wider'>Speciality</p>
            {SPECIALITIES.map(s => (
              <button
                key={s}
                onClick={() => { navigate(speciality === s ? '/doctors' : `/doctors/${s}`); scrollTo(0, 0) }}
                className={`text-left px-3 py-2.5 text-sm rounded-lg transition-colors ${
                  speciality === s ? 'bg-primary text-white font-medium' : 'text-text-secondary hover:bg-surface-3 hover:text-text-primary'
                }`}
              >
                {s}
              </button>
            ))}
            {speciality && (
              <button onClick={() => navigate('/doctors')} className='text-left px-3 py-2 text-xs text-error hover:bg-error-bg rounded-lg mt-1'>
                Clear filter
              </button>
            )}
          </div>
        </aside>

        {/* Results */}
        <div className='flex-1'>
          <p className='text-sm text-text-muted mb-4'>
            {filterDoc.length} practitioner{filterDoc.length !== 1 ? 's' : ''} found
            {speciality ? ` in ${speciality}` : ''}
          </p>

          {filterDoc.length === 0 ? (
            <div className='card text-center py-20'>
              <HiOutlineSearch className='w-10 h-10 text-text-muted mx-auto mb-3' />
              <p className='text-text-secondary font-medium'>No practitioners found</p>
              <p className='text-text-muted text-sm mt-1'>Try adjusting your search or filters</p>
              <button onClick={() => { setSearch(''); navigate('/doctors') }} className='mt-4 text-primary text-sm underline'>
                Clear all filters
              </button>
            </div>
          ) : (
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {filterDoc.map(item => (
                <div
                  key={item._id}
                  onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                  className='card-hover cursor-pointer overflow-hidden group'
                >
                  <div className='bg-surface-2 h-44 flex items-end justify-center overflow-hidden'>
                    <img className='h-full w-full object-contain group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} loading='lazy' />
                  </div>
                  <div className='p-4'>
                    <div className={`flex items-center gap-1.5 text-xs font-medium mb-2 ${item.available ? 'text-success' : 'text-error'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-success' : 'bg-error'}`}></span>
                      {item.available ? 'Available' : 'Unavailable'}
                    </div>
                    <p className='font-semibold text-text-primary text-sm leading-tight'>{item.name}</p>
                    <p className='text-text-muted text-xs mt-0.5'>{item.speciality}</p>
                    {item.fees && <p className='text-primary text-xs font-medium mt-2'>₹{item.fees} / session</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors
