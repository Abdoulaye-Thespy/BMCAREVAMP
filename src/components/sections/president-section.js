"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Award } from "lucide-react"
import Link from "next/link"

export default function PresidentSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-orange-50">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-100 rounded-full opacity-10 -ml-48 -mt-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100 rounded-full opacity-10 -mr-48 -mb-48" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-orange-600 font-semibold text-sm tracking-widest uppercase mb-4">
            Message from Leadership
          </p>
          <h2
            className={`text-5xl font-bold text-gray-900 mb-4 transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Message from the President
          </h2>
          <div className="w-20 h-1 bg-orange-600 mx-auto rounded-full" />
        </div>

        {/* Main Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image with decorative elements */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            {/* Decorative background shapes */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-orange-400 rounded-lg opacity-30" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-orange-300 rounded-lg opacity-20" />

            {/* Main image container */}
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
              <img src="/PR-BMCA.png" alt="BMCA President" className="w-full h-auto object-cover" />

              {/* Orange accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 to-orange-400" />
            </div>

            {/* Floating icons around image */}
            <div className="absolute top-8 -right-8 bg-white p-4 rounded-full shadow-lg animate-bounce">
              <Heart className="w-6 h-6 text-orange-600" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-orange-600 p-4 rounded-full shadow-lg animate-pulse">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Right Side - Message Content */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            {/* Message text - Two paragraphs */}
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-700">
                <strong className="text-orange-600">Our Mission:</strong> At BMCA, we are dedicated to fostering sustainable community development through compassionate service and collective action. Our comprehensive programs in Water, Education, Health & Fitness, Culture & Art, Kiteuh Assurance, and Infrastructure reflect our steadfast commitment to creating meaningful, lasting impact. We believe that strategic investment in community resources is fundamental to building a prosperous and resilient future for all.
              </p>

              <p className="text-lg leading-relaxed text-gray-700">
                <strong className="text-orange-600">Our Vision:</strong> The significant achievements we have realized—from serving thousands of individuals through our diverse initiatives to establishing strategic partnerships with local organizations—demonstrate the effectiveness of our collaborative approach. Together with our dedicated team, volunteers, and supporters, we continue our mission of building Bafut communities "one at a time," ensuring equitable access to essential services and opportunities. We remain committed to this transformative journey and welcome your continued partnership.
              </p>
            </div>

            {/* CTA Button */}
            <Link href="/programs" className="block mt-10">
              <button className="w-full bg-[#F5A623] hover:bg-[#F5A623]/90 text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 group">
                <span>Explore Our Programs</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-30" />
    </section>
  )
}