"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Users, Edit2, Trash2, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const chaptersData = [
  {
    id: 1,
    name: "Houston Chapter",
    description: "Serving the Houston community",
    phone: "(713) 555-0101",
    email: "houston@bmca.org",
    address: "Houston, TX 77001",
    members: 45,
  },
  {
    id: 2,
    name: "Dallas Chapter",
    description: "Serving the Dallas community",
    phone: "(214) 555-0102",
    email: "dallas@bmca.org",
    address: "Dallas, TX 75201",
    members: 38,
  },
  {
    id: 3,
    name: "Florida Chapter",
    description: "Serving the Florida community",
    phone: "(305) 555-0103",
    email: "florida@bmca.org",
    address: "Miami, FL 33101",
    members: 52,
  },
  {
    id: 4,
    name: "Los Angeles Chapter",
    description: "Serving the Los Angeles community",
    phone: "(213) 555-0104",
    email: "losangeles@bmca.org",
    address: "Los Angeles, CA 90001",
    members: 60,
  },
]

export default function ChaptersAdmin() {
  const [chapters, setChapters] = useState(chaptersData)
  const [editingId, setEditingId] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    phone: "",
    email: "",
    address: "",
    members: 0,
  })

  const handleEdit = (chapter) => {
    setFormData(chapter)
    setEditingId(chapter.id)
    setOpenDialog(true)
  }

  const handleDelete = (id) => {
    setChapters(chapters.filter((ch) => ch.id !== id))
  }

  const handleSave = () => {
    if (editingId) {
      setChapters(chapters.map((ch) => (ch.id === editingId ? { ...formData, id: editingId } : ch)))
    } else {
      setChapters([...chapters, { ...formData, id: Date.now() }])
    }
    setOpenDialog(false)
    setEditingId(null)
    setFormData({
      name: "",
      description: "",
      phone: "",
      email: "",
      address: "",
      members: 0,
    })
  }

  const handleAddNew = () => {
    setEditingId(null)
    setFormData({
      name: "",
      description: "",
      phone: "",
      email: "",
      address: "",
      members: 0,
    })
    setOpenDialog(true)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chapters Management</h1>
          <p className="text-gray-600 mt-2">Manage and update chapter information</p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="bg-[#F5A623] hover:bg-[#F5A623]/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Chapter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Chapter" : "Add New Chapter"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Chapter Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                placeholder="Members"
                value={formData.members}
                onChange={(e) => setFormData({ ...formData, members: Number.parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <Button onClick={handleSave} className="w-full bg-[#F5A623] hover:bg-[#F5A623]/90 text-white">
                Save Chapter
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chapters.map((chapter) => (
          <Card key={chapter.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{chapter.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{chapter.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(chapter)}
                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Edit2 className="h-4 w-4 text-blue-600" />
                </button>
                <button
                  onClick={() => handleDelete(chapter.id)}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4 text-[#F5A623]" />
                <span className="text-sm">{chapter.phone || "Not set"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4 text-[#F5A623]" />
                <span className="text-sm">{chapter.email || "Not set"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-[#F5A623]" />
                <span className="text-sm">{chapter.address || "Not set"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="h-4 w-4 text-[#F5A623]" />
                <span className="text-sm">{chapter.members} active members</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
