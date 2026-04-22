"use client"

import { useState, useEffect } from "react"
import { Check, X, Eye, Mail, Phone, MapPin, Calendar, User, RefreshCw, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function KiteuhAdminDashboard() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedApp, setSelectedApp] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [assigningId, setAssigningId] = useState(null)
  const [memberId, setMemberId] = useState("")
  const [notes, setNotes] = useState("")
  const [filter, setFilter] = useState("PENDING")

  useEffect(() => {
    fetchApplications()
  }, [filter])

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/kiteuh?status=${filter}`)
      const data = await response.json()
      setApplications(data)
    } catch (error) {
      console.error("Error fetching applications:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAssignMemberId = async () => {
    try {
      const response = await fetch("/api/kiteuh/admin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId: assigningId,
          memberId: memberId,
          notes: notes,
        }),
      })

      if (response.ok) {
        alert("Member ID assigned successfully! Email sent to applicant.")
        setShowAssignModal(false)
        setMemberId("")
        setNotes("")
        fetchApplications()
      } else {
        throw new Error("Failed to assign member ID")
      }
    } catch (error) {
      console.error("Error assigning member ID:", error)
      alert("Failed to assign member ID. Please try again.")
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      APPROVED: { color: "bg-green-100 text-green-800", label: "Approved" },
      REJECTED: { color: "bg-red-100 text-red-800", label: "Rejected" },
      ACTIVE: { color: "bg-blue-100 text-blue-800", label: "Active" },
    }
    const config = statusConfig[status] || statusConfig.PENDING
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kiteuh Program Management</h1>
          <p className="text-gray-600 mt-2">Manage member applications and assign member IDs</p>
        </div>
        <div className="flex gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="PENDING">Pending Applications</option>
            <option value="APPROVED">Approved Applications</option>
            <option value="ACTIVE">Active Members</option>
            <option value="REJECTED">Rejected</option>
            <option value="all">All Applications</option>
          </select>
          <Button
            onClick={fetchApplications}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900">{applications.length}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <User className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">
                {applications.filter(a => a.status === "PENDING").length}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-3xl font-bold text-green-600">
                {applications.filter(a => a.status === "APPROVED").length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Members</p>
              <p className="text-3xl font-bold text-blue-600">
                {applications.filter(a => a.status === "ACTIVE").length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500">No applications found</p>
          </Card>
        ) : (
          applications.map((app) => (
            <Card key={app.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {app.memberFirstName} {app.memberLastName}
                    </h3>
                    {getStatusBadge(app.status)}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4 text-orange-500" />
                      <span>{app.memberEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4 text-orange-500" />
                      <span>{app.memberPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      <span>DOB: {new Date(app.memberDateOfBirth).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span>{app.chapter}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-medium">App #:</span>
                      <span>{app.applicationNumber}</span>
                    </div>
                    {app.assignedMemberId && (
                      <div className="flex items-center gap-2 text-green-600 font-semibold">
                        <Check className="w-4 h-4" />
                        <span>Member ID: {app.assignedMemberId}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setSelectedApp(app)
                      setShowDetailModal(true)
                    }}
                    variant="outline"
                    className="border-orange-500 text-orange-600 hover:bg-orange-50"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  {app.status === "PENDING" && (
                    <Button
                      onClick={() => {
                        setAssigningId(app.id)
                        setShowAssignModal(true)
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Assign ID
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Member Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p><strong>Name:</strong> {selectedApp.memberFirstName} {selectedApp.memberMiddleName} {selectedApp.memberLastName}</p>
                  <p><strong>Date of Birth:</strong> {new Date(selectedApp.memberDateOfBirth).toLocaleDateString()}</p>
                  <p><strong>Email:</strong> {selectedApp.memberEmail}</p>
                  <p><strong>Phone:</strong> {selectedApp.memberPhone}</p>
                  <p><strong>Chapter:</strong> {selectedApp.chapter}</p>
                  <p><strong>Application #:</strong> {selectedApp.applicationNumber}</p>
                </div>
              </div>
              
              {selectedApp.memberAddress && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                  <p className="text-sm">{selectedApp.memberAddress}</p>
                  <p className="text-sm">{selectedApp.memberCity}, {selectedApp.memberState} {selectedApp.memberZipCode}</p>
                </div>
              )}
              
              {selectedApp.beneficiaryFirstName && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Beneficiary Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><strong>Name:</strong> {selectedApp.beneficiaryFirstName} {selectedApp.beneficiaryMiddleName} {selectedApp.beneficiaryLastName}</p>
                    <p><strong>Email:</strong> {selectedApp.beneficiaryEmail || "Not provided"}</p>
                    <p><strong>Phone:</strong> {selectedApp.beneficiaryPhone || "Not provided"}</p>
                  </div>
                  {selectedApp.beneficiaryAddress && (
                    <div className="mt-2">
                      <p className="text-sm"><strong>Address:</strong> {selectedApp.beneficiaryAddress}</p>
                      <p className="text-sm">{selectedApp.beneficiaryCity}, {selectedApp.beneficiaryState} {selectedApp.beneficiaryZipCode}</p>
                    </div>
                  )}
                </div>
              )}
              
              {selectedApp.notes && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Admin Notes</h3>
                  <p className="text-sm text-gray-600">{selectedApp.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Assign Member ID Modal */}
      <Dialog open={showAssignModal} onOpenChange={setShowAssignModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Member ID</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Member ID (Optional - will auto-generate if left blank)
              </label>
              <input
                type="text"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="e.g., BMCA-2024-001"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">Leave blank to auto-generate a unique ID</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add any notes about this application..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setShowAssignModal(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAssignMemberId}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="w-4 h-4 mr-2" />
                Assign & Notify
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}