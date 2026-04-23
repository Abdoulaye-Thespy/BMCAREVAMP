import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(request) {
    const token = request.nextauth.token
    const path = request.nextUrl.pathname
    
    // Allow public routes - NO REDIRECTS for these
    const publicRoutes = ['/', '/login', '/api/auth']
    if (publicRoutes.some(route => path === route || path.startsWith(route))) {
      return NextResponse.next()
    }
    
    // Only check /admin routes for authorization
    if (path.startsWith('/admin')) {
      if (!token) {
        // Let withAuth handle the redirect to login
        return NextResponse.next()
      }
      
      if (token.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname
        
        // Allow public routes unconditionally
        if (path === '/' || path === '/login' || path.startsWith('/api/auth')) {
          return true
        }
        
        // Require authentication for admin routes
        if (path.startsWith('/admin')) {
          return !!token
        }
        
        // All other routes are public
        return true
      }
    },
    pages: {
      signIn: "/login",
    }
  }
)

export const config = {
  // Only run middleware on specific paths
  matcher: ["/admin/:path*", "/login"]
}