import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { SolutionSection } from "@/components/solution-section"
import { ProcessSection } from "@/components/process-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { PricingSection } from "@/components/pricing-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { AuditModalProvider } from "@/components/audit-modal-provider"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "LeadFlow Performance",
  url: "https://leadflow-performance.cz",
  email: "info@leadflow-performance.cz",
  telephone: "+420773299233",
  description:
    "Optimalizace landing pages a konverzní strategie pro montážní firmy v oboru fotovoltaiky, tepelných čerpadel a klimatizací. Zvyšujeme počet poptávek z Google Ads.",
  areaServed: {
    "@type": "Country",
    name: "Česká republika",
  },
  serviceType: [
    "Optimalizace landing pages",
    "Konverzní optimalizace",
    "Google Ads optimalizace",
    "Server-side tracking",
    "A/B testování",
  ],
  priceRange: "od 39 000 Kč",
  sameAs: [],
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Jak rychle uvidím výsledky optimalizace landing page?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bezplatný audit doručíme do 48 hodin. Po nasazení optimalizované landing page obvykle vidíte první zlepšení konverzního poměru během 2\u20134 týdnů, v závislosti na objemu provozu z Google Ads.",
      },
    },
    {
      "@type": "Question",
      name: "Pro koho jsou vaše služby určeny?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Specializujeme se na montážní a instalační firmy v oboru fotovoltaiky, tepelných čerpadel a klimatizací, které investují do Google Ads a chtějí z každé koruny získat více poptávek.",
      },
    },
    {
      "@type": "Question",
      name: "Co zahrnuje bezplatný audit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Audit zahrnuje analýzu rychlosti načítání (Core Web Vitals), kontrolu konverzní cesty, revizi měření konverzí v Google Ads a GA4 a srovnání s konkurencí. Výstupem je konkrétní zpráva s prioritizovanými doporučeními.",
      },
    },
    {
      "@type": "Question",
      name: "Kolik stojí optimalizace landing page?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nabízíme dva balíčky: Performance Landing Page od 39 000 Kč a Kompletní konverzní optimalizaci od 59 000 Kč. Kompletní balíček zahrnuje A/B testování, server-side tracking a průběžnou optimalizaci po dobu 3 měsíců.",
      },
    },
  ],
}

export default function Page() {
  return (
    <AuditModalProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ProcessSection />
        <SocialProofSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </AuditModalProvider>
  )
}
