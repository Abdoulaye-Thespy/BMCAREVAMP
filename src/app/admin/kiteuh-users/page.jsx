"use client"

import { useState } from "react"
import { Edit2, Trash2, Plus, Mail, Phone } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const usersData = [
  {
    id: 1,
    name: "Ahmed Hassan",
    email: "ahmed@bmca.org",
    phone: "(713) 555-0001",
    role: "Kitchen Manager",
    status: "Active",
  },
  { id: 2, name: "Fatima Ali", email: "fatima@bmca.org", phone: "(713) 555-0002", role: "Chef", status: "Active" },
  {
    id: 3,
    name: "Mahmoud Ibrahim",
    email: "mahmoud@bmca.org",
    phone: "(713) 555-0003",
    role: "Kitchen Staff",
    status: "Active",
  },
  {
    id: 4,
    name: "Leila Karim",
    email: "leila@bmca.org",
    phone: "(713) 555-0004",
    role: "Food Coordinator",
    status: "Inactive",
  },
]

export default function KitchenUsersAdmin() {
  const [users, setUsers] = useState(usersData)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "Active",
  })

  const handleEdit = (user) => {
    setFormData(user)
    setEditingId(user.id)
    setOpenDialog(true)
  }

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const handleSave = () => {
    if (editingId) {
      setUsers(users.map((u) => (u.id === editingId ? { ...formData, id: editingId } : u)))
    } else {
      setUsers([...users, { ...formData, id: Date.now() }])
    }
    setOpenDialog(false)
    setEditingId(null)
    setFormData({ name: "", email: "", phone: "", role: "", status: "Active" })
  }

  const handleAddNew = () => {
    setEditingId(null)
    setFormData({ name: "", email: "", phone: "", role: "", status: "Active" })
    setOpenDialog(true)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kitchen Users Management</h1>
          <p className="text-gray-600 mt-2">Manage kitchen staff and coordinators</p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="bg-[#F5A623] hover:bg-[#F5A623]/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit User" : "Add New User"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Role</option>
                <option value="Kitchen Manager">Kitchen Manager</option>
                <option value="Chef">Chef</option>
                <option value="Kitchen Staff">Kitchen Staff</option>
                <option value="Food Coordinator">Food Coordinator</option>
              </select>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <Button onClick={handleSave} className="w-full bg-[#F5A623] hover:bg-[#F5A623]/90 text-white">
                Save User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                <span
                  className={`inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full ${
                    user.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(user)} className="p-2 hover:bg-blue-100 rounded-lg">
                  <Edit2 className="h-4 w-4 text-blue-600" />
                </button>
                <button onClick={() => handleDelete(user.id)} className="p-2 hover:bg-red-100 rounded-lg">
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
            <div className="mb-3 px-3 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium w-fit">{user.role}</div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#F5A623]" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#F5A623]" />
                <span>{user.phone}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
