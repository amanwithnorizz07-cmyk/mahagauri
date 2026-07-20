'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products, collectionNames, type Product } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { QuickView } from '@/components/quick-view'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
] as const

type SortValue = (typeof sortOptions)[number]['value']

const filters = ['All', ...collectionNames]

export function ShopView() {
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [sort, setSort] = useState<SortValue>('featured')
  const [quickView, setQuickView] = useState<Product | null>(null)

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) => activeFilter === 'All' || p.collection === activeFilter,
    )
    list = [...list]
    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        list.sort((a, b) => Number(b.badge === 'New') - Number(a.badge === 'New'))
        break
      default:
        list.sort(
          (a, b) =>
            Number(b.badge === 'Bestseller') - Number(a.badge === 'Bestseller'),
        )
    }
    return list
  }, [activeFilter, sort])

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-32 pt-36 md:px-10 md:pt-44">
      <Reveal>
        <p className="text-center text-[11px] uppercase tracking-widest-lux text-gold">
          The Maison
        </p>
        <h1 className="mt-4 text-center font-serif text-5xl font-light tracking-tight md:text-7xl">
          The Collection
        </h1>
        <p className="mx-auto mt-5 max-w-md text-center text-sm leading-relaxed text-muted-foreground">
          Each piece is cut, stitched, and finished by hand in our atelier. Explore the
          house in full.
        </p>
      </Reveal>

      <div className="mt-14 flex flex-col items-center justify-between gap-6 border-b border-border pb-6 md:flex-row">
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              data-cursor="hover"
              className={cn(
                'relative text-[12px] uppercase tracking-wide-lux transition-colors',
                activeFilter === f
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {f}
              {activeFilter === f && (
                <motion.span
                  layoutId="shop-cat"
                  className="absolute -bottom-1.5 left-0 h-px w-full bg-gold"
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] uppercase tracking-wide-lux text-muted-foreground">
            Sort
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortValue)}
            data-cursor="hover"
            className="cursor-pointer border-b border-border bg-transparent pb-1 text-[12px] uppercase tracking-wide-lux text-foreground outline-none"
          >
            {sortOptions.map((o) => (
              <option
                key={o.value}
                value={o.value}
                className="bg-background text-foreground"
              >
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 text-[11px] uppercase tracking-wide-lux text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? 'Piece' : 'Pieces'}
      </div>

      <motion.div
        layout
        className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                duration: 0.5,
                delay: (i % 4) * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProductCard product={product} index={i} onQuickView={setQuickView} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </div>
  )
}
