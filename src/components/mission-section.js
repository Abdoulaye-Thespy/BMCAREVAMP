import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function MissionSection() {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          Who we are
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Card 1 - Bafut History */}
          <Card className="overflow-hidden border-none shadow-lg" style={{
            background: 'linear-gradient(135deg, #EB9630 0%, #F0AE61 100%)'
          }}>
            <CardContent className="p-0">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="relative h-56 md:h-64 px-4 py-4 md:pl-6 md:pr-2 md:py-6">
                  <img
                    src="/kingdom.png"
                    alt="Bafut traditional kingdom"
                    className="h-full w-full object-cover rounded-2xl"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 text-white">
                  <h3 className="mb-3 text-2xl font-bold">The Bafut Kingdom</h3>
                  <p className="mb-4 text-white/90">
                    Bafut in Northwest Cameroon spans 340km² with 120,000 people across 26 wards. As the strongest Grassfields kingdom, it's traditionally ruled by the Fon and kwifor council.
                  </p>
                  <Button asChild className="w-fit bg-white text-[#EB9630] hover:bg-white/90">
                    <a href="/about">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 - Colonial History & Modern Era */}
          <Card className="overflow-hidden border-none shadow-lg" style={{
            background: 'linear-gradient(135deg, #EB9630 0%, #F0AE61 100%)'
          }}>
            <CardContent className="p-0">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col justify-center p-6 text-white order-2 md:order-1">
                  <h3 className="mb-3 text-2xl font-bold">Our Journey</h3>
                  <p className="mb-4 text-white/90">
                    From German colonization to British rule, Bafut has preserved its rich culture. Today we celebrate achievements in education, law, and professional fields while maintaining traditions.
                  </p>
                  <Button asChild className="w-fit bg-white text-[#EB9630] hover:bg-white/90">
                    <a href="/about">
                      Read Our Story
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <div className="relative h-56 md:h-64 px-4 py-4 md:pl-2 md:pr-6 md:py-6 order-1 md:order-2">
                  <img
                    src="/bmcaprof1.jpeg"
                    alt="Bafut modern achievements"
                    className="h-full w-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Link to full about page */}
        <div className="mt-12 text-center">
          <Button asChild className="text-white hover:bg-white/90 border-white" size="lg" style={{
            background: 'linear-gradient(135deg, #EB9630 0%, #F0AE61 100%)'
          }}>
            <a href="/about" className="flex items-center">
              Learn More About Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}