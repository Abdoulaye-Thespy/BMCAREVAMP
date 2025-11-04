"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowRight, ChevronLeft, Search } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CategoryPage() {
  const router = useRouter()
  const params = useParams()
  const categoryId = params.category

  console.log("[v0] CategoryPage mounted with categoryId:", categoryId)

  const [searchTerm, setSearchTerm] = useState("")

  const programsByCategory = {
    education: [
      {
        id: 1,
        category: "education",
        title: "Long-term Educational Goals",
        description: "Our initiatives focus on increasing educational awareness within the community.",
        location: "Beirut, Lebanon",
        date: "15 Jan 2025",
        organizer: "Valentine Nakamura",
        image: "/education-program-classroom.jpg",
        badge: "Events",
      },
      {
        id: 2,
        category: "education",
        title: "School Scholarship Program",
        description: "Providing financial support and mentorship to students from underprivileged backgrounds.",
        location: "Bourj Hammoud, Beirut",
        date: "20 Jan 2025",
        organizer: "Sarah Ahmed",
        image: "/education-program-classroom.jpg",
        badge: "Events",
      },
      {
        id: 3,
        category: "education",
        title: "Vocational Training Initiative",
        description: "Skills development workshops for youth to prepare them for employment.",
        location: "Ashrafieh, Beirut",
        date: "22 Jan 2025",
        organizer: "Mohammed Hassan",
        image: "/education-program-classroom.jpg",
        badge: "Projects",
      },
    ],
    water: [
      {
        id: 4,
        category: "water",
        title: "Clean Water Access Project",
        description: "Ensuring communities have sustainable access to clean drinking water.",
        location: "Shatila Refugee Camp",
        date: "10 Feb 2025",
        organizer: "Fatima Khalil",
        image: "/clean-water-access.jpg",
        badge: "Donation",
      },
      {
        id: 5,
        category: "water",
        title: "Water Infrastructure Development",
        description: "Building wells and water supply systems in underserved areas.",
        location: "Tyre, South Lebanon",
        date: "05 Feb 2025",
        organizer: "Hassan Khalil",
        image: "/clean-water-access.jpg",
        badge: "Heritage",
      },
    ],
    "culture-art": [
      {
        id: 6,
        category: "culture-art",
        title: "Cultural Heritage Preservation",
        description: "Celebrating and documenting traditional arts and cultural practices.",
        location: "Mar Mikhael, Beirut",
        date: "28 Jan 2025",
        organizer: "Aline Dabouche",
        image: "/cultural-arts-community.jpg",
        badge: "Community",
      },
      {
        id: 7,
        category: "culture-art",
        title: "Community Art Workshop",
        description: "Interactive workshops teaching traditional and modern art forms.",
        location: "Downtown Beirut",
        date: "12 Feb 2025",
        organizer: "Karim Rizk",
        image: "/cultural-arts-community.jpg",
        badge: "Events",
      },
    ],
    health: [
      {
        id: 8,
        category: "health",
        title: "Community Health Awareness",
        description: "Medical camps and health education sessions for preventive care.",
        location: "Basta, Beirut",
        date: "18 Feb 2025",
        organizer: "Dr. Maha Farah",
        image: "/health-fitness-wellness.jpg",
        badge: "Donation",
      },
      {
        id: 9,
        category: "health",
        title: "Fitness and Wellness Program",
        description: "Free fitness classes and wellness activities for all age groups.",
        location: "Hamra, Beirut",
        date: "25 Jan 2025",
        organizer: "Rayan Musa",
        image: "/health-fitness-wellness.jpg",
        badge: "Projects",
      },
    ],
    kiteuh: [
      {
        id: 10,
        category: "kiteuh",
        title: "Community Social Integration",
        description: "Programs fostering social bonds and community engagement.",
        location: "Various locations",
        date: "Ongoing",
        organizer: "Community Team",
        image: "/community-gathering-social.jpg",
        badge: "Community",
      },
    ],
    infrastructure: [
      {
        id: 11,
        category: "infrastructure",
        title: "Infrastructure Development",
        description: "Building facilities and infrastructure to support community growth.",
        location: "Multiple Sites",
        date: "2025",
        organizer: "Engineering Team",
        image: "/infrastructure-building-development.jpg",
        badge: "Projects",
      },
    ],
  }

  const allPrograms = Object.values(programsByCategory).flat()

  const programs = categoryId === "all" ? allPrograms : programsByCategory[categoryId] || []
  const categoryName = categoryId === "all" ? "All Programs" : categoryId?.replace("-", " ").toUpperCase() || "Programs"

  const filteredPrograms = programs.filter(
    (program) =>
      searchTerm === "" ||
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getCategoryColor = (badge) => {
    const colorMap = {
      Events: "bg-blue-100 text-blue-600",
      Donation: "bg-red-100 text-red-600",
      Projects: "bg-green-100 text-green-600",
      Heritage: "bg-purple-100 text-purple-600",
      Community: "bg-orange-100 text-orange-600",
    }
    return colorMap[badge] || "bg-gray-100 text-gray-600"
  }

  const categories = [
    { id: "all", name: "All Programs" },
    { id: "education", name: "Education" },
    { id: "water", name: "Water" },
    { id: "culture-art", name: "Culture & Art" },
    { id: "health", name: "Health & Fitness" },
    { id: "kiteuh", name: "Kiteuh" },
    { id: "infrastructure", name: "Infrastructure" },
  ]

  const handleCategoryChange = (newCategory) => {
    router.push(`/programs/${newCategory}`)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Header with Back Button */}
        <div className="bg-orange-50 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <button
              onClick={() => router.push("/programs")}
              className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-4xl font-bold text-gray-900">{categoryName}</h1>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-colors ${
                    categoryId === category.id
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {filteredPrograms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPrograms.map((program) => (
                  <div
                    key={program.id}
                    className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => router.push(`/programs/${program.category}/${program.id}`)}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-gray-200">
                      <img
                        src={program.image || "/placeholder.svg"}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Badge */}
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${getCategoryColor(program.badge)}`}
                      >
                        {program.badge}
                      </span>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                        {program.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{program.description}</p>

                      {/* Location & Date */}
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <span className="font-semibold">{program.location}</span>
                        <span>•</span>
                        <span>{program.date}</span>
                      </div>

                      {/* Organizer */}
                      <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-bold text-sm">{program.organizer.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">{program.organizer}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No programs found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
