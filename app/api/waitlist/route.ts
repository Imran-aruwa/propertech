// app/api/waitlist/route.ts
import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  console.error('Missing API_URL env var for waitlist route');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body?.email || '').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Call FastAPI backend to add to waitlist
    const response = await fetch(`${API_URL}/api/waitlist/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400 && data.detail === 'Email already subscribed') {
        return NextResponse.json({ message: "You're already on the waitlist" }, { status: 200 });
      }
      return NextResponse.json({ error: data.detail || 'Error adding to waitlist' }, { status: response.status });
    }

    return NextResponse.json({ ok: true, message: "You're in! We'll email you soon." }, { status: 200 });
  } catch (err: any) {
    console.error('Waitlist route error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}