import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = [
  '/sign-up',
  '/forgot-password',
  '/reset-password',
  '/about-us',
  '/grading',
  '/services-and-pricing',
  '/portfolio',
  '/contact-us',
];

// Define protected routes that require authentication
const userDashboardRoutes = [
  '/user-dashboard',
];

// Admin routes require admin authentication
const adminDashboardRoutes = [
  '/dashboard'
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const adminToken = request.cookies.get('adminToken')?.value;
  const { pathname } = request.nextUrl;

  //Special handling for root route
  if (pathname === '/') {
    if (token) {
      // If user is authenticated, redirect to user dashboard
      return NextResponse.redirect(new URL('/user-dashboard', request.url));
    }
    else if (adminToken) {
      // If user is authenticated, redirect to admin dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // If user is not authenticated, allow access to root
    return NextResponse.next();
  }

  // Check for admin routes
  const isAdminRoute = adminDashboardRoutes.some(route => pathname.startsWith(route));
  if (isAdminRoute) {
    if (!adminToken) {
      // If trying to access admin route without admin token, redirect to admin login
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Check if the current path is a protected route
  const isProtectedRoute = userDashboardRoutes.some(route =>
    pathname.startsWith(route)
  );

  // If user is not authenticated and trying to access a protected route
  if (!token && isProtectedRoute) {
    // Redirect to login page
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and trying to access public routes
  if (token && isPublicRoute) {
    // Redirect to feed page
    return NextResponse.redirect(new URL('/user-dashboard', request.url));
  }

  // If user is authenticated and trying to access public routes
  if (adminToken && isPublicRoute) {
    // Redirect to feed page
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
