'use client'

import { Check, ArrowRight } from "lucide-react"
import { openAuditModal } from "@/components/audit-modal-provider"

export function AuditCardsSection() {
  return (
    <section id="audit" className="py-20 lg:py-28" aria-labelledby="audit-heading">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            Jak začít
          </p>
          <h2 id="audit-heading" className="mt-4 text-balance text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            Zjistěte, co brzdí vaše konverze
          </h2>
        </div>

        <div className="mx-auto mt-16 flex max-w-3xl flex-col gap-6">
          {/* Card 1 - Free First Finding */}
          <div className="rounded-xl border border-primary/30 bg-card p-8 shadow-sm ring-1 ring-primary/10 lg:p-10">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Zdarma
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                První konkrétní zjištění zdarma
              </h3>
            </div>

            <ul className="mt-6 flex flex-col gap-3">
              {[
                "Identifikace jednoho klíčového problému",
                "Stručné vysvětlení dopadu",
                "Doporučení dalšího postupu",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10" aria-hidden="true">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-muted-foreground">
              Bez závazků. Výsledek obvykle do 48 hodin.
            </p>

            <button
              type="button"
              onClick={() => openAuditModal()}
              className="mt-6 inline-flex items-center gap-2.5 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
            >
              Získat první zjištění zdarma
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Card 2 - Full Audit */}
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm lg:p-10">
            <h3 className="text-lg font-semibold text-foreground">
              Kompletní audit webu
            </h3>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Analýza rychlosti (Core Web Vitals)",
                "Kontrola struktury stránky",
                "Revize CTA a formulářů",
                "Mobilní použitelnost",
                "Kontrola měření konverzí",
                "Prioritní seznam úprav",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10" aria-hidden="true">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold tracking-tight text-foreground">
                  2 000 Kč
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Cena se odečítá z následné realizace.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
