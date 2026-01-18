import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.propertechsoftware.com';

// Tell Next.js this route is dynamic and should not be statically generated
export const dynamic = 'force-dynamic';

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

    console.log('[API/auth/me] Auth header present:', !!authHeader);
    if (authHeader) {
      console.log('[API/auth/me] Auth header format:', authHeader.substring(0, 15) + '...');
    }

    if (!authHeader) {
      console.log('[API/auth/me] No auth header found');
      return NextResponse.json(
        { success: false, error: 'No authorization token provided' },
        { status: 401 }
      );
    }

    const formattedAuth = formatAuthHeader(authHeader);
    console.log('[API/auth/me] Calling backend:', `${BACKEND_URL}/api/auth/me`);

    const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': formattedAuth,
      },
    });

    console.log('[API/auth/me] Backend status:', response.status);
    const data = await response.json();

    if (!response.ok) {
      console.log('[API/auth/me] Backend error:', JSON.stringify(data));
      return NextResponse.json(
        {
          success: false,
          error: data.detail || data.message || 'Failed to get user'
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error('Get user API route error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}