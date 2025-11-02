"use client"

import { Heart, Users, TrendingUp } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const stats = [
    {
      icon: Heart,
      value: 8123,
      label: "Meals Donated",
    },
    {
      icon: Users,
      value: 500,
      label: "Members",
    },
    {
      icon: TrendingUp,
      value: 30000,
      label: "People Impacted",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="w-full bg-[#F9DFBF] py-16 md:py-24 mb-8">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatItem({ icon: Icon, value, label, isVisible }) {
  const [count, setCount] = useState(0)
  const duration = 2000 // 2 seconds
  const steps = 60
  const stepDuration = duration / steps

  useEffect(() => {
    if (!isVisible) return

    let currentStep = 0
    const increment = value / steps

    const timer = setInterval(() => {
      currentStep++
      const nextCount = Math.min(Math.floor(increment * currentStep), value)
      setCount(nextCount)

      if (currentStep >= steps) {
        clearInterval(timer)
        setCount(value) // Ensure we end at the exact value
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isVisible, value, stepDuration])

  // Format large numbers with commas
  const formattedValue = count.toLocaleString()

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
        <Icon className="h-10 w-10 text-primary-foreground" />
      </div>
      <div className="mb-2 text-4xl font-bold text-foreground md:text-5xl">
        {formattedValue}+
      </div>
      <div className="text-lg text-muted-foreground">{label}</div>
    </div>
  )
}