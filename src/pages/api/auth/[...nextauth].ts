import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { apiGetLogin, apiGetProfile } from '@/methods/service-login'
// import { apiUserProfileDummy } from '@/methods/service-dummy'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        try {
          const result = await apiGetLogin(credentials)
          console.log(result)
          if (!result || result?.statusCode === 401) {
            return Promise.reject(new Error(result.message || 'Unathorized'))
          } else {
            const profile = await apiGetProfile(result || {})
            if (profile) {
              const data = { accessToken: result?.access_token, refreshToken: result?.refresh_token }
              return Object.assign({}, profile, data)
            }
            return null
          }
        } catch (error) {
          return Promise.reject(error)
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    jwt(params: any) {
      if (params.user?.role) params.token.role = params.user.role
      if (params.user?.accessToken) params.token.accessToken = params.user.accessToken
      if (params.user?.refreshToken) params.token.refreshToken = params.user.refreshToken
      return params.token
    },
    session({ session, token }) {
      if (session.user && token) {
        Object.assign(session.user, { ...token })
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
