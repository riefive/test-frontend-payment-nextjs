'use client'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

export default function SignOut() {
  const router = useRouter()

  setTimeout(() => {
    signOut({ redirect: false })
    router.push('/signin')
  }, 1000)
}
