// ============================================
// FILE: app/api/properties/route.ts
// ============================================
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.propertechsoftware.com';

// Helper to ensure proper Bearer token format
function formatAuthHeader(authHeader: string): string {
  // If already properly formatted, return as-is
  if (authHeader.startsWith('Bearer ')) {
    return authHeader;
  }
  // If raw token without Bearer prefix, add it
  return `Bearer ${authHeader}`;
}

export async function GET(request: NextRequest) {
  try {
    // Try both cases for header name
    const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');

    console.log('[API/properties GET] Auth header present:', !!authHeader);
    if (authHeader) {
      console.log('[API/properties GET] Auth header format:', authHeader.substring(0, 15) + '...');
    }

    if (!authHeader) {
      console.log('[API/properties GET] No auth header found');
      return NextResponse.json(
        { success: false, error: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }

    const formattedAuth = formatAuthHeader(authHeader);
    console.log('[API/properties GET] Calling backend:', `${BACKEND_URL}/api/properties/`);

    const response = await fetch(`${BACKEND_URL}/api/properties/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': formattedAuth,
      },
      cache: 'no-store',
    });

    console.log('[API/properties GET] Backend status:', response.status);
    const data = await response.json();

    if (!response.ok) {
      console.log('[API/properties GET] Backend error:', JSON.stringify(data));
      return NextResponse.json(
        { success: false, error: data.detail || data.message || 'Failed to fetch properties' },
        { status: response.status }
      );
    }

    // Handle potential double-wrapping from backend
    let propertiesData = data;
    if (data.data && (Array.isArray(data.data) || typeof data.data === 'object')) {
      propertiesData = data.data;
    }

    return NextResponse.json({ success: true, data: propertiesData });
  } catch (error: any) {
    console.error('Properties API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Try both cases for header name
    const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');

    console.log('[API/properties POST] Auth header present:', !!authHeader);
    if (authHeader) {
      console.log('[API/properties POST] Auth header format:', authHeader.substring(0, 15) + '...');
    }

    if (!authHeader) {
      console.log('[API/properties POST] No auth header found');
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const formattedAuth = formatAuthHeader(authHeader);

    console.log('[API/properties POST] Creating property');
    console.log('[API/properties POST] Body:', JSON.stringify(body));
    console.log('[API/properties POST] Calling backend:', `${BACKEND_URL}/api/properties/`);

    const response = await fetch(`${BACKEND_URL}/api/properties/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': formattedAuth,
      },
      body: JSON.stringify(body),
    });

    console.log('[API/properties POST] Backend response status:', response.status);

    const data = await response.json();

    if (!response.ok) {
      console.log('[API/properties POST] Backend error:', JSON.stringify(data));
      return NextResponse.json(
        { success: false, error: data.detail || data.message || data.error || 'Failed to create property' },
        { status: response.status }
      );
    }

    console.log('[API/properties POST] Success, property created');
    return NextResponse.json({ success: true, data: data });
  } catch (error: any) {
    console.error('Create Property Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create property' },
      { status: 500 }
    );
  }
}