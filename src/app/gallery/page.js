'use client'

import { useState, useMemo } from 'react'
import { ChevronDown, ImageIcon, Play } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const galleryItems = [
  // 2024 Items
  {
    id: 1,
    title: 'Education Program Launch',
    year: 2025,
    category: 'Education',
    type: 'image',
    thumbnail: '/education2.jpg',
  },
  {
    id: 2,
    title: 'Education Program Launch',
    year: 2025,
    category: 'Education',
    type: 'image',
    thumbnail: '/education1.jpg',
  },
  {
    id: 4,
    title: 'Community Outreach Event',
    year: 2024,
    category: 'Events',
    type: 'image',
    thumbnail: '/outreach.jpg',
  },
  // 2023 Items
  {
    id: 5,
    title: 'Washington DC Chapter Bafut Manjong Cultural Ass. 23rd Annual convention Texas',
    year: 2023,
    category: 'Convention 2023',
    type: 'video',
    youtubeId: 'e5EpF4KbIyA',
  },
  {
    id: 4,
    title: 'Community Outreach Event',
    year: 2024,
    category: 'Events',
    type: 'image',
    thumbnail: '/outreach1.jpg',
  },
  // 2023 Items
  {
    id: 7,
    title: 'Cultural Arts Program',
    year: 2023,
    category: 'Culture & Arts',
    type: 'image',
    thumbnail: '/bmcawater3.jpg',
  },
  {
    id: 8,
    title: 'Minnesota Chapter Bafut Manjong Cultural Ass. 23rd Annual convention Texas',
    year: 2023,
    category: 'Convention 2023',
    type: 'video',
    youtubeId: 'jTHU3NWAzvY',
  },
  // 2022 Items
  {
    id: 9,
    title: 'Water Project Completion',
    year: 2022,
    category: 'Water',
    type: 'image',
    thumbnail: '/bmcawater2.jpg',
  },
  {
    id: 10,
    title: 'Dallas Chapter Bafut Manjong Cultural Ass. 23rd Annual convention Texas',
    year: 2022,
    category: 'Convention 2022',
    type: 'video',
    youtubeId: 'N7cj_1TjP1c',
  },
]

export default function GalleryPage() {
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [activeTab, setActiveTab] = useState('all')

  const years = ['all', ...new Set(galleryItems.map(item => item.year))]
  const categories = ['all', ...new Set(galleryItems.map(item => item.category))]

  const filteredItems = useMemo(() => {
    let filtered = galleryItems.filter(item => {
      const yearMatch = selectedYear === 'all' || item.year === parseInt(selectedYear)
      const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory
      return yearMatch && categoryMatch
    })

    // Filter by media type based on active tab
    if (activeTab === 'images') {
      filtered = filtered.filter(item => item.type === 'image')
    } else if (activeTab === 'videos') {
      filtered = filtered.filter(item => item.type === 'video')
    }

    return filtered
  }, [selectedYear, selectedCategory, activeTab])

  const images = filteredItems.filter(item => item.type === 'image')
  const videos = filteredItems.filter(item => item.type === 'video')

  const openVideoModal = (youtubeId, title) => {
    // Create modal for video playback
    const modal = document.createElement('div')
    modal.className = 'fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4'
    modal.innerHTML = `
      <div class="relative w-full max-w-4xl">
        <button class="absolute -top-12 right-0 text-white hover:text-orange-300 text-2xl z-10 transition-colors">
          ×
        </button>
        <div class="relative aspect-video w-full">
          <iframe 
            src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" 
            class="w-full h-full rounded-lg"
            allow="autoplay; encrypted-media"
            allowfullscreen
            title="${title}"
          ></iframe>
        </div>
      </div>
    `
    
    const closeModal = () => {
      document.body.removeChild(modal)
      document.body.style.overflow = 'auto'
    }
    
    modal.querySelector('button').onclick = closeModal
    modal.onclick = (e) => {
      if (e.target === modal) closeModal()
    }
    
    document.body.style.overflow = 'hidden'
    document.body.appendChild(modal)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="text-orange-600 font-semibold mb-2">BMCA Gallery</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              BMCA Moments & Memories
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of photos and videos from BMCA events, programs, conventions, and community initiatives
            </p>
          </div>

          {/* Media Type Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-card border border-orange-200 rounded-lg p-1">
              {[
                { id: 'all', label: 'All Media' },
                { id: 'images', label: 'Photos' },
                { id: 'videos', label: 'Videos' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'text-foreground hover:bg-orange-50 hover:text-orange-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center items-start md:items-center">
            {/* Year Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-foreground mb-2">Filter by Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none bg-card border border-orange-200 rounded-lg px-4 py-2 pr-10 text-foreground cursor-pointer hover:border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
              >
                <option value="all">All Years</option>
                {years.filter(y => y !== 'all').map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-9 w-4 h-4 pointer-events-none text-orange-500" />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-foreground mb-2">Filter by Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-card border border-orange-200 rounded-lg px-4 py-2 pr-10 text-foreground cursor-pointer hover:border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c !== 'all').map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-9 w-4 h-4 pointer-events-none text-orange-500" />
            </div>

            {/* Clear Filters */}
            {(selectedYear !== 'all' || selectedCategory !== 'all' || activeTab !== 'all') && (
              <button
                onClick={() => {
                  setSelectedYear('all')
                  setSelectedCategory('all')
                  setActiveTab('all')
                }}
                className="mt-auto px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:ring-2 focus:ring-orange-200 transition-colors font-medium shadow-md hover:shadow-lg"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Content Sections */}
          {activeTab !== 'videos' && images.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center border-b-2 border-orange-500 pb-2 inline-block">
                BMCA Photos
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {images.map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-card border border-orange-100"
                  >
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-orange-900/20 transition-colors duration-300 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    {/* Overlay Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-900/90 via-orange-800/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">{item.title}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-orange-600 text-white px-2 py-1 rounded font-medium">
                          {item.category}
                        </span>
                        <span className="text-xs text-orange-200 font-medium">{item.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab !== 'images' && videos.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center border-b-2 border-orange-500 pb-2 inline-block">
                BMCA Videos
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {videos.map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-card border border-orange-100"
                    onClick={() => openVideoModal(item.youtubeId, item.title)}
                  >
                    <div className="relative w-full h-64 bg-black flex items-center justify-center overflow-hidden">
                      <img
                        src={`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-orange-900/40 transition-colors duration-300 flex items-center justify-center">
                        <div className="bg-orange-600 rounded-full p-4 group-hover:bg-orange-700 transition-colors shadow-lg">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Overlay Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-900/90 via-orange-800/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">{item.title}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-orange-600 text-white px-2 py-1 rounded font-medium">
                          {item.category}
                        </span>
                        <span className="text-xs text-orange-200 font-medium">{item.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <ImageIcon className="w-16 h-16 text-orange-400 mb-4" />
              <p className="text-lg text-orange-800 font-medium mb-2">No items found</p>
              <p className="text-sm text-orange-600">Try adjusting your filters</p>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-8 text-center text-orange-700 font-medium">
            Showing {filteredItems.length} of {galleryItems.length} BMCA items
            {activeTab === 'images' && ` (${images.length} photos)`}
            {activeTab === 'videos' && ` (${videos.length} videos)`}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}