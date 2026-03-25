import { NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { firstName, lastName, email, phone, message } = await request.json()

    console.log(firstName)
    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Save to database
    // const contact = await prisma.contact.create({
    //   data: {
    //     firstName,
    //     lastName,
    //     email,
    //     phone: phone || null,
    //     message,
    //     status: "pending",
    //   },
    // })

    // Send email to admin using Resend
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'BMCA <onboarding@resend.dev>',
      to: ["bmcausa1@gmail.com"], // Admin email
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f97316; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9fafb; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; margin-bottom: 5px; color: #374151; }
            .value { color: #111827; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${firstName} ${lastName}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              ${phone ? `
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${phone}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
              <div class="field">
                <div class="label">Submitted:</div>
                <div class="value">${new Date().toLocaleString()}</div>
              </div>
            </div>
            <div class="footer">
              <p>This message was sent from the BMCA website contact form.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    // Send confirmation email to user
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'BMCA <onboarding@resend.dev>',
      to: [email],
      subject: "We've Received Your Message - BMCA",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f97316; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9fafb; }
            .message-preview { background-color: white; padding: 15px; border-left: 4px solid #f97316; margin: 15px 0; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #6b7280; }
            .button { display: inline-block; background-color: #f97316; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Thank You for Contacting BMCA!</h2>
            </div>
            <div class="content">
              <p>Dear ${firstName} ${lastName},</p>
              <p>Thank you for reaching out to the Bafut Manjong Cultural Association. We have received your message and will get back to you within 2-3 business days.</p>
              
              <div class="message-preview">
                <strong>Your Message:</strong><br>
                ${message.replace(/\n/g, '<br>')}
              </div>
              
              <p>If you need immediate assistance, please don't hesitate to contact us directly at:</p>
              <p>
                📧 <a href="mailto:info@bafutfoundation.org">info@bafutfoundation.org</a><br>
                📞 (555) 123-4567
              </p>
              
              <div style="text-align: center;">
                <a href="https://bafutfoundation.org" class="button">Visit Our Website</a>
              </div>
              
              <p style="margin-top: 20px;">Best regards,<br>
              <strong>BMCA Team</strong><br>
              Bafut Manjong Cultural Association USA</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Bafut Manjong Cultural Association. All rights reserved.</p>
              <p>9115 Briarchip St, Laurel, MD 20708, United States</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    return NextResponse.json(
      { 
        success: true, 
        message: "Contact form submitted successfully",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error saving contact form:", error)
    
    // Still return success to user even if email fails
    return NextResponse.json(
      { 
        success: true, 
        message: "Message received. We'll get back to you soon!",
        warning: "Email notification could not be sent" 
      },
      { status: 201 }
    )
  }
}