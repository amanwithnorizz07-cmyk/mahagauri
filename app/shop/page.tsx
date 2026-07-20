import type { Metadata } from 'next'
import { ShopView } from '@/components/shop/shop-view'

export const metadata: Metadata = {
  title: 'The Collection — MahaGauri',
  description:
    'Explore the full MahaGauri collection of handcrafted luxury handbags, from signature top handles to evening clutches.',
}

export default function ShopPage() {
  return <ShopView />
}
