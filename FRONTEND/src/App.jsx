import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Appointment from './pages/Appointment'
import Services from './pages/Services'
import Articles from './pages/Articles'
import FAQs from './pages/FAQs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'

function App() {
  return (
    <div className='min-h-screen bg-white'>
      <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} />
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/services' element={<Services />} />
          <Route path='/articles' element={<Articles />} />
          <Route path='/faqs' element={<FAQs />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms' element={<Terms />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
