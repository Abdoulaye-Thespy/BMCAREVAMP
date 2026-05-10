"use client"

import { useState, useEffect } from "react"
import { Check, X, Eye, Mail, Phone, MapPin, Calendar, User, RefreshCw, Loader2, Clock, Search, Filter } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  const [searchTerm, setSearchTerm] = useState("")

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
      const response = await fetch("/api/kiteuh", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId: assigningId,
          memberId: memberId,
          notes: notes,
          status: "ACTIVE"
        }),
      })

      if (response.ok) {
        alert("Member ID assigned successfully! Email sent to applicant.")
        setShowAssignModal(false)
        setMemberId("")
        setNotes("")
        setAssigningId(null)
        fetchApplications()
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to assign member ID")
      }
    } catch (error) {
      console.error("Error assigning member ID:", error)
      alert(error.message || "Failed to assign member ID. Please try again.")
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      APPROVED: { color: "bg-green-100 text-green-800", label: "Approved" },
      REJECTED: { color: "bg-red-100 text-red-800", label: "Rejected" },
      ACTIVE: { color: "bg-blue-100 text-blue-800", label: "Active" },
      INACTIVE: { color: "bg-gray-100 text-gray-800", label: "Inactive" },
      SUSPENDED: { color: "bg-purple-100 text-purple-800", label: "Suspended" },
    }
    const config = statusConfig[status] || statusConfig.PENDING
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    )
  }

  // Filter applications by search term
  const filteredApplications = applications.filter(app => {
    const searchLower = searchTerm.toLowerCase()
    return (
      app.memberFirstName?.toLowerCase().includes(searchLower) ||
      app.memberLastName?.toLowerCase().includes(searchLower) ||
      app.applicationNumber?.toLowerCase().includes(searchLower) ||
      app.memberEmail?.toLowerCase().includes(searchLower) ||
      app.assignedMemberId?.toLowerCase().includes(searchLower)
    )
  })

  // Calculate statistics
  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === "PENDING").length,
    approved: applications.filter(a => a.status === "APPROVED").length,
    active: applications.filter(a => a.status === "ACTIVE").length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#F5A623]" />
      </div>
    )
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kiteuh Program Management</h1>
          <p className="text-gray-600 mt-2">Manage member applications and assign member IDs</p>
        </div>
        <Button
          onClick={fetchApplications}
          className="bg-[#F5A623] hover:bg-[#F5A623]/90 text-white"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border-l-4 border-l-[#F5A623]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <User className="w-6 h-6 text-[#F5A623]" />
            </div>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Members</p>
              <p className="text-3xl font-bold text-blue-600">{stats.active}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, application #, or member ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="w-full md:w-64">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
          >
            <option value="PENDING">Pending Applications</option>
            <option value="APPROVED">Approved Applications</option>
            <option value="ACTIVE">Active Members</option>
            <option value="REJECTED">Rejected</option>
            <option value="all">All Applications</option>
          </select>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500">No applications found</p>
          </Card>
        ) : (
          filteredApplications.map((app) => (
            <Card key={app.id} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-[#F5A623]">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {app.memberFirstName} {app.memberMiddleName} {app.memberLastName}
                    </h3>
                    {getStatusBadge(app.status)}
                    {app.assignedMemberId && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        ID: {app.assignedMemberId}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4 text-[#F5A623]" />
                      <span className="truncate">{app.memberEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4 text-[#F5A623]" />
                      <span>{app.memberPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-[#F5A623]" />
                      <span>DOB: {new Date(app.memberDateOfBirth).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-[#F5A623]" />
                      <span>{app.chapter}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-medium">App #:</span>
                      <span className="font-mono text-xs">{app.applicationNumber}</span>
                    </div>
                    {app.assignedAt && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium">Assigned:</span>
                        <span>{new Date(app.assignedAt).toLocaleDateString()}</span>
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
                    className="border-[#F5A623] text-[#F5A623] hover:bg-orange-50"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  {(app.status === "PENDING" || app.status === "APPROVED") && !app.assignedMemberId && (
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
            <DialogTitle className="text-2xl font-bold">Application Details</DialogTitle>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-6">
              {/* Application Info */}
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Application Number</p>
                    <p className="font-mono font-semibold">{selectedApp.applicationNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status</p>
                    {getStatusBadge(selectedApp.status)}
                  </div>
                  <div>
                    <p className="text-gray-600">Submitted Date</p>
                    <p>{new Date(selectedApp.createdAt).toLocaleString()}</p>
                  </div>
                  {selectedApp.assignedMemberId && (
                    <>
                      <div>
                        <p className="text-gray-600">Member ID</p>
                        <p className="font-mono font-semibold text-green-600">{selectedApp.assignedMemberId}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Assigned Date</p>
                        <p>{new Date(selectedApp.assignedAt).toLocaleString()}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Member Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Member Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
                  <p><strong>Full Name:</strong> {selectedApp.memberFirstName} {selectedApp.memberMiddleName} {selectedApp.memberLastName}</p>
                  <p><strong>Date of Birth:</strong> {new Date(selectedApp.memberDateOfBirth).toLocaleDateString()}</p>
                  <p><strong>Email:</strong> {selectedApp.memberEmail}</p>
                  <p><strong>Phone:</strong> {selectedApp.memberPhone}</p>
                  <p><strong>Chapter:</strong> {selectedApp.chapter}</p>
                </div>
              </div>
              
              {/* Member Address */}
              {(selectedApp.memberAddress || selectedApp.memberCity) && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Member Address</h3>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm">
                    <p>{selectedApp.memberAddress}</p>
                    <p>{selectedApp.memberCity}, {selectedApp.memberState} {selectedApp.memberZipCode}</p>
                  </div>
                </div>
              )}
              
              {/* Beneficiary Information */}
              {selectedApp.beneficiaryFirstName && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Beneficiary Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <p><strong>Name:</strong> {selectedApp.beneficiaryFirstName} {selectedApp.beneficiaryMiddleName} {selectedApp.beneficiaryLastName}</p>
                      <p><strong>Email:</strong> {selectedApp.beneficiaryEmail || "Not provided"}</p>
                      <p><strong>Phone:</strong> {selectedApp.beneficiaryPhone || "Not provided"}</p>
                    </div>
                    {(selectedApp.beneficiaryAddress || selectedApp.beneficiaryCity) && (
                      <div className="text-sm">
                        <p className="font-semibold mb-1">Beneficiary Address:</p>
                        <p>{selectedApp.beneficiaryAddress}</p>
                        <p>{selectedApp.beneficiaryCity}, {selectedApp.beneficiaryState} {selectedApp.beneficiaryZipCode}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Admin Notes */}
              {selectedApp.notes && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Admin Notes</h3>
                  <div className="bg-yellow-50 p-4 rounded-lg text-sm">
                    <p className="text-gray-700">{selectedApp.notes}</p>
                  </div>
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
            <DialogTitle className="text-2xl font-bold">Assign Member ID</DialogTitle>
            <DialogDescription>
              Assign a unique member ID to this applicant. They will receive an email notification with their ID.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Member ID (Optional)
              </Label>
              <Input
                type="text"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="e.g., BMCA-2024-001"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Leave blank to auto-generate a unique ID</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Notes (Optional)
              </Label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add any notes about this application..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => {
                setShowAssignModal(false)
                setMemberId("")
                setNotes("")
                setAssigningId(null)
              }}
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
        </DialogContent>
      </Dialog>
    </div>
  )
}