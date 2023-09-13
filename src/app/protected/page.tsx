'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Protected = () => {
  const { status, data } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/signin')
  }, [router, status])

  if (status === 'authenticated')
    return (
      <div>
        This page is Protected for special people. like{'\n'}
        {JSON.stringify(data.user, null, 2)}
      </div>
    )

  return <div>loading</div>
}

export default Protected
