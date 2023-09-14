import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ProviderAuth from '@/components/provider-auth'

import './_global.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderAuth>{children}</ProviderAuth>
      </body>
    </html>
  )
}
