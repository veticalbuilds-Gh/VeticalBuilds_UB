import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Strict Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // Payload Length Limits
    if (name.length > 100 || email.length > 100 || (subject && subject.length > 200) || message.length > 2000) {
      return NextResponse.json({ error: 'Payload exceeds maximum length' }, { status: 400 });
    }

    // Email Regex Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Here is where you would typically send an email using a service like SendGrid, Resend, or Nodemailer.
    // For example, with Nodemailer:
    /*
    const transporter = nodemailer.createTransport({ ...smtpConfig });
    await transporter.sendMail({
      from: '"Vetical Builds" <noreply@veticalbuilds.com>',
      to: 'sales@veticalbuilds.com', // Respective person
      subject: `New Contact Request: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    });
    */

    // Simulating network delay for realistic UI feedback
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
