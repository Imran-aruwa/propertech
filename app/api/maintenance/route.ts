// ============================================
// FILE: app/api/maintenance/route.ts
// ============================================
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // TODO: Fetch from database
    const requests = [
      {
        id: '1',
        unit: '304',
        issue: 'Leaking faucet',
        priority: 'medium',
        status: 'in_progress',
        createdAt: '2024-12-01',
      },
    ];

    return NextResponse.json({ success: true, data: requests });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch maintenance requests' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // TODO: Save to database
    const maintenanceRequest = {
      id: Date.now().toString(),
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, data: maintenanceRequest });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create maintenance request' },
      { status: 500 }
    );
  }
}