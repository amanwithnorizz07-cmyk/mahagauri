'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { formatPrice, type Product } from '@/lib/products'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export function QuickView({
  product,
  onClose,
}: {
  product: Product | null
  onClose: () => void
}) {
  const addItem = useStore((s) => s.addItem)
  const [color, setColor] = useState<string | null>(null)

  const activeColor = color ?? product?.color ?? ''

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            className="fixed inset-0 z-[95] bg-[#0A0A0A]/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed left-1/2 top-1/2 z-[96] w-[92vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-background shadow-luxury"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
          >
            <button
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full glass"
            >
              <X className="size-4" strokeWidth={1.2} />
            </button>
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[3/4] bg-secondary">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 92vw, 400px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <p className="text-[10px] uppercase tracking-luxury text-gold">
                  {product.collection}
                </p>
                <h3 className="mt-3 font-display text-3xl font-light">
                  {product.name}
                </h3>
                <p className="mt-3 font-display text-2xl">
                  {formatPrice(product.price)}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-wide-lux text-gold">
                  Inclusive of GST
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>

                <div className="mt-6">
                  <span className="text-[10px] uppercase tracking-luxury text-muted-foreground">
                    Colour — {activeColor}
                  </span>
                  <div className="mt-3 flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setColor(c.name)}
                        aria-label={c.name}
                        className={cn(
                          'size-7 rounded-full border transition-all',
                          activeColor === c.name
                            ? 'border-gold ring-1 ring-gold ring-offset-2 ring-offset-background'
                            : 'border-border',
                        )}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    addItem(product, activeColor)
                    onClose()
                  }}
                  className="mt-8 bg-primary py-4 text-xs uppercase tracking-luxury text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Add to Bag
                </button>
                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="mt-3 text-center text-xs uppercase tracking-wide-lux text-muted-foreground link-underline"
                >
                  View full details
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
