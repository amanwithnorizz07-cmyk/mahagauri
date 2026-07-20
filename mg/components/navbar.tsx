'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartCount, useStore } from '@/lib/store'

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const openCart = useStore((s) => s.openCart)
  const wishlistCount = useStore((s) => s.wishlist.length)
  const count = useCartCount()

  const isDarkHero = pathname === '/'
  const solid = scrolled || !isDarkHero || menuOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 2.2 }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          solid
            ? 'glass border-b border-border/60 py-4 text-foreground'
            : 'py-6 text-[#F9F7F3]',
        )}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10">
          <div className="flex flex-1 items-center gap-8">
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" strokeWidth={1.2} />
            </button>
            <ul className="hidden items-center gap-8 text-xs uppercase tracking-wide-lux lg:flex">
              {navLinks.slice(0, 3).map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="link-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/"
            className="flex-1 text-center font-display text-2xl font-light tracking-luxury md:text-3xl"
          >
            MAHAGAURI
          </Link>

          <div className="flex flex-1 items-center justify-end gap-5">
            <ul className="hidden items-center gap-8 text-xs uppercase tracking-wide-lux lg:flex">
              {navLinks.slice(3).map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="link-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="transition-opacity hover:opacity-60"
            >
              <Search className="size-5" strokeWidth={1.2} />
            </button>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden transition-opacity hover:opacity-60 sm:block"
            >
              <User className="size-5" strokeWidth={1.2} />
            </Link>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative transition-opacity hover:opacity-60"
            >
              <Heart className="size-5" strokeWidth={1.2} />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-gold text-[9px] font-medium text-[#0A0A0A]">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative transition-opacity hover:opacity-60"
            >
              <ShoppingBag className="size-5" strokeWidth={1.2} />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-gold text-[9px] font-medium text-[#0A0A0A]">
                  {count}
                </span>
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-start justify-center bg-[#0A0A0A]/95 px-6 pt-40"
          >
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute right-6 top-8 text-[#F9F7F3]"
              aria-label="Close search"
            >
              <X className="size-6" strokeWidth={1.2} />
            </button>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl"
            >
              <span className="text-[10px] uppercase tracking-luxury text-gold">
                Search MahaGauri
              </span>
              <input
                autoFocus
                type="text"
                placeholder="What are you looking for?"
                className="mt-4 w-full border-b border-white/20 bg-transparent pb-4 font-display text-3xl font-light text-[#F9F7F3] outline-none placeholder:text-white/30 md:text-5xl"
              />
              <p className="mt-6 text-xs uppercase tracking-wide-lux text-white/40">
                Popular: Aurelia · Evening Clutch · Limited Edition
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-[#0A0A0A] px-6 py-6 text-[#F9F7F3] lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl tracking-luxury">MAHAGAURI</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X className="size-6" strokeWidth={1.2} />
              </button>
            </div>
            <ul className="mt-16 flex flex-col gap-2">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <Link
                    href={l.href}
                    className="block border-b border-white/10 py-4 font-display text-4xl font-light"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-12 flex gap-8 text-xs uppercase tracking-wide-lux text-white/60">
              <Link href="/account">Account</Link>
              <Link href="/wishlist">Wishlist</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
