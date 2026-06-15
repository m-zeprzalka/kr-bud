import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/blocks/site-header";
import { SiteFooter } from "@/components/blocks/site-footer";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Wykończenia wnętrz i brukarstwo Puławy — KR-BUD",
    template: "%s · KR-BUD",
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  keywords: [
    "wykończenia wnętrz Puławy",
    "usługi budowlane Puławy",
    "brukarstwo Puławy",
    "układanie kostki brukowej Puławy",
    "kostka brukowa Puławy",
    "remonty Puławy",
    "gładzie Puławy",
    "malowanie Puławy",
    "sufity podwieszane Puławy",
    "panele podłogowe Puławy",
    "wykończenia wnętrz",
    "brukarstwo",
    "KR-BUD",
    "województwo lubelskie",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: "KR-BUD — wykończenia wnętrz i brukarstwo w Puławach",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KR-BUD — wykończenia wnętrz i brukarstwo w Puławach",
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fefdfb" },
    { media: "(prefers-color-scheme: dark)", color: "#131211" },
  ],
};

const { people, location } = siteConfig.contact;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": siteConfig.url,
  name: siteConfig.legalName,
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}/opengraph-image`,
  slogan: siteConfig.tagline,
  telephone: people[0].phoneHref.replace("tel:", ""),
  email: people[0].email,
  address: {
    "@type": "PostalAddress",
    addressLocality: location.city,
    postalCode: location.postalCode,
    addressRegion: location.region,
    addressCountry: location.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: location.lat,
    longitude: location.lng,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: location.lat,
      longitude: location.lng,
    },
    geoRadius: 100000,
  },
  contactPoint: people.map((p) => ({
    "@type": "ContactPoint",
    telephone: p.phoneHref.replace("tel:", ""),
    email: p.email,
    contactType: "sales",
    name: `${p.name} — ${p.role}`,
    areaServed: "PL",
    availableLanguage: "pl",
  })),
  knowsAbout: [
    "Wykończenia wnętrz",
    "Systemy GK",
    "Gładzie i szpachlowanie",
    "Malowanie",
    "Panele podłogowe",
    "Brukarstwo",
    "Układanie kostki brukowej",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pl"
      suppressHydrationWarning
      className={`${inter.variable} ${display.variable} ${mono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          {/* Bez JS: pokaż wszystkie animowane bloki od razu */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col bg-background font-sans text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only z-50 rounded-sm bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Przejdź do treści
          </a>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
