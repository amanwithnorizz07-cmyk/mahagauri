'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from '@/components/reveal'

export function BrandStory() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      ref={ref}
      className="mx-auto grid max-w-[1600px] items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-10 md:py-32"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <motion.div className="absolute inset-0 scale-110" style={{ y }}>
          <Image
            src="/images/brand-story.png"
            alt="MahaGauri brand story"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      <div className="md:pl-12">
        <Reveal>
          <span className="text-[11px] uppercase tracking-luxury text-gold">
            The House of MahaGauri
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 font-display text-4xl font-light leading-tight md:text-5xl">
            A quiet confidence, carried through generations.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
            MahaGauri was born from a singular belief — that true luxury is felt,
            never shouted. Each piece is conceived as an heirloom, drawn from a
            heritage of leatherwork and shaped by a modern, minimalist hand.
          </p>
        </Reveal>
        <Reveal delay={0.28}>
          <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
            We work with a small atelier of master artisans who devote days, not
            minutes, to every bag. The result is not merely an accessory, but a
            companion for a lifetime.
          </p>
        </Reveal>
        <Reveal delay={0.36}>
          <Link
            href="/about"
            className="mt-8 inline-block border-b border-foreground pb-1 text-xs uppercase tracking-luxury transition-colors hover:border-gold hover:text-gold"
          >
            Read Our Story
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
