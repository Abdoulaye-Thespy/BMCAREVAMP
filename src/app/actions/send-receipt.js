'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendReceiptEmailAction(orderData) {
  try {
    console.log('📧 Server action: Sending receipt email for order:', orderData.orderId)
    
    const { to, subject, orderId, customerInfo, order } = orderData
    
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'BMCA <onboarding@resend.dev>',
      to: [to],
      subject: subject,
      html: generateReceiptHtml({ orderId, customerInfo, order }),
      replyTo: 'convention2026@bmca.org',
      tags: [
        {
          name: 'orderId',
          value: orderId
        }
      ]
    })

    if (error) {
      console.error('❌ Error sending receipt email:', error)
      return { success: false, error: error.message }
    }

    console.log('✅ Receipt email sent successfully! Message ID:', data?.id)
    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error('❌ Error sending receipt email:', error)
    return { success: false, error: error.message }
  }
}

function generateReceiptHtml({ orderId, customerInfo, order }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BMCA Payment Confirmation - Official Receipt</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f5;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          }
          .header {
            background: linear-gradient(135deg, #059669 0%, #10b981 100%);
            padding: 40px 30px;
            text-align: center;
            border-bottom: 4px solid #F5A623;
          }
          .header h1 {
            margin: 0;
            color: white;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
          }
          .header p {
            margin: 10px 0 0;
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
          }
          .receipt-badge {
            display: inline-block;
            background: #F5A623;
            color: white;
            padding: 8px 20px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 700;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .success-badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 20px;
            border-radius: 50px;
            color: white;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 15px;
          }
          .content {
            padding: 40px 30px;
          }
          .receipt-header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px dashed #059669;
          }
          .receipt-header h2 {
            color: #059669;
            font-size: 24px;
            margin-bottom: 10px;
          }
          .receipt-header .receipt-number {
            font-size: 18px;
            color: #F5A623;
            font-weight: 700;
            margin-bottom: 5px;
          }
          .section {
            background: #f8fafc;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 25px;
            border: 1px solid #e2e8f0;
          }
          .section h2 {
            margin: 0 0 20px 0;
            color: #0f172a;
            font-size: 18px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .section h2:before {
            content: '';
            display: inline-block;
            width: 4px;
            height: 20px;
            background: #059669;
            border-radius: 2px;
          }
          .item {
            display: flex;
            justify-content: space-between;
            padding: 15px 0;
            border-bottom: 1px solid #e2e8f0;
          }
          .item:last-child {
            border-bottom: none;
          }
          .item-details {
            flex: 1;
          }
          .item-name {
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 5px;
          }
          .item-meta {
            font-size: 14px;
            color: #64748b;
          }
          .item-price {
            font-weight: 600;
            color: #059669;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            padding: 20px 0 10px;
            font-size: 20px;
            font-weight: 700;
            color: #0f172a;
            border-top: 2px solid #059669;
            margin-top: 20px;
          }
          .total-amount {
            color: #F5A623;
            font-size: 24px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }
          .info-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          }
          .info-label {
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
          }
          .info-value {
            font-weight: 600;
            color: #0f172a;
            word-break: break-word;
          }
          .proof-box {
            background: #F5A62310;
            border: 2px solid #F5A623;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            text-align: center;
          }
          .proof-box h3 {
            color: #F5A623;
            font-size: 20px;
            margin-bottom: 15px;
          }
          .proof-box p {
            color: #4b5563;
            margin-bottom: 10px;
          }
          .proof-note {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            font-size: 14px;
            color: #856404;
          }
          .footer {
            text-align: center;
            padding: 30px;
            background: #f8fafc;
            border-top: 2px dashed #059669;
            color: #64748b;
            font-size: 14px;
          }
          .official-stamp {
            font-size: 12px;
            color: #059669;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
          }
          @media print {
            body { background: white; }
            .container { box-shadow: none; }
          }
          @media (max-width: 600px) {
            .container { margin: 10px; }
            .content { padding: 20px; }
            .info-grid { grid-template-columns: 1fr; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="receipt-badge">OFFICIAL RECEIPT</div>
            <div class="success-badge">✓ PAYMENT CONFIRMED</div>
            <h1>Thank You for Your Payment!</h1>
            <p>Your transaction has been successfully processed</p>
          </div>

          <div class="content">
            <!-- Receipt Header -->
            <div class="receipt-header">
              <h2>PAYMENT RECEIPT</h2>
              <div class="receipt-number">Receipt #: BMC-${orderId?.slice(-8)}-${new Date().getFullYear()}</div>
              <div style="color: #6b7280; font-size: 14px; margin-top: 5px;">
                Date: ${new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>

            <!-- Payment Summary - Highlighted -->
            <div class="proof-box">
              <h3>🔒 PROOF OF PAYMENT</h3>
              <p style="font-size: 16px; font-weight: 500;">Amount Paid: <span style="color: #059669; font-size: 24px;">$${(order.amount / 100).toFixed(2)}</span></p>
              <p style="font-size: 14px;">Transaction ID: ${orderId}</p>
              <p style="font-size: 14px;">Payment Date: ${new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
              <p style="font-size: 14px; margin-top: 10px;">Status: <span style="color: #059669; font-weight: 600;">PAID</span></p>
            </div>

            <!-- Important Note for Record Keeping -->
            <div class="proof-note">
              <strong>📌 KEEP THIS EMAIL AS YOUR OFFICIAL RECEIPT</strong>
              <p style="margin-top: 8px; margin-bottom: 0;">This email serves as your official payment confirmation and receipt. Please save it for your records. No physical items will be shipped - this confirms your registration/payment with BMCA.</p>
            </div>

            <!-- Order Summary -->
            <div class="section">
              <h2>Order Details</h2>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Order ID</div>
                  <div class="info-value">${orderId?.slice(-8)}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Payment Status</div>
                  <div class="info-value" style="color: #059669;">${order?.status || 'Completed'}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Customer Name</div>
                  <div class="info-value">${customerInfo?.firstName} ${customerInfo?.lastName}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Email</div>
                  <div class="info-value">${customerInfo?.email}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Chapter</div>
                  <div class="info-value">${customerInfo?.chapter || 'N/A'}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Phone</div>
                  <div class="info-value">${customerInfo?.phone || 'N/A'}</div>
                </div>
              </div>
            </div>

            <!-- Items Purchased -->
            ${order?.items && order.items.length > 0 ? `
              <div class="section">
                <h2>Items Purchased</h2>
                ${order.items.map(item => `
                  <div class="item">
                    <div class="item-details">
                      <div class="item-name">${item.productName}</div>
                      <div class="item-meta">
                        Quantity: ${item.quantity}
                        ${item.tshirtSizes?.length > 0 ? ` | Sizes: ${item.tshirtSizes.join(', ')}` : ''}
                      </div>
                    </div>
                    <div class="item-price">
                      $${(item.price * item.quantity / 100).toFixed(2)}
                    </div>
                  </div>
                `).join('')}
                
                <div class="total-row">
                  <span>Total Amount Paid</span>
                  <span class="total-amount">$${(order.amount / 100).toFixed(2)}</span>
                </div>
              </div>
            ` : ''}

            <!-- Payment Information -->
            <div class="section">
              <h2>Payment Information</h2>
              <div style="display: flex; justify-content: space-between; padding: 10px 0;">
                <span>Payment Method:</span>
                <span style="font-weight: 600;">Credit Card / Stripe</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 10px 0; border-top: 1px solid #e2e8f0;">
                <span>Transaction ID:</span>
                <span style="font-family: monospace;">${orderId}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 10px 0; border-top: 1px solid #e2e8f0;">
                <span>Payment Date:</span>
                <span>${new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </div>

            <!-- Confirmation Statement -->
            <div style="background: #05966910; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
              <p style="font-size: 16px; color: #059669; font-weight: 600; margin-bottom: 10px;">
                ✓ PAYMENT CONFIRMED
              </p>
              <p style="color: #4b5563; margin: 0;">
                This confirms that your payment of <strong>$${(order.amount / 100).toFixed(2)}</strong> has been successfully processed.
              </p>
            </div>

            <!-- Contact Support -->
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #64748B; font-size: 14px; margin-bottom: 5px;">Questions about your payment?</p>
              <a href="mailto:convention2026@bmca.org" style="color: #059669; text-decoration: none; font-weight: 500;">convention2026@bmca.org</a>
            </div>
          </div>

          <div class="footer">
            <p style="margin: 0 0 10px 0; font-weight: 600;">BMCA - OFFICIAL RECEIPT</p>
            <p style="margin: 0; font-size: 12px;">
              This is an electronically generated receipt and is valid without a signature.
            </p>
            <div class="official-stamp">
              <p style="margin: 5px 0;">BMCA Convention 2026</p>
              <p style="margin: 5px 0;">${new Date().toLocaleDateString('en-US')}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}