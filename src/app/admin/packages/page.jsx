"use client"

import { useState, useEffect } from "react"
import { Edit2, Trash2, Plus, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Deadline dates from the image
const DEADLINES = {
  EARLY_BIRD: { start: "Feb 1, 2026", end: "May 31, 2026", label: "Early Bird" },
  STANDARD: { start: "June 1, 2026", end: "June 30, 2026", label: "Standard" },
  LATE: { start: "July 1, 2026", end: "July 13, 2026", label: "Late" }
}

export default function PackagesAdmin() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeDeadline, setActiveDeadline] = useState("EARLY_BIRD") // Default to Early Bird
  const [openDialog, setOpenDialog] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "",
    items: "",
  })

  // Fetch packages from database
  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/packages')
      const data = await res.json()
      setPackages(data)
    } catch (error) {
      console.error('Failed to fetch packages:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter packages based on active deadline
  const getFilteredPackages = () => {
    return packages.filter(pkg => {
      const name = pkg.name.toLowerCase()
      switch(activeDeadline) {
        case "EARLY_BIRD":
          return name.includes("early bird")
        case "STANDARD":
          return name.includes("standard")
        case "LATE":
          return name.includes("late")
        default:
          return true
      }
    })
  }

  const handleEdit = (pkg) => {
    setFormData(pkg)
    setEditingId(pkg.id)
    setOpenDialog(true)
  }

  const handleDelete = async (id) => {
    try {
      await fetch('/api/packages', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      fetchPackages()
    } catch (error) {
      console.error('Failed to delete package:', error)
    }
  }

  const handleSave = async () => {
    try {
      if (editingId) {
        await fetch('/api/packages', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: editingId })
        })
      } else {
        await fetch('/api/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      }
      fetchPackages()
      setOpenDialog(false)
      setEditingId(null)
      setFormData({ name: "", price: 0, category: "", items: "" })
    } catch (error) {
      console.error('Failed to save package:', error)
    }
  }

  const handleAddNew = () => {
    setEditingId(null)
    setFormData({ name: "", price: 0, category: "", items: "" })
    setOpenDialog(true)
  }

  const filteredPackages = getFilteredPackages()

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="text-gray-600">Loading packages...</div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">BMCA 2026 Convention Packages</h1>
          <p className="text-gray-600 mt-2">Manage and create convention packages</p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="bg-[#F5A623] hover:bg-[#F5A623]/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Package
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Package" : "Add New Package"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Package Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <textarea
                placeholder="Items included"
                value={formData.items}
                onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows="3"
              />
              <Button onClick={handleSave} className="w-full bg-[#F5A623] hover:bg-[#F5A623]/90 text-white">
                Save Package
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Deadline Toggle */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-5 w-5 text-[#F5A623]" />
          <h2 className="text-lg font-semibold">Select Pricing Period</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setActiveDeadline("EARLY_BIRD")}
            className={`flex-1 min-w-[200px] p-4 rounded-lg border-2 transition-all ${
              activeDeadline === "EARLY_BIRD" 
                ? "border-[#F5A623] bg-orange-50" 
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="font-bold text-lg">Early Bird</div>
            <div className="text-sm text-gray-600">Till {DEADLINES.EARLY_BIRD.end}</div>
            <div className="text-xs text-gray-500 mt-1">Save up to $40</div>
          </button>
          
          <button
            onClick={() => setActiveDeadline("STANDARD")}
            className={`flex-1 min-w-[200px] p-4 rounded-lg border-2 transition-all ${
              activeDeadline === "STANDARD" 
                ? "border-[#F5A623] bg-orange-50" 
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="font-bold text-lg">Standard</div>
            <div className="text-sm text-gray-600">{DEADLINES.STANDARD.start} - {DEADLINES.STANDARD.end}</div>
          </button>
          
          <button
            onClick={() => setActiveDeadline("LATE")}
            className={`flex-1 min-w-[200px] p-4 rounded-lg border-2 transition-all ${
              activeDeadline === "LATE" 
                ? "border-[#F5A623] bg-orange-50" 
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="font-bold text-lg">Late</div>
            <div className="text-sm text-gray-600">{DEADLINES.LATE.start} - {DEADLINES.LATE.end}</div>
          </button>
        </div>
        
        {/* Active period indicator */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Currently showing:</span> {DEADLINES[activeDeadline].label} prices 
            ({DEADLINES[activeDeadline].start} - {DEADLINES[activeDeadline].end})
          </p>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <Card key={pkg.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                <span className="inline-block mt-1 px-3 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                  {pkg.category}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(pkg)} className="p-2 hover:bg-blue-100 rounded-lg">
                  <Edit2 className="h-4 w-4 text-blue-600" />
                </button>
                <button onClick={() => handleDelete(pkg.id)} className="p-2 hover:bg-red-100 rounded-lg">
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-2xl font-bold text-[#F5A623]">${pkg.price}</p>
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-2">Includes:</p>
              <p className="line-clamp-3">{pkg.items}</p>
            </div>
          </Card>
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No packages found for this period.
        </div>
      )}
    </div>
  )
}