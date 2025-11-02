import { BookOpen, Droplet, Palette, Heart, Users, Building2, Plus, ArrowRight } from "lucide-react"

export default function ProgramsSection() {
  const programs = [
    {
      id: 1,
      name: "Education",
      icon: BookOpen,
    },
    {
      id: 2,
      name: "Water",
      icon: Droplet,
    },
    {
      id: 3,
      name: "Culture & Art",
      icon: Palette,
    },
    {
      id: 4,
      name: "Health & Fitness",
      icon: Heart,
    },
    {
      id: 5,
      name: "Kiteuh",
      icon: Users,
    },
    {
      id: 6,
      name: "Infrastructure",
      icon: Building2,
    },
    {
      id: 7,
      name: "More",
      icon: Plus,
      isMore: true,
    },
    {
      id: 8,
      name: "More",
      icon: Plus,
      isMore: true,
    },
    {
      id: 9,
      name: "More",
      icon: Plus,
      isMore: true,
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-wide mb-2">Programs</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Explore our programs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Bafut Fondom programs and the overall well-being and development of the community through sub programs
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => {
            const Icon = program.icon
            return (
              <div
                key={program.id}
                className="bg-orange-50 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                      <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-gray-900 font-semibold text-lg">{program.name}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
