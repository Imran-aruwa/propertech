// ============================================
// FILE: middleware.ts (CREATE THIS FILE)
// ============================================
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Check if user has active subscription for owner/agent routes
    if (path.startsWith('/owner') || path.startsWith('/agent')) {
      if (token?.role === 'OWNER' || token?.role === 'AGENT') {
        // TODO: Check subscription status from database
        // For now, allow access
        return NextResponse.next();
      }
    }

    // Allow access to other portals based on role
    if (path.startsWith('/caretaker') && token?.role !== 'CARETAKER') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    
    if (path.startsWith('/tenant') && token?.role !== 'TENANT') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    
    if (path.startsWith('/staff/security') && token?.role !== 'SECURITY') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    
    if (path.startsWith('/staff/gardener') && token?.role !== 'GARDENER') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/owner/:path*',
    '/agent/:path*',
    '/caretaker/:path*',
    '/tenant/:path*',
    '/staff/:path*',
  ],
};