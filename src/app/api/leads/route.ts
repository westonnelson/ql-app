import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { PrismaClient } from "@prisma/client"
import { quoteFormSchema } from "@/lib/validations/quote-form"
import { calculateLeadScore } from "@/lib/utils"
import { Resend } from 'resend'

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const headersList = headers()
    const body = await req.json()

    // Validate form data
    const validatedData = quoteFormSchema.parse(body)

    // Get UTM parameters and other tracking data
    const referer = headersList.get("referer") || ""
    const userAgent = headersList.get("user-agent") || ""
    const ipAddress = headersList.get("x-forwarded-for")?.split(",")[0] || ""

    // Calculate lead score
    const leadScore = calculateLeadScore({
      ...validatedData,
      ipAddress,
      userAgent,
    })

    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        ...validatedData,
        status: "NEW",
        leadScore,
        ipAddress,
        userAgent,
        // Extract UTM parameters from referer
        ...(referer && {
          source: new URL(referer).searchParams.get("utm_source") || undefined,
          medium: new URL(referer).searchParams.get("utm_medium") || undefined,
          campaign: new URL(referer).searchParams.get("utm_campaign") || undefined,
          term: new URL(referer).searchParams.get("utm_term") || undefined,
          content: new URL(referer).searchParams.get("utm_content") || undefined,
        }),
        utmSource: req.headers.get('utm_source') || undefined,
        utmMedium: req.headers.get('utm_medium') || undefined,
        utmCampaign: req.headers.get('utm_campaign') || undefined,
        utmContent: req.headers.get('utm_content') || undefined,
        utmTerm: req.headers.get('utm_term') || undefined,
      },
    })

    // Send notification email to admin
    await resend.emails.send({
      from: 'QuoteLinker <notifications@quotelinker.com>',
      to: 'admin@quotelinker.com',
      subject: 'New Lead Submission',
      html: `
        <h2>New Lead Details:</h2>
        <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone}</p>
        <p><strong>Coverage Amount:</strong> $${validatedData.coverageAmount.toLocaleString()}</p>
        <p><strong>Coverage Type:</strong> ${validatedData.coverageType}</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/leads/${lead.id}">
          View Lead Details
        </a>
      `,
    })

    // Send confirmation email to lead
    await resend.emails.send({
      from: 'QuoteLinker <support@quotelinker.com>',
      to: validatedData.email,
      subject: 'Thank You for Your Quote Request',
      html: `
        <h2>Thank You for Choosing QuoteLinker!</h2>
        <p>Dear ${validatedData.firstName},</p>
        <p>We've received your life insurance quote request and a licensed agent will contact you within 24 hours to discuss your coverage options.</p>
        <p>Your Quote Details:</p>
        <ul>
          <li>Coverage Amount: $${validatedData.coverageAmount.toLocaleString()}</li>
          <li>Coverage Type: ${validatedData.coverageType}</li>
        </ul>
        <p>Want to speak with an agent sooner? Schedule a call now:</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/schedule" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
          Schedule a Call
        </a>
        <p>Best regards,<br>The QuoteLinker Team</p>
      `,
    })

    // TODO: Send notifications (email, SMS, webhook)
    // await sendLeadNotifications(lead)

    return NextResponse.json(
      { message: "Lead created successfully", leadId: lead.id },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating lead:", error)
    return NextResponse.json(
      { message: "Error creating lead" },
      { status: 500 }
    )
  }
} 