import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' })

export const viewport: Viewport = {
  themeColor: '#b06d2b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: 'LeadFlow Performance | Optimalizace landing pages pro více poptávek z Google Ads',
  description:
    'Tvoříme rychlé landing pages pro montážní firmy v oboru fotovoltaiky, tepelných čerpadel a klimatizací. Zvyšujeme konverzní poměr, snižujeme cenu za poptávku a nastavujeme přesné měření konverzí v Google Ads.',
  keywords: [
    'optimalizace landing pages',
    'Google Ads poptávky',
    'konverzní optimalizace',
    'landing page pro fotovoltaiku',
    'landing page pro tepelná čerpadla',
    'landing page pro klimatizace',
    'rychlý web',
    'server-side tracking',
    'A/B testování',
    'montážní firmy',
    'Core Web Vitals',
    'měření konverzí',
  ],
  authors: [{ name: 'LeadFlow Performance' }],
  creator: 'LeadFlow Performance',
  publisher: 'LeadFlow Performance',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: 'https://leadflow-performance.cz',
    siteName: 'LeadFlow Performance',
    title: 'LeadFlow Performance | Více poptávek z Google Ads díky rychlým landing pages',
    description:
      'Optimalizujeme landing pages pro montážní firmy. Rychlejší web, vyšší konverze, přesné měření. Bezplatný audit do 48 hodin.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeadFlow Performance | Více poptávek z Google Ads',
    description:
      'Rychlé landing pages, které proměňují prokliky na poptávky. Pro montážní firmy v ČR.',
  },
  alternates: {
    canonical: 'https://leadflow-performance.cz',
  },
  icons: {
    icon: "/images/icon.png",
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs" className={inter.variable}>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
        >
          {"Přeskočit na hlavní obsah"}
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
