import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { MissionSection } from "@/components/mission-section"
import { StatsSection } from "@/components/stats-section"
import { WhySection } from "@/components/why-section"
import { LeadershipSection } from "@/components/leadership-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <MissionSection />
      <StatsSection />
      <WhySection />
      <LeadershipSection />
      <Footer />
    </main>
  )
}
