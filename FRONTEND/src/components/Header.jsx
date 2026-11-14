
import React from 'react'
import { Link } from 'react-router-dom'
import {
  HiOutlineStar,
  HiOutlineArrowRight,
} from 'react-icons/hi'

const Header = () => {
  const doctors = [
    'photo-1559839734-2b71ea197ec2',
    'photo-1612349317150-e413f6a5b16d',
    'photo-1594824476967-48c8b964273f',
  ]

  return (
    <main className="w-full">
      <section className="relative mx-auto h-[24vh] min-h-[220px] max-h-[270px] overflow-hidden rounded-xl border border-[#e5e9e7] bg-[#f3f5f8] sm:h-[380px] sm:min-h-[380px] sm:max-h-none md:h-[420px] lg:h-[450px] md:max-w-[1440px]">

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

        {/* Hero content */}
        <div className="relative z-10 mx-auto grid h-full min-h-[220px] max-w-7xl grid-cols-2 items-center px-3 sm:min-h-[380px] sm:px-8 md:px-12">

          {/* Left content */}
          <div className="relative z-30 max-w-[430px] py-0 sm:py-2">
            <h1 className="text-[17px] font-bold leading-[1.12] tracking-tight text-[#183b2a] sm:text-[40px] md:text-[44px] lg:text-[46px]">
              Medical Portal
              <br />
              Simplified For
              <br />
              Everyone
            </h1>

            <p className="mt-1 max-w-[350px] text-[9px] leading-3 text-[#68766d] sm:mt-3 sm:text-sm sm:leading-6">
              Quality healthcare made simple and accessible for everyone.
              Connect with trusted professionals for your everyday health needs.
            </p>

            <Link
              to="/services"
              className="mt-2 inline-flex items-center gap-1 rounded-lg bg-[#2f7d4f] px-2.5 py-1.5 text-[9px] font-semibold text-white transition hover:bg-[#256640] sm:mt-5 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Read More
              <HiOutlineArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
          </div>

          {/* Right doctor image */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-[58%] sm:w-[60%] md:w-[62%] lg:w-[60%]">
            <img
              src="/images/heroSection/doctor-hero.png"
              alt="Smiling female doctor"
              className="
                absolute bottom-0 right-[-8%]
                h-full w-[125%]
                max-w-none object-contain object-bottom

                sm:right-[-8%]
                sm:h-[110%] sm:w-[120%]

                md:right-[-5%]
                md:h-[112%] md:w-[115%]

                lg:right-0
                lg:h-[108%] lg:w-[108%]

                xl:h-[105%] xl:w-[105%]
              "
            />
          </div>

          {/* Special doctor card */}
          <div className="absolute bottom-[5%] right-[3%] z-30 hidden w-[175px] rounded-xl border border-[#edf0ed] bg-white p-3 shadow-lg sm:bottom-[12%] sm:right-[5%] sm:block md:right-[4%] lg:right-[6%]">

            <p className="text-xs font-semibold text-[#243d2e]">
              Our Special Doctor
            </p>

            <div className="mt-2 flex items-center">
              {doctors.map((photo, i) => (
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
                <HiOutlineStar className="h-3.5 w-3.5" />
                4.9
              </span>
            </div>

            <Link
              to="/doctors"
              className="mt-2 block rounded-md bg-[#e8f2eb] px-2 py-1.5 text-center text-[10px] font-semibold text-[#2f7d4f] transition hover:bg-[#dcebe0]"
            >
              View Details
            </Link>
          </div>

        </div>
      </section>
    </main>
  )
}

export default Header
