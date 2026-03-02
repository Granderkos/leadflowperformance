import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Audit webu",
    description:
      "Analyzujeme rychlost, strukturu a měření.",
  },
  {
    number: "02",
    title: "Prioritizace změn",
    description:
      "Navrhneme úpravy s největším dopadem na počet poptávek.",
  },
  {
    number: "03",
    title: "Implementace",
    description:
      "Navrhneme nebo upravíme landing page a tracking.",
  },
  {
    number: "04",
    title: "Měření a ladění",
    description:
      "Optimalizujeme podle dat, ne podle pocitu.",
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="py-20 lg:py-28" aria-labelledby="process-heading">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            Proces
          </p>
          <h2 id="process-heading" className="mt-4 text-balance text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            Jak probíhá optimalizace
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center text-center md:items-start md:text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10" aria-hidden="true">
                <span className="text-lg font-bold text-primary">
                  {step.number}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute top-6 left-[calc(50%+32px)] hidden h-px w-[calc(100%-64px)] md:block" aria-hidden="true">
                  <div className="h-full w-full border-t border-dashed border-border" />
                </div>
              )}
              <h3 className="mt-5 text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href="#cta"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Začít bezplatným auditem
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
