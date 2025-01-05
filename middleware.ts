import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { activityLogger } from './lib/middlewares/activity-logger'

export async function middleware(request: NextRequest) {
  // Run the activity logger
  await activityLogger(request)

  // Continue with the request
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

