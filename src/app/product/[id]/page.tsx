'use client'
import { useSession } from 'next-auth/react'
import ProductDetail from '@/components/feature-product/product-detail'

const PageProductDetail = (): JSX.Element => {
  const { data: session } = useSession()

  return <ProductDetail session={session} />
}

export default PageProductDetail
