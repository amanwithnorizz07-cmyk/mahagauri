'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Magnetic } from '@/components/magnetic'

const easeLux = [0.22, 1, 0.36, 1] as const

function Particles() {
  const dots = Array.from({ length: 18 })
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((_, i) => {
        const left = (i * 53) % 100
        const size = 2 + (i % 3)
        const delay = (i % 6) * 0.7
        const duration = 8 + (i % 5) * 2
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[#C9A86A]"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              bottom: -10,
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -700, opacity: [0, 0.7, 0] }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )
      })}
    </div>
  )
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden bg-[#0A0A0A] text-[#F9F7F3]"
    >
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src="/images/hero-bag.png"
          alt="MahaGauri signature handbag"
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]/60" />
      </motion.div>

      <Particles />

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 1, ease: easeLux }}
          className="text-[11px] uppercase tracking-luxury text-[#C9A86A]"
        >
          Iconic Bags, Timeless Appeal.
        </motion.span>

        <div className="mt-6 overflow-hidden">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ delay: 2.5, duration: 1.2, ease: easeLux }}
            className="font-display text-6xl font-light leading-[0.95] tracking-[0.08em] md:text-8xl lg:text-9xl"
          >
            MAHAGAURI
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.9, duration: 1 }}
          className="mt-6 font-display text-xl font-light italic text-[#F9F7F3]/90 md:text-2xl"
        >
          Crafted for Timeless Elegance.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.1, duration: 1 }}
          className="mt-5 max-w-md text-sm leading-relaxed text-[#F9F7F3]/60"
        >
          An ultra-premium handbag house, where the finest Italian leather meets
          heritage craftsmanship and future-focused design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.3, duration: 1, ease: easeLux }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic>
            <Link
              href="/shop"
              className="inline-block bg-[#F9F7F3] px-10 py-4 text-xs uppercase tracking-luxury text-[#0A0A0A] transition-colors hover:bg-[#C9A86A]"
            >
              Shop Collection
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/about"
              className="inline-block border border-white/30 px-10 py-4 text-xs uppercase tracking-luxury text-[#F9F7F3] transition-colors hover:border-[#C9A86A] hover:text-[#C9A86A]"
            >
              Discover Craftsmanship
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-luxury text-white/50">
          Scroll
        </span>
        <div className="h-12 w-px overflow-hidden bg-white/20">
          <motion.div
            className="h-1/2 w-full bg-[#C9A86A]"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
