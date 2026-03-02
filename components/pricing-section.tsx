'use client'

import { Check, ArrowRight } from "lucide-react"

const plans = [
  {
    name: "Performance Landing",
    price: "39 000 Kč",
    description: "",
    features: [
      "Landing page na míru",
      "Optimalizace rychlosti",
      "Mobilní responzivní struktura",
      "Základní nastavení konverzí",
    ],
  },
  {
    name: "Kompletní optimalizace",
    price: "59 000 Kč",
    highlight: true,
    description: "",
    features: [
      "Vše z Performance Landing",
      "A/B testování",
      "Pokročilý tracking",
      "3 měsíce průběžné optimalizace",
    ],
  },
]

export function PricingSection() {
  function handlePlanClick(pkg: '39k' | '59k') {
    try {
      window.localStorage.setItem('selectedPackage', pkg)
    } catch {}
  }
  return (
    <section id="pricing" className="py-20 lg:py-28" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            Ceník
          </p>
          <h2 id="pricing-heading" className="mt-4 text-balance text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            Transparentní ceník
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl border p-8 shadow-sm transition-all hover:shadow-md lg:p-10 ${
                plan.highlight
                  ? "border-primary/30 bg-card ring-1 ring-primary/10"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-8 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Doporučeno
                </span>
              )}

              <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-xs text-muted-foreground">od</span>
                <span className="text-3xl font-bold tracking-tight text-foreground">
                  {plan.price}
                </span>
              </div>

              <div className="my-8 h-px bg-border" role="separator" />

              <ul className="flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10" aria-hidden="true">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                onClick={() => handlePlanClick(plan.price.includes("39") ? '39k' : '59k')}
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg"
                    : "border border-border text-foreground hover:bg-accent hover:border-primary/20"
                }`}
              >
                Chci nabídku
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
