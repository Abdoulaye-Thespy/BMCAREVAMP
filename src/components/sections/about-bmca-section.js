"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Target, Heart, Users, Sprout, Star } from "lucide-react"

export function AboutBmcaSection() {
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Who We Are
          </h2>
          <p className="text-lg text-gray-600">Understanding BMCA's mission and vision</p>
          <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* BMCA Information Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Vision Card */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To create an environment where Bafut people collaborate in diverse neighborhoods for sustainable community development. This vision reflects our deep commitment to unity, inclusiveness, and progress. At BMCA USA, we believe that when we come together - sharing ideas, resources, and cultural heritage - we build stronger communities that thrive for generations.
              </p>
            </CardContent>
          </Card>

          {/* Mission Card */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                At BMCA USA, we are dedicated to fostering sustainable community development through compassionate service and collective action. Our comprehensive programs in Water, Education, Health & Fitness, Culture & Art, Kiteuh Assurance, and Infrastructure reflect our steadfast commitment to creating meaningful, lasting impact. We believe that strategic investment in community resources is fundamental to building a prosperous and resilient future for all.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Our mission is not just about development; it is about creating a sense of belonging and mutual support wherever Bafut people live. By fostering collaboration across neighborhoods and embracing diversity, we ensure that our traditions remain vibrant while adapting to modern challenges. Together, we can transform aspirations into reality, making every community a beacon of sustainability and solidarity.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg p-8 md:p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Heart className="h-8 w-8 text-red-500" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Compassion</h4>
              <p className="text-sm text-gray-700">We act with empathy and care for all communities we serve</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Collaboration</h4>
              <p className="text-sm text-gray-700">Partnerships drive our collective impact and success</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Sprout className="h-8 w-8 text-green-500" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Sustainability</h4>
              <p className="text-sm text-gray-700">We create lasting solutions for long-term community growth</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Excellence</h4>
              <p className="text-sm text-gray-700">We strive for the highest standards in all we do</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutBmcaSection