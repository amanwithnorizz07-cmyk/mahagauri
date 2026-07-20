'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

const socials = ['Instagram', 'Facebook', 'Pinterest']

const columns = [
  {
    title: 'Collections',
    links: ['Signature', 'Evening', 'Heritage', 'Limited Edition', 'New Arrivals'],
  },
  {
    title: 'Customer Care',
    links: ['Contact Us', 'Shipping', 'Returns & Exchanges', 'Product Care', 'FAQ'],
  },
  {
    title: 'The House',
    links: ['Our Story', 'Craftsmanship', 'Journal', 'Sustainability', 'Careers'],
  },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="bg-[#0A0A0A] text-[#F9F7F3]">
      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <h3 className="font-display text-3xl font-light tracking-luxury">
              MAHAGAURI
            </h3>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
              Crafted for timeless elegance. Ultra-premium handbags, made from
              the finest Italian leather by hand. Enjoy free shipping across India,
              GST-inclusive pricing, and secure payments via UPI, Razorpay,
              PhonePe, cards and net banking.
            </p>
            <address className="mt-6 not-italic text-sm leading-relaxed text-white/60">
              Ground floor, MAHAGAURI, Thano Rd, near Ms furniture, Joly Grant,
              Bhania Wala, Uttarakhand 248016
            </address>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (email) setSubscribed(true)
              }}
              className="mt-8 max-w-sm"
            >
              <label className="text-[10px] uppercase tracking-luxury text-gold">
                Join the house
              </label>
              {subscribed ? (
                <p className="mt-3 text-sm text-white/70">
                  Thank you. Welcome to MahaGauri.
                </p>
              ) : (
                <div className="mt-3 flex items-center border-b border-white/20 pb-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-white/30"
                  />
                  <button aria-label="Subscribe" className="text-gold">
                    <ArrowRight className="size-4" strokeWidth={1.4} />
                  </button>
                </div>
              )}
            </form>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] uppercase tracking-luxury text-white/50">
                {col.title}
              </h4>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-white/75">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="/shop" className="link-underline transition-colors hover:text-white">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} MahaGauri. All rights reserved.
          </p>
          <div className="flex gap-6 text-[11px] uppercase tracking-wide-lux text-white/60">
            {socials.map((s) => (
              <Link
                key={s}
                href={
                  s === 'Instagram'
                    ? 'https://www.instagram.com/mahagauri_store/'
                    : '#'
                }
                target={s === 'Instagram' ? '_blank' : undefined}
                rel={s === 'Instagram' ? 'noreferrer' : undefined}
                className="link-underline hover:text-gold"
              >
                {s}
              </Link>
            ))}
          </div>
          <div className="flex gap-6 text-xs text-white/40">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
