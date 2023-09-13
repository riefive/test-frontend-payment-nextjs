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
        const result = await apiGetLogin(credentials)
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
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  callbacks: {
    jwt(params: any) {
      console.log(params)
      if (params.user?.role) params.token.role = params.user.role
      if (params.user?.accessToken) params.token.accessToken = params.user.accessToken
      if (params.user?.refreshToken) params.token.refreshToken = params.user.refreshToken
      return params.token
    },
    session({ session, token }) {
      console.log(token)
      console.log(session)
      return session
    },
  },
}

export default NextAuth(authOptions)
