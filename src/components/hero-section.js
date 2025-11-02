import { Button } from "@/components/ui/button"
import { CreditCard } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[700px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-right"
        style={{
          backgroundImage: `url('/homebcma.jpg')`,
        }}
      >
        {/* Gradient overlay from black (top) to transparent (bottom) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/60 to-transparent" />
      </div>

      <div className="container relative z-10 flex min-h-[700px] items-center px-4 py-20 md:px-6">
        <div className="max-w-2xl">
          <h1 className="mb-6 text-balance text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            Building Bafut communities<br />one at a time
          </h1>
          <p className="mb-8 text-pretty text-lg text-white/90 md:text-xl">
            Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users.
            Trusted by over 4,000 startups.
          </p>
          <Button size="lg" className="bg-[#F5A623] hover:bg-[#F5A623]/90 text-white">
            <CreditCard className="mr-2 h-5 w-5" />
            Donate Now
          </Button>
        </div>
      </div>
    </section>
  )
}