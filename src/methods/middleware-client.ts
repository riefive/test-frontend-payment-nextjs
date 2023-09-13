export function middlewareGetSession(session: any) {
  if (typeof window !== 'undefined' && session) {
    console.log(session?.user)
  }
  /*
  if (req.nextUrl.pathname === '/admin') {
    return token?.role === 'admin'
  }
  */
}
