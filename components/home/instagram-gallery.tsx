'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const feed = [
  '/images/collections/signature.png',
  '/images/products/aurelia-model.png',
  '/images/collections/evening.png',
  '/images/products/serena-model.png',
  '/images/collections/heritage.png',
  '/images/packaging.png',
]

export function InstagramGallery() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 text-center md:px-10">
        <Reveal>
          <span className="text-[11px] uppercase tracking-luxury text-gold">
            @mahagauri
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 font-display text-3xl font-light md:text-5xl">
            Follow MahaGauri
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-6">
        {feed.map((src, i) => (
          <motion.a
            key={src}
            href="https://www.instagram.com/mahagauri_store/"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (i % 6) * 0.06 }}
            className="group relative aspect-square overflow-hidden bg-secondary"
          >
            <Image
              src={src || '/placeholder.svg'}
              alt="MahaGauri on Instagram"
              fill
              sizes="(max-width: 768px) 50vw, 16vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0A]/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <Plus className="size-6 text-[#F9F7F3]" strokeWidth={1} />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
