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

    console.log('[API/caretaker/dashboard] Auth header present:', !!authHeader);

    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }

    const formattedAuth = formatAuthHeader(authHeader);
    // Use URL without trailing slash to avoid 307 redirect that drops auth header
    const backendUrl = `${BACKEND_URL}/api/caretaker/dashboard`;

    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': formattedAuth,
      },
      cache: 'no-store',
      redirect: 'follow',
    });

    console.log('[API/caretaker/dashboard] Backend status:', response.status);
    const data = await response.json();

    if (!response.ok) {
      console.log('[API/caretaker/dashboard] Backend error:', JSON.stringify(data));
      return NextResponse.json(
        { success: false, error: data.detail || data.message || 'Failed to fetch dashboard' },
        { status: response.status }
      );
    }

    // Handle potential double-wrapping
    let dashboardData = data;
    if (data.data && typeof data.data === 'object') {
      dashboardData = data.data;
    }

    return NextResponse.json({ success: true, data: dashboardData });
  } catch (error: any) {
    console.error('Caretaker Dashboard API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch dashboard' },
      { status: 500 }
    );
  }
}
