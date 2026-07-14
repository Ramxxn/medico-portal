import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import Banner from '../components/Banner'
import TopDoctors from '../components/TopDoctors'
import { HiOutlineUserGroup, HiOutlineCalendar, HiOutlineShieldCheck, HiOutlineStar } from 'react-icons/hi'

const STATS = [
  { icon: HiOutlineUserGroup, value: '500+', label: 'Certified Practitioners' },
  { icon: HiOutlineCalendar, value: '10K+', label: 'Appointments Booked' },
  { icon: HiOutlineShieldCheck, value: '15+', label: 'Specialities' },
  { icon: HiOutlineStar, value: '4.8', label: 'Average Rating' },
]

const WHY_US = [
  { icon: HiOutlineShieldCheck, title: 'Natural & Safe', desc: 'Plant-based and holistic remedies that support the body\'s own healing processes without harsh side effects.' },
  { icon: HiOutlineUserGroup, title: 'Verified Experts', desc: 'Every practitioner is thoroughly vetted for credentials, experience, and patient outcomes before listing.' },
  { icon: HiOutlineCalendar, title: 'Easy Booking', desc: 'Book appointments online in minutes. Choose your preferred date, time, and consultation type.' },
  { icon: HiOutlineStar, title: 'Personalized Care', desc: 'Tailored recommendations based on your body type, lifestyle, and specific health goals.' },
]

const Home = () => (
  <div className='page'>
    <Header />

    <SpecialityMenu />
    <TopDoctors />

    {/* Why Choose Us */}
    <section className='py-16'>
      <div className='text-center mb-10'>
        <p className='section-label mb-2'>Why ICRB</p>
        <h2 className='section-title'>Why Choose Us</h2>
        <p className='mt-3 text-text-secondary text-sm max-w-md mx-auto'>
          We're redefining wellness by making natural healthcare accessible, trusted, and personalized.
        </p>
      </div>
      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
        {WHY_US.map(({ icon: Icon, title, desc }) => (
          <div key={title} className='card-hover p-6'>
            <div className='w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center mb-4'>
              <Icon className='w-5 h-5 text-primary' />
            </div>
            <h3 className='font-semibold text-text-primary mb-2'>{title}</h3>
            <p className='text-sm text-text-secondary leading-relaxed'>{desc}</p>
          </div>
        ))}
      </div>
    </section>

    <Banner />
  </div>
)

export default Home
