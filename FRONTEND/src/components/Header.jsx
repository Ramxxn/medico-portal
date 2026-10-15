import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  HiOutlineHeart,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineStar,
  HiOutlineArrowRight,
  HiOutlineMenu,
} from 'react-icons/hi'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)


  return (
    <main className="bg-[#f8f9fb] px-3 py-3 rounded-lg sm:px-5 sm:py-5">
      <section className="relative mx-auto max-w-[1440px] overflow-hidden rounded-xl border border-[#e5e9e7] bg-[#f3f5f8] shadow-sm">

        {/* Background wave */}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[43%] w-full"
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 105 C300 195 470 205 730 160 C1000 110 1190 30 1440 25 L1440 300 L0 300 Z"
            fill="#ffffff"
          />
        </svg>


        {menuOpen && (
          <nav className="relative z-40 mx-4 mb-3 rounded-lg border border-[#e5e9e7] bg-white p-3 shadow-md sm:hidden">
            {[...links, ['Login', '/login'], ['Sign up', '/signup']].map(
              ([label, href]) => (
                <Link
                  key={label}
                  to={href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-sm text-[#34483a] hover:bg-[#e8f2eb]"
                >
                  {label}
                </Link>
              )
            )}
          </nav>
        )}

        {/* Compact hero */}
        <div className="relative z-10 mx-auto grid min-h-[370px] max-w-7xl grid-cols-1 items-center px-5 pb-5 pt-5 sm:px-8 md:min-h-[350px] md:grid-cols-2 md:pb-14 lg:px-12">

          {/* Hero text */}
          <div className="relative z-20 max-w-[430px] pb-4 md:pb-0">
            <h1 className="max-w-[430px] text-[34px] font-bold leading-[1.12] tracking-tight text-[#183b2a] sm:text-[40px] lg:text-[46px]">
              Medical Portal
              <br />
              Simplified For
              <br />
              Everyone
            </h1>

            <p className="mt-3 max-w-[350px] text-[13px] leading-6 text-[#68766d] sm:text-sm">
              Quality healthcare made simple and accessible for everyone.
              Connect with trusted professionals for your everyday health needs.
            </p>

            <Link
              to="/services"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#2f7d4f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#256640]"
            >
              Read More
              <HiOutlineArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Doctor image */}
          <div className="relative mt-2 min-h-[240px] md:absolute md:inset-y-0 md:right-0 md:mt-0 md:w-[54%]">
            <img
              src="/images/heroSection/doctor-hero.png"
              alt="Smiling female doctor"
              className="absolute inset-0 z-[2] h-full w-full object-contain object-bottom"
            />

            {/* Review card */}
            <div className="absolute left-0 top-2 z-10 w-[175px] rounded-xl border border-[#edf0ed] bg-white p-3 shadow-lg sm:left-4 md:left-0 md:top-[23%] lg:left-5">
              <p className="text-xs font-semibold text-[#243d2e]">
                Our Special Doctor
              </p>

              <div className="mt-2 flex items-center">
                {[
                  'photo-1559839734-2b71ea197ec2',
                  'photo-1612349317150-e413f6a5b16d',
                  'photo-1594824476967-48c8b964273f',
                ].map((photo, i) => (
                  <img
                    key={photo}
                    src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=48&h=48&q=80`}
                    alt={`Doctor ${i + 1}`}
                    className={`h-6 w-6 rounded-full border-2 border-white object-cover ${
                      i ? '-ml-2' : ''
                    }`}
                  />
                ))}
                <span className="ml-2 text-[9px] text-[#68766d]">
                  +12 doctors
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] font-medium text-[#46574b]">
                  Valuable Review
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                  <HiOutlineStar className="h-3.5 w-3.5 fill-current" />
                  4.9
                </span>
              </div>

              <Link
                to="/doctors"
                className="mt-2 block rounded-md bg-[#e8f2eb] px-2 py-1.5 text-center text-[10px] font-semibold text-[#2f7d4f] hover:bg-[#dcebe0]"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>

        {/* Compact appointment panel */}
        <div className="relative z-20 mx-4 mb-4 sm:mx-8 sm:mb-5 lg:mx-auto lg:max-w-5xl">
          <div className="grid grid-cols-2 gap-3 rounded-xl border border-[#e8ece9] bg-white p-3 shadow-[0_8px_25px_rgba(30,60,40,0.08)] sm:gap-4 sm:p-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-center">

            <div className="flex min-w-0 items-center gap-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e8f2eb] text-[#2f7d4f]">
                <HiOutlineLocationMarker className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#34483a]">Location</p>
                <p className="mt-1 truncate text-[10px] text-[#89938c]">
                  New Delhi, India
                </p>
              </div>
            </div>

            <div className="flex min-w-0 items-center gap-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e8f2eb] text-[#2f7d4f]">
                <HiOutlineCalendar className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#34483a]">Date</p>
                <p className="mt-1 truncate text-[10px] text-[#89938c]">
                  Choose a date
                </p>
              </div>
            </div>

            <div className="flex min-w-0 items-center gap-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e8f2eb] text-[#2f7d4f]">
                <HiOutlineUser className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#34483a]">Doctor</p>
                <p className="mt-1 truncate text-[10px] text-[#89938c]">
                  Select specialist
                </p>
              </div>
            </div>

            <Link
              to="/doctors"
              className="col-span-2 flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-[#2f7d4f] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#256640] md:col-span-1"
            >
              Appointment
              <HiOutlineArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Header
