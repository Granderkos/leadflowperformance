import {
  Gauge,
  MousePointerClick,
  FormInput,
  BarChart3,
  ListChecks,
} from "lucide-react"

const auditItems = [
  {
    icon: Gauge,
    text: "Analýza rychlosti (Core Web Vitals)",
  },
  {
    icon: MousePointerClick,
    text: "Rozbor hero sekce a CTA",
  },
  {
    icon: FormInput,
    text: "Kontrola formuláře a konverzního tření",
  },
  {
    icon: BarChart3,
    text: "Ověření Google Ads a GA4 měření",
  },
  {
    icon: ListChecks,
    text: "Prioritní seznam konkrétních úprav",
  },
]

export function SocialProofSection() {
  return (
    <section className="bg-card py-20 lg:py-28" aria-labelledby="audit-heading">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            Bezplatný audit
          </p>
          <h2 id="audit-heading" className="mt-4 text-balance text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            Co obsahuje audit zdarma
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <ul className="flex flex-col gap-4" role="list">
            {auditItems.map((item) => (
              <li
                key={item.text}
                className="flex items-center gap-4 rounded-xl border border-border bg-background p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10" aria-hidden="true">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground lg:text-base">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Audit dostanete do 48 hodin. Bez závazků.
          </p>
        </div>
      </div>
    </section>
  )
}
