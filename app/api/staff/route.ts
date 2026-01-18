import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.propertechsoftware.com';

// Helper to ensure proper Bearer token format
function formatAuthHeader(authHeader: string): string {
  if (authHeader.startsWith('Bearer ')) {
    return authHeader;
  }
  return `Bearer ${authHeader}`;
}

export async function GET(request: NextRequest) {
  try {
    // Try both cases for header name
    const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');

    console.log('[API/staff GET] Auth header present:', !!authHeader);

    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }

    const formattedAuth = formatAuthHeader(authHeader);

    const response = await fetch(`${BACKEND_URL}/api/staff/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': formattedAuth,
      },
      cache: 'no-store',
    });

    console.log('[API/staff GET] Backend status:', response.status);
    const data = await response.json();

    if (!response.ok) {
      console.log('[API/staff GET] Backend error:', JSON.stringify(data));
      return NextResponse.json(
        { success: false, error: data.detail || data.message || 'Failed to fetch staff' },
        { status: response.status }
      );
    }

    // Handle potential double-wrapping from backend
    let staffData = data;
    if (data.data && (Array.isArray(data.data) || typeof data.data === 'object')) {
      staffData = data.data;
    }

    return NextResponse.json({ success: true, data: staffData });
  } catch (error: any) {
    console.error('Staff API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch staff' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Try both cases for header name
    const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');

    console.log('[API/staff POST] Auth header present:', !!authHeader);

    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formattedAuth = formatAuthHeader(authHeader);
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/api/staff/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': formattedAuth,
      },
      body: JSON.stringify(body),
    });

    console.log('[API/staff POST] Backend status:', response.status);
    const data = await response.json();

    if (!response.ok) {
      console.log('[API/staff POST] Backend error:', JSON.stringify(data));
      return NextResponse.json(
        { success: false, error: data.detail || 'Failed to create staff member' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data: data });
  } catch (error: any) {
    console.error('Create Staff Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create staff member' },
      { status: 500 }
    );
  }
}
