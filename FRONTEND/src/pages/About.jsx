import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import {
  HiOutlineShieldCheck, HiOutlineUserGroup, HiOutlineLightBulb,
  HiOutlineHeart, HiOutlineGlobe, HiOutlineSparkles
} from 'react-icons/hi'

const VALUES = [
  { icon: HiOutlineShieldCheck, title: 'Natural & Safe', desc: 'Plant-based and holistic remedies that support the body\'s own healing processes without harsh side effects.' },
  { icon: HiOutlineUserGroup, title: 'Trusted Experts', desc: 'Specialists in Ayurveda, herbal therapy, and naturopathy are thoroughly vetted for credibility and experience.' },
  { icon: HiOutlineHeart, title: 'Personalized Care', desc: 'Tailored recommendations to your body type, lifestyle, and health goals — because one solution doesn\'t fit all.' },
  { icon: HiOutlineLightBulb, title: 'Evidence-Informed', desc: 'We combine ancient wisdom with modern research to ensure every remedy is both traditional and scientifically grounded.' },
  { icon: HiOutlineSparkles, title: 'Compassionate Support', desc: 'Our practitioners are chosen not just for expertise, but for their empathy, integrity, and patient-first approach.' },
  { icon: HiOutlineGlobe, title: 'Accessible Wellness', desc: 'Natural healthcare within reach for everyone — online and offline consultations available.' },
]

const About = () => (
  <div className='page'>
    <nav className='text-xs text-text-muted mb-6 flex items-center gap-2'>
      <Link to='/' className='hover:text-primary transition-colors'>Home</Link>
      <span>/</span>
      <span className='text-text-secondary'>About Us</span>
    </nav>

    <div className='text-center mb-14'>
      <p className='section-label mb-2'>Our Story</p>
      <h1 className='text-4xl font-bold text-text-primary'>About ICRB</h1>
      <p className='mt-4 text-text-secondary max-w-2xl mx-auto leading-relaxed'>
        We're on a mission to make natural, holistic healthcare accessible to everyone — connecting patients with certified bio-remedy practitioners across India.
      </p>
    </div>

    <div className='flex flex-col md:flex-row items-center gap-12 mb-20'>
      <img className='w-full md:max-w-sm rounded-2xl shadow-card-hover object-cover' src={assets.about_image} alt='About ICRB' />
      <div className='flex flex-col gap-5 text-text-secondary leading-relaxed'>
        <p>ICRB was founded with a simple belief: that nature holds the answers to many of our health challenges. Our platform bridges traditional wellness with modern access, connecting users to trusted practitioners in bio remedies — including Ayurveda, naturopathy, herbal medicine, and holistic therapies.</p>
        <p>With user-friendly tools and verified expert listings, we help people explore safe, natural paths to better health. Every practitioner on our platform is backed by tradition, verified knowledge, and patient feedback.</p>
        <div className='bg-primary-light border border-secondary/40 rounded-xl p-5'>
          <p className='font-semibold text-text-primary text-base mb-2'>Our Vision</p>
          <p className='text-sm'>We're committed to redefining wellness by putting natural health within reach. Our experts are deeply rooted in ancient healing systems, certified in their fields, and chosen for their integrity and compassion.</p>
        </div>
        <div className='flex gap-8 pt-2'>
          {[['500+', 'Practitioners'], ['10K+', 'Patients Served'], ['15+', 'Specialities']].map(([v, l]) => (
            <div key={l} className='text-center'>
              <p className='text-2xl font-bold text-primary'>{v}</p>
              <p className='text-xs text-text-muted mt-0.5'>{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className='mb-16'>
      <div className='text-center mb-10'>
        <p className='section-label mb-2'>Our Values</p>
        <h2 className='section-title'>Why Choose ICRB</h2>
      </div>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
        {VALUES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className='card-hover p-6'>
            <div className='w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center mb-4'>
              <Icon className='w-5 h-5 text-primary' />
            </div>
            <h3 className='font-semibold text-text-primary mb-2'>{title}</h3>
            <p className='text-sm text-text-secondary leading-relaxed'>{desc}</p>
          </div>
        ))}
      </div>
    </div>

    <div className='hero-gradient rounded-2xl p-10 text-center text-white'>
      <h2 className='text-2xl font-bold mb-3'>Ready to Begin Your Wellness Journey?</h2>
      <p className='text-white/70 mb-6 max-w-md mx-auto text-sm'>Join thousands of patients who have discovered the power of natural healing with ICRB.</p>
      <Link to='/doctors' className='inline-block bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg text-sm hover:bg-gray-100 transition-colors'>
        Find a Practitioner
      </Link>
    </div>
  </div>
)

export default About
