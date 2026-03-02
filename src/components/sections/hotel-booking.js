'use client'

import { Hotel, ExternalLink } from 'lucide-react'
import Image from 'next/image'

export const HotelBooking = () => {
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
                  src="/QRBMCA.jfif" // Your QR code in public folder
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

            {/* QR Code Alternative Link */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-sm text-gray-700 mb-3">
                Can't scan the QR code? Use the link below to access the same booking portal:
              </p>
              <a 
                href="https://hotel-booking-portal.com/bmca-2026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Click here to book your hotel
                <ExternalLink className="h-4 w-4" />
              </a>
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