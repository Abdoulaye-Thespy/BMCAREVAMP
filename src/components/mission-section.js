import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function MissionSection() {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Who we are
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
            Discover the rich heritage and modern journey of the Bafut people, from our traditional kingdom 
            to contemporary achievements that shape our community today.
          </p>
          <div className="w-20 h-1 bg-[#EB9630] mx-auto rounded-full mt-6" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Card 1 - Bafut History */}
          <Card className="overflow-hidden border-none shadow-lg" style={{
            background: 'linear-gradient(135deg, #EB9630 0%, #F0AE61 100%)'
          }}>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Video Holder */}
                <div className="relative h-64 md:h-auto md:w-1/2 p-4 md:pl-6 md:pr-2 md:py-6">
                  <div className="relative h-full w-full rounded-2xl bg-black/20 overflow-hidden group cursor-pointer">
                    {/* Video Thumbnail/Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-16 h-16 bg-[#EB9630] rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                          <Play className="h-6 w-6 fill-white" />
                        </div>
                        <p className="text-sm font-medium">Bafut Kingdom Documentary</p>
                        <p className="text-xs text-gray-300 mt-1">Click to play video</p>
                      </div>
                    </div>
                    
                    {/* YouTube video placeholder - replace src with actual YouTube embed URL */}
                    <iframe
                      className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      src="https://www.youtube.com/embed/?enablejsapi=1"
                      title="Bafut Kingdom Documentary"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex flex-col justify-center p-6 text-white md:w-1/2">
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
              <div className="flex flex-col md:flex-row">
                {/* Content */}
                <div className="flex flex-col justify-center p-6 text-white md:w-1/2 order-2 md:order-1">
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
                
                {/* Video Holder */}
                <div className="relative h-64 md:h-auto md:w-1/2 p-4 md:pl-2 md:pr-6 md:py-6 order-1 md:order-2">
                  <div className="relative h-full w-full rounded-2xl bg-black/20 overflow-hidden group cursor-pointer">
                    {/* Video Thumbnail/Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-16 h-16 bg-[#EB9630] rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                          <Play className="h-6 w-6 fill-white" />
                        </div>
                        <p className="text-sm font-medium">Modern Bafut Achievements</p>
                        <p className="text-xs text-gray-300 mt-1">Click to play video</p>
                      </div>
                    </div>
                    
                    {/* YouTube video placeholder - replace src with actual YouTube embed URL */}
                    <iframe
                      className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      src="https://www.youtube.com/embed/?enablejsapi=1"
                      title="Modern Bafut Achievements"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
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