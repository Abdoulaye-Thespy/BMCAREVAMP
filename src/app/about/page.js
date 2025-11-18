"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHeroSection } from "@/components/sections/about-hero-section"
import { AboutBmcaSection } from "@/components/sections/about-bmca-section"
import { JourneySection } from "@/components/sections/journey-section"
import { PresidentsGallerySection } from "@/components/sections/presidents-gallery-section"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutHeroSection />
      <AboutBmcaSection />
      <JourneySection />
      <PresidentsGallerySection />
      <Footer />
    </main>
  )
}
