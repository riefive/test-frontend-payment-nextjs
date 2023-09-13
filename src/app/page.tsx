'use client'
import { useSession } from 'next-auth/react'
import { middlewareGetSession } from '@/methods/middleware-client'

export default function Home() {
  const { data: session } = useSession()

  middlewareGetSession(session)

  return <div>Home</div>
}
