"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Users, X, ChevronDown, ChevronUp, Globe } from "lucide-react"

const chaptersData = [
  {
    id: 1,
    name: "Houston Chapter",
    description: "Serving the Houston community",
    phone: "+1 (555) 123-4567",
    email: "houston@bmca.org",
    address: "123 Main St, Houston, TX 77002",
    members: 45,
    website: "https://houston.bmca.org",
    president: {
      name: "Michael Rodriguez",
      photo: "/president-placeholder.jpg"
    }
  },
  {
    id: 2,
    name: "Dallas Chapter",
    description: "Serving the Dallas community",
    phone: "+1 (555) 234-5678",
    email: "dallas@bmca.org",
    address: "456 Oak Ave, Dallas, TX 75201",
    members: 32,
    website: "https://dallas.bmca.org",
    president: {
      name: "Sarah Johnson",
      photo: "/president-placeholder.jpg"
    }
  },
  {
    id: 3,
    name: "Florida Chapter",
    description: "Serving the Florida community",
    phone: "+1 (555) 345-6789",
    email: "florida@bmca.org",
    address: "789 Beach Blvd, Miami, FL 33101",
    members: 28,
    website: "https://florida.bmca.org",
    president: {
      name: "David Thompson",
      photo: "/president-placeholder.jpg"
    }
  },
  {
    id: 4,
    name: "New England Chapter",
    description: "Serving the New England community",
    phone: "+1 (555) 456-7890",
    email: "newengland@bmca.org",
    address: "321 Harbor St, Boston, MA 02101",
    members: 38,
    website: "https://newengland.bmca.org",
    president: {
      name: "Jennifer Williams",
      photo: "/president-placeholder.jpg"
    }
  },
  {
    id: 5,
    name: "Great Lakes Chapter",
    description: "Serving the Great Lakes community",
    phone: "+1 (555) 567-8901",
    email: "greatlakes@bmca.org",
    address: "654 Lake View Dr, Chicago, IL 60601",
    members: 41,
    website: "https://greatlakes.bmca.org",
    president: {
      name: "Robert Chen",
      photo: "/president-placeholder.jpg"
    }
  },
  {
    id: 6,
    name: "Los Angeles Chapter",
    description: "Serving the Los Angeles community",
    phone: "+1 (555) 678-9012",
    email: "losangeles@bmca.org",
    address: "987 Sunset Blvd, Los Angeles, CA 90001",
    members: 52,
    website: "https://losangeles.bmca.org",
    president: {
      name: "Maria Garcia",
      photo: "/president-placeholder.jpg"
    }
  },
  {
    id: 7,
    name: "United Chapter West Coast",
    description: "Serving the West Coast community",
    phone: "+1 (555) 789-0123",
    email: "westcoast@bmca.org",
    address: "555 Pacific Hwy, San Francisco, CA 94101",
    members: 67,
    website: "https://westcoast.bmca.org",
    president: {
      name: "James Wilson",
      photo: "/president-placeholder.jpg"
    }
  },
  {
    id: 8,
    name: "Minnesota Chapter",
    description: "Serving the Minnesota community",
    phone: "+1 (555) 890-1234",
    email: "minnesota@bmca.org",
    address: "222 Lake St, Minneapolis, MN 55401",
    members: 23,
    website: "https://minnesota.bmca.org",
    president: {
      name: "Lisa Anderson",
      photo: "/president-placeholder.jpg"
    }
  },
  {
    id: 9,
    name: "DC Metro Chapter",
    description: "Serving the DC Metro community",
    phone: "+1 (555) 901-2345",
    email: "dcmetro@bmca.org",
    address: "444 Capitol St, Washington, DC 20001",
    members: 35,
    website: "https://dcmetro.bmca.org",
    president: {
      name: "Thomas Brown",
      photo: "/president-placeholder.jpg"
    }
  },
  {
    id: 10,
    name: "Delaware Chapter",
    description: "Serving the Delaware community",
    phone: "+1 (555) 012-3456",
    email: "delaware@bmca.org",
    address: "111 Liberty St, Wilmington, DE 19801",
    members: 19,
    website: "https://delaware.bmca.org",
    president: {
      name: "Patricia Davis",
      photo: "/president-placeholder.jpg"
    }
  },
  {
    id: 11,
    name: "Mid West Chapter",
    description: "Serving the Mid West community",
    phone: "+1 (555) 123-4567",
    email: "midwest@bmca.org",
    address: "333 Plains Ave, Kansas City, MO 64101",
    members: 44,
    website: "https://midwest.bmca.org",
    president: {
      name: "Christopher Miller",
      photo: "/president-placeholder.jpg"
    }
  },
  {
    id: 12,
    name: "North Carolina Chapter",
    description: "Serving the North Carolina community",
    phone: "+1 (555) 234-5678",
    email: "northcarolina@bmca.org",
    address: "777 Pine St, Charlotte, NC 28201",
    members: 31,
    website: "https://northcarolina.bmca.org",
    president: {
      name: "Amanda Taylor",
      photo: "/president-placeholder.jpg"
    }
  },
  {
    id: 13,
    name: "North East Chapter",
    description: "Serving the North East community",
    phone: "+1 (555) 345-6789",
    email: "northeast@bmca.org",
    address: "888 Empire St, New York, NY 10001",
    members: 58,
    website: "https://northeast.bmca.org",
    president: {
      name: "Daniel Moore",
      photo: "/president-placeholder.jpg"
    }
  },
]

export default function ChaptersSection() {
  const [selectedChapter, setSelectedChapter] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showAllChapters, setShowAllChapters] = useState(false)

  // Show only first 6 chapters initially
  const displayedChapters = showAllChapters ? chaptersData : chaptersData.slice(0, 6)

  const openModal = (chapter) => {
    setSelectedChapter(chapter)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedChapter(null), 300)
  }

  const toggleShowAll = () => {
    setShowAllChapters(!showAllChapters)
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Chapters</h2>
          <p className="text-lg text-gray-600">Connect with BMCA chapters across the United States</p>
        </div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedChapters.map((chapter) => (
            <div
              key={chapter.id}
              className="relative cursor-pointer transition-all duration-300 transform hover:scale-105"
            >
              <div
                className="p-6 rounded-lg border-2 transition-all duration-300 bg-white border-gray-200 shadow-md hover:shadow-lg"
              >
                {/* Card Top - Icon/Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-100">
                    <Users size={20} className="text-orange-600" />
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-orange-100 text-orange-600">
                    Chapter
                  </span>
                </div>

                {/* Chapter Name */}
                <h3 className="text-lg font-bold mb-2 text-gray-900">
                  {chapter.name}
                </h3>

                {/* Description */}
                <p className="text-sm mb-4 text-gray-600">
                  {chapter.description}
                </p>

                {/* President Preview */}
                <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    <img 
                      src={chapter.president.photo || "/president-placeholder.jpg"} 
                      alt={chapter.president.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Chapter President</p>
                    <p className="text-sm font-semibold text-gray-900">{chapter.president.name}</p>
                  </div>
                </div>

                {/* Quick Info Preview */}
                <div className="mt-4 space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users size={14} />
                    <span>{chapter.members} active members</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={14} />
                    <span className="truncate">{chapter.address.split(',')[0]}</span>
                  </div>
                </div>

                {/* Discrete Details Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    openModal(chapter)
                  }}
                  className="w-full mt-2 border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-medium py-2 px-4 rounded-md transition-all duration-300 text-sm"
                >
                  View Details
                </button>
              </div>

              {/* 3D Shadow Effect */}
              <div className="absolute -bottom-1 -right-1 w-full h-full rounded-lg -z-10 transition-all duration-300 bg-gray-200" />
            </div>
          ))}
        </div>

        {/* View More/Less Button */}
        {chaptersData.length > 6 && (
          <div className="text-center">
            <button
              onClick={toggleShowAll}
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {showAllChapters ? (
                <>
                  Show Less
                  <ChevronUp size={20} />
                </>
              ) : (
                <>
                  View More Chapters
                  <ChevronDown size={20} />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedChapter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-30 backdrop-blur-sm">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300 scale-95 animate-in fade-in-0 zoom-in-95 border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-orange-100 border-2 border-orange-200">
                  <Users size={28} className="text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedChapter.name}</h3>
                  <p className="text-gray-600">{selectedChapter.description}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 hover:bg-orange-100 rounded-full transition-colors duration-200"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* President Section */}
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Chapter President</h4>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
                    <img 
                      src={selectedChapter.president.photo || "/president-placeholder.jpg"} 
                      alt={selectedChapter.president.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">{selectedChapter.president.name}</p>
                    <p className="text-gray-600">Chapter President</p>
                  </div>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Globe size={18} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-500 block mb-1">Website</label>
                  <a 
                    href={selectedChapter.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline break-all"
                  >
                    {selectedChapter.website}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-500 block mb-1">Phone</label>
                  <p className="text-gray-900">{selectedChapter.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-500 block mb-1">Email</label>
                  <a 
                    href={`mailto:${selectedChapter.email}`}
                    className="text-gray-900 break-all hover:text-orange-600"
                  >
                    {selectedChapter.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-red-600" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-500 block mb-1">Address</label>
                  <p className="text-gray-900">{selectedChapter.address}</p>
                </div>
              </div>

              {/* Members */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Users size={18} className="text-orange-600" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-500 block mb-1">Active Members</label>
                  <p className="text-gray-900">{selectedChapter.members} members</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={closeModal}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}