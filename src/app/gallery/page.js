'use client'

import { useState, useMemo } from 'react'
import { ChevronDown, ImageIcon, Play } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const galleryItems = [
  // 2024 Items
  {
    id: 1,
    title: 'Community Water Drive 2024',
    year: 2024,
    category: 'Water',
    type: 'image',
    thumbnail: '/community-water-drive-2024.jpg',
  },
  {
    id: 2,
    title: 'Education Program Launch',
    year: 2024,
    category: 'Education',
    type: 'image',
    thumbnail: '/education-program-launch.jpg',
  },
  {
    id: 3,
    title: 'Convention 2024 Highlights',
    year: 2024,
    category: 'Convention 2024',
    type: 'video',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 4,
    title: 'Community Outreach Event',
    year: 2024,
    category: 'Events',
    type: 'image',
    thumbnail: '/community-outreach-event.jpg',
  },
  // 2023 Items
  {
    id: 5,
    title: 'Convention 2023 Opening',
    year: 2023,
    category: 'Convention 2023',
    type: 'video',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 6,
    title: 'Health Initiative 2023',
    year: 2023,
    category: 'Health',
    type: 'image',
    thumbnail: '/health-initiative-2023.jpg',
  },
  {
    id: 7,
    title: 'Cultural Arts Program',
    year: 2023,
    category: 'Culture & Arts',
    type: 'image',
    thumbnail: '/cultural-arts-program.jpg',
  },
  {
    id: 8,
    title: 'Convention 2023 Ceremony',
    year: 2023,
    category: 'Convention 2023',
    type: 'video',
    youtubeId: 'dQw4w9WgXcQ',
  },
  // 2022 Items
  {
    id: 9,
    title: 'Water Project Completion',
    year: 2022,
    category: 'Water',
    type: 'image',
    thumbnail: '/water-project-completion.jpg',
  },
  {
    id: 10,
    title: 'Convention 2022 Recap',
    year: 2022,
    category: 'Convention 2022',
    type: 'video',
    youtubeId: 'dQw4w9WgXcQ',
  },
]

export default function GalleryPage() {
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const years = ['all', ...new Set(galleryItems.map(item => item.year))]
  const categories = ['all', ...new Set(galleryItems.map(item => item.category))]

  const filteredItems = useMemo(() => {
    return galleryItems.filter(item => {
      const yearMatch = selectedYear === 'all' || item.year === parseInt(selectedYear)
      const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory
      return yearMatch && categoryMatch
    })
  }, [selectedYear, selectedCategory])

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="text-primary font-semibold mb-2">Our Gallery</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Moments & Memories
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of photos and videos from events, programs, and community initiatives
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center items-start md:items-center">
            {/* Year Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-foreground mb-2">Filter by Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-10 text-foreground cursor-pointer hover:border-primary transition-colors"
              >
                <option value="all">All Years</option>
                {years.filter(y => y !== 'all').map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-9 w-4 h-4 pointer-events-none text-muted-foreground" />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-foreground mb-2">Filter by Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-10 text-foreground cursor-pointer hover:border-primary transition-colors"
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c !== 'all').map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-9 w-4 h-4 pointer-events-none text-muted-foreground" />
            </div>

            {/* Clear Filters */}
            {(selectedYear !== 'all' || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSelectedYear('all')
                  setSelectedCategory('all')
                }}
                className="mt-auto px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Gallery Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-card border border-border"
                >
                  {item.type === 'image' ? (
                    <>
                      <img
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative w-full h-64 bg-black flex items-center justify-center overflow-hidden">
                        <img
                          src={`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                          <Play className="w-12 h-12 text-white fill-white opacity-90 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Overlay Info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">{item.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-300">{item.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <ImageIcon className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground font-medium">No items found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-8 text-center text-muted-foreground">
            Showing {filteredItems.length} of {galleryItems.length} items
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
