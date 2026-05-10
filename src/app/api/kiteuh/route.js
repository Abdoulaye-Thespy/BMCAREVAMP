// app/api/kiteuh/route.js (Updated)
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// GET all applications (admin only)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    
    const where = status && status !== "all" ? { status } : {}
    
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

// PUT - Admin updates application (assign member ID, approve, reject)
export async function PUT(request) {
  try {
    const { applicationId, memberId, notes, status } = await request.json()
    
    // Get the application first
    const application = await prisma.kiteuhApplication.findUnique({
      where: { id: applicationId }
    })
    
    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      )
    }
    
    // Generate member ID if not provided
    let assignedMemberId = memberId
    if (!assignedMemberId) {
      const year = new Date().getFullYear()
      const count = await prisma.kiteuhMember.count()
      assignedMemberId = `BMCA-${year}-${String(count + 1).padStart(4, '0')}`
    }
    
    // Update the application
    const updatedApplication = await prisma.kiteuhApplication.update({
      where: { id: applicationId },
      data: {
        assignedMemberId,
        notes: notes || null,
        assignedAt: new Date(),
        status: status || "ACTIVE"
      }
    })
    
    // Create a member record
    const member = await prisma.kiteuhMember.create({
      data: {
        memberId: assignedMemberId,
        fullName: `${application.memberFirstName} ${application.memberMiddleName ? application.memberMiddleName + ' ' : ''}${application.memberLastName}`,
        email: application.memberEmail,
        phone: application.memberPhone,
        chapter: application.chapter,
        dateOfBirth: application.memberDateOfBirth,
        address: application.memberAddress,
        city: application.memberCity,
        state: application.memberState,
        zipCode: application.memberZipCode,
        status: "ACTIVE",
        applicationId: application.id
      }
    })
    
    // Send notification email to applicant
    await resend.emails.send({
      from: "BMCA Kiteuh Program <convention2026@bmca.org>",
      to: [application.memberEmail],
      subject: "Your Kiteuh Member ID Has Been Assigned!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f97316; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .member-id { background-color: #fef3c7; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0; }
            .member-id h2 { color: #f97316; margin: 0; }
            .member-id p { font-size: 24px; font-weight: bold; margin: 10px 0 0; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Welcome to the Kiteuh Mutual Assurance Program!</h2>
            </div>
            <div class="content">
              <p>Dear ${application.memberFirstName} ${application.memberLastName},</p>
              <p>Congratulations! Your application has been approved and your member ID has been assigned.</p>
              
              <div class="member-id">
                <h2>Your Member ID</h2>
                <p>${assignedMemberId}</p>
              </div>
              
              <p><strong>Assigned On:</strong> ${new Date().toLocaleDateString()}</p>
              
              ${notes ? `<p><strong>Admin Notes:</strong> ${notes}</p>` : ''}
              
              <p>You are now an official member of the Kiteuh Mutual Assurance Program. Please save your member ID for future reference.</p>
              
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
    
    return NextResponse.json({
      success: true,
      application: updatedApplication,
      member
    })
  } catch (error) {
    console.error("Error updating application:", error)
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    )
  }
}