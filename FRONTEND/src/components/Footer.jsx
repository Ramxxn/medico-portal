import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from 'react-icons/hi'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

const COMPANY = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/articles', label: 'Articles' },
  { to: '/contact', label: 'Contact Us' },
]

const LEGAL = [
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms & Conditions' },
  { to: '/faqs', label: 'FAQs' },
]

const SOCIALS = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
]

const Footer = () => (
  <footer className='bg-bg-card border-t border-border mt-20'>

    {/* Main footer content */}
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>

        {/* Brand */}
        <div className='lg:col-span-2'>
          <img className='h-9 w-auto mb-5' src={assets.logo} alt='ICRB' />
          <p className='text-sm leading-relaxed text-tx-3 max-w-sm'>
            ICRB connects you with certified bio-remedy practitioners — Ayurveda, naturopathy, homeopathy, and holistic therapies — for safe, natural, and personalized healthcare.
          </p>

          {/* Social icons */}
          <div className='flex gap-2.5 mt-6'>
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className='w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-colors group'
              >
                <Icon className='w-3.5 h-3.5 text-tx-3 group-hover:text-white transition-colors' />
              </a>
            ))}
          </div>
        </div>

        {/* Company links */}
        <div>
          <p className='text-tx-1 font-semibold text-sm mb-5'>Company</p>
          <ul className='space-y-3'>
            {COMPANY.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className='text-sm text-tx-3 hover:text-primary-dk transition-colors'
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Legal */}
        <div>
          <p className='text-tx-1 font-semibold text-sm mb-5'>Contact</p>
          <ul className='space-y-3 text-sm'>
            <li className='flex items-start gap-2.5'>
              <HiOutlineLocationMarker className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
              <span className='text-tx-3'>234 Herbal Way, Bengaluru, India – 560001</span>
            </li>
            <li className='flex items-center gap-2.5'>
              <HiOutlinePhone className='w-4 h-4 text-primary flex-shrink-0' />
              <a href='tel:+919876543210' className='text-tx-3 hover:text-primary-dk transition-colors'>
                +91 98765 43210
              </a>
            </li>
            <li className='flex items-center gap-2.5'>
              <HiOutlineMail className='w-4 h-4 text-primary flex-shrink-0' />
              <a href='mailto:hello@icrb.in' className='text-tx-3 hover:text-primary-dk transition-colors'>
                hello@icrb.in
              </a>
            </li>
          </ul>

          <p className='text-tx-1 font-semibold text-sm mt-7 mb-4'>Legal</p>
          <ul className='space-y-3'>
            {LEGAL.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className='text-sm text-tx-3 hover:text-primary-dk transition-colors'
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className='border-t border-border bg-bg-page'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2'>
        <p className='text-xs text-tx-4'>© 2025 ICRB Bio Remedies. All rights reserved.</p>
        <p className='text-xs text-tx-4'>Empowering natural wellness across India</p>
      </div>
    </div>

  </footer>
)

export default Footer
