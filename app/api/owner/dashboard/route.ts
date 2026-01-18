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

    console.log('[API/owner/dashboard] Auth header present:', !!authHeader);
    if (authHeader) {
      console.log('[API/owner/dashboard] Auth header format:', authHeader.substring(0, 15) + '...');
    }

    if (!authHeader) {
      console.log('[API/owner/dashboard] No auth header found');
      return NextResponse.json(
        { success: false, error: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }

    const formattedAuth = formatAuthHeader(authHeader);
    console.log('[API/owner/dashboard] Calling backend:', `${BACKEND_URL}/api/owner/dashboard/`);

    const response = await fetch(`${BACKEND_URL}/api/owner/dashboard/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': formattedAuth,
      },
      cache: 'no-store',
    });

    console.log('[API/owner/dashboard] Backend status:', response.status);
    const data = await response.json();

    if (!response.ok) {
      console.log('[API/owner/dashboard] Backend error:', JSON.stringify(data));
      return NextResponse.json(
        { success: false, error: data.detail || data.message || 'Failed to fetch dashboard' },
        { status: response.status }
      );
    }

    // Handle potential double-wrapping from backend
    let dashboardData = data;
    if (data.data && typeof data.data === 'object') {
      dashboardData = data.data;
    }

    return NextResponse.json({ success: true, data: dashboardData });
  } catch (error: any) {
    console.error('Owner Dashboard API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch dashboard' },
      { status: 500 }
    );
  }
}
