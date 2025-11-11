import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { MissionSection } from "@/components/mission-section"
import { StatsSection } from "@/components/stats-section"
import { Footer } from "@/components/footer"
import PresidentSection from "@/components/sections/president-section"
import ChaptersSection from "@/components/sections/chapters-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <PresidentSection />
      <MissionSection />
      <StatsSection />
      <ChaptersSection />
      <Footer />
    </main>
  )
}
