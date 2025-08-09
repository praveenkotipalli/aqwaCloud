import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if user is trying to access dashboard
  if (pathname.startsWith('/dashboard')) {
    // In a real app, you'd check for a valid auth token here
    // For now, we'll let the component handle auth state
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
