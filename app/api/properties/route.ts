// ============================================
// FILE: app/api/properties/route.ts
// ============================================
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // TODO: Fetch from database
    const properties = [
      {
        id: '1',
        name: 'Riverside Apartments',
        units: 24,
        occupancy: 94,
        revenue: 580000,
      },
    ];

    return NextResponse.json({ success: true, data: properties });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}