import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi'

const FAQS = [
  { category: 'Appointments', items: [
    { q: 'How do I book an appointment?', a: 'Browse practitioners by speciality, select one, choose your preferred date and time slot, and confirm your booking. You need a free account to book.' },
    { q: 'Can I cancel or reschedule an appointment?', a: 'Yes. Go to "My Appointments" in your profile and click "Cancel Appointment". Rescheduling can be done by cancelling and booking a new slot.' },
    { q: 'Are online consultations available?', a: 'Yes, many practitioners offer online consultations. Check the practitioner\'s profile for their consultation type (online, offline, or both).' },
  ]},
  { category: 'Practitioners', items: [
    { q: 'How are practitioners verified?', a: 'All practitioners go through a manual verification process. We check their qualifications, certifications, and professional experience before listing them.' },
    { q: 'What specialities are available?', a: 'We cover Ayurveda, Naturopathy, Homeopathy, Yoga Therapy, Physiotherapy, Psychology, General Physician, and more.' },
  ]},
  { category: 'Payments', items: [
    { q: 'What payment methods are accepted?', a: 'We support online payments via Razorpay (UPI, cards, net banking). Cash payment can also be arranged directly with the practitioner.' },
    { q: 'Is my payment information secure?', a: 'Yes. All payments are processed through Razorpay, a PCI-DSS compliant payment gateway. We do not store your card details.' },
  ]},
  { category: 'Account', items: [
    { q: 'Is registration free?', a: 'Yes, creating a patient account on ICRB is completely free. You only pay for consultations.' },
    { q: 'How do I update my profile?', a: 'Go to "My Profile" after signing in. You can update your name, phone, address, gender, date of birth, and profile photo.' },
  ]},
]

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className='border border-border rounded-xl overflow-hidden'>
      <button onClick={() => setOpen(p => !p)} className='w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-surface-2 transition-colors'>
        <span className='font-medium text-text-primary text-sm pr-4'>{q}</span>
        {open ? <HiOutlineChevronUp className='w-4 h-4 text-primary flex-shrink-0' /> : <HiOutlineChevronDown className='w-4 h-4 text-text-muted flex-shrink-0' />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48' : 'max-h-0'}`}>
        <p className='px-5 py-4 text-sm text-text-secondary leading-relaxed bg-surface-2 border-t border-border'>{a}</p>
      </div>
    </div>
  )
}

const FAQs = () => (
  <div className='page'>
    <nav className='text-xs text-text-muted mb-6 flex items-center gap-2'>
      <Link to='/' className='hover:text-primary transition-colors'>Home</Link>
      <span>/</span>
      <span className='text-text-secondary'>FAQs</span>
    </nav>

    <div className='text-center mb-12'>
      <p className='section-label mb-2'>Help Center</p>
      <h1 className='text-4xl font-bold text-text-primary'>Frequently Asked Questions</h1>
      <p className='mt-4 text-text-secondary max-w-xl mx-auto'>Find answers to the most common questions about ICRB, appointments, practitioners, and payments.</p>
    </div>

    <div className='max-w-3xl mx-auto space-y-10 mb-16'>
      {FAQS.map(({ category, items }) => (
        <div key={category}>
          <p className='section-label mb-4'>{category}</p>
          <div className='space-y-2'>
            {items.map(item => <FAQItem key={item.q} {...item} />)}
          </div>
        </div>
      ))}
    </div>

    <div className='max-w-3xl mx-auto bg-primary-light rounded-2xl border border-secondary/30 p-8 text-center'>
      <h2 className='font-bold text-text-primary text-lg mb-2'>Still have questions?</h2>
      <p className='text-text-secondary text-sm mb-5'>Our support team is happy to help you with anything not covered here.</p>
      <Link to='/contact' className='btn-primary inline-block'>Contact Support</Link>
    </div>
  </div>
)

export default FAQs
