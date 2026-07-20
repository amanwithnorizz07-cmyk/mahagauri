'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice, type Product } from '@/lib/products'
import { useStore } from '@/lib/store'

export function ProductCard({
  product,
  onQuickView,
  index = 0,
}: {
  product: Product
  onQuickView?: (product: Product) => void
  index?: number
}) {
  const wishlist = useStore((s) => s.wishlist)
  const toggleWishlist = useStore((s) => s.toggleWishlist)
  const wished = wishlist.includes(product.id)

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
          />
          <Image
            src={product.hoverImage || product.image || '/placeholder.svg'}
            alt={`${product.name} styled`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
          />

          {product.badge && (
            <span
              className={cn(
                'absolute left-4 top-4 px-3 py-1 text-[10px] uppercase tracking-luxury',
                product.badge === 'Limited'
                  ? 'bg-[#0A0A0A] text-[#F9F7F3]'
                  : 'bg-gold text-[#0A0A0A]',
              )}
            >
              {product.badge}
            </span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault()
              toggleWishlist(product.id)
            }}
            aria-label="Add to wishlist"
            className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full glass transition-transform hover:scale-110"
          >
            <Heart
              className={cn('size-4', wished && 'fill-gold text-gold')}
              strokeWidth={1.4}
            />
          </button>

          {onQuickView && (
            <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  onQuickView(product)
                }}
                className="flex w-full items-center justify-center gap-2 bg-[#F9F7F3]/95 py-3 text-[10px] uppercase tracking-luxury text-[#0A0A0A] backdrop-blur transition-colors hover:bg-[#F9F7F3]"
              >
                <Eye className="size-3.5" strokeWidth={1.4} />
                Quick View
              </button>
            </div>
          )}
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-wide-lux text-muted-foreground">
            {product.collection}
          </p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="mt-1 font-display text-lg leading-tight">
              {product.name}
            </h3>
          </Link>
        </div>
        <p className="whitespace-nowrap font-display text-lg">
          {formatPrice(product.price)}
        </p>
      </div>
      <div className="mt-2 flex gap-1.5">
        {product.colors.map((c) => (
          <span
            key={c.name}
            title={c.name}
            className="size-3 rounded-full border border-border"
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </motion.article>
  )
}
