'use client'

import { ArrowRight, Shield, Clock } from "lucide-react"
import { openAuditModal } from "@/components/audit-modal-provider"

export function CtaSection() {
  return (
    <section id="cta" className="py-24 px-6 bg-muted/40">
      <div className="max-w-4xl mx-auto text-center bg-card rounded-2xl p-12 shadow-sm border">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Přestaňte pálit rozpočet na reklamu.
        </h2>

        <p className="text-muted-foreground mb-8 text-lg">
          Pošlete URL vašeho webu. Do 48 hodin získáte konkrétní rozbor,
          kde ztrácíte poptávky.
        </p>

        <button
          onClick={() =>
            window.dispatchEvent(new Event("open-audit-modal"))
          }
          className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-lg text-base font-medium hover:opacity-90 transition"
        >
          Získat první zjištění zdarma
        </button>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <span>Bez závazků</span>
          <span>Výsledky do 48 hodin</span>
        </div>
      </div>
    </section>
  )
}
