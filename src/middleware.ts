import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('🔒 Middleware triggered on:', request.nextUrl.pathname);

  // const token = request.cookies.get('token')?.value;
  // console.log('token: ', token)

  // const isAuthPage = ['/sign-up', '/login'].includes(request.nextUrl.pathname);
  // const isDashboard = ['/user-dashboard', '/dashboard'].includes(request.nextUrl.pathname)

  // if (token && isAuthPage) {
  //   // Redirect logged in users away from signup page
  //   return NextResponse.redirect(new URL('/user-dashboard', request.url));
  // }

  // if(!token && isDashboard) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: ['/sign-up', '/login', '/user-dashboard', '/dashboard'], // Only run on /signup route
};
