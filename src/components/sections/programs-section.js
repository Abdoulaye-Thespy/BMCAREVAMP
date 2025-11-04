"use client"

import { useRouter } from "next/navigation"
import { BookOpen, Droplet, Palette, Heart, Users, Building2, Plus, ArrowRight } from "lucide-react"

export default function ProgramsSection() {
  const router = useRouter()

  const programs = [
    {
      id: "education",
      name: "Education",
      icon: BookOpen,
    },
    {
      id: "water",
      name: "Water",
      icon: Droplet,
    },
    {
      id: "culture-art",
      name: "Culture & Art",
      icon: Palette,
    },
    {
      id: "health",
      name: "Health & Fitness",
      icon: Heart,
    },
    {
      id: "kiteuh",
      name: "Kiteuh",
      icon: Users,
    },
    {
      id: "infrastructure",
      name: "Infrastructure",
      icon: Building2,
    },
  ]

  const handleProgramClick = (programId) => {
    if (programId <= 6) {
      router.push(`/programs/${programId}`)
    }
  }

  const handleDonate = () => {
    router.push("/donate")
  }

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {programs.map((program) => {
            const Icon = program.icon
            return (
              <div
                key={program.id}
                onClick={() => handleProgramClick(program.id)}
                className={`bg-orange-50 rounded-lg p-6 hover:shadow-lg transition-shadow ${
                  program.isMore ? "cursor-default" : "cursor-pointer group"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                      <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-gray-900 font-semibold text-lg">{program.name}</span>
                  </div>
                  {!program.isMore && (
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Donate Section - Updated with better colors */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Want to Make a Difference?</h3>
          <p className="text-orange-50 mb-6 text-lg">Support our programs and help us build stronger communities</p>
          <button
            onClick={handleDonate}
            className="bg-white cursor-pointer text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition-colors shadow-lg hover:shadow-xl"
          >
            Donate Now
          </button>
        </div>
      </div>
    </section>
  )
}