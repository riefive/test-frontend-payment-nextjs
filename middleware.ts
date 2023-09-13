import { withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
/*
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
      if (req.nextUrl.pathname === '/admin') {
        return token?.userRole === 'admin'
      }
      // `/me` only requires the user to be logged in
      return !!token
    },
  },
})
*/

export default withAuth(
  function middleware(req: NextRequest) {
    // return NextResponse
    return NextResponse.rewrite(new URL('/admin', req.url))
  },
  {
    callbacks: {
      authorized(params: any) {
        console.log('params', params)
        return params.token?.role === 'admin'
      },
    },
  }
)

export const config = { matcher: ['/', '/admin'] }
