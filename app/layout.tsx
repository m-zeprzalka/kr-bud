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
    default: "KR-BUD — Wykończenia wnętrz i brukarstwo z gwarancją",
    template: "%s · KR-BUD",
  },
  description: siteConfig.description,
  keywords: [
    "wykończenia wnętrz",
    "brukarstwo",
    "układanie kostki brukowej",
    "gładzie",
    "malowanie",
    "sufity podwieszane",
    "panele podłogowe",
    "podjazd z kostki",
    "KR-BUD",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: "KR-BUD — Wykończenia wnętrz i brukarstwo",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "pl_PL",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fefdfb" },
    { media: "(prefers-color-scheme: dark)", color: "#131211" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: siteConfig.legalName,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.contact.phoneDisplay,
  email: siteConfig.contact.email,
  areaServed: siteConfig.contact.area,
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
