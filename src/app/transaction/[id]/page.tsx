'use client'
import { useSession } from 'next-auth/react'
import TransactionDetail from '@/components/feature-transaction/transaction-detail'

const PageTransactionDetail = (): JSX.Element => {
  const { data: session } = useSession()

  return <TransactionDetail session={session} />
}

export default PageTransactionDetail
