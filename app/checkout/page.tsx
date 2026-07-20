'use client'

import Link from 'next/link'
import { formatPrice } from '@/lib/products'
import { useCartTotal, useStore } from '@/lib/store'

export default function CheckoutPage() {
  const items = useStore((s) => s.items)
  const subtotal = useCartTotal()
  const shipping = subtotal >= 25000 ? 0 : 199
  const gst = Math.round(subtotal * 0.18)
  const total = subtotal + shipping + gst

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-5 pb-24 pt-36 text-center md:px-10 md:pt-44">
        <p className="text-sm uppercase tracking-wide-lux text-muted-foreground">
          Your bag is empty
        </p>
        <Link href="/shop" className="mt-6 inline-block bg-primary px-6 py-3 text-xs uppercase tracking-luxury text-primary-foreground">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-36 md:px-10 md:pt-44">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-border p-6 md:p-8">
          <p className="text-[10px] uppercase tracking-luxury text-gold">Checkout</p>
          <h1 className="mt-3 font-display text-3xl md:text-4xl">Secure checkout for India</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Pay with UPI, Razorpay, PhonePe, Google Pay, Paytm, debit or credit cards, or net banking.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <label className="text-sm">
              <span className="mb-2 block text-[10px] uppercase tracking-wide-lux text-muted-foreground">Full name</span>
              <input className="w-full border border-border bg-transparent px-3 py-3 text-sm outline-none" placeholder="Aarav Sharma" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block text-[10px] uppercase tracking-wide-lux text-muted-foreground">Mobile number</span>
              <input className="w-full border border-border bg-transparent px-3 py-3 text-sm outline-none" placeholder="+91 98765 43210" />
            </label>
            <label className="text-sm md:col-span-2">
              <span className="mb-2 block text-[10px] uppercase tracking-wide-lux text-muted-foreground">Delivery address</span>
              <textarea className="min-h-24 w-full border border-border bg-transparent px-3 py-3 text-sm outline-none" placeholder="House number, street, locality" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block text-[10px] uppercase tracking-wide-lux text-muted-foreground">PIN Code</span>
              <input className="w-full border border-border bg-transparent px-3 py-3 text-sm outline-none" placeholder="110001" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block text-[10px] uppercase tracking-wide-lux text-muted-foreground">State</span>
              <input className="w-full border border-border bg-transparent px-3 py-3 text-sm outline-none" placeholder="Delhi" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block text-[10px] uppercase tracking-wide-lux text-muted-foreground">Country</span>
              <select className="w-full border border-border bg-background px-3 py-3 text-sm outline-none" defaultValue="India">
                <option>India</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block text-[10px] uppercase tracking-wide-lux text-muted-foreground">Preferred payment method</span>
              <select className="w-full border border-border bg-background px-3 py-3 text-sm outline-none">
                <option>UPI</option>
                <option>Razorpay</option>
                <option>PhonePe</option>
                <option>Google Pay</option>
                <option>Paytm</option>
                <option>Debit/Credit Card</option>
                <option>Net Banking</option>
              </select>
            </label>
          </div>
        </div>

        <div className="rounded-3xl border border-border p-6 md:p-8">
          <p className="text-[10px] uppercase tracking-luxury text-gold">Order summary</p>
          <div className="mt-6 space-y-3">
            {items.map((item) => (
              <div key={`${item.id}-${item.color}`} className="flex items-center justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>GST</span>
              <span>{formatPrice(gst)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 font-display text-xl">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <button className="mt-8 w-full bg-primary py-3 text-xs uppercase tracking-luxury text-primary-foreground">
            Place Order
          </button>
          <p className="mt-3 text-center text-[10px] uppercase tracking-wide-lux text-muted-foreground">
            Express delivery in metro cities · Cash on delivery available
          </p>
        </div>
      </div>
    </div>
  )
}
