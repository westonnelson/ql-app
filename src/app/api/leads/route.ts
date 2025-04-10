import { NextResponse } from "next/server"
import { supabase } from '@/lib/supabase'
import { calculateLeadScore } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Calculate lead score
    const leadScore = calculateLeadScore(body)
    
    // Prepare lead data
    const leadData = {
      first_name: body.name.split(' ')[0],
      last_name: body.name.split(' ').slice(1).join(' '),
      email: body.email,
      phone: body.phone,
      age: body.age,
      coverage_amount: body.coverage_amount,
      insurance_type: body.insurance_type || 'LIFE',
      status: 'NEW',
      lead_score: leadScore,
      source: body.source || 'WEBSITE',
      created_at: new Date().toISOString(),
    }

    // Insert lead into Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([leadData])
      .select()
      .single()

    if (error) {
      console.error('Error inserting lead:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to submit lead' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error in leads API route:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit lead' },
      { status: 500 }
    )
  }
} 