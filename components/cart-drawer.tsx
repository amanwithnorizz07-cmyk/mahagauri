'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, X } from 'lucide-react'
import {
  FREE_SHIPPING_THRESHOLD,
  useCartTotal,
  useStore,
} from '@/lib/store'
import { formatPrice } from '@/lib/products'

export function CartDrawer() {
  const open = useStore((s) => s.cartOpen)
  const close = useStore((s) => s.closeCart)
  const items = useStore((s) => s.items)
  const updateQuantity = useStore((s) => s.updateQuantity)
  const removeItem = useStore((s) => s.removeItem)
  const subtotal = useCartTotal()
  const [coupon, setCoupon] = useState('')
  const [applied, setApplied] = useState(false)

  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const discount = applied ? Math.round(subtotal * 0.1) : 0

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-[#0A0A0A]/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[91] flex h-full w-full max-w-md flex-col bg-background"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-display text-xl tracking-wide-lux">
                Your Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
              <button onClick={close} aria-label="Close cart">
                <X className="size-5" strokeWidth={1.2} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
                <p className="font-display text-2xl font-light">
                  Your bag is empty.
                </p>
                <p className="text-sm text-muted-foreground">
                  Discover pieces crafted to be treasured.
                </p>
                <Link
                  href="/shop"
                  onClick={close}
                  className="mt-2 bg-primary px-8 py-3 text-xs uppercase tracking-luxury text-primary-foreground"
                >
                  Shop Collection
                </Link>
              </div>
            ) : (
              <>
                {/* Free shipping progress */}
                <div className="border-b border-border px-6 py-4">
                  <p className="text-xs text-muted-foreground">
                    {remaining > 0 ? (
                      <>
                        You are {formatPrice(remaining)} away from{' '}
                        <span className="text-foreground">free shipping across India</span>
                      </>
                    ) : (
                      <span className="text-foreground">
                        You have earned free shipping across India.
                      </span>
                    )}
                  </p>
                  <div className="mt-3 h-[3px] w-full overflow-hidden bg-secondary">
                    <motion.div
                      className="h-full bg-gold"
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id + item.color}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-4 border-b border-border py-5"
                      >
                        <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-secondary">
                          <Image
                            src={item.image || '/placeholder.svg'}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <div className="flex justify-between gap-2">
                              <Link
                                href={`/product/${item.slug}`}
                                onClick={close}
                                className="font-display text-lg leading-tight"
                              >
                                {item.name}
                              </Link>
                              <button
                                onClick={() => removeItem(item.id, item.color)}
                                aria-label="Remove item"
                                className="text-muted-foreground hover:text-foreground"
                              >
                                <X className="size-4" strokeWidth={1.2} />
                              </button>
                            </div>
                            <p className="mt-1 text-xs uppercase tracking-wide-lux text-muted-foreground">
                              {item.color}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-border">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.color, item.quantity - 1)
                                }
                                className="px-2 py-1"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="size-3" />
                              </button>
                              <span className="w-8 text-center text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.color, item.quantity + 1)
                                }
                                className="px-2 py-1"
                                aria-label="Increase quantity"
                              >
                                <Plus className="size-3" />
                              </button>
                            </div>
                            <span className="text-sm">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="border-t border-border px-6 py-5">
                  <div className="flex items-center gap-2">
                    <input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Coupon code"
                      className="flex-1 border border-border bg-transparent px-3 py-2 text-xs uppercase tracking-wide-lux outline-none focus:border-gold"
                    />
                    <button
                      onClick={() => coupon && setApplied(true)}
                      className="border border-primary px-4 py-2 text-xs uppercase tracking-wide-lux transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      Apply
                    </button>
                  </div>
                  {applied && (
                    <p className="mt-2 text-xs text-gold">
                      Code applied · 10% off
                    </p>
                  )}

                  <div className="mt-5 space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-gold">
                        <span>Discount</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-border pt-3 font-display text-xl">
                      <span>Total</span>
                      <motion.span key={subtotal - discount}>
                        {formatPrice(subtotal - discount)}
                      </motion.span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={close}
                    className="mt-5 block bg-primary py-4 text-center text-xs uppercase tracking-luxury text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Proceed to Checkout
                  </Link>
                  <p className="mt-3 text-center text-[10px] uppercase tracking-wide-lux text-muted-foreground">
                    Free shipping across India · GST inclusive · Secure payments
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
