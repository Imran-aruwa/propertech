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

    console.log('[API/tenants GET] Auth header present:', !!authHeader);

    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }

    const formattedAuth = formatAuthHeader(authHeader);

    const response = await fetch(`${BACKEND_URL}/api/tenants/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': formattedAuth,
      },
      cache: 'no-store',
    });

    console.log('[API/tenants GET] Backend status:', response.status);
    const data = await response.json();

    if (!response.ok) {
      console.log('[API/tenants GET] Backend error:', JSON.stringify(data));
      return NextResponse.json(
        { success: false, error: data.detail || data.message || 'Failed to fetch tenants' },
        { status: response.status }
      );
    }

    // Handle potential double-wrapping from backend
    let tenantsData = data;
    if (data.data && (Array.isArray(data.data) || typeof data.data === 'object')) {
      tenantsData = data.data;
    }

    return NextResponse.json({ success: true, data: tenantsData });
  } catch (error: any) {
    console.error('Tenants API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch tenants' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Try both cases for header name
    const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');

    console.log('[API/tenants POST] Auth header present:', !!authHeader);

    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formattedAuth = formatAuthHeader(authHeader);
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/api/tenants/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': formattedAuth,
      },
      body: JSON.stringify(body),
    });

    console.log('[API/tenants POST] Backend status:', response.status);
    const data = await response.json();

    if (!response.ok) {
      console.log('[API/tenants POST] Backend error:', JSON.stringify(data));
      return NextResponse.json(
        { success: false, error: data.detail || 'Failed to create tenant' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data: data });
  } catch (error: any) {
    console.error('Create Tenant Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create tenant' },
      { status: 500 }
    );
  }
}
