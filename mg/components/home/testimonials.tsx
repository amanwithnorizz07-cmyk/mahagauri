'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TextReveal } from '@/components/reveal'

const testimonials = [
  {
    quote:
      'The Aurelia is the most beautiful object I own. The leather softens like nothing else, and the finish is simply flawless.',
    name: 'Amara V.',
    location: 'Paris',
  },
  {
    quote:
      'You feel the difference the moment you hold it. This is craftsmanship you can pass down. Truly a house apart.',
    name: 'Sofia L.',
    location: 'Milan',
  },
  {
    quote:
      'From the packaging to the stitching, every detail whispers luxury. MahaGauri has earned a devoted collector in me.',
    name: 'Priya R.',
    location: 'Mumbai',
  },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      6000,
    )
    return () => clearInterval(timer)
  }, [])

  const t = testimonials[index]

  return (
    <section className="mx-auto max-w-4xl px-5 py-24 text-center md:py-32">
      <span className="text-[11px] uppercase tracking-luxury text-gold">
        In Their Words
      </span>
      <TextReveal
        as="h2"
        text="The MahaGauri Circle"
        className="mt-4 font-display text-3xl font-light md:text-5xl"
      />

      <div className="relative mt-14 min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mx-auto max-w-2xl font-display text-2xl font-light leading-relaxed italic md:text-3xl">
              “{t.quote}”
            </p>
            <footer className="mt-8">
              <p className="text-sm font-medium tracking-wide-lux">{t.name}</p>
              <p className="mt-1 text-[11px] uppercase tracking-luxury text-muted-foreground">
                {t.location}
              </p>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-center gap-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`View testimonial ${i + 1}`}
            className={`h-px transition-all duration-500 ${
              i === index ? 'w-10 bg-gold' : 'w-5 bg-border'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
