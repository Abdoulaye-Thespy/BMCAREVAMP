"use client"

import { useRouter, useParams } from "next/navigation"
import { ChevronLeft, MapPin, Calendar, User, Target, Award } from "lucide-react"
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
        title: "Long-term Educational Goals",
        description: "Our initiatives focus on increasing educational awareness within the community.",
        location: "Beirut, Lebanon",
        date: "15 Jan 2025",
        organizer: "Valentine Nakamura",
        image: "/education-program-classroom.jpg",
        badge: "Events",
        fullDescription:
          "This comprehensive educational initiative aims to transform lives through quality education and skill development.",
        goals: ["Increase educational awareness", "Improve learning outcomes", "Build strong community partnerships"],
        impact: "Impacting over 500 students annually",
        budget: "$50,000",
        duration: "12 months",
        participants: "Expected 200+ participants",
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
        fullDescription: "We provide full scholarships and personalized mentorship to deserving students.",
        goals: ["Remove financial barriers to education", "Provide mentorship support", "Track academic progress"],
        impact: "Supporting 50 students through school",
        budget: "$75,000",
        duration: "24 months",
        participants: "50 scholarship recipients",
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
        fullDescription: "Bringing safe drinking water to underserved communities through sustainable infrastructure.",
        goals: ["Provide clean water access", "Improve health outcomes", "Build sustainable systems"],
        impact: "Serving 2,000+ people",
        budget: "$100,000",
        duration: "18 months",
        participants: "4 community centers",
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
        fullDescription: "Constructing lasting water infrastructure for long-term community sustainability.",
        goals: ["Build water infrastructure", "Ensure system maintenance", "Train local operators"],
        impact: "Benefiting 5,000+ people",
        budget: "$150,000",
        duration: "24 months",
        participants: "3 villages",
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
        fullDescription:
          "Preserving our rich cultural heritage for future generations through documentation and celebration.",
        goals: ["Document cultural practices", "Train young artists", "Create exhibition opportunities"],
        impact: "Engaging 1,000+ community members",
        budget: "$35,000",
        duration: "12 months",
        participants: "100+ artists",
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
        fullDescription: "Inspiring creativity and artistic expression through hands-on workshops.",
        goals: ["Teach art techniques", "Foster creativity", "Build community connections"],
        impact: "Training 250+ artists",
        budget: "$25,000",
        duration: "8 months",
        participants: "250+ participants",
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
        fullDescription: "Promoting preventive health through education and free medical consultations.",
        goals: ["Provide health education", "Offer free consultations", "Increase health awareness"],
        impact: "Screening 1,500+ people",
        budget: "$45,000",
        duration: "12 months",
        participants: "10+ medical professionals",
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
        fullDescription: "Building healthy communities through accessible fitness and wellness programs.",
        goals: ["Promote active lifestyles", "Build community bonds", "Improve health outcomes"],
        impact: "Reaching 800+ participants",
        budget: "$30,000",
        duration: "12 months",
        participants: "800+ community members",
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
        fullDescription: "Strengthening community bonds through social engagement and integration programs.",
        goals: ["Foster social connections", "Build community unity", "Support vulnerable groups"],
        impact: "Supporting 3,000+ community members",
        budget: "$55,000",
        duration: "Ongoing",
        participants: "Multiple community groups",
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
        fullDescription: "Creating lasting physical infrastructure to support community development and growth.",
        goals: ["Build community centers", "Improve facilities", "Support long-term development"],
        impact: "Benefiting 5,000+ people",
        budget: "$200,000",
        duration: "24 months",
        participants: "Multiple communities",
      },
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

          {/* Description */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Program</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{program.fullDescription}</p>
          </div>

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
            <button className="bg-orange-500 text-white hover:bg-orange-600 px-8 py-3 rounded-lg font-bold transition-colors">
              Join This Program
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
