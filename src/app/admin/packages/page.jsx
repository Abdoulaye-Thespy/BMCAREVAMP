"use client"

import { useState, useEffect } from "react"
import { Edit2, Trash2, Plus, Calendar, Tag, List, Info, PackageIcon  } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Deadline dates from the image
const DEADLINES = {
  EARLY_BIRD: { start: "Feb 1, 2026", end: "May 31, 2026", label: "Early Bird" },
  STANDARD: { start: "June 1, 2026", end: "June 30, 2026", label: "Standard" },
  LATE: { start: "July 1, 2026", end: "July 13, 2026", label: "Late" },
  OTHER: { start: "Ongoing", end: "Ongoing", label: "Other Packages" }
}

export default function PackagesAdmin() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeDeadline, setActiveDeadline] = useState("EARLY_BIRD")
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
      setLoading(true)
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
    if (activeDeadline === "OTHER") {
      // Show packages that don't match any deadline category
      return packages.filter(pkg => {
        const name = pkg.name.toLowerCase()
        return !name.includes("early bird") && 
               !name.includes("standard") && 
               !name.includes("late")
      })
    }
    
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
    setFormData({
      name: pkg.name,
      price: pkg.price,
      category: pkg.category,
      items: Array.isArray(pkg.items) ? pkg.items.join(', ') : pkg.items,
    })
    setEditingId(pkg.id)
    setOpenDialog(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this package?')) {
      try {
        await fetch('/api/packages', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        })
        fetchPackages()
      } catch (error) {
        console.error('Failed to delete package:', error)
        alert('Failed to delete package')
      }
    }
  }

  const handleSave = async () => {
    // Validate required fields
    if (!formData.name || !formData.price || !formData.category || !formData.items) {
      alert('Please fill in all fields')
      return
    }

    // Convert comma-separated items to array or store as string
    const itemsArray = formData.items.split(',').map(item => item.trim()).filter(item => item)
    
    const packageData = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      items: itemsArray
    }

    try {
      if (editingId) {
        await fetch('/api/packages', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...packageData, id: editingId })
        })
      } else {
        await fetch('/api/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(packageData)
        })
      }
      fetchPackages()
      setOpenDialog(false)
      setEditingId(null)
      setFormData({ name: "", price: 0, category: "", items: "" })
    } catch (error) {
      console.error('Failed to save package:', error)
      alert('Failed to save package')
    }
  }

  const handleAddNew = () => {
    setEditingId(null)
    setFormData({ name: "", price: 0, category: "", items: "" })
    setOpenDialog(true)
  }

  const formatItems = (items) => {
    if (Array.isArray(items)) {
      return items
    }
    if (typeof items === 'string') {
      return items.split(',').map(item => item.trim())
    }
    return []
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
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">BMCA 2026 Convention Packages</h1>
          <p className="text-gray-600 mt-2">Manage and create convention packages</p>
        </div>
        <Button onClick={handleAddNew} className="bg-[#F5A623] hover:bg-[#F5A623]/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Package
        </Button>
      </div>

      {/* Deadline Toggle */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-5 w-5 text-[#F5A623]" />
          <h2 className="text-lg font-semibold">Select Pricing Period</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveDeadline("EARLY_BIRD")}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeDeadline === "EARLY_BIRD" 
                ? "border-[#F5A623] bg-orange-50 shadow-md" 
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="font-bold text-lg">Early Bird</div>
            <div className="text-sm text-gray-600">Till {DEADLINES.EARLY_BIRD.end}</div>
            <div className="text-xs text-gray-500 mt-1">Save up to $40</div>
          </button>
          
          <button
            onClick={() => setActiveDeadline("STANDARD")}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeDeadline === "STANDARD" 
                ? "border-[#F5A623] bg-orange-50 shadow-md" 
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="font-bold text-lg">Standard</div>
            <div className="text-sm text-gray-600">{DEADLINES.STANDARD.start} - {DEADLINES.STANDARD.end}</div>
          </button>
          
          <button
            onClick={() => setActiveDeadline("LATE")}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeDeadline === "LATE" 
                ? "border-[#F5A623] bg-orange-50 shadow-md" 
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="font-bold text-lg">Late</div>
            <div className="text-sm text-gray-600">{DEADLINES.LATE.start} - {DEADLINES.LATE.end}</div>
          </button>

          <button
            onClick={() => setActiveDeadline("OTHER")}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeDeadline === "OTHER" 
                ? "border-[#F5A623] bg-orange-50 shadow-md" 
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="font-bold text-lg">Other Packages</div>
            <div className="text-sm text-gray-600">Special & Additional</div>
          </button>
        </div>
        
        {/* Active period indicator */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Currently showing:</span> {DEADLINES[activeDeadline]?.label || activeDeadline} prices 
            {activeDeadline !== "OTHER" && ` (${DEADLINES[activeDeadline]?.start} - ${DEADLINES[activeDeadline]?.end})`}
          </p>
        </div>
      </div>

      {/* Add Package Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {editingId ? "Edit Package" : "Add New Package"}
            </DialogTitle>
            <DialogDescription>
              Create a new convention package. Make sure to follow the naming convention for proper filtering.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-5 py-4">
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Package Name *
              </Label>
              <Input
                placeholder="e.g., Early Bird Package, Standard Package, Late Package, VIP Package"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Tip: Include "Early Bird", "Standard", or "Late" in the name for automatic filtering
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Price (USD) *
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Category *
                </Label>
                <Input
                  placeholder="e.g., Individual, Group, VIP"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Items Included *
              </Label>
              <Textarea
                placeholder="Enter items separated by commas, e.g.: Full Convention Access, Welcome Kit, Meals, T-Shirt, Certificate"
                value={formData.items}
                onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                rows={4}
                className="w-full"
              />
              <div className="mt-2 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-xs text-yellow-800 flex items-start gap-2">
                  <Info className="h-3 w-3 mt-0.5" />
                  <span>Separate each item with a comma (,). Example: "Full Convention Access, Welcome Kit, Meals, T-Shirt, Certificate"</span>
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handleSave} className="w-full bg-[#F5A623] hover:bg-[#F5A623]/90 text-white">
                {editingId ? "Update Package" : "Create Package"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => {
          const itemsList = formatItems(pkg.items)
          return (
            <Card key={pkg.id} className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-[#F5A623]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{pkg.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                      {pkg.category}
                    </span>
                    {pkg.name.toLowerCase().includes("early") && (
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                        Early Bird
                      </span>
                    )}
                    {pkg.name.toLowerCase().includes("standard") && (
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                        Standard
                      </span>
                    )}
                    {pkg.name.toLowerCase().includes("late") && (
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                        Late
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(pkg)} 
                    className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                    title="Edit package"
                  >
                    <Edit2 className="h-4 w-4 text-blue-600" />
                  </button>
                  <button 
                    onClick={() => handleDelete(pkg.id)} 
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                    title="Delete package"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-3xl font-bold text-[#F5A623]">${pkg.price.toLocaleString()}</p>
                {pkg.price < 500 && pkg.name.toLowerCase().includes("early") && (
                  <p className="text-xs text-green-600 mt-1">Save $40 compared to regular price</p>
                )}
              </div>
              
              <div className="text-sm text-gray-600">
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <List className="h-4 w-4 text-[#F5A623]" />
                  What's Included:
                </p>
                <ul className="space-y-1">
                  {itemsList.slice(0, 5).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#F5A623] mt-1">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                  {itemsList.length > 5 && (
                    <li className="text-gray-500 text-xs pl-4">
                      +{itemsList.length - 5} more items
                    </li>
                  )}
                </ul>
              </div>
            </Card>
          )
        })}
      </div>

      {filteredPackages.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <PackageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No packages found for this period.</p>
          <Button 
            onClick={handleAddNew}
            variant="outline" 
            className="mt-4 border-[#F5A623] text-[#F5A623] hover:bg-orange-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create First Package
          </Button>
        </div>
      )}
    </div>
  )
}