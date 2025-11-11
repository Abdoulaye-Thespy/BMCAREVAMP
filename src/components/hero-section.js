"use client"
import { Button } from "@/components/ui/button"
import { CreditCard, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"

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
    title: "Building Futures, Changing Lives",
    description: "From traditional kingdom to modern development. Continuing Bafut's legacy of producing doctors, engineers, and leaders through education and opportunity.",
    buttonText: "Donate Now", 
    textPosition: "left",
  }
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [animateContent, setAnimateContent] = useState(false)
  const sliderRef = useRef(null)

  // Minimum swipe distance (px)
  const minSwipeDistance = 50

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setAnimateContent(false)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setAnimateContent(false)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Touch handlers for swipe
  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
      setAnimateContent(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [currentSlide])

  // Auto-slide every 8 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 8000)
    return () => clearInterval(interval)
  }, [])

  const currentSlideData = slides[currentSlide]

  return (
    <section 
      ref={sliderRef}
      className="relative min-h-[680px] w-full overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Slides with Zoom Animation */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
            index === currentSlide 
              ? 'opacity-100 scale-110 animate-zoom' 
              : 'opacity-0 scale-105'
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

      {/* Navigation Arrows - Only on desktop */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition-all hover:bg-white/30 backdrop-blur-sm hidden md:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition-all hover:bg-white/30 backdrop-blur-sm hidden md:block"
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
                setAnimateContent(false)
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

      {/* Swipe instruction for mobile */}
      <div className="absolute bottom-20 left-1/2 z-20 -translate-x-1/2 md:hidden">
        <div className="flex items-center space-x-2 rounded-full bg-black/30 px-3 py-1 backdrop-blur-sm">
          <div className="flex space-x-1">
            <div className="h-1 w-1 rounded-full bg-white/60 animate-pulse"></div>
            <div className="h-1 w-1 rounded-full bg-white/60 animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="h-1 w-1 rounded-full bg-white/60 animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
          <span className="text-xs text-white/80">Swipe to navigate</span>
        </div>
      </div>

      {/* Content Container - Full width with mobile-only larger text */}
      <div className="relative z-10 flex min-h-[700px] w-full items-center px-6 py-5 sm:px-8 md:px-12 lg:px-20">
        {/* Single content container with mobile-optimized text sizes */}
        <div className={`w-full transition-all duration-300 ${
          currentSlideData.textPosition === 'center' 
            ? 'md:max-w-2xl md:mx-auto' 
            : 'md:max-w-2xl'
        }`}>
          {/* Header - Staggered animation */}
          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight text-white sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
            {currentSlideData.title.split('\n').map((line, index) => (
              <span 
                key={index} 
                className={`block transition-all duration-700 ${
                  animateContent 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${200 + index * 100}ms`
                }}
              >
                {line}
              </span>
            ))}
          </h1>
          
          {/* Paragraph - Fade in with delay */}
          <p className={`mb-8 text-pretty text-lg text-white/90 sm:text-xl md:text-base lg:text-lg transition-all duration-700 ${
            animateContent 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-6'
          }`}
          style={{
            transitionDelay: '500ms'
          }}>
            {currentSlideData.description}
          </p>
          
          {/* Button - Scale and fade in */}
          <div className={`transition-all duration-700 ${
            animateContent 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-95'
          }`}
          style={{
            transitionDelay: '700ms'
          }}>
            <Button 
              size="lg" 
              className="bg-[#F5A623] hover:bg-[#F5A623]/90 text-white transform transition-all duration-500 hover:scale-105 text-base py-6 px-8 md:py-4 md:px-6 md:text-sm"
            >
              <CreditCard className="mr-2 h-5 w-5 md:h-4 md:w-4" />
              {currentSlideData.buttonText}
            </Button>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes zoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
        .animate-zoom {
          animation: zoom 5s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  )
}