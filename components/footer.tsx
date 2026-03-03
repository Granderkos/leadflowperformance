import { Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-12" role="contentinfo">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
                              <img
                  src="/images/logo.png"
                  alt="LeadFlow Performance"
                  className="h-15 w-auto"
                />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Zvyšujeme počet poptávek z Google Ads pro montážní firmy po celé ČR. Specializace: fotovoltaika, tepelná čerpadla, klimatizace.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Kontakt
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:info@leadflow-performance.cz"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  info@leadflow-performance.cz
                </a>
              </li>
              <li>
                <a
                  href="tel:+420773299233"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  +420 773 299 233
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Právní informace
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Zásady ochrany osobních údajů
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Obchodní podmínky
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            {`© ${new Date().getFullYear()} LeadFlow Performance Všechna práva vyhrazena.`}
          </p>
        </div>
      </div>
    </footer>
  )
}
