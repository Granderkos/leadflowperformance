'use client'

import { useEffect, useMemo, useState } from 'react'
import { X } from 'lucide-react'

type AuditFormState = {
  name: string
  email: string
  website: string
  adsBudget: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function AuditModal({ isOpen, onClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState<AuditFormState>({
    name: '',
    email: '',
    website: '',
    adsBudget: '',
  })

  const selectedPackage = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return window.localStorage.getItem('selectedPackage') ?? ''
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    setIsSuccess(false)
    setError(null)
  }, [isOpen])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          selectedPackage: selectedPackage || 'nezvoleno',
          timestamp: new Date().toISOString(),
        }),
      })

      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || 'Request failed')
      }

      setIsSuccess(true)
      setForm({ name: '', email: '', website: '', adsBudget: '' })
      try {
        window.localStorage.removeItem('selectedPackage')
      } catch {}
    } catch (err: any) {
      setError(err?.message ?? 'Něco se pokazilo. Zkuste to prosím znovu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Bezplatný audit"
      onMouseDown={(e) => {
        // close only when clicking backdrop
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="mx-auto w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-foreground">Získejte bezplatný audit do 48 hodin</h3>
            <p className="mt-1 text-sm text-muted-foreground">Bez závazků. Pošlete URL a pošleme vám konkrétní body ke zlepšení.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="Zavřít"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/*
          Nezobrazujeme vybraný balíček návštěvníkovi.
          Ukládá se tiše a posílá se pouze do emailu pro kvalifikaci leadu.
        */}

        {isSuccess ? (
          <div className="mt-6 rounded-xl border border-border bg-background p-4">
            <p className="text-sm font-semibold text-foreground">Děkujeme. Audit obdržíte do 48 hodin.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Pokud chcete, můžete doplnit další info odpovědí na potvrzovací email.
            </p>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90"
              >
                Zavřít
              </button>
            </div>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="text-sm font-medium text-foreground">Jméno *</label>
              <input
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background focus:ring-2 focus:ring-primary/30"
                required
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                autoComplete="name"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Email *</label>
              <input
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background focus:ring-2 focus:ring-primary/30"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                autoComplete="email"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">URL webu *</label>
              <input
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background focus:ring-2 focus:ring-primary/30"
                required
                placeholder="https://..."
                value={form.website}
                onChange={(e) => setForm((s) => ({ ...s, website: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Měsíční rozpočet Google Ads (volitelně)</label>
              <input
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background focus:ring-2 focus:ring-primary/30"
                placeholder="např. 50 000 Kč"
                value={form.adsBudget}
                onChange={(e) => setForm((s) => ({ ...s, adsBudget: e.target.value }))}
              />
            </div>

            {error ? (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Odesílám…' : 'Chci bezplatný audit'}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Odesláním souhlasíte, že vás můžeme kontaktovat zpět k auditu.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
