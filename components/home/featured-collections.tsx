'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { collections } from '@/lib/products'
import { Reveal, TextReveal } from '@/components/reveal'

export function FeaturedCollections() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
      <div className="flex flex-col items-center text-center">
        <Reveal>
          <span className="text-[11px] uppercase tracking-luxury text-gold">
            Explore
          </span>
        </Reveal>
        <TextReveal
          as="h2"
          text="Featured Collections"
          className="mt-4 font-display text-4xl font-light md:text-6xl"
        />
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {collections.map((col, i) => (
          <motion.div
            key={col.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/shop"
              className="group relative block aspect-[3/4] overflow-hidden bg-secondary"
            >
              <Image
                src={col.image || '/placeholder.svg'}
                alt={col.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-[#F9F7F3]">
                <h3 className="font-display text-3xl font-light">{col.name}</h3>
                <p className="mt-2 max-w-[80%] text-sm text-white/70">
                  {col.tagline}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-luxury text-gold opacity-0 transition-all duration-500 group-hover:opacity-100">
                  Discover
                  <span className="h-px w-8 bg-gold" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
