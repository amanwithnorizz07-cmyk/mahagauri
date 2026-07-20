'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { formatPrice, getProduct } from '@/lib/products'
import { useStore } from '@/lib/store'

export default function ProductPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug
  const product = useMemo(() => (slug ? getProduct(slug) : null), [slug])
  const addItem = useStore((s) => s.addItem)
  const [color, setColor] = useState<string | null>(null)

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-36 text-center md:px-10 md:pt-44">
        <p className="text-sm uppercase tracking-wide-lux text-muted-foreground">
          Product not found
        </p>
      </div>
    )
  }

  const activeColor = color ?? product.color

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-36 md:px-10 md:pt-44">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-[10px] uppercase tracking-luxury text-gold">
            {product.collection}
          </p>
          <h1 className="mt-3 font-display text-4xl font-light md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-6 flex items-end justify-between gap-3 border-b border-border pb-6">
            <div>
              <p className="font-display text-3xl">{formatPrice(product.price)}</p>
              <p className="mt-2 text-[11px] uppercase tracking-wide-lux text-gold">
                Inclusive of GST
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Free shipping across India · COD available
            </p>
          </div>

          <div className="mt-6">
            <span className="text-[10px] uppercase tracking-luxury text-muted-foreground">
              Colour — {activeColor}
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  className={`size-8 rounded-full border transition-all ${
                    activeColor === c.name
                      ? 'border-gold ring-1 ring-gold ring-offset-2 ring-offset-background'
                      : 'border-border'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => addItem(product, activeColor)}
              className="bg-primary px-6 py-3 text-xs uppercase tracking-luxury text-primary-foreground"
            >
              Add to Bag
            </button>
            <Link
              href="/checkout"
              className="border border-border px-6 py-3 text-xs uppercase tracking-luxury text-foreground"
            >
              Buy Now
            </Link>
          </div>

          <div className="mt-8 rounded-2xl border border-border p-5 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Craftsmanship</p>
            <ul className="mt-3 space-y-2">
              {product.details.map((detail) => (
                <li key={detail}>• {detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
