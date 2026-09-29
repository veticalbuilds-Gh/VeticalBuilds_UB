import { client } from '@/sanity/client';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const data = await req.json();
    
    if (!process.env.SANITY_API_TOKEN) {
      console.warn("SANITY_API_TOKEN is missing. Form data was NOT saved to Sanity.");
      return NextResponse.json({ success: true, warning: 'Missing API Token' }, { status: 200 });
    }

    // Create a new client instance with write permissions for this specific request
    const writeClient = client.withConfig({
      token: process.env.SANITY_API_TOKEN,
      useCdn: false, // Ensure we write directly to the API
    });

    const doc = {
      _type: 'lead',
      name: data.name,
      email: data.email || '',
      phone: data.phone || '',
      project: data.project || 'General',
      source: data.source || 'Website Form',
      submittedAt: new Date().toISOString(),
    };

    const result = await writeClient.create(doc);
    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error) {
    console.error("Error creating lead in Sanity:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
