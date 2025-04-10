import { supabase } from './supabase';
import { sendLeadConfirmationEmail } from './email';

export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  age?: number;
  coverage_amount?: number;
  created_at?: string;
}

export async function submitLead(lead: Lead) {
  try {
    // Insert lead into Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select();

    if (error) {
      console.error('Error inserting lead:', error);
      throw error;
    }

    // Send confirmation email
    await sendLeadConfirmationEmail(lead.email, lead.name);

    return data;
  } catch (error) {
    console.error('Error submitting lead:', error);
    throw error;
  }
} 