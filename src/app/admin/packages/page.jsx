"use client"

import { useState } from "react"
import { Edit2, Trash2, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const packagesData = [
  { id: 1, name: "Kids Package", price: 50, category: "Kids", items: "Convention Cost, T-Shirt, BBQ" },
  { id: 2, name: "Adult Package", price: 100, category: "Adult", items: "Convention Cost, Gala, T-Shirt, Drinks, BBQ" },
  {
    id: 3,
    name: "Couple Package",
    price: 180,
    category: "Couple",
    items: "Convention Cost (x2), Gala Night (x2), Soccer",
  },
  { id: 4, name: "Elderly Package", price: 75, category: "Elderly", items: "Convention Cost, T-Shirt, Soft Drinks" },
  { id: 5, name: "Non-Registered", price: 120, category: "General", items: "All events included" },
]

export default function PackagesAdmin() {
  const [packages, setPackages] = useState(packagesData)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "",
    items: "",
  })

  const handleEdit = (pkg) => {
    setFormData(pkg)
    setEditingId(pkg.id)
    setOpenDialog(true)
  }

  const handleDelete = (id) => {
    setPackages(packages.filter((p) => p.id !== id))
  }

  const handleSave = () => {
    if (editingId) {
      setPackages(packages.map((p) => (p.id === editingId ? { ...formData, id: editingId } : p)))
    } else {
      setPackages([...packages, { ...formData, id: Date.now() }])
    }
    setOpenDialog(false)
    setEditingId(null)
    setFormData({ name: "", price: 0, category: "", items: "" })
  }

  const handleAddNew = () => {
    setEditingId(null)
    setFormData({ name: "", price: 0, category: "", items: "" })
    setOpenDialog(true)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Convention Packages</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
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
    </div>
  )
}
