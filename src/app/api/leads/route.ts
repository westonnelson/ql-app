import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { PrismaClient } from "@prisma/client"
import { quoteFormSchema } from "@/lib/validations/quote-form"
import { calculateLeadScore } from "@/lib/utils"

const prisma = new PrismaClient()

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
      },
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