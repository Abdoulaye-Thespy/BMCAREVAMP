import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Twitter, Linkedin, ArrowRight } from "lucide-react"

export function LeadershipSection() {
  const leaders = [
    {
      name: "Regina Tamun",
      title: "President",
      image: "/PR-BMCA.png",
    },
    {
      name: "Emmanuel Neba",
      title: "Vice President General",
      image: "/VP-BMCA.png",
    },
    {
      name: "Valentine Nebangwa",
      title: "Secretary General",
      image: "/SG-BMCA.png",
    },
  ]

  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">National Leadership</h2>
        
        {/* Added description text */}
        <p className="mb-12 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
          Everyone on our team, from our amazing donors to members, upholds a common set of values that help us stay united.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {leaders.map((leader, index) => (
            <Card 
              key={index} 
              className="overflow-hidden border-0 shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-105 group"
            >
              <CardContent className="p-0">
                <div className="relative h-[600px] w-full overflow-hidden rounded-lg">
                  <img
                    src={leader.image || "/placeholder.svg"}
                    alt={leader.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 p-5 backdrop-blur-sm rounded-lg border border-white/10 transition-all duration-300 group-hover:bg-black/70 group-hover:border-orange-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                        {leader.name}
                      </h3>
                      <ArrowRight className="h-5 w-5 text-orange-500 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                    <p className="mb-3 text-sm text-orange-500 font-semibold transition-colors duration-300 group-hover:text-orange-400">
                      {leader.title}
                    </p>
                    <div className="flex gap-2">
                      <a 
                        href="#" 
                        className="text-white hover:text-orange-500 transition-all duration-300 transform hover:scale-110"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                      <a 
                        href="#" 
                        className="text-white hover:text-orange-500 transition-all duration-300 transform hover:scale-110"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Added "See All Members" button */}
        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
          >
            See All Members
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}