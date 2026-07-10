import React from 'react'
import { Link } from 'react-router-dom'

const Section = ({ title, children }) => (
  <section>
    <h2 className='font-semibold text-text-primary text-base mb-3'>{title}</h2>
    <div className='text-sm text-text-secondary leading-relaxed'>{children}</div>
  </section>
)

const Terms = () => (
  <div className='page max-w-3xl mx-auto'>
    <nav className='text-xs text-text-muted mb-6 flex items-center gap-2'>
      <Link to='/' className='hover:text-primary transition-colors'>Home</Link>
      <span>/</span>
      <span className='text-text-secondary'>Terms & Conditions</span>
    </nav>
    <div className='mb-10'>
      <h1 className='text-3xl font-bold text-text-primary'>Terms & Conditions</h1>
      <p className='text-text-muted text-sm mt-2'>Last updated: January 2025</p>
    </div>
    <div className='card p-8 space-y-8'>
      <Section title='1. Acceptance of Terms'>
        <p>By accessing or using the ICRB platform, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
      </Section>
      <Section title='2. Use of Services'>
        <p>ICRB provides a platform to connect patients with natural health practitioners. We are not a medical provider. The consultations and advice provided by practitioners are their own professional opinions and do not constitute emergency medical advice.</p>
      </Section>
      <Section title='3. Account Responsibilities'>
        <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate.</p>
      </Section>
      <Section title='4. Appointments & Cancellations'>
        <p>Appointments booked through ICRB are subject to practitioner availability. Cancellations must be made in advance. Refund eligibility depends on the individual practitioner's cancellation policy.</p>
      </Section>
      <Section title='5. Payments'>
        <p>All payments are processed securely through Razorpay. ICRB does not store payment card information. By making a payment, you agree to Razorpay's terms of service.</p>
      </Section>
      <Section title='6. Limitation of Liability'>
        <p>ICRB shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform or services provided by practitioners listed on our platform.</p>
      </Section>
      <Section title='7. Changes to Terms'>
        <p>We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>
      </Section>
      <Section title='8. Contact'>
        <p>For questions about these Terms, contact us at <a href='mailto:hello@icrb.in' className='text-primary hover:underline'>hello@icrb.in</a>.</p>
      </Section>
    </div>
  </div>
)

export default Terms
