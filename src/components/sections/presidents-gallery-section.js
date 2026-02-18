"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { School, Droplets, TrendingUp, User } from "lucide-react"

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
      id: 1,
      name: "Ntoonfor E. NIBA",
      year: "2025 till Present",
      role: "President",
      image: "/VP-BMCA.png",
      accomplishments: [
        "Revamp the BMCA Website"
      ]
    },
    {
      id: 2,
      name: "Dr. Regina Tamon",
      year: "2021 - 2025",
      role: "President",
      image: "/PR-BMCA.png",
      accomplishments: [
        "Implemented the Education program",
        "Initiated the water program",
        "Created the First BMCA traditional JUJU dance group",
        "Created United Chapters",
        "Initiated the Kiteuh program",
        "Implemented payment gateway for online transactions",
        "Initiated the mini convention concept",
        "Successful implementation of Health, Education and Water projects",
        "Added United Chapter and Mid West Chapter"
      ]
    },
    {
      id: 3,
      name: "Atangcho Nebaneh Nixon",
      year: "2017 - 2021",
      role: "President",
      image: null,
      accomplishments: [
        "Delivered COVID 19 relief packages to Bafut",
        "Admitted Delaware Chapter"
      ]
    },
    {
      id: 4,
      name: "Ms. Jullietta Nchang Neba",
      year: "2011 - 2017",
      role: "President",
      image: null,
      accomplishments: [
        "Grader donation to Bafut"
      ]
    },
    {
      id: 5,
      name: "Denis Mufersi",
      year: "2009 - 2011",
      role: "President",
      image: null,
      accomplishments: [
        "Led organization through early growth phase"
      ]
    },
    {
      id: 6,
      name: "Dr. John Mbonifor",
      year: "2005 - 2009",
      role: "President",
      image: null,
      accomplishments: [
        "Successful delivery of Medical Supplies and Computers",
        "Organized the visit of Fon Abumbi ll to USA"
      ]
    },
    {
      id: 7,
      name: "Tangie Neba Ngwa Suh",
      year: "2001 - 2005",
      role: "President",
      image: null,
      accomplishments: [
        "Laid foundation for growth of the organization"
      ]
    },
    {
      id: 8,
      name: "Founding Leadership",
      year: "2001",
      role: "Founding Members",
      image: null,
      foundingMembers: true,
      accomplishments: [
        "Founding of BMCA DC",
        "Organization of First Convention"
      ],
      foundingMembersList: [
        "Abong Emmanuel",
        "Kilian Songwe (Chair)",
        "Manka'a Fokwa (Vice Chair)"
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
              <CardContent className="p-0 h-full">
                <div className="grid md:grid-cols-2 gap-0 h-full">
                  {/* Image Section - Left Column - Fixed Height */}
                  <div className="relative h-80 md:h-full overflow-hidden bg-gray-200">
                    {president.image ? (
                      <img
                        src={president.image}
                        alt={president.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 ${
                        president.image ? 'hidden' : 'flex'
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-3">
                          {president.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <User className="w-10 h-10 text-orange-400 mx-auto mb-2" />
                        <p className="text-orange-600 text-xs font-medium">No Image Available</p>
                      </div>
                    </div>
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/20 to-transparent p-4">
                      <span className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        {president.year}
                      </span>
                    </div>
                  </div>

                  {/* Content Section - Right Column - Scrollable if needed */}
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{president.name}</h3>
                      <p className="text-orange-600 font-semibold text-sm mb-4">{president.role}</p>
                      
                      {/* Founding Members List - Special rendering for founding members */}
                      {president.foundingMembers && president.foundingMembersList && (
                        <div className="mb-4 pb-4 border-b-2 border-orange-100">
                          <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">Founding Members</p>
                          <ul className="space-y-2">
                            {president.foundingMembersList.map((member, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="text-orange-500 font-bold mt-0.5">•</span>
                                <span className="font-medium">{member}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Accomplishments List */}
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