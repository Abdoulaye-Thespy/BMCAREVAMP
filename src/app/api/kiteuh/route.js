import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// GET all applications (admin only)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    
    const where = status ? { status } : {}
    
    const applications = await prisma.kiteuhApplication.findMany({
      where,
      orderBy: {
        createdAt: "desc"
      }
    })
    
    return NextResponse.json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    )
  }
}

// POST new application
export async function POST(request) {
  try {
    const data = await request.json()
    
    // Generate unique application number
    const applicationNumber = `KIT-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    
    const application = await prisma.kiteuhApplication.create({
      data: {
        applicationNumber,
        chapter: data.chapter,
        memberFirstName: data.memberFirstName,
        memberMiddleName: data.memberMiddleName,
        memberLastName: data.memberLastName,
        memberDateOfBirth: new Date(data.memberDateOfBirth),
        memberAddress: data.memberAddress,
        memberCity: data.memberCity,
        memberState: data.memberState,
        memberZipCode: data.memberZipCode,
        memberEmail: data.memberEmail,
        memberPhone: data.memberPhone,
        beneficiaryFirstName: data.beneficiaryFirstName,
        beneficiaryMiddleName: data.beneficiaryMiddleName,
        beneficiaryLastName: data.beneficiaryLastName,
        beneficiaryEmail: data.beneficiaryEmail,
        beneficiaryPhone: data.beneficiaryPhone,
        beneficiaryAddress: data.beneficiaryAddress,
        beneficiaryCity: data.beneficiaryCity,
        beneficiaryState: data.beneficiaryState,
        beneficiaryZipCode: data.beneficiaryZipCode,
        status: "PENDING"
      }
    })
    
    // Send confirmation email to user
    await resend.emails.send({
      from: "BMCA Kiteuh Program <convention2026@bmca.org>",
      to: [data.memberEmail],
      subject: "Kiteuh Program Application Received",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f97316; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Kiteuh Program Application Received</h2>
            </div>
            <div class="content">
              <p>Dear ${data.memberFirstName} ${data.memberLastName},</p>
              <p>Thank you for submitting your Kiteuh Mutual Assurance Program application.</p>
              <p><strong>Application Number:</strong> ${applicationNumber}</p>
              <p>Your application is currently under review by our admin team. You will receive your member ID within 2-3 business days.</p>
              <p>If you have any questions, please contact us at <a href="mailto:convention2026@bmca.org">convention2026@bmca.org</a></p>
              <p>Best regards,<br>BMCA Kiteuh Program Team</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Bafut Manjong Cultural Association</p>
            </div>
          </div>
        </body>
        </html>
      `
    })
    
    return NextResponse.json(
      { success: true, application, applicationNumber },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating application:", error)
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    )
  }
}