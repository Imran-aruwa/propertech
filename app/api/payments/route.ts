// ============================================
// FILE: app/api/payments/route.ts
// ============================================
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // TODO: Fetch from database
    const payments = [
      {
        id: '1',
        tenant: 'John Doe',
        unit: '304',
        amount: 25000,
        date: '2024-11-01',
        status: 'paid',
      },
    ];

    return NextResponse.json({ success: true, data: payments });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // TODO: Save to database
    const payment = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, data: payment });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}