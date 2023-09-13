import NextAuth from 'next-auth'

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      name: string
      email: string
      avatar: string
      role: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'admin'
  }
}
