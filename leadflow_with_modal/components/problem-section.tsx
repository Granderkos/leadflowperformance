import { Gauge, MousePointerClick, BarChart3 } from "lucide-react"

const problems = [
  {
    icon: Gauge,
    title: "Pomalý web stojí poptávky",
    description:
      "Každá sekunda navíc znamená vyšší odchody. Core Web Vitals rozhodují o výkonu.",
  },
  {
    icon: MousePointerClick,
    title: "Slabé výzvy k akci",
    description:
      "Nejasná struktura a špatně umístěné CTA znamenají ztracené leady.",
  },
  {
    icon: BarChart3,
    title: "Chybí měření konverzí",
    description:
      "Bez správného trackingu nevíte, které kampaně přinášejí skutečné zakázky.",
  },
]

export function ProblemSection() {
  return (
    <section id="problem" className="py-20 lg:py-28" aria-labelledby="problem-heading">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
          {/* Left heading */}
          <div className="shrink-0 lg:sticky lg:top-32 lg:w-[340px]">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">
              Problém
            </p>
            <h2
              id="problem-heading"
              className="mt-4 text-balance text-2xl font-bold leading-tight tracking-tight text-foreground lg:text-3xl"
            >
              Reklama vás stojí tisíce. Váš web poptávky ztrácí.
            </h2>
          </div>

          {/* Right cards */}
          <div className="flex flex-1 flex-col gap-4" role="list">
            {problems.map((item) => (
              <div
                key={item.title}
                role="listitem"
                className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20 lg:p-8"
              >
                <div className="flex gap-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10" aria-hidden="true">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
