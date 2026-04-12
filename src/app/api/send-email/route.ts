'use server';

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import GeneralEmail from '@/emails/general';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Resend API key is not set.');
    return NextResponse.json({ error: 'Server configuration error: Email service is not set up.' }, { status: 500 });
  }
  const resend = new Resend(apiKey);
  
  try {
    const body = await req.json();
    const { to, subject, text } = body;

    if (!to || !subject || !text) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Alpha ERP <onboarding@resend.dev>',
      to: [to],
      subject: subject,
      react: GeneralEmail({ subject, message: text }),
      text: text,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully!', data });
  } catch (e: any) {
    console.error('API route error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
