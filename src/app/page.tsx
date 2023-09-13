'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { isLoggedIn } from '@/methods/middleware-client'
import Products from '@/components/feature-product/products'

export default function Home() {
  const { status, data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    isLoggedIn({ status, session, router })
  }, [status, session, router])

  return <Products status={status} />
}
