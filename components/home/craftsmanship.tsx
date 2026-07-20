'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Reveal, TextReveal } from '@/components/reveal'

const steps = [
  {
    n: '01',
    title: 'Italian Leather',
    text: 'Full-grain hides sourced from a family tannery in Tuscany, selected by hand for grain and character.',
  },
  {
    n: '02',
    title: 'Premium Hardware',
    text: 'Champagne gold-plated fittings, individually polished and engraved with the MahaGauri seal.',
  },
  {
    n: '03',
    title: 'Handmade Details',
    text: 'Every seam is hand-stitched with waxed thread — a single artisan sees each bag from start to finish.',
  },
  {
    n: '04',
    title: 'Quality Assurance',
    text: 'A rigorous forty-point inspection ensures each piece meets our uncompromising standard.',
  },
  {
    n: '05',
    title: 'Luxury Packaging',
    text: 'Presented in a lacquered keepsake box with a dust bag and a certificate of authenticity.',
  },
]

export function Craftsmanship() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-24 text-[#F9F7F3] md:py-32">
      <div className="mx-auto grid max-w-[1600px] items-start gap-16 px-5 md:grid-cols-2 md:px-10">
        <div className="md:sticky md:top-32">
          <span className="text-[11px] uppercase tracking-luxury text-gold">
            The Making
          </span>
          <TextReveal
            as="h2"
            text="Craftsmanship"
            className="mt-4 font-display text-4xl font-light md:text-6xl"
          />
          <p className="mt-6 max-w-md leading-relaxed text-white/60">
            Five stages, unhurried. This is how a MahaGauri comes to be — a
            process guided by patience, precision, and a reverence for the
            material.
          </p>
          <div className="relative mt-10 aspect-[4/3] overflow-hidden">
            <Image
              src="/images/craftsmanship.png"
              alt="Artisan crafting a MahaGauri handbag"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <ol className="relative border-l border-white/15">
          {steps.map((step, i) => (
            <motion.li
              key={step.n}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative pb-14 pl-10 last:pb-0"
            >
              <span className="absolute -left-[7px] top-1.5 size-3 rounded-full border border-gold bg-[#0A0A0A]" />
              <span className="font-display text-sm text-gold">{step.n}</span>
              <h3 className="mt-1 font-display text-2xl font-light">
                {step.title}
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-white/60">
                {step.text}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
