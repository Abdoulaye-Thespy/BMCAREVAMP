import { Button } from "@/components/ui/button"

export function WhySection() {
  return (
    <section className="w-full py-16 text-white md:py-24 relative mb-8">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/bg-why-us.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div className="container relative z-10 px-4 md:px-6">
        {/* Header with button background color */}
        <div className="mb-4">
          <h1 className="inline-bloc px-k6 py-2 text-lg font-bold md:text-xl text-[#E67D00]">
            OUR HISTORY
          </h1>
        </div>

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
            <Button size="lg" variant="secondary" className="w-full bg-[#E67D00] text-foreground hover:bg-white/90">
              Learn Our Story
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-64 w-64 md:h-80 md:w-80">
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <div className="flex h-48 w-48 items-center justify-center rounded-full bg-primary overflow-hidden md:h-56 md:w-56">
                  <img
                    src="/icon-why-us.png"
                    alt="Our foundation"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}