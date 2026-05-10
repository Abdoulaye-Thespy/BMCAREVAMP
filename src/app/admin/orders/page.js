"use client"

import { useState, useEffect } from "react"
import { 
  RefreshCw, 
  Search, 
  Filter, 
  Mail, 
  Download, 
  DollarSign, 
  CheckCircle, 
  XCircle,
  Eye,
  Printer,
  Send,
  MoreVertical
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// Status badge component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    completed: { color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle },
    pending: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: RefreshCw },
    failed: { color: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
    refunded: { color: "bg-purple-100 text-purple-700 border-purple-200", icon: DollarSign },
  }

  const config = statusConfig[status] || statusConfig.pending
  const Icon = config.icon

  return (
    <Badge className={`${config.color} flex items-center gap-1 capitalize`}>
      <Icon className="h-3 w-3" />
      {status === 'completed' ? 'paid' : status}
    </Badge>
  )
}

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)

  // Fetch orders from database
  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/orders')
      const data = await res.json()
      setOrders(data)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Filter logic: 
    // all = show everything
    // pending = show only pending
    // paid = show everything that is NOT pending (completed, failed, refunded)
    let matchesStatus = true
    if (statusFilter === "pending") {
      matchesStatus = order.status === "pending"
    } else if (statusFilter === "paid") {
      matchesStatus = order.status !== "pending"
    }
    // statusFilter === "all" shows everything
    
    return matchesSearch && matchesStatus
  })

  const handleResendEmail = async (orderId) => {
    try {
      await fetch('/api/admin/orders/resend-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId })
      })
      alert('Confirmation email resent successfully!')
    } catch (error) {
      console.error('Failed to resend email:', error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount / 100)
  }

  const downloadPDF = () => {
    const doc = new jsPDF()
    
    // Add title
    doc.setFontSize(20)
    doc.setTextColor(0, 0, 0)
    doc.text('Orders Report', 14, 20)
    doc.setFontSize(10)
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30)
    doc.text(`Filter: ${statusFilter === 'all' ? 'All Orders' : statusFilter === 'paid' ? 'Paid' : 'Pending'}`, 14, 37)
    if (searchTerm) {
      doc.text(`Search: "${searchTerm}"`, 14, 44)
    }
    
    let yPosition = 50
    
    // Prepare table data from filtered orders
    const tableData = filteredOrders.map(order => [
      order.id.slice(-8),
      `${order.customerInfo?.firstName || ''} ${order.customerInfo?.lastName || ''}`,
      order.email || '',
      order.customerInfo?.phone || '',
      formatDate(order.createdAt),
      order.status === 'completed' ? 'Paid' : order.status,
      order.items?.reduce((total, item) => total + item.quantity, 0) || 0,
      order.items?.map(item => `${item.productName} (${item.quantity})${item.tshirtSizes?.length > 0 ? ` - Sizes: ${item.tshirtSizes.join(', ')}` : ''}`).join('\n') || '',
      formatCurrency(order.amount)
    ])
    
    autoTable(doc, {
      startY: yPosition,
      head: [['Order ID', 'Name', 'Email', 'Phone', 'Date', 'Status', 'Items', 'Products & Details', 'Amount']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [245, 166, 35], textColor: [255, 255, 255] },
      columnStyles: {
        7: { cellWidth: 'auto', halign: 'left' },
      },
      styles: { fontSize: 8, cellPadding: 2 },
      margin: { left: 14, right: 14 }
    })
    
    // Add summary
    const finalY = doc.lastAutoTable.finalY + 10
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text(`Summary`, 14, finalY)
    doc.setFontSize(10)
    doc.text(`Total Orders: ${filteredOrders.length}`, 14, finalY + 7)
    
    const totalRevenue = filteredOrders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + order.amount, 0)
    doc.text(`Total Revenue (Paid Only): ${formatCurrency(totalRevenue)}`, 14, finalY + 14)
    
    const totalItems = filteredOrders.reduce((sum, order) => 
      sum + (order.items?.reduce((itemSum, item) => itemSum + item.quantity, 0) || 0), 0
    )
    doc.text(`Total Items Sold: ${totalItems}`, 14, finalY + 21)
    
    // Save the PDF
    doc.save(`orders-report-${new Date().toISOString().split('T')[0]}.pdf`)
  }

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="text-gray-600">Loading orders...</div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-2">View and manage all customer orders</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={downloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Current View
          </Button>
          <Button 
            onClick={fetchOrders}
            className="bg-[#F5A623] hover:bg-[#F5A623]/90 text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by order ID, email, or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-gray-900">
                      {order.id.slice(-8)}
                    </span>
                   </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {order.customerInfo?.firstName} {order.customerInfo?.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                   </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(order.createdAt)}
                    </div>
                   </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatCurrency(order.amount)}
                    </div>
                   </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={order.status} />
                   </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {order.items?.length || 0} items
                    </div>
                   </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setSelectedOrder(order)
                          setViewDialogOpen(true)
                        }}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleResendEmail(order.id)}>
                          <Send className="h-4 w-4 mr-2" />
                          Resend Email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                   </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No orders found matching your criteria.
          </div>
        )}
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="text-sm mt-1">{formatDate(selectedOrder.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <div className="mt-1">
                    <StatusBadge status={selectedOrder.status} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Payment ID</p>
                  <p className="text-sm font-mono mt-1">
                    {selectedOrder.stripePaymentId || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Customer Information */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="text-sm font-medium">
                      {selectedOrder.customerInfo?.firstName} {selectedOrder.customerInfo?.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm">{selectedOrder.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm">{selectedOrder.customerInfo?.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Chapter</p>
                    <p className="text-sm">{selectedOrder.customerInfo?.chapter}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-sm">
                      {selectedOrder.customerInfo?.address}, {selectedOrder.customerInfo?.city}, {selectedOrder.customerInfo?.state} {selectedOrder.customerInfo?.zipCode}, {selectedOrder.customerInfo?.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                          {item.tshirtSizes?.length > 0 && ` | Sizes: ${item.tshirtSizes.join(', ')}`}
                        </p>
                      </div>
                      <p className="font-semibold">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                  
                  {/* Total */}
                  <div className="flex justify-between font-bold pt-3 border-t mt-3">
                    <span>Total</span>
                    <span className="text-[#F5A623] text-xl">
                      {formatCurrency(selectedOrder.amount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}