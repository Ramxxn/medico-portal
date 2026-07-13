import React, { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getServiceBySlug } from '../data/serviceContent'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { HiOutlineArrowRight, HiOutlineCheckCircle, HiOutlineSparkles } from 'react-icons/hi'

const ServiceDetail = () => {
  const { slug } = useParams()
  const { doctors } = useContext(AppContext)

  const service = useMemo(() => getServiceBySlug(slug), [slug])
  const relatedDoctors = useMemo(() => {
    if (!service) return []
    return doctors.filter((doctor) => doctor.speciality?.toLowerCase() === service.speciality.toLowerCase())
  }, [doctors, service])

  if (!service) {
    return (
      <div className='page py-20 text-center'>
        <p className='text-lg font-semibold text-tx-1'>Service not found</p>
        <Link to='/services' className='mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary'>Back to services <HiOutlineArrowRight className='w-4 h-4' /></Link>
      </div>
    )
  }

  return (
    <div className='page'>
      <nav className='text-xs text-tx-3 mb-6 flex items-center gap-2'>
        <Link to='/' className='hover:text-primary transition-colors'>Home</Link>
        <span>/</span>
        <Link to='/services' className='hover:text-primary transition-colors'>Services</Link>
        <span>/</span>
        <span className='text-tx-2'>{service.title}</span>
      </nav>

      <section className='grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-center rounded border border-border bg-white p-6 shadow-card'>
        <div>
          <p className='section-label mb-2'>Specialized Care</p>
          <h1 className='text-3xl md:text-4xl font-semibold text-tx-1'>{service.title}</h1>
          <p className='mt-4 text-base text-tx-2 leading-7'>{service.tagline}</p>
          <p className='mt-4 text-sm text-tx-3 leading-7'>{service.overview}</p>
          <div className='mt-6 flex flex-wrap gap-3'>
            <Link to='/doctors' className='btn-primary'>Book a consultation</Link>
            <Link to='/contact' className='btn-outline'>Talk to our team</Link>
          </div>
        </div>
        <div className='overflow-hidden rounded border border-border bg-surface-2'>
          <img src={service.image} alt={service.title} className='h-72 w-full object-cover' />
        </div>
      </section>

      <section className='mt-10 grid md:grid-cols-2 gap-6'>
        <div className='rounded border border-border bg-white p-6 shadow-card'>
          <div className='flex items-center gap-2 text-primary'><HiOutlineSparkles className='w-5 h-5' /><h2 className='text-xl font-semibold text-tx-1'>Benefits</h2></div>
          <ul className='mt-4 space-y-3 text-sm text-tx-2'>
            {service.benefits.map((item) => (
              <li key={item} className='flex gap-2'><HiOutlineCheckCircle className='w-5 h-5 text-primary flex-shrink-0 mt-0.5' /><span>{item}</span></li>
            ))}
          </ul>
        </div>
        <div className='rounded border border-border bg-white p-6 shadow-card'>
          <h2 className='text-xl font-semibold text-tx-1'>How it works</h2>
          <ol className='mt-4 space-y-3 text-sm text-tx-2'>
            {service.process.map((step, index) => (
              <li key={step} className='flex gap-2'><span className='font-semibold text-primary'>{index + 1}.</span><span>{step}</span></li>
            ))}
          </ol>
        </div>
      </section>

      <section className='mt-10 rounded border border-border bg-white p-6 shadow-card'>
        <h2 className='text-xl font-semibold text-tx-1'>Why choose us</h2>
        <div className='mt-5 grid md:grid-cols-3 gap-4'>
          {service.whyChoose.map((item) => (
            <div key={item} className='rounded border border-border bg-surface-2 p-4 text-sm text-tx-2'>{item}</div>
          ))}
        </div>
      </section>

      <section className='mt-10 rounded border border-border bg-white p-6 shadow-card'>
        <h2 className='text-xl font-semibold text-tx-1'>Meet related practitioners</h2>
        <p className='mt-2 text-sm text-tx-3'>Doctors matched to this speciality are shown below.</p>
        {relatedDoctors.length > 0 ? (
          <div className='mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {relatedDoctors.map((doctor) => (
              <div key={doctor._id} className='rounded border border-border p-4'>
                <p className='font-semibold text-tx-1'>{doctor.name}</p>
                <p className='mt-1 text-sm text-tx-3'>{doctor.speciality}</p>
                {doctor.fees && <p className='mt-3 text-sm font-medium text-primary'>₹{doctor.fees} / session</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className='mt-6 text-sm text-tx-3'>No practitioners are available for this speciality yet.</p>
        )}
      </section>

      <section className='mt-10 rounded border border-border bg-white p-6 shadow-card'>
        <h2 className='text-xl font-semibold text-tx-1'>Frequently asked questions</h2>
        <div className='mt-5 space-y-3'>
          {service.faqs.map((faq) => (
            <div key={faq.question} className='rounded border border-border bg-surface-2 p-4'>
              <p className='font-medium text-tx-1'>{faq.question}</p>
              <p className='mt-2 text-sm text-tx-2'>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='mt-10 rounded border border-border bg-white p-8 text-center shadow-card'>
        <h2 className='text-2xl font-semibold text-tx-1'>Ready for your next step?</h2>
        <p className='mt-3 text-sm text-tx-2'>Book a consultation and let our clinicians guide you toward a clearer plan.</p>
        <div className='mt-6 flex justify-center flex-wrap gap-3'>
          <Link to='/doctors' className='btn-primary'>Find a practitioner</Link>
          <Link to='/contact' className='btn-outline'>Contact us</Link>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetail
