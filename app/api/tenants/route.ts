// ============================================
// FILE: app/api/tenants/route.ts
// ============================================
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // TODO: Fetch from database
    const tenants = [
      {
        id: '1',
        name: 'John Doe',
        unit: '304',
        phone: '+254712345678',
        email: 'john@example.com',
        rentAmount: 25000,
        status: 'active',
      },
    ];

    return NextResponse.json({ success: true, data: tenants });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tenants' },
      { status: 500 }
    );
  }
}