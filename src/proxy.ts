import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  // Update session ensures cookies are refreshed
  const response = await updateSession(request)

  // Protect /admins routes (Authentication is now handled directly in /admins/page.tsx)
  if (request.nextUrl.pathname.startsWith('/admins')) {
    // Session is already updated above, we just pass through
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
