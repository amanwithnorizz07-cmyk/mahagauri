'use client'

import Link from 'next/link'
import { useState } from 'react'
import { products, type Product } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { QuickView } from '@/components/quick-view'
import { Reveal, TextReveal } from '@/components/reveal'

export function BestSellers() {
  const [quickView, setQuickView] = useState<Product | null>(null)
  const bestSellers = products.slice(0, 4)

  return (
    <section className="bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <Reveal>
              <span className="text-[11px] uppercase tracking-luxury text-gold">
                Most Coveted
              </span>
            </Reveal>
            <TextReveal
              as="h2"
              text="Best Sellers"
              className="mt-4 font-display text-4xl font-light md:text-6xl"
            />
          </div>
          <Reveal delay={0.15}>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-luxury link-underline"
            >
              View All Pieces
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4">
          {bestSellers.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onQuickView={setQuickView}
            />
          ))}
        </div>
      </div>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </section>
  )
}
