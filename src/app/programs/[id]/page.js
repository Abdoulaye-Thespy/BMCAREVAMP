"use client"

import { useParams, useRouter } from "next/navigation"
import { Header }from "@/components/header"
import { ArrowLeft, Share2, Heart } from "lucide-react"
import { Footer } from "@/components/footer"

export default function ProgramDetailPage() {
  const params = useParams()
  const router = useRouter()
  const programId = Number.parseInt(params.id)

  const programInstances = [
    {
      id: 1,
      category: "Education",
      title: "Long-term Educational Goals",
      description: "Our initiatives focus on increasing educational awareness within the community.",
      fullDescription:
        "This comprehensive educational initiative aims to transform learning opportunities in the community. We provide scholarships, tutoring services, and vocational training to empower individuals with knowledge and skills for a better future.",
      location: "Beirut, Lebanon",
      date: "15 Jan 2025",
      organizer: "Valentine Nakamura",
      email: "valentine@bmca.org",
      image: "/education-program-classroom.jpg",
      badge: "Events",
      impact: "500+ students reached",
      goals: ["Increase school enrollment", "Improve literacy rates", "Vocational training"],
    },
    {
      id: 2,
      category: "Education",
      title: "School Scholarship Program",
      description: "Providing financial support and mentorship to students from underprivileged backgrounds.",
      fullDescription:
        "A dedicated scholarship program that removes financial barriers to education. We support students through university and provide mentorship from professionals in various fields.",
      location: "Bourj Hammoud, Beirut",
      date: "20 Jan 2025",
      organizer: "Sarah Ahmed",
      email: "sarah@bmca.org",
      image: "/education-program-classroom.jpg",
      badge: "Events",
      impact: "150+ scholarships awarded",
      goals: ["Remove financial barriers", "Provide mentorship", "Career guidance"],
    },
    {
      id: 3,
      category: "Education",
      title: "Vocational Training Initiative",
      description: "Skills development workshops for youth to prepare them for employment.",
      fullDescription:
        "We offer practical skills training in various trades and professions. Our programs equip youth with job-ready skills and connect them with employment opportunities.",
      location: "Ashrafieh, Beirut",
      date: "22 Jan 2025",
      organizer: "Mohammed Hassan",
      email: "mohammed@bmca.org",
      image: "/education-program-classroom.jpg",
      badge: "Projects",
      impact: "300+ youth trained",
      goals: ["Employment preparation", "Skill development", "Job placement"],
    },
    {
      id: 4,
      category: "Water",
      title: "Clean Water Access Project",
      description: "Ensuring communities have sustainable access to clean drinking water.",
      fullDescription:
        "This critical project brings clean drinking water to underserved communities. We install water systems and conduct maintenance to ensure sustainability.",
      location: "Shatila Refugee Camp",
      date: "10 Feb 2025",
      organizer: "Fatima Khalil",
      email: "fatima@bmca.org",
      image: "/clean-water-access.jpg",
      badge: "Donation",
      impact: "2000+ people served",
      goals: ["Install water systems", "Ensure sustainability", "Education on water conservation"],
    },
    {
      id: 5,
      category: "Water",
      title: "Water Infrastructure Development",
      description: "Building wells and water supply systems in underserved areas.",
      fullDescription:
        "We construct and maintain water infrastructure to provide reliable access to clean water. Our engineering team works with communities to design sustainable solutions.",
      location: "Tyre, South Lebanon",
      date: "05 Feb 2025",
      organizer: "Hassan Khalil",
      email: "hassan@bmca.org",
      image: "/clean-water-access.jpg",
      badge: "Heritage",
      impact: "1500+ households reached",
      goals: ["Build infrastructure", "Maintenance programs", "Community training"],
    },
    {
      id: 6,
      category: "Culture & Art",
      title: "Cultural Heritage Preservation",
      description: "Celebrating and documenting traditional arts and cultural practices.",
      fullDescription:
        "We work to preserve and celebrate the rich cultural heritage of our communities. Through workshops and exhibitions, we keep traditions alive for future generations.",
      location: "Mar Mikhael, Beirut",
      date: "28 Jan 2025",
      organizer: "Aline Dabouche",
      email: "aline@bmca.org",
      image: "/cultural-arts-community.jpg",
      badge: "Community",
      impact: "50+ cultural events organized",
      goals: ["Preserve traditions", "Community engagement", "Youth participation"],
    },
    {
      id: 7,
      category: "Culture & Art",
      title: "Community Art Workshop",
      description: "Interactive workshops teaching traditional and modern art forms.",
      fullDescription:
        "Creative workshops that bring art to the community. We teach various techniques and provide a platform for local artists to showcase their work.",
      location: "Downtown Beirut",
      date: "12 Feb 2025",
      organizer: "Karim Rizk",
      email: "karim@bmca.org",
      image: "/cultural-arts-community.jpg",
      badge: "Events",
      impact: "200+ participants monthly",
      goals: ["Art education", "Community connection", "Cultural expression"],
    },
    {
      id: 8,
      category: "Health & Fitness",
      title: "Community Health Awareness",
      description: "Medical camps and health education sessions for preventive care.",
      fullDescription:
        "We organize medical camps and health education sessions to promote preventive care and wellness in the community. Professional doctors and nurses provide free services.",
      location: "Basta, Beirut",
      date: "18 Feb 2025",
      organizer: "Dr. Maha Farah",
      email: "maha@bmca.org",
      image: "/health-fitness-wellness.jpg",
      badge: "Donation",
      impact: "1000+ health consultations",
      goals: ["Health education", "Preventive care", "Medical support"],
    },
    {
      id: 9,
      category: "Health & Fitness",
      title: "Fitness and Wellness Program",
      description: "Free fitness classes and wellness activities for all age groups.",
      fullDescription:
        "Accessible fitness programs for everyone in the community. We offer yoga, aerobics, and strength training led by certified instructors.",
      location: "Hamra, Beirut",
      date: "25 Jan 2025",
      organizer: "Rayan Musa",
      email: "rayan@bmca.org",
      image: "/health-fitness-wellness.jpg",
      badge: "Projects",
      impact: "300+ members active",
      goals: ["Health promotion", "Community wellness", "Fitness access"],
    },
    {
      id: 10,
      category: "Kiteuh",
      title: "Community Social Integration",
      description: "Programs fostering social bonds and community engagement.",
      fullDescription:
        "We organize social programs that bring communities together, foster relationships, and create a sense of belonging.",
      location: "Various locations",
      date: "Ongoing",
      organizer: "Community Team",
      email: "community@bmca.org",
      image: "/community-gathering-social.jpg",
      badge: "Community",
      impact: "500+ monthly participants",
      goals: ["Social cohesion", "Community bonding", "Engagement"],
    },
    {
      id: 11,
      category: "Infrastructure",
      title: "Infrastructure Development",
      description: "Building facilities and infrastructure to support community growth.",
      fullDescription:
        "We invest in essential infrastructure projects that improve living conditions and create opportunities for economic development.",
      location: "Multiple Sites",
      date: "2025",
      organizer: "Engineering Team",
      email: "infrastructure@bmca.org",
      image: "/infrastructure-building-development.jpg",
      badge: "Projects",
      impact: "10+ projects completed",
      goals: ["Infrastructure improvement", "Economic development", "Sustainability"],
    },
  ]

  const program = programInstances.find((p) => p.id === programId)

  if (!program) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Program not found</h1>
            <button
              onClick={() => router.push("/programs")}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Back to Programs
            </button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Image */}
        <section className="relative h-96 bg-gray-200 overflow-hidden">
          <img src={program.image || "/placeholder.svg"} alt={program.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Back Button */}
          <button
            onClick={() => router.push("/programs")}
            className="absolute top-6 left-6 bg-white text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          {/* Action Buttons */}
          <div className="absolute top-6 right-6 flex gap-3">
            <button className="bg-white text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full font-semibold mb-4">
              {program.category}
            </span>

            {/* Title */}
            <h1 className="text-5xl font-bold text-gray-900 mb-4">{program.title}</h1>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-200">
              <div>
                <p className="text-gray-500 text-sm">Location</p>
                <p className="text-gray-900 font-semibold">{program.location}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Date</p>
                <p className="text-gray-900 font-semibold">{program.date}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Impact</p>
                <p className="text-gray-900 font-semibold">{program.impact}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this Program</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">{program.fullDescription}</p>
            </div>

            {/* Goals */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Program Goals</h2>
              <ul className="space-y-3">
                {program.goals.map((goal, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-700 text-lg">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organizer Card */}
            <div className="bg-orange-50 rounded-lg p-6 mb-12">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Program Organizer</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-2xl font-bold">{program.organizer.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">{program.organizer}</p>
                  <p className="text-gray-600">{program.email}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">Interested in supporting this program?</p>
              <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors">
                Donate Now
              </button>
            </div>
          </div>
        </section>

        {/* Related Programs */}
        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Other Programs You Might Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programInstances
                .filter((p) => p.category === program.category && p.id !== program.id)
                .slice(0, 3)
                .map((relatedProgram) => (
                  <div
                    key={relatedProgram.id}
                    onClick={() => router.push(`/programs/${relatedProgram.id}`)}
                    className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={relatedProgram.image || "/placeholder.svg"}
                        alt={relatedProgram.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                        {relatedProgram.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{relatedProgram.location}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
