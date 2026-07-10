import React from 'react'
import { Link } from 'react-router-dom'

const Section = ({ title, children }) => (
  <section>
    <h2 className='font-semibold text-text-primary text-base mb-3'>{title}</h2>
    <div className='text-sm text-text-secondary leading-relaxed'>{children}</div>
  </section>
)

const PrivacyPolicy = () => (
  <div className='page max-w-3xl mx-auto'>
    <nav className='text-xs text-text-muted mb-6 flex items-center gap-2'>
      <Link to='/' className='hover:text-primary transition-colors'>Home</Link>
      <span>/</span>
      <span className='text-text-secondary'>Privacy Policy</span>
    </nav>
    <div className='mb-10'>
      <h1 className='text-3xl font-bold text-text-primary'>Privacy Policy</h1>
      <p className='text-text-muted text-sm mt-2'>Last updated: January 2025</p>
    </div>
    <div className='card p-8 space-y-8'>
      <Section title='1. Information We Collect'>
        <p>We collect information you provide directly to us, such as when you create an account, book an appointment, or contact us. This includes your name, email address, phone number, date of birth, and health-related information necessary for consultations.</p>
      </Section>
      <Section title='2. How We Use Your Information'>
        <p>We use the information we collect to provide, maintain, and improve our services, process appointments and payments, send you confirmations and reminders, and communicate with you about our services.</p>
      </Section>
      <Section title='3. Information Sharing'>
        <p>We share your information with practitioners only as necessary to facilitate your appointments. We do not sell, trade, or rent your personal information to third parties.</p>
      </Section>
      <Section title='4. Data Security'>
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Passwords are encrypted using bcrypt hashing.</p>
      </Section>
      <Section title='5. Cookies'>
        <p>We use local storage tokens for authentication purposes. We do not use tracking cookies for advertising. You can clear your browser storage at any time to remove stored tokens.</p>
      </Section>
      <Section title='6. Your Rights'>
        <p>You have the right to access, update, or delete your personal information at any time through your profile settings. For data deletion requests, please contact us at <a href='mailto:hello@icrb.in' className='text-primary hover:underline'>hello@icrb.in</a>.</p>
      </Section>
      <Section title='7. Contact Us'>
        <p>If you have any questions about this Privacy Policy, please contact us at <a href='mailto:hello@icrb.in' className='text-primary hover:underline'>hello@icrb.in</a> or write to us at 234 Herbal Way, Bengaluru, India – 560001.</p>
      </Section>
    </div>
  </div>
)

export default PrivacyPolicy
