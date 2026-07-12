import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from "axios"
import {
  HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail,
  HiOutlineClock, HiOutlineCheckCircle
} from 'react-icons/hi'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const { submitContactRequest } = useContext(AppContext);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
        return toast.error("Please fill all required fields");
    }

    setLoading(true);

    const data = await submitContactRequest(form);

    if (data.success) {
        toast.success(data.message);
        setSent(true);

        setForm({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        });
    } else {
        toast.error(data.message);
    }

    setLoading(false);
};

  const INFO = [
    { icon: HiOutlineLocationMarker, label: 'Our Wellness Hub', value: '234 Herbal Way, Green District\nBengaluru, India – 560001' },
    { icon: HiOutlinePhone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
    { icon: HiOutlineMail, label: 'Email', value: 'hello@icrb.in', href: 'mailto:hello@icrb.in' },
    { icon: HiOutlineClock, label: 'Working Hours', value: 'Mon – Sat: 9:00 AM – 6:00 PM IST' },
  ]

  return (
    <div className='page'>
      <nav className='text-xs text-text-muted mb-6 flex items-center gap-2'>
        <Link to='/' className='hover:text-primary transition-colors'>Home</Link>
        <span>/</span>
        <span className='text-text-secondary'>Contact Us</span>
      </nav>

      <div className='text-center mb-12'>
        <p className='section-label mb-2'>Get in Touch</p>
        <h1 className='text-4xl font-bold text-text-primary'>Contact Us</h1>
        <p className='mt-4 text-text-secondary max-w-xl mx-auto'>Have a question or need help? Our team is here to assist you on your wellness journey.</p>
      </div>

      <div className='grid md:grid-cols-2 gap-10 mb-16 items-start'>
        {/* Info */}
        <div>
          <img className='w-full rounded-2xl shadow-card object-cover max-h-56 mb-8' src={assets.contact_image} alt='Contact ICRB' />
          <div className='space-y-5'>
            {INFO.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className='flex items-start gap-4'>
                <div className='w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0'>
                  <Icon className='w-4 h-4 text-primary' />
                </div>
                <div>
                  <p className='font-semibold text-text-primary text-sm'>{label}</p>
                  {href
                    ? <a href={href} className='text-primary text-sm hover:underline'>{value}</a>
                    : <p className='text-text-secondary text-sm whitespace-pre-line'>{value}</p>
                  }
                </div>
              </div>
            ))}
          </div>
          <div className='mt-8 p-5 bg-primary-light rounded-xl border border-secondary/30'>
            <p className='font-semibold text-text-primary mb-1.5'>Join Our Team</p>
            <p className='text-sm text-text-secondary mb-3'>Passionate about holistic healing? We're always looking for dedicated practitioners and wellness professionals.</p>
            <Link to='/contact' className='text-primary text-sm font-medium hover:underline'>Explore Careers →</Link>
          </div>
        </div>

        {/* Form */}
        <div className='card p-8'>
          {sent ? (
            <div className='text-center py-12'>
              <HiOutlineCheckCircle className='w-14 h-14 text-success mx-auto mb-4' />
              <h3 className='text-xl font-bold text-text-primary mb-2'>Message Sent!</h3>
              <p className='text-text-secondary text-sm'>We'll get back to you within 24 hours.</p>
              <button onClick={() => setSent(false)} className='mt-6 text-primary text-sm underline'>Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <h2 className='text-xl font-bold text-text-primary mb-6'>Send a Message</h2>
              <div className='grid sm:grid-cols-2 gap-4'>
                <div>
                  <label className='label'>Full Name <span className='text-error'>*</span></label>
                  <input name='name' value={form.name} onChange={handleChange} required placeholder='Your name' className='input' />
                </div>
                <div>
                  <label className='label'>Email <span className='text-error'>*</span></label>
                  <input name='email' type='email' value={form.email} onChange={handleChange} required placeholder='your@email.com' className='input' />
                </div>
              </div>
              <div className='grid sm:grid-cols-2 gap-4'>
                <div>
                  <label className='label'>Phone</label>
                  <input name='phone' value={form.phone} onChange={handleChange} placeholder='+91 XXXXX XXXXX' className='input' />
                </div>
                <div>
                  <label className='label'>Subject</label>
                  <input name='subject' value={form.subject} onChange={handleChange} placeholder='How can we help?' className='input' />
                </div>
              </div>
              <div>
                <label className='label'>Message <span className='text-error'>*</span></label>
                <textarea name='message' value={form.message} onChange={handleChange} required rows={5} placeholder='Tell us more...' className='input resize-none' />
              </div>
              <button type='submit' disabled={loading} className='btn-primary w-full justify-center'>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact
