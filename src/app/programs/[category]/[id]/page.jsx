"use client"

import { useRouter, useParams } from "next/navigation"
import { ChevronLeft, MapPin, Calendar, User, Target, Award, Play } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ProgramDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { category, id } = params

  const allPrograms = {
    education: [
      {
        id: 1,
        category: "education",
        title: "2023-2024 Back to School Book Distribution",
        description: "Annual book distribution program providing essential learning materials to support students' educational journey.",
        location: "Bafut-Bamenda, Cameroon",
        date: "2023-2024",
        organizer: "BMCA",
        image: "/education-program-classroom.jpg",
        badge: "Completed",
        fullDescription: "This comprehensive book distribution initiative ensures students have access to essential textbooks and learning materials, removing financial barriers to education. Our program has successfully distributed over 2,000 books to students in need across the Bafut-Bamenda region.",
        goals: ["Distribute textbooks to 500+ students", "Support academic success and performance", "Reduce educational inequality in the community"],
        impact: "Providing books to 500+ students annually",
        budget: "$25,000",
        duration: "Annual Program",
        participants: "500+ students across 10 schools",
        videos: [
          "LGgjQ2vFWXQ",
          "xmOI0nfEzE8", 
          "_lkzxpQkKCQ"
        ],
        bmcaDescription: "BMCA (Bafut-Mankon Cultural Association) is dedicated to empowering communities through education, healthcare, water access, and infrastructure development. Our mission is to create sustainable change by addressing fundamental needs and fostering community growth in the Northwest region of Cameroon.",
        programBenefits: "The Book Distribution Program directly supports students' academic success by providing essential learning materials, reducing financial burdens on families, and ensuring equal educational opportunities for all children in our community. This initiative has shown measurable improvements in student attendance and academic performance."
      },
      {
        id: 2,
        category: "education",
        title: "2024-2025 Back to School Book Distribution",
        description: "Continuing our annual commitment to provide educational materials and support student success.",
        location: "Bafut-Bamenda, Cameroon",
        date: "2024-2025",
        organizer: "BMCA",
        image: "/education-program-classroom.jpg",
        badge: "Active",
        fullDescription: "Building on the success of previous years, this year's book distribution expands to include additional schools and learning materials.",
        goals: ["Reach 600+ students", "Include workbooks and stationery", "Partner with 15 local schools"],
        impact: "Expanding to serve 600+ students",
        budget: "$30,000",
        duration: "Annual Program",
        participants: "600+ students across 15 schools",
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
        fullDescription: "Equipping youth with practical skills for sustainable employment opportunities.",
        goals: ["Provide practical job skills", "Increase employment rates", "Build industry partnerships"],
        impact: "Training 300+ youth annually",
        budget: "$40,000",
        duration: "6 months per cohort",
        participants: "300+ youth trainees",
      },
    ],
    water: [
      // ... water programs
    ],
    "culture-art": [
      // ... culture-art programs
    ],
    health: [
      // ... health programs
    ],
    kiteuh: [
      // ... kiteuh programs
    ],
    infrastructure: [
      // ... infrastructure programs
    ],
  }

  const program = allPrograms[category]?.find((p) => p.id === Number.parseInt(id))

  if (!program) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <p className="text-gray-500 text-lg">Program not found</p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Back Button */}
        <div className="bg-orange-50 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => router.push(`/programs/${category}`)}
              className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to {category.replace("-", " ")}
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full h-96 overflow-hidden bg-gray-200">
          <img src={program.image || "/placeholder.svg"} alt={program.title} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Title and Meta */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                {program.category.replace("-", " ").toUpperCase()}
              </span>
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  program.badge === "Events"
                    ? "bg-blue-100 text-blue-600"
                    : program.badge === "Donation"
                      ? "bg-red-100 text-red-600"
                      : program.badge === "Projects"
                        ? "bg-green-100 text-green-600"
                        : program.badge === "Heritage"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-orange-100 text-orange-600"
                }`}
              >
                {program.badge}
              </span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">{program.title}</h1>

            {/* Meta Information */}
            <div className="flex flex-col md:flex-row gap-6 text-gray-600 border-b pb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span>{program.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                <span>{program.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-orange-500" />
                <span>{program.organizer}</span>
              </div>
            </div>
          </div>

          {/* BMCA Description - Only for BMCA programs */}
          {program.organizer === "BMCA" && (
            <div className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About BMCA</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{program.bmcaDescription}</p>
            </div>
          )}

          {/* Program Benefits - Only for book distribution */}
          {program.title.includes("Book Distribution") && (
            <div className="mb-8 bg-green-50 p-6 rounded-lg border border-green-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How This Program Helps</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{program.programBenefits}</p>
            </div>
          )}

          {/* Description */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Program</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{program.fullDescription}</p>
          </div>

          {/* YouTube Videos - Only for programs with videos */}
          {program.videos && program.videos.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Play className="w-6 h-6 text-orange-500" />
                Program Videos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {program.videos.map((videoId, index) => (
                  <div key={index} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`Program Video ${index + 1}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Overview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{program.description}</p>
          </div>

          {/* Program Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm text-gray-500 font-semibold mb-2">PROGRAM DURATION</p>
              <p className="text-xl font-bold text-gray-900">{program.duration}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm text-gray-500 font-semibold mb-2">BUDGET</p>
              <p className="text-xl font-bold text-gray-900">{program.budget}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm text-gray-500 font-semibold mb-2">PARTICIPANTS</p>
              <p className="text-xl font-bold text-gray-900">{program.participants}</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-600 font-semibold mb-2">IMPACT</p>
              <p className="text-xl font-bold text-orange-600">{program.impact}</p>
            </div>
          </div>

          {/* Goals Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-orange-500" />
              Program Goals
            </h2>
            <ul className="space-y-3">
              {program.goals.map((goal, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-600 text-lg">{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-orange-50 p-8 rounded-lg border border-orange-200">
            <div className="flex items-start gap-3 mb-4">
              <Award className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Want to Participate?</h3>
                <p className="text-gray-600 mb-6">Get involved in making a difference in our community</p>
              </div>
            </div>
            <a 
              href="https://buy.stripe.com/bIY5nYbnAaWaePe3cc" 
              target="_blank"
              className="inline-block bg-orange-500 text-white hover:bg-orange-600 px-8 py-3 rounded-lg font-bold transition-colors"
            >
              Donate to This Program
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}