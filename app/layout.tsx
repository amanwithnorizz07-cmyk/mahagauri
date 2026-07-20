import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/smooth-scroll'
import { CustomCursor } from '@/components/custom-cursor'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'
import { PageLoader } from '@/components/page-loader'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MahaGauri — Luxury Handbags for India',
  description:
    'Shop premium handbags in India with INR pricing, GST-inclusive delivery, and secure payments through UPI, Razorpay, PhonePe, cards, and net banking.',
  generator: 'v0.app',
  keywords: [
    'MahaGauri',
    'luxury handbags India',
    'designer handbags India',
    'INR handbags',
    'GST inclusive fashion',
  ],
  openGraph: {
    title: 'MahaGauri — Crafted for Timeless Elegance',
    description:
      'Ultra-premium handbags, crafted from the finest Italian leather.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0A0A0A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} bg-background`}>
      <body className="antialiased">
        <PageLoader />
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <CartDrawer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
