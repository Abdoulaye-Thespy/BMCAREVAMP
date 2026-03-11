'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Package, Mail, Calendar, Download, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getOrderDetails } from '@/app/actions/stripe'
import { sendReceiptEmailAction } from '@/app/actions/send-receipt'

export default function PaymentSuccess({ orderId, customerInfo }) {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [emailSent, setEmailSent] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        if (orderId) {
          console.log('Fetching order details for:', orderId)
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

  // Send receipt email when order data is loaded
  useEffect(() => {
    async function sendEmail() {
      // Only send email if we have all the data and haven't sent it yet
      if (order && customerInfo && !emailSent && !emailError && !isSending) {
        setIsSending(true)
        try {
          console.log('Sending receipt email to:', customerInfo.email)
          
          const result = await sendReceiptEmailAction({
            to: customerInfo.email,
            subject: `Your BMCA Order Confirmation - #${orderId?.slice(-8)}`,
            orderId,
            customerInfo,
            order
          })

          if (result.success) {
            setEmailSent(true)
            console.log('Receipt email sent successfully, Message ID:', result.messageId)
          } else {
            setEmailError(true)
            console.error('Failed to send receipt email:', result.error)
          }
        } catch (error) {
          setEmailError(true)
          console.error('Error sending receipt email:', error)
        } finally {
          setIsSending(false)
        }
      }
    }

    sendEmail()
  }, [order, customerInfo, orderId, emailSent, emailError, isSending])

  const handleDownloadReceipt = () => {
    // Create receipt HTML content
    const receiptContent = generateReceiptHtml({ orderId, customerInfo, order })
    
    // Open print window
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(receiptContent)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const handleResendEmail = async () => {
    setEmailError(false)
    setIsSending(true)
    try {
      const result = await sendReceiptEmailAction({
        to: customerInfo.email,
        subject: `Your BMCA Order Confirmation - #${orderId?.slice(-8)}`,
        orderId,
        customerInfo,
        order
      })

      if (result.success) {
        setEmailSent(true)
        alert('Receipt email resent successfully!')
      } else {
        setEmailError(true)
        alert('Failed to resend email. Please try downloading the receipt instead.')
      }
    } catch (error) {
      setEmailError(true)
      alert('Failed to resend email. Please try downloading the receipt instead.')
    } finally {
      setIsSending(false)
    }
  }

  // Helper function to generate receipt HTML (reuse the same function from resend.js)
  const generateReceiptHtml = ({ orderId, customerInfo, order }) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt - Order ${orderId?.slice(-8)}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 40px 20px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
              padding-bottom: 20px;
              border-bottom: 2px solid #059669;
            }
            .header h1 {
              color: #059669;
              margin-bottom: 10px;
            }
            .section {
              margin-bottom: 30px;
              padding: 20px;
              background: #f9fafb;
              border-radius: 8px;
            }
            .section h2 {
              color: #059669;
              margin-top: 0;
              margin-bottom: 20px;
              font-size: 18px;
            }
            .item {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #e5e7eb;
            }
            .item:last-child {
              border-bottom: none;
            }
            .total {
              display: flex;
              justify-content: space-between;
              font-size: 20px;
              font-weight: bold;
              margin-top: 20px;
              padding-top: 20px;
              border-top: 2px solid #059669;
            }
            .total-amount {
              color: #F5A623;
            }
            .address {
              line-height: 1.6;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>PAYMENT RECEIPT</h1>
            <p>Order #${orderId?.slice(-8)}</p>
            <p>Date: ${new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          </div>

          <div class="section">
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Customer Email:</strong> ${customerInfo?.email}</p>
          </div>

          ${order?.items && order.items.length > 0 ? `
            <div class="section">
              <h2>Order Items</h2>
              ${order.items.map(item => `
                <div class="item">
                  <div>
                    <strong>${item.productName}</strong><br>
                    Quantity: ${item.quantity}
                    ${item.tshirtSizes?.length > 0 ? `<br>Sizes: ${item.tshirtSizes.join(', ')}` : ''}
                  </div>
                  <div>$${(item.price * item.quantity / 100).toFixed(2)}</div>
                </div>
              `).join('')}
              
              <div class="total">
                <span>Total Amount</span>
                <span class="total-amount">$${(order.amount / 100).toFixed(2)}</span>
              </div>
            </div>
          ` : ''}

          ${customerInfo ? `
            <div class="section">
              <h2>Shipping Information</h2>
              <div class="address">
                ${customerInfo.firstName} ${customerInfo.lastName}<br>
                ${customerInfo.address}<br>
                ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zipCode}<br>
                ${customerInfo.country}<br>
                Phone: ${customerInfo.phone}<br>
                Chapter: ${customerInfo.chapter}
              </div>
            </div>
          ` : ''}

          <div class="footer">
            <p>This is an official receipt for your purchase.</p>
            <p>Thank you for your business!</p>
          </div>
        </body>
      </html>
    `
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
          Payment Successful!
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

      {/* Order Summary Card */}
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

            {/* Customer Email */}
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
                          <span>Sizes: {item.tshirtSizes.join(', ')}</span>
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
                  <MapPin className="w-5 h-5 text-[#F5A623]" />
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

      {/* Email Status Indicator */}
      {isSending && (
        <div className="text-center text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
          <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          Sending receipt email...
        </div>
      )}
      
      {emailSent && (
        <div className="text-center text-sm text-green-600 bg-green-50 p-3 rounded-lg">
          ✓ Receipt email sent to {customerInfo?.email}. Please check your spam folder if not received.
        </div>
      )}
      
      {emailError && !isSending && (
        <div className="text-center text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
          ⚠ Could not send receipt email. You can still download your receipt below.
          <button 
            onClick={handleResendEmail}
            className="ml-2 underline hover:no-underline font-medium"
            disabled={isSending}
          >
            Try again
          </button>
        </div>
      )}

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
          disabled={isSending}
        >
          <Download className="w-4 h-4" />
          Download Receipt
        </Button>
      </div>

      {/* Next Steps */}
      <div className="text-center text-sm text-gray-500 mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="font-medium text-blue-800">📧 What's Next?</p>
        <p className="mt-2">
          {emailSent 
            ? `A confirmation email has been sent to ${customerInfo?.email}`
            : emailError
            ? `You can download your receipt above`
            : `Sending confirmation email to ${customerInfo?.email}...`
          }
        </p>
      </div>
    </div>
  )
}