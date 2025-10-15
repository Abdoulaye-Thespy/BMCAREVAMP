import { Heart, Users, TrendingUp } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Heart,
      value: "8123+",
      label: "Meals Donated",
    },
    {
      icon: Users,
      value: "500+",
      label: "Volunteers",
    },
    {
      icon: TrendingUp,
      value: "30k+",
      label: "People Impacted",
    },
  ]

  return (
    <section className="w-full bg-secondary py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                <stat.icon className="h-10 w-10 text-primary-foreground" />
              </div>
              <div className="mb-2 text-4xl font-bold text-foreground md:text-5xl">{stat.value}</div>
              <div className="text-lg text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
