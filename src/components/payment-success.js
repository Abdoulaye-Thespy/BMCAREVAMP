'use client'

import { useState, useEffect, useRef } from 'react'
import { CheckCircle, Package, Mail, Calendar, Download, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getOrderDetails } from '@/app/actions/stripe'

export default function PaymentSuccess({ orderId, customerInfo }) {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const receiptRef = useRef(null)

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        if (orderId) {
          const orderData = await getOrderDetails(orderId)
          setOrder(orderData)
          console.log('Order status:', orderData?.status)
        }
      } catch (error) {
        console.error('Error fetching order:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrderDetails()
  }, [orderId])

  const handleDownloadReceipt = () => {
    // Create a print-specific stylesheet
    const printStyles = `
      <style>
        /* Hide everything by default when printing */
        body * {
          visibility: hidden;
        }
        
        /* Show only the receipt container */
        .print-only, .print-only * {
          visibility: visible;
        }
        
        /* Position the receipt at the top */
        .print-only {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          padding: 20px;
          background: white;
        }
        
        /* Hide the download button when printing */
        .no-print {
          display: none;
        }
        
        /* Ensure colors print properly */
        .bg-gradient-to-r {
          background: linear-gradient(to right, #059669, #047857) !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        .bg-gray-50 {
          background-color: #f9fafb !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        .text-white {
          color: white !important;
        }
        
        /* Receipt styling */
        .receipt-container {
          max-width: 800px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
        }
        
        .receipt-header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e5e7eb;
        }
        
        .receipt-footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          font-size: 0.875rem;
          color: #6b7280;
        }
      </style>
    `

    // Create the receipt HTML content
    const receiptContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt - Order ${orderId?.slice(-8)}</title>
          ${printStyles}
        </head>
        <body>
          <div class="print-only receipt-container">
            <!-- Receipt Header -->
            <div class="receipt-header">
              <h1 style="font-size: 24px; font-weight: bold; color: #111827; margin-bottom: 8px;">
                PAYMENT RECEIPT
              </h1>
              <p style="color: #4b5563; margin: 4px 0;">Order #${orderId?.slice(-8)}</p>
              <p style="color: #4b5563; margin: 4px 0;">
                Date: ${new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            <!-- Order Details Card -->
            <div style="border: 1px solid #059669; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
              <!-- Card Header -->
              <div style="background: linear-gradient(to right, #059669, #047857); color: white; padding: 16px 20px;">
                <h2 style="font-size: 18px; font-weight: 600; margin: 0;">Order Confirmation</h2>
                <p style="color: #d1fae5; margin: 4px 0 0 0; font-size: 14px;">
                  Your order has been confirmed and is being processed
                </p>
              </div>
              
              <!-- Card Content -->
              <div style="padding: 24px;">
                <!-- Order ID -->
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f9fafb; border-radius: 8px; margin-bottom: 16px;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5A623" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                  <div>
                    <p style="font-size: 12px; color: #6b7280; margin: 0;">Order ID</p>
                    <p style="font-family: monospace; font-weight: 500; margin: 0;">${orderId}</p>
                  </div>
                </div>

                <!-- Customer Email -->
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f9fafb; border-radius: 8px; margin-bottom: 16px;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5A623" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <div>
                    <p style="font-size: 12px; color: #6b7280; margin: 0;">Customer Email</p>
                    <p style="font-weight: 500; margin: 0;">${customerInfo?.email}</p>
                  </div>
                </div>

                <!-- Order Items -->
                ${order?.items && order.items.length > 0 ? `
                  <div style="margin-top: 16px;">
                    <h3 style="font-weight: 600; margin: 0 0 12px 0;">Order Items</h3>
                    ${order.items.map(item => `
                      <div style="background: #f9fafb; padding: 12px; border-radius: 8px; margin-bottom: 8px;">
                        <div style="display: flex; justify-content: space-between;">
                          <span style="font-weight: 500;">${item.productName}</span>
                          <span style="font-weight: 500;">$${(item.price * item.quantity / 100).toFixed(2)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 14px; color: #4b5563; margin-top: 4px;">
                          <span>Quantity: ${item.quantity}</span>
                          ${item.tshirtSizes?.length > 0 ? `<span>T-Shirt Sizes: ${item.tshirtSizes.join(', ')}</span>` : ''}
                        </div>
                      </div>
                    `).join('')}
                    
                    <!-- Total -->
                    <div style="display: flex; justify-content: space-between; font-weight: bold; padding-top: 12px; border-top: 1px solid #e5e7eb; margin-top: 12px;">
                      <span>Total Amount</span>
                      <span style="color: #F5A623; font-size: 20px;">$${(order.amount / 100).toFixed(2)}</span>
                    </div>
                  </div>
                ` : ''}

                <!-- Shipping Information -->
                ${customerInfo ? `
                  <div style="margin-top: 24px; padding: 16px; background: #f9fafb; border-radius: 8px;">
                    <h3 style="font-weight: 600; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5A623" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      Shipping Address
                    </h3>
                    <p style="font-size: 14px; color: #4b5563; margin: 0;">
                      ${customerInfo.firstName} ${customerInfo.lastName}<br />
                      ${customerInfo.address}<br />
                      ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zipCode}<br />
                      ${customerInfo.country}
                    </p>
                    <p style="font-size: 14px; color: #6b7280; margin-top: 8px; display: flex; align-items: center; gap: 8px;">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      ${customerInfo.phone}
                    </p>
                    <p style="font-size: 14px; color: #6b7280; margin-top: 4px;">
                      Chapter: ${customerInfo.chapter}
                    </p>
                  </div>
                ` : ''}
              </div>
            </div>

            <!-- Receipt Footer -->
            <div class="receipt-footer">
              <p>This is an official receipt for your purchase.</p>
              <p style="margin-top: 8px;">Thank you for your business!</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Open a new window and print
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(receiptContent)
      printWindow.document.close()
      
      // Wait for content to load then print
      printWindow.onload = function() {
        printWindow.print()
        // Optional: close the window after printing
        printWindow.onafterprint = function() {
          printWindow.close()
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F5A623]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Successful! 🎉
        </h1>
        <p className="text-gray-600">
          Thank you for your purchase, {customerInfo?.firstName}!
        </p>
        {order && (
          <p className="text-sm text-green-600 mt-2">
            Order Status: <span className="font-semibold uppercase">{order.status}</span>
          </p>
        )}
      </div>

      {/* Order Summary Card - This will NOT be printed */}
      <Card className="border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
          <CardTitle>Order Confirmation</CardTitle>
          <CardDescription className="text-green-100">
            Your order has been confirmed and is being processed
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Order ID */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Package className="w-5 h-5 text-[#F5A623]" />
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-mono font-medium break-all">{orderId}</p>
              </div>
            </div>

            {/* Email Confirmation */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-[#F5A623]" />
              <div>
                <p className="text-sm text-gray-500">Confirmation sent to</p>
                <p className="font-medium">{customerInfo?.email}</p>
              </div>
            </div>

            {/* Order Date */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-[#F5A623]" />
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-medium">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Order Items */}
            {order?.items && order.items.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-3">Order Items</h3>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.productName}</span>
                        <span className="font-medium">
                          ${(item.price * item.quantity / 100).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Quantity: {item.quantity}</span>
                        {item.tshirtSizes?.length > 0 && (
                          <span>T-Shirt Sizes: {item.tshirtSizes.join(', ')}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Total */}
                  <div className="flex justify-between font-bold pt-3 border-t mt-3">
                    <span>Total Amount</span>
                    <span className="text-[#F5A623] text-xl">
                      ${(order.amount / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Shipping Information */}
            {customerInfo && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#F5A623]" />
                   Address
                </h3>
                <p className="text-sm text-gray-600">
                  {customerInfo.firstName} {customerInfo.lastName}<br />
                  {customerInfo.address}<br />
                  {customerInfo.city}, {customerInfo.state} {customerInfo.zipCode}<br />
                  {customerInfo.country}
                </p>
                <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {customerInfo.phone}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Chapter: {customerInfo.chapter}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          asChild
          className="bg-[#F5A623] text-white hover:bg-[#F5A623]/90"
        >
          <Link href="/">
            Continue Shopping
          </Link>
        </Button>
        
        <Button 
          variant="outline"
          onClick={handleDownloadReceipt}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Receipt
        </Button>
      </div>

      {/* Next Steps */}
      <div className="text-center text-sm text-gray-500 mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="font-medium text-blue-800">📧 What's Next?</p>
        <p className="mt-2">A confirmation email has been sent to {customerInfo?.email}</p>
      </div>
    </div>
  )
}