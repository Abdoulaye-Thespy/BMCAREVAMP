'use client'

import { Hotel, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export const HotelBooking = () => {
  const [hasConfirmed, setHasConfirmed] = useState(false)

  const handleLinkClick = (e) => {
    if (!hasConfirmed) {
      e.preventDefault()
      // Optional: Show an alert or toast message
      alert('Please confirm that you have read and understood the booking information before accessing the link.')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex items-center gap-3">
          <Hotel className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Hotel Accommodations</h2>
            <p className="text-blue-100 mt-1">Book your stay for the convention</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* QR Code Section - Rectangular Vertical */}
          <div className="md:w-1/3">
            <div className="bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-300">
              <div className="aspect-[3/4] relative bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                {/* Actual QR code image from public folder */}
                <Image
                  src="/QRBMCA.png" // Your QR code in public folder
                  alt="Hotel booking QR code"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p className="text-xs text-center text-gray-500">
                Scan this QR code with your phone to book your hotel
              </p>
            </div>
          </div>

          {/* Booking Information */}
          <div className="md:w-2/3 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Convenient Hotel Booking
            </h3>
            
            <p className="text-gray-600 mb-4">
              We've partnered with local hotels to provide comfortable accommodations 
              for convention attendees. Book directly through our partner portal.
            </p>

            {/* Warning Message */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.516-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-700">
                    <span className="font-bold">Important Booking Information:</span>
                    <br />
                    ALL reservations must be made using our designated booking link. 
                    If guests book outside of the link, breakfast pricing may differ and cannot be guaranteed. 
                    Also additional occupants will increase room cost if not booked using our link.
                  </p>
                  <p className="text-sm text-amber-700 mt-2">
                    All Guests must indicate the exact number of occupants in their room at the time of booking 
                    in order to receive the correct number of breakfast vouchers. Please note that the room rate 
                    remains the same regardless of the number of occupants as allowed by the hotel.
                  </p>
                </div>
              </div>
            </div>

            {/* Confirmation Radio Button */}
            <div className="mb-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="bookingConfirmation"
                  checked={hasConfirmed}
                  onChange={(e) => setHasConfirmed(e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  I have read and understood the booking information and agree to book only through the designated link below
                </span>
              </label>
            </div>

            {/* QR Code Alternative Link */}
            <div className={`bg-blue-50 rounded-lg p-4 border ${hasConfirmed ? 'border-blue-200' : 'border-blue-100 opacity-75'}`}>
              <p className="text-sm text-gray-700 mb-3">
                Can't scan the QR code? Use the link below to access the same booking portal:
              </p>
              {hasConfirmed ? (
                <a 
                  href="https://www.ihg.com/redirect?path=rates&brandCode=HI&localeCode=en&regionCode=1&hotelCode=DTTFA&checkInDate=27&checkInMonthYear=062026&checkOutDate=02&checkOutMonthYear=072026&_PMID=99801505&GPC=BMC&cn=no&adjustMonth=false&showApp=true&monthIndex=00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Click here to book your hotel
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <button
                  onClick={() => {
                    alert('Please confirm that you have read the booking information first by checking the radio button above.')
                  }}
                  className="inline-flex items-center gap-2 text-gray-400 cursor-not-allowed font-medium"
                  disabled
                >
                  Click here to book your hotel
                  <ExternalLink className="h-4 w-4" />
                </button>
              )}
            </div>

            <p className="text-xs text-gray-400 mt-4">
              *Hotel booking is handled by our partner booking platform. 
              All inquiries should be directed to the hotel directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}