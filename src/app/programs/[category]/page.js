"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowRight, ChevronLeft, Search, Filter, X } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CategoryPage() {
    const router = useRouter()
    const params = useParams()
    const categoryId = params.category

    console.log("[v0] CategoryPage mounted with categoryId:", categoryId)

    const [searchTerm, setSearchTerm] = useState("")
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

    const programsByCategory = {
        education: [
            {
                id: 1,
                category: "education",
                title: "2023-2024 Back to School Book Distribution",
                description: "2023-2024: Distributed textbooks and educational materials to students across multiple schools in preparation for the academic year.",
                location: "Bafut-Bamenda, Cameroon",
                date: "2023-2024",
                organizer: "BMCA",
                image: "/eduBMCA2023.jpg",
                status: "completed",
            },
            {
                id: 2,
                category: "education",
                title: "2024-2025 Back to School Book Distribution",
                description: "2024-2025: Annual book distribution program providing essential learning materials to support students' educational journey.",
                location: "Bafut-Bamenda, Cameroon",
                date: "2024-2025",
                organizer: "BMCA",
                image: "/eduBMCA2024.jpg",
                status: "completed",
            },
            {
                id: 3,
                category: "education",
                title: "2025-2026 Back to School Book Distribution",
                description: "2025-2026: Annual book distribution initiative to equip students with necessary textbooks and learning resources for the new school year.",
                location: "Bafut-Bamenda, Cameroon",
                date: "2025-2026",
                organizer: "BMCA",
                image: "/education1.jpg",
                status: "completed",
            },
            ],
            water: [
                {
                    id: 4,
                    category: "water",
                    title: "Mforya Water Project",
                    description:
                        "Providing sustainable clean water access to the Mforya community with modern infrastructure and maintenance systems.",
                    location: "Mforya, Cameroon",
                    date: "Completed",
                    organizer: "BMCA",
                    image: "/bmcawater2.jpg",
                    status: "completed",
                },
                {
                    id: 5,
                    category: "water",
                    title: "Njimbee Water Project",
                    description:
                        "Installing water supply systems and wells to ensure reliable access to clean water for local residents.",
                    location: "Njimbee, Cameroon",
                    date: "Completed",
                    organizer: "BMCA",
                    image: "/bcmcawater3.jpg",
                    status: "completed",
                },
                {
                    id: 6,
                    category: "water",
                    title: "Njibujang Water Project",
                    description:
                        "Building comprehensive water infrastructure to serve the community's daily needs and ensure long-term sustainability.",
                    location: "Njibujang, Cameroon",
                    date: "Completed",
                    organizer: "BMCA",
                    image: "/clean-water-access.jpg",
                    status: "completed",
                },
                {
                    id: 7,
                    category: "water",
                    title: "Nsem Water Project",
                    description:
                        "Establishing water sources and distribution networks for improved health and wellbeing in the Nsem area.",
                    location: "Nsem, Cameroon",
                    date: "Completed",
                    organizer: "BMCA",
                    image: "/clean-water-access.jpg",
                    status: "completed",
                },
                {
                    id: 8,
                    category: "water",
                    title: "Mbebali Water Project",
                    description:
                        "Under evaluation to support water infrastructure development in the Mbebali region with BMCA's expertise.",
                    location: "Mbebali, Cameroon",
                    date: "In Discussion",
                    organizer: "BMCA",
                    image: "/clean-water-access.jpg",
                    status: "pending",
                },
                {
                    id: 9,
                    category: "water",
                    title: "Bawum Water Project",
                    description: "Proposed initiative to bring clean water solutions to the Bawum community pending board decision.",
                    location: "Bawum, Cameroon",
                    date: "In Discussion",
                    organizer: "BMCA",
                    image: "/clean-water-access.jpg",
                    status: "pending",
                },
            ],
            health: [
                {
                    id: 10,
                    category: "health",
                    title: "Bamenda Health Center Support",
                    description: "Providing medical equipment and supplies to local health centers in Bamenda.",
                    location: "Bamenda, Cameroon",
                    date: "Active",
                    organizer: "BMCA",
                    image: "/health-fitness-wellness.jpg",
                    status: "active",
                },
                {
                    id: 11,
                    category: "health",
                    title: "Community Health Outreach",
                    description: "Mobile medical clinics and health education programs in rural communities.",
                    location: "Bafut, Cameroon",
                    date: "Monthly",
                    organizer: "BMCA",
                    image: "/health-fitness-wellness.jpg",
                    status: "active",
                },
                {
                    id: 12,
                    category: "health",
                    title: "Maternal Health Program",
                    description: "Improving maternal and child healthcare services in remote areas.",
                    location: "Bamenda, Cameroon",
                    date: "2025",
                    organizer: "BMCA",
                    image: "/health-fitness-wellness.jpg",
                    status: "planning",
                },
            ],
            "culture-art": [
                {
                    id: 13,
                    category: "culture-art",
                    title: "Cultural Heritage Preservation",
                    description: "Documenting and preserving traditional customs and cultural practices.",
                    location: "Bafut, Cameroon",
                    date: "Ongoing",
                    organizer: "BMCA",
                    image: "/community-gathering-social.jpg",
                    status: "active",
                },
                {
                    id: 14,
                    category: "culture-art",
                    title: "Traditional Arts Workshop",
                    description: "Supporting local artisans and traditional craft-making techniques.",
                    location: "Bamenda, Cameroon",
                    date: "Quarterly",
                    organizer: "BMCA",
                    image: "/community-gathering-social.jpg",
                    status: "active",
                },
            ],
            infrastructure: [
                {
                    id: 15,
                    category: "infrastructure",
                    title: "Community Center Construction",
                    description: "Building multi-purpose community centers for events and gatherings.",
                    location: "Bamenda, Cameroon",
                    date: "2025",
                    organizer: "BMCA",
                    image: "/infrastructure-building-development.jpg",
                    status: "planning",
                },
                {
                    id: 16,
                    category: "infrastructure",
                    title: "Road Improvement Initiative",
                    description: "Improving access roads to enhance connectivity between communities.",
                    location: "Bafut, Cameroon",
                    date: "In Discussion",
                    organizer: "BMCA",
                    image: "/infrastructure-building-development.jpg",
                    status: "pending",
                },
            ],
            "community-outreach": [
                {
                    id: 17,
                    category: "community-outreach",
                    title: "Community Empowerment Workshops",
                    description: "Organizing skill-building and leadership development workshops for community members.",
                    location: "Bamenda, Cameroon",
                    date: "Monthly",
                    organizer: "BMCA",
                    image: "/community-gathering-social.jpg",
                    status: "active",
                },
                {
                    id: 18,
                    category: "community-outreach",
                    title: "Youth Mentorship Program",
                    description: "Pairing youth with mentors to provide guidance and support for personal and professional growth.",
                    location: "Bafut, Cameroon",
                    date: "Ongoing",
                    organizer: "BMCA",
                    image: "/community-gathering-social.jpg",
                    status: "active",
                },
                {
                    id: 19,
                    category: "community-outreach",
                    title: "Elderly Support Initiative",
                    description: "Providing essential supplies and social support for elderly community members.",
                    location: "Bamenda, Cameroon",
                    date: "Quarterly",
                    organizer: "BMCA",
                    image: "/community-gathering-social.jpg",
                    status: "active",
                },
                {
                    id: 20,
                    category: "community-outreach",
                    title: "Community Food Distribution",
                    description: "Organizing food drives and distribution programs for families in need.",
                    location: "Various Locations",
                    date: "Monthly",
                    organizer: "BMCA",
                    image: "/community-gathering-social.jpg",
                    status: "active",
                }
            ]
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

    const getStatusColor = (status) => {
        const colorMap = {
            completed: "bg-green-100 text-green-600",
            active: "bg-blue-100 text-blue-600",
            planning: "bg-yellow-100 text-yellow-600",
            pending: "bg-orange-100 text-orange-600",
        }
        return colorMap[status] || "bg-gray-100 text-gray-600"
    }

    const categories = [
        { id: "all", name: "All Programs" },
        { id: "education", name: "Education" },
        { id: "water", name: "Water" },
        { id: "culture-art", name: "Culture & Art" },
        { id: "health", name: "Health & Fitness" },
        { id: "infrastructure", name: "Infrastructure" },
        { id: "community-outreach", name: "Community Outreach" },
    ]

    const handleCategoryChange = (newCategory) => {
        router.push(`/programs/${newCategory}`)
        setIsMobileFilterOpen(false)
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

                {/* Desktop: Full-width Filter and Search Section */}
                <section className="hidden lg:block py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col space-y-6">
                            {/* Category Filter Tabs - Full Width */}
                            <div className="w-full">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
                                <div className="flex flex-wrap gap-3">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleCategoryChange(category.id)}
                                            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${categoryId === category.id
                                                ? "bg-orange-500 text-white shadow-lg transform scale-105"
                                                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Search Bar - Full Width */}
                            <div className="w-full">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Programs</h3>
                                <div className="relative max-w-2xl">
                                    <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search by program title or description..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mobile: Filter Dropdown Button */}
                <section className="lg:hidden py-4 px-4 sm:px-6 bg-white border-b border-gray-200">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold"
                            >
                                <Filter className="w-4 h-4" />
                                Filter & Search
                            </button>

                            {/* Search Indicator */}
                            {searchTerm && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Search className="w-4 h-4" />
                                    <span>Search: "{searchTerm}"</span>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Mobile Filter Dropdown */}
                {isMobileFilterOpen && (
                    <div className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">Filter & Search</h2>
                                <button
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-6">
                            {/* Category Filter */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleCategoryChange(category.id)}
                                            className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors ${categoryId === category.id
                                                ? "bg-orange-500 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Search */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Search</h3>
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

                            {/* Apply Button */}
                            <div className="sticky bottom-0 bg-white pt-4 pb-6 border-t border-gray-200">
                                <button
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Programs Grid */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        {/* Results Count */}
                        <div className="mb-8">
                            <p className="text-gray-600">
                                Showing {filteredPrograms.length} of {programs.length} programs
                                {searchTerm && (
                                    <span> for "<span className="font-semibold">{searchTerm}</span>"</span>
                                )}
                            </p>
                        </div>

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
                                            {/* Status Badge */}
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${getStatusColor(program.status)}`}
                                            >
                                                {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
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
                                {(searchTerm || categoryId !== "all") && (
                                    <button
                                        onClick={() => {
                                            setSearchTerm("")
                                            if (categoryId !== "all") {
                                                router.push("/programs/all")
                                            }
                                        }}
                                        className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}