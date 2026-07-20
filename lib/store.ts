'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from './products'

export type CartItem = {
  id: string
  slug: string
  name: string
  price: number
  image: string
  color: string
  quantity: number
}

type StoreState = {
  items: CartItem[]
  wishlist: string[]
  cartOpen: boolean
  addItem: (product: Product, color?: string, quantity?: number) => void
  removeItem: (id: string, color: string) => void
  updateQuantity: (id: string, color: string, quantity: number) => void
  clearCart: () => void
  toggleWishlist: (id: string) => void
  openCart: () => void
  closeCart: () => void
  setCartOpen: (open: boolean) => void
}

export const FREE_SHIPPING_THRESHOLD = 5000

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      items: [],
      wishlist: [],
      cartOpen: false,
      addItem: (product, color, quantity = 1) =>
        set((state) => {
          const selectedColor = color ?? product.color
          const key = product.id + selectedColor
          const existing = state.items.find(
            (i) => i.id + i.color === key,
          )
          if (existing) {
            return {
              cartOpen: true,
              items: state.items.map((i) =>
                i.id + i.color === key
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            }
          }
          return {
            cartOpen: true,
            items: [
              ...state.items,
              {
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.image,
                color: selectedColor,
                quantity,
              },
            ],
          }
        }),
      removeItem: (id, color) =>
        set((state) => ({
          items: state.items.filter((i) => !(i.id === id && i.color === color)),
        })),
      updateQuantity: (id, color, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id && i.color === color
                ? { ...i, quantity: Math.max(0, quantity) }
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),
      clearCart: () => set({ items: [] }),
      toggleWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((w) => w !== id)
            : [...state.wishlist, id],
        })),
      openCart: () => set({ cartOpen: true }),
      closeCart: () => set({ cartOpen: false }),
      setCartOpen: (open) => set({ cartOpen: open }),
    }),
    {
      name: 'mahagauri-store',
      partialize: (state) => ({ items: state.items, wishlist: state.wishlist }),
    },
  ),
)

export function useCartCount() {
  return useStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))
}

export function useCartTotal() {
  return useStore((s) => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0))
}
