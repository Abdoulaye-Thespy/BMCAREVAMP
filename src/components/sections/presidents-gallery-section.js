"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { School, Droplets, TrendingUp } from "lucide-react"

export function PresidentsGallerySection() {
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

  const presidents = [
    {
      id: 4,
      name: "Emmanuel Neba",
      year: "2024 - Present",
      role: "Current President",
      image: "/VP-BMCA.png",
      achievement: "Leading BMCA into a new era with focus on infrastructure development and digital innovation in community services.",
      accomplishments: [
        "Launched infrastructure development projects",
        "Introduced digital literacy programs",
        "Expanded kiteuh mutual assurance program"
      ]
    },
    {
      id: 3,
      name: "Mrs. Regina Tamun",
      year: "2019 - 2024",
      role: "President",
      image: "/PR-BMCA.png",
      achievement: "Led the cultural preservation initiative and strengthened BMCA's commitment to women empowerment and education.",
      accomplishments: [
        "Launched cultural heritage preservation project",
        "Established women's economic empowerment programs",
        "Increased scholarship awards by 200%"
      ]
    }
  ]

  const stats = [
    {
      icon: School,
      value: 8123,
      label: "pupils supported",
    },
    {
      icon: Droplets,
      value: 20,
      label: "Water projects",
    },
    {
      icon: TrendingUp,
      value: 90000,
      label: "People Impacted",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-orange-600 font-semibold text-sm tracking-widest uppercase mb-4">Leadership</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Presidents & Achievements</h2>
          <p className="text-lg text-gray-600 mb-4">
            Meet the visionary leaders who have guided BMCA USA through the years
          </p>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Presidents Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {presidents.map((president, index) => (
            <Card
              key={president.id}
              className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-64 md:h-auto overflow-hidden bg-gray-200">
                    <img
                      src={president.image || "/placeholder.svg"}
                      alt={president.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/20 to-transparent p-4">
                      <span className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        {president.year}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{president.name}</h3>
                      <p className="text-orange-600 font-semibold text-sm mb-4">{president.role}</p>
                      
                      <div className="mb-6 pb-6 border-b-2 border-orange-100">
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {president.achievement}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">Key Accomplishments</p>
                        <ul className="space-y-2">
                          {president.accomplishments.map((accomplishment, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-orange-500 font-bold mt-0.5">✓</span>
                              <span>{accomplishment}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Legacy Impact Section */}
        <div className="mt-16 pt-16 border-t-2 border-gray-200">
          <div className="bg-gradient-to-r from-blue-900 to-orange-600 text-white rounded-lg p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Our Leadership's Legacy</h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Under the guidance of our visionary presidents, BMCA USA has grown from a small initiative into a major force for positive change, touching thousands of lives and creating sustainable development across multiple communities.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
                  <div className="flex flex-col items-center">
                    <stat.icon className="h-12 w-12 text-white mb-4" />
                    <div className="text-4xl font-bold mb-2">{stat.value.toLocaleString()}</div>
                    <p className="text-sm text-white/90 capitalize">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PresidentsGallerySection