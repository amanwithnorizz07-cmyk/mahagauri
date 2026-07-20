'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Apple, Google } from 'lucide-react'
import { Button } from '@/components/ui/button'

type FormState = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirm: string
  terms: boolean
}

export function SignupForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
    terms: false,
  })
  const [showPwd, setShowPwd] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const strength = useMemo(() => {
    const p = form.password
    let score = 0
    if (p.length >= 8) score += 1
    if (/[A-Z]/.test(p)) score += 1
    if (/[0-9]/.test(p)) score += 1
    if (/[^A-Za-z0-9]/.test(p)) score += 1
    return Math.min(4, score)
  }, [form.password])

  useEffect(() => {
    const e: Record<string, string> = {}
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email.'
    if (form.password && form.password.length < 8) e.password = 'Password must be 8+ characters.'
    if (form.confirm && form.confirm !== form.password) e.confirm = 'Passwords do not match.'
    setErrors(e)
  }, [form.email, form.password, form.confirm])

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((s) => ({ ...s, [k]: v }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!form.firstName) newErrors.firstName = 'Required.'
    if (!form.lastName) newErrors.lastName = 'Required.'
    if (!form.email) newErrors.email = 'Required.'
    if (!form.password) newErrors.password = 'Required.'
    if (form.password !== form.confirm) newErrors.confirm = 'Passwords must match.'
    if (!form.terms) newErrors.terms = 'You must accept the terms.'
    setErrors(newErrors)
    if (Object.keys(newErrors).length) return

    setSubmitting(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 900))
    setSubmitting(false)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="grid grid-cols-2 gap-6">
        <label className="block">
          <span className="sr-only">First name</span>
          <input
            aria-label="First name"
            value={form.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            placeholder="First name"
            className="bg-transparent font-display text-lg placeholder:text-muted w-full border-b border-border py-4 outline-none focus:border-gold focus:pb-3 transition-all"
          />
          {errors.firstName && <span className="mt-2 text-sm text-red-600">{errors.firstName}</span>}
        </label>

        <label className="block">
          <span className="sr-only">Last name</span>
          <input
            aria-label="Last name"
            value={form.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            placeholder="Last name"
            className="bg-transparent font-display text-lg placeholder:text-muted w-full border-b border-border py-4 outline-none focus:border-gold focus:pb-3 transition-all"
          />
          {errors.lastName && <span className="mt-2 text-sm text-red-600">{errors.lastName}</span>}
        </label>
      </div>

      <label className="block mt-8">
        <span className="sr-only">Email address</span>
        <input
          aria-label="Email address"
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="Email address"
          className="bg-transparent font-display text-lg placeholder:text-muted w-full border-b border-border py-4 outline-none focus:border-gold focus:pb-3 transition-all"
        />
        {errors.email && <span className="mt-2 text-sm text-red-600">{errors.email}</span>}
      </label>

      <div className="mt-8 grid gap-6">
        <label className="relative block">
          <span className="sr-only">Password</span>
          <input
            aria-label="Password"
            type={showPwd ? 'text' : 'password'}
            value={form.password}
            onChange={(e) => update('password', e.target.value)}
            placeholder="Password"
            className="bg-transparent font-display text-lg placeholder:text-muted w-full border-b border-border py-4 outline-none focus:border-gold focus:pb-3 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPwd((s) => !s)}
            aria-label={showPwd ? 'Hide password' : 'Show password'}
            className="absolute right-0 top-3 inline-flex items-center justify-center p-2 text-muted"
          >
            {showPwd ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
          {errors.password && <span className="mt-2 text-sm text-red-600">{errors.password}</span>}
          <div className="mt-3 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={false}
                animate={{ width: `${(strength / 4) * 100}%` }}
                className="h-2 bg-gold"
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-xs text-muted">{['Weak', 'Fair', 'Good', 'Strong'][Math.max(0, strength - 1)] ?? 'Very weak'}</span>
          </div>
        </label>

        <label className="block">
          <span className="sr-only">Confirm password</span>
          <input
            aria-label="Confirm password"
            type={showPwd ? 'text' : 'password'}
            value={form.confirm}
            onChange={(e) => update('confirm', e.target.value)}
            placeholder="Confirm password"
            className="bg-transparent font-display text-lg placeholder:text-muted w-full border-b border-border py-4 outline-none focus:border-gold focus:pb-3 transition-all"
          />
          {errors.confirm && <span className="mt-2 text-sm text-red-600">{errors.confirm}</span>}
        </label>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id="terms"
          aria-label="Accept terms"
          type="checkbox"
          checked={form.terms}
          onChange={(e) => update('terms', e.target.checked)}
          className="mt-1 h-4 w-4 accent-gold"
        />
        <label htmlFor="terms" className="text-sm text-muted">
          I agree to the <a className="text-gold underline" href="/terms">Terms & Conditions</a> and <a className="text-gold underline" href="/privacy">Privacy Policy</a>.
        </label>
      </div>
      {errors.terms && <div className="mt-2 text-sm text-red-600">{errors.terms}</div>}

      <div className="mt-8">
        <Button
          type="submit"
          className="w-full bg-foreground text-background h-14 text-sm font-medium transition-transform duration-600 hover:brightness-105 hover:shadow-luxury"
          disabled={submitting}
        >
          {submitting ? 'Creating…' : 'CREATE ACCOUNT'}
        </Button>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <span className="text-sm text-muted">or continue with</span>
        <div className="flex w-full gap-3">
          <button
            type="button"
            aria-label="Continue with Google"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-md border border-border bg-transparent py-3 text-sm"
          >
            <Google className="size-4" />
            <span>Continue with Google</span>
          </button>
          <button
            type="button"
            aria-label="Continue with Apple"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-transparent px-4 py-3 text-sm"
          >
            <Apple className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted">Already have an account? </span>
        <a href="/account" className="text-gold link-underline">Sign In</a>
      </div>
    </form>
  )
}
