"use client"

import { useEffect, useRef, useState } from "react"

export function AboutHeroSection() {
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
    <section ref={sectionRef} className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden pt-20">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-700 rounded-full opacity-20 -ml-48 -mt-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-700 rounded-full opacity-20 -mr-48 -mb-48" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h1
          className={`text-5xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          About BMCA
        </h1>
        <p
          className={`text-xl md:text-2xl text-blue-100 mb-8 transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Building Stronger Communities Through Compassion and Service
        </p>
        <div
          className={`w-24 h-1 bg-orange-500 mx-auto rounded-full transition-all duration-1000 delay-300 ${
            isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
        />
      </div>
    </section>
  )
}

export default AboutHeroSection
