'use client'

import { ArrowRight } from "lucide-react"
import { openAuditModal } from "@/components/audit-modal-provider"

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-32"
      aria-labelledby="hero-heading"
    >
      {/* Warm ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, #C8792E10, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1
            id="hero-heading"
            className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            {"Získejte více poptávek z\u00A0Google Ads. Bez navýšení rozpočtu."}
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
            Optimalizujeme landing pages pro montážní firmy tak, aby kliknutí skutečně končila poptávkou.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => openAuditModal()}
              className="inline-flex items-center gap-2.5 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
            >
              Chci bezplatný audit
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <a
              href="#process"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent"
            >
              Jak to funguje
            </a>
          </div>
        </div>

        {/* Positioning block */}
        <div className="mx-auto mt-20 max-w-2xl rounded-xl border border-border bg-card p-8 text-center shadow-sm lg:p-10">
          <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
            Nejsme marketingová agentura. Neprodáváme kampaně.{" "}
            <span className="font-semibold text-foreground">
              Opravujeme to, co vám brání získávat více poptávek.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
