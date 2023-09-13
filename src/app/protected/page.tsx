'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { isRestricted } from '@/methods/middleware-client'

const Protected = () => {
  const { status, data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    isRestricted({ status, session, router })
  }, [status, session, router])

  if (status === 'authenticated')
    return (
      <pre>
        This page is Protected for special people. like{'\n'}
        {JSON.stringify(session, null, 4)}
      </pre>
    )

  return <div>loading</div>
}

export default Protected
