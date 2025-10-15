import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function MissionSection() {
  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          What are we doing to assist these communities?
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Card 1 */}
          <Card className="overflow-hidden border-none bg-primary shadow-lg">
            <CardContent className="p-0">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <img
                    src="/community-volunteers-distributing-food-to-families.jpg"
                    alt="Community meal distribution"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 text-primary-foreground">
                  <h3 className="mb-3 text-2xl font-bold">Meal Distribution</h3>
                  <p className="mb-4 text-primary-foreground/90">
                    We provide nutritious meals to families in need, ensuring no one in our community goes hungry. Our
                    volunteers work tirelessly to reach every neighborhood.
                  </p>
                  <Button variant="secondary" className="w-fit bg-white text-primary hover:bg-white/90">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="overflow-hidden border-none bg-primary shadow-lg">
            <CardContent className="p-0">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col justify-center p-6 text-primary-foreground">
                  <h3 className="mb-3 text-2xl font-bold">Youth Programs</h3>
                  <p className="mb-4 text-primary-foreground/90">
                    Empowering the next generation through education, mentorship, and skill-building programs that
                    create opportunities for lasting change.
                  </p>
                  <Button variant="secondary" className="w-fit bg-white text-primary hover:bg-white/90">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="relative h-64 md:h-auto">
                  <img
                    src="/children-learning-in-community-center-classroom.jpg"
                    alt="Youth education program"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
