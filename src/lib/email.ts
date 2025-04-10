import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadConfirmationEmail(email: string, name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'QuoteLinker <noreply@quotelinker.com>',
      to: email,
      subject: 'Thank you for your interest in life insurance',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Thank you for your interest, ${name}!</h1>
          <p>We've received your request for life insurance quotes and will be in touch shortly with personalized options for you.</p>
          <p>In the meantime, if you have any questions, feel free to reply to this email.</p>
          <p>Best regards,<br>The QuoteLinker Team</p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
} 