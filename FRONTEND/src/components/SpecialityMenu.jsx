import React from 'react'
import { specialityData } from '../assets/assets.js'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex gap-4 flex-col justify-center items-center text-gray-800 py-12' >
      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm'> simple browse throught our extensive list of trusted doctocs, schedule your appointment hassle-free </p>
      <div className='flex space-x-16 justify-center items-center overflow-x-auto max-w-full py-8'>
        {specialityData.map((item, index) => (
          <Link onClick={()=>scrollTo(0,0)} className='flex flex-col p-4 items-center bg-green-50 rounded-full w-28 h-28 text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/doctors/${item.speciality}`} >
            <img className='w-12 sm:w-24 mb-2' src={item.image} alt="" />
            <h2 className='text-sm mt-2' >{item.speciality}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu