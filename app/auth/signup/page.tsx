'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SignupForm } from '@/components/auth/signup-form'

const easeLux = [0.22, 1, 0.36, 1] as const

export default function Page() {
  const router = useRouter()
  const onSuccess = () => {
    // show success animation then redirect
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto flex min-h-[calc(100vh-120px)] max-w-[1400px] items-stretch px-5 py-20 md:px-10">
        <section className="hidden w-0 flex-none overflow-hidden rounded-lg md:flex md:w-[45%] md:items-stretch">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.06 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear', repeatType: 'reverse' }}
            className="relative h-full w-full"
          >
            <Image
              src="/images/hero-bag.png"
              alt="MahaGauri editorial"
              fill
              className="object-cover opacity-95"
            />
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
            <div className="absolute left-8 top-12 max-w-xs text-white">
              <h2 className="font-display text-4xl font-light">MAHAGAURI</h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">
                Crafted for Timeless Elegance.
              </p>
              <ul className="mt-6 space-y-2 text-xs text-white/70">
                <li>Early access to new collections.</li>
                <li>Private member benefits.</li>
                <li>Exclusive launches &amp; invites.</li>
              </ul>
            </div>
          </motion.div>
        </section>

        <section className="flex w-full flex-1 items-center justify-center md:w-[55%]">
          <div className="w-full max-w-[560px]">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easeLux }}
              className="font-display text-4xl font-light leading-tight"
            >
              Create Your Account
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.9, ease: easeLux }}
              className="mt-4 max-w-lg text-sm text-muted"
            >
              Join the MahaGauri House to enjoy exclusive collections, wishlists,
              faster checkout and private releases.
            </motion.p>

            <div className="mt-10">
              <SignupForm onSuccess={() => {
                // show a premium success animation before redirecting
                const root = document.getElementById('mg-success')
                if (root) root.classList.remove('hidden')
                setTimeout(() => router.push('/'), 2000)
              }} />
            </div>

            <div id="mg-success" className="hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: easeLux }}
                className="mt-8 rounded-md bg-ivory p-6 text-center shadow-luxury"
              >
                <h3 className="font-display text-2xl">Welcome to the House of MahaGauri.</h3>
                <p className="mt-3 text-sm text-muted">Redirecting…</p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <div className="border-t border-border">
        <Footer />
      </div>
    </div>
  )
}
