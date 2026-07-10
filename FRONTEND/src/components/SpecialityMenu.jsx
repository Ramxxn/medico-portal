import React from 'react'
import { specialityData } from '../assets/assets.js'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => (
  <section id='speciality' className='py-16'>
    <div className='text-center mb-10'>
      <p className='section-label mb-2'>Specialities</p>
      <h2 className='section-title'>Find by Speciality</h2>
      <p className='mt-3 text-text-secondary text-sm max-w-md mx-auto'>
        Browse our network of certified practitioners across multiple natural healing disciplines.
      </p>
    </div>

    <div className='flex gap-5 justify-start md:justify-center overflow-x-auto pb-3 scrollbar-hide px-1'>
      {specialityData.map((item, i) => (
        <Link
          key={i}
          to={`/doctors/${item.speciality}`}
          onClick={() => scrollTo(0, 0)}
          className='flex flex-col items-center gap-3 flex-shrink-0 group'
        >
          <div className='w-20 h-20 rounded-2xl bg-white border border-border shadow-card flex items-center justify-center group-hover:border-primary group-hover:shadow-card-hover transition-all duration-200'>
            <img className='w-10 h-10 object-contain' src={item.image} alt={item.speciality} />
          </div>
          <span className='text-xs font-medium text-text-secondary group-hover:text-primary transition-colors text-center max-w-[80px] leading-tight'>
            {item.speciality}
          </span>
        </Link>
      ))}
    </div>
  </section>
)

export default SpecialityMenu
