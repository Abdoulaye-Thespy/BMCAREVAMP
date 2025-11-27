"use client"

import { useEffect, useRef, useState } from "react"

export function JourneySection() {
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

  const milestones = [
    {
      year: "2001",
      title: "Organization Founded",
      description: "BMCA DC established with First Convention organized, marking the beginning of our community development journey."
    },
    {
      year: "2005",
      title: "Foundation Building",
      description: "Established organizational structure and laid groundwork for future growth and community impact."
    },
    {
      year: "2009",
      title: "Medical & Technology Support",
      description: "Delivered vital medical supplies and computers to communities, organized cultural exchange with Fon Abumbi II's USA visit."
    },
    {
      year: "2011",
      title: "Organizational Stability",
      description: "Maintained operations and strengthened internal frameworks during transitional period."
    },
    {
      year: "2017",
      title: "Donor Expansion",
      description: "Significantly increased funding and donor base to support larger-scale community development projects."
    },
    {
      year: "2021",
      title: "COVID-19 Response & Expansion",
      description: "Delivered critical relief packages during pandemic and expanded reach by admitting Delaware Chapter."
    },
    {
      year: "2024",
      title: "Multi-Sector Growth",
      description: "Implemented comprehensive Health, Education and Water projects while expanding to United Chapter and Mid West Chapter."
    },
    {
      year: "2025",
      title: "Digital Innovation Era",
      description: "Focusing on infrastructure development and digital transformation of community services for greater impact."
    }
  ]

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <p className="text-orange-600 font-semibold text-sm tracking-widest uppercase mb-4">Our History</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">BMCA Journey Timeline</h2>
          <p className="text-lg text-gray-600 mb-6">Two decades of growth, impact, and community transformation</p>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-400 to-blue-500" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`md:flex ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Left/Right Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-2xl font-bold text-orange-600 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                    <p className="text-gray-700">{milestone.description}</p>
                  </div>
                </div>

                {/* Center Circle */}
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-12 h-12 bg-white border-4 border-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-6 h-6 bg-orange-500 rounded-full" />
                  </div>
                </div>

                {/* Mobile View Empty Space */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default JourneySection