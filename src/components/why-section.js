import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react" // Declare the Heart variable here

export function WhySection() {
  return (
    <section className="w-full bg-gradient-to-br from-amber-900 to-stone-900 py-16 text-white md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Why did we start this foundation?</h2>
            <p className="mb-6 text-pretty text-lg leading-relaxed text-white/90">
              In 2019, we witnessed the devastating impact of economic crisis on Beirut's communities. Families who once
              thrived were suddenly struggling to put food on the table. We knew we had to act.
            </p>
            <p className="mb-8 text-pretty text-lg leading-relaxed text-white/90">
              What started as a small group of volunteers has grown into a movement of hope. We believe every person
              deserves dignity, opportunity, and support. Through community-driven programs, we're not just providing
              aid—we're building lasting change.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-foreground hover:bg-white/90">
              Learn Our Story
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-64 w-64 md:h-80 md:w-80">
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <div className="flex h-48 w-48 items-center justify-center rounded-full bg-primary md:h-56 md:w-56">
                  <Heart className="h-24 w-24 text-primary-foreground md:h-28 md:w-28" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
