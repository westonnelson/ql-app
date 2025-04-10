import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { PrismaClient } from "@prisma/client"
import { quoteFormSchema } from "@/lib/validations/quote-form"
import { calculateLeadScore } from "@/lib/utils"
import { Resend } from 'resend'
import { submitLead, Lead } from '@/lib/leads'

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const lead: Lead = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      age: body.age,
      coverage_amount: body.coverage_amount,
    }

    const data = await submitLead(lead)
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error in leads API route:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit lead' },
      { status: 500 }
    )
  }
} 