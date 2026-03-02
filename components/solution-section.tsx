import {
  Zap,
  LayoutDashboard,
  Smartphone,
  LineChart,
  TrendingUp,
} from "lucide-react"

const solutions = [
  {
    icon: Zap,
    title: "Optimalizace rychlosti",
    description:
      "Zaměřujeme se na Core Web Vitals, rychlé načítání a stabilní výkon.",
  },
  {
    icon: LayoutDashboard,
    title: "Konverzní struktura landing page",
    description:
      "Jedna hlavní akce. Jasné CTA. Struktura postavená na rozhodování zákazníka.",
  },
  {
    icon: Smartphone,
    title: "Mobilní konverzní flow",
    description:
      "Většina návštěv přichází z mobilu. Optimalizujeme formuláře i navigaci.",
  },
  {
    icon: LineChart,
    title: "Google Ads + GA4 tracking",
    description:
      "Správně nastavené měření leadů a událostí. Vidíte, co funguje.",
  },
  {
    icon: TrendingUp,
    title: "Lead generation bez navýšení rozpočtu",
    description:
      "Zvyšujeme efektivitu stávající návštěvnosti.",
  },
]

export function SolutionSection() {
  return (
    <section id="solution" className="bg-card py-20 lg:py-28" aria-labelledby="solution-heading">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            Řešení
          </p>
          <h2 id="solution-heading" className="mt-4 text-balance text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            Optimalizace konverzí pro montážní firmy
          </h2>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {solutions.map((item) => (
            <div
              key={item.title}
              role="listitem"
              className="group flex flex-col rounded-xl border border-border bg-background p-7 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10" aria-hidden="true">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
