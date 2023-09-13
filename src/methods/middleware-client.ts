export function getSessionClient(options: any) {
  const { session } = options
  let output: any = {}
  if (typeof window !== 'undefined' && session) {
    output = session?.user
  }
  return output
}

export function isLoggedIn(options: any) {
  const { status, router } = options
  if (router.path === '/signin') {
    return false
  }
  if (status === 'unauthenticated') {
    router.push('/signin')
    return false
  }
  return true
}

export function isRestricted(options: any) {
  const { status, session, router } = options
  const sessionUser = getSessionClient(session)
  const logged = isLoggedIn({ status, router })
  if (logged && sessionUser?.role !== 'admin') {
    router.push('/')
    return false
  }
  return true
}
