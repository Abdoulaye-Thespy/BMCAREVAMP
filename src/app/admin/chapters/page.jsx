"use client"

import { useState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { Phone, Mail, MapPin, Users, Edit2, Trash2, Plus, Globe, X, Upload, Loader2, UserCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getChapters, createChapter, updateChapter, deleteChapter } from "@/app/actions/chapter-actions"

// Submit button component with loading state
function SubmitButton({ children, isEditing }) {
  const { pending } = useFormStatus()
  
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="w-full bg-[#F5A623] hover:bg-[#F5A623]/90 text-white"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          {isEditing ? "Updating..." : "Creating..."}
        </>
      ) : (
        children
      )}
    </Button>
  )
}

export default function ChaptersAdmin() {
  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [chapterToDelete, setChapterToDelete] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    phone: "",
    email: "",
    address: "",
    members: "",
    website: "",
    president: {
      name: "",
      photo: ""
    }
  })

  // Fetch chapters from database
  useEffect(() => {
    loadChapters()
  }, [])

  const loadChapters = async () => {
    try {
      setLoading(true)
      const result = await getChapters()
      if (result.success) {
        setChapters(result.data)
      } else {
        alert(result.error)
      }
    } catch (error) {
      console.error('Failed to fetch chapters:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (chapter) => {
    setFormData({
      name: chapter.name || "",
      description: chapter.description || "",
      phone: chapter.phone || "",
      email: chapter.email || "",
      address: chapter.address || "",
      members: chapter.members || "",
      website: chapter.website || "",
      president: chapter.president || { name: "", photo: "" }
    })
    setEditingId(chapter.id)
    setOpenDialog(true)
  }

  const handleDeleteClick = (chapter) => {
    setChapterToDelete(chapter)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!chapterToDelete) return
    
    const result = await deleteChapter(chapterToDelete.id)
    if (result.success) {
      await loadChapters()
      setDeleteDialogOpen(false)
      setChapterToDelete(null)
    } else {
      alert(result.error)
    }
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const photoUrl = URL.createObjectURL(file)
      setFormData(prev => ({
        ...prev,
        president: {
          ...prev.president,
          photo: photoUrl
        }
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const formDataObj = new FormData()
    formDataObj.append('name', formData.name)
    formDataObj.append('description', formData.description)
    formDataObj.append('phone', formData.phone)
    formDataObj.append('email', formData.email)
    formDataObj.append('address', formData.address)
    formDataObj.append('members', formData.members)
    formDataObj.append('website', formData.website)
    formDataObj.append('president', JSON.stringify(formData.president))
    
    let result
    if (editingId) {
      result = await updateChapter(editingId, formDataObj)
    } else {
      result = await createChapter(formDataObj)
    }
    
    if (result.success) {
      await loadChapters()
      setOpenDialog(false)
      setEditingId(null)
      setFormData({
        name: "",
        description: "",
        phone: "",
        email: "",
        address: "",
        members: "",
        website: "",
        president: { name: "", photo: "" }
      })
    } else {
      alert(result.error)
    }
  }

  const handleAddNew = () => {
    setEditingId(null)
    setFormData({
      name: "",
      description: "",
      phone: "",
      email: "",
      address: "",
      members: "",
      website: "",
      president: { name: "", photo: "" }
    })
    setOpenDialog(true)
  }

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="text-gray-600">Loading chapters...</div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chapters Management</h1>
          <p className="text-gray-600 mt-2">Manage and update chapter information</p>
        </div>
        <Button onClick={handleAddNew} className="bg-[#F5A623] hover:bg-[#F5A623]/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Chapter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chapters.map((chapter) => (
          <Card 
            key={chapter.id} 
            className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-[#F5A623] bg-white"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{chapter.name}</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{chapter.description || "No description"}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(chapter)}
                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Edit2 className="h-4 w-4 text-blue-600" />
                </button>
                <button
                  onClick={() => handleDeleteClick(chapter)}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>

            <div className="space-y-3 mt-4 pt-4 border-t border-gray-100">
              {/* President Section - Always shows icon instead of photo */}
              {chapter.president?.name && (
                <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center shadow-inner">
                    <UserCircle className="h-10 w-10 text-[#F5A623]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Chapter President</p>
                    <p className="text-base font-semibold text-gray-900">{chapter.president.name}</p>
                  </div>
                </div>
              )}
              
              {chapter.phone && chapter.phone !== "will be added soon" && (
                <div className="flex items-center gap-3 text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <Phone className="h-4 w-4 text-[#F5A623]" />
                  <span className="text-sm">{chapter.phone}</span>
                </div>
              )}
              
              {chapter.email && chapter.email !== "will be added soon" && (
                <div className="flex items-center gap-3 text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <Mail className="h-4 w-4 text-[#F5A623]" />
                  <span className="text-sm">{chapter.email}</span>
                </div>
              )}
              
              {chapter.address && chapter.address !== "will be added soon" && (
                <div className="flex items-center gap-3 text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <MapPin className="h-4 w-4 text-[#F5A623]" />
                  <span className="text-sm">{chapter.address}</span>
                </div>
              )}
              
              {chapter.website && chapter.website !== "will be added soon" && (
                <div className="flex items-center gap-3 text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <Globe className="h-4 w-4 text-[#F5A623]" />
                  <span className="text-sm">{chapter.website}</span>
                </div>
              )}
              
              {chapter.members && chapter.members !== "will be added soon" && (
                <div className="flex items-center gap-3 text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <Users className="h-4 w-4 text-[#F5A623]" />
                  <span className="text-sm font-medium">{chapter.members} active members</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b bg-gradient-to-r from-amber-50 to-orange-50">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {editingId ? "Edit Chapter" : "Add New Chapter"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="px-6 pb-6">
            <div className="space-y-6">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-[#F5A623] pb-2 inline-block">Basic Information</h3>
                
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Chapter Name *</Label>
                  <Input
                    placeholder="Enter chapter name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 focus:ring-[#F5A623] focus:border-[#F5A623]"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Description</Label>
                  <Textarea
                    placeholder="Enter chapter description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="mt-1 focus:ring-[#F5A623] focus:border-[#F5A623]"
                  />
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-[#F5A623] pb-2 inline-block">Contact Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Phone</Label>
                    <Input
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1 focus:ring-[#F5A623] focus:border-[#F5A623]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 focus:ring-[#F5A623] focus:border-[#F5A623]"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Address</Label>
                  <Input
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="mt-1 focus:ring-[#F5A623] focus:border-[#F5A623]"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Members</Label>
                    <Input
                      placeholder="Number of members"
                      value={formData.members}
                      onChange={(e) => setFormData({ ...formData, members: e.target.value })}
                      className="mt-1 focus:ring-[#F5A623] focus:border-[#F5A623]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Website</Label>
                    <Input
                      placeholder="Website URL"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="mt-1 focus:ring-[#F5A623] focus:border-[#F5A623]"
                    />
                  </div>
                </div>
              </div>

              {/* President Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-[#F5A623] pb-2 inline-block">President Information</h3>
                
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">President Name</Label>
                  <Input
                    placeholder="Enter president's full name"
                    value={formData.president.name}
                    onChange={(e) => setFormData({
                      ...formData,
                      president: { ...formData.president, name: e.target.value }
                    })}
                    className="mt-1 text-base focus:ring-[#F5A623] focus:border-[#F5A623]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">President Photo (Optional)</Label>
                  <div className="mt-2">
                    {formData.president.photo ? (
                      <div className="relative w-24 h-24 mb-3">
                        <img
                          src={formData.president.photo}
                          alt="President preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({
                            ...formData,
                            president: { ...formData.president, photo: "" }
                          })}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center shadow-inner">
                          <UserCircle className="h-8 w-8 text-[#F5A623]" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="focus:ring-[#F5A623] focus:border-[#F5A623]"
                          />
                          <p className="text-xs text-gray-500 mt-2">
                            Upload a photo for the chapter president (optional)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <SubmitButton isEditing={!!editingId}>
                  {editingId ? "Update Chapter" : "Create Chapter"}
                </SubmitButton>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600">Confirm Delete</DialogTitle>
          </DialogHeader>
          
          <div className="py-6">
            <p className="text-gray-700">
              Are you sure you want to delete <strong className="text-gray-900">{chapterToDelete?.name}</strong>?
            </p>
            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
              <p className="text-sm text-red-700 font-medium">
                ⚠️ Warning: This action cannot be undone.
              </p>
              <p className="text-xs text-red-600 mt-1">
                All data associated with this chapter will be permanently removed.
              </p>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
              className="px-4"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              className="px-4 bg-red-600 hover:bg-red-700"
            >
              Delete Chapter
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}