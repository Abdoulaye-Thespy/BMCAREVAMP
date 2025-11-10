"use client"
import { Button } from "@/components/ui/button"
import { CreditCard, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

const slides = [
  {
    id: 1,
    backgroundImage: "/homebcma.jpg",
    title: "Building Bafut communities\none at a time",
    description: "Serving 120,000 people across 340 square kilometers in Cameroon's North West Province. Preserving our rich culture while building modern communities.",
    buttonText: "Donate Now",
    textPosition: "left",
  },
  {
    id: 2,
    backgroundImage: "/bg-why-us.jpg",
    title: "Empowering Futures\nTransforming Lives",
    description: "From traditional kingdom to modern development. Continuing Bafut's legacy of producing doctors, engineers, and leaders through education and opportunity.",
    buttonText: "Donate Now", 
    textPosition: "center",
  }
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [currentSlide])

  // Auto-slide every 8 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 8000)
    return () => clearInterval(interval)
  }, [])

  const currentSlideData = slides[currentSlide]

  return (
    <section className="relative min-h-[700px] w-full overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{
            backgroundImage: `url('${slide.backgroundImage}')`,
          }}
        >
          {/* Black gradient overlay only for first slide */}
          {slide.id === 1 && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/60 to-transparent" />
          )}
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition-all hover:bg-white/30 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition-all hover:bg-white/30 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setCurrentSlide(index)
              }
            }}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content Container - Reduced padding to move text up */}
      <div className="container relative z-10 flex min-h-[700px] items-center px-4 py-5 md:px-6">
        {/* Left-aligned Content with extra padding */}
        <div className={`max-w-2xl transition-all duration-1000 ${
          currentSlideData.textPosition === 'left' 
            ? 'translate-x-0 opacity-100 pl-12 md:pl-20' 
            : '-translate-x-20 opacity-0 pointer-events-none pl-12 md:pl-20'
        }`}>
          <h1 className="mb-6 text-balance text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            {currentSlideData.title.split('\n').map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mb-8 text-pretty text-lg text-white/90 md:text-xl">
            {currentSlideData.description}
          </p>
          <Button 
            size="lg" 
            className="bg-[#F5A623] hover:bg-[#F5A623]/90 text-white transform transition-all duration-500 hover:scale-105"
          >
            <CreditCard className="mr-2 h-5 w-5" />
            {currentSlideData.buttonText}
          </Button>
        </div>

        {/* Center-aligned Content for second slide */}
        <div className={`mx-auto max-w-2xl text-left transition-all duration-1000 ${
          currentSlideData.textPosition === 'center' 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-20 opacity-0 pointer-events-none'
        }`}>
          <h1 className="mb-6 text-balance text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            {currentSlideData.title.split('\n').map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mb-8 text-pretty text-lg text-white/90 md:text-xl">
            {currentSlideData.description}
          </p>
          <Button 
            size="lg" 
            className="bg-[#F5A623] hover:bg-[#F5A623]/90 text-white transform transition-all duration-500 hover:scale-105"
          >
            <CreditCard className="mr-2 h-5 w-5" />
            {currentSlideData.buttonText}
          </Button>
        </div>
      </div>
    </section>
  )
}