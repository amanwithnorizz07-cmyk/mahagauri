'use client'

import Link from 'next/link'
import { formatPrice, getProduct } from '@/lib/products'
import { useStore } from '@/lib/store'

export default function WishlistPage() {
  const wishlist = useStore((s) => s.wishlist)
  const toggleWishlist = useStore((s) => s.toggleWishlist)

  if (wishlist.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-5 pb-24 pt-36 text-center md:px-10 md:pt-44">
        <p className="text-sm uppercase tracking-wide-lux text-muted-foreground">
          Your wishlist is empty
        </p>
        <Link href="/shop" className="mt-6 inline-block bg-primary px-6 py-3 text-xs uppercase tracking-luxury text-primary-foreground">
          Explore the collection
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-36 md:px-10 md:pt-44">
      <div className="flex items-end justify-between gap-3 border-b border-border pb-6">
        <div>
          <p className="text-[10px] uppercase tracking-luxury text-gold">Wishlist</p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl">Saved for later</h1>
        </div>
        <p className="text-sm text-muted-foreground">India-first delivery · GST inclusive</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {wishlist.map((id) => {
          const product = getProduct(id)
          if (!product) return null
          return (
            <div key={product.id} className="rounded-2xl border border-border p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wide-lux text-muted-foreground">{product.collection}</p>
                  <h2 className="mt-2 font-display text-xl">{product.name}</h2>
                </div>
                <button onClick={() => toggleWishlist(product.id)} className="text-sm uppercase tracking-wide-lux text-gold">
                  Remove
                </button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{product.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <p className="font-display text-2xl">{formatPrice(product.price)}</p>
                <Link href={`/product/${product.slug}`} className="text-xs uppercase tracking-luxury text-foreground">
                  View item
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
