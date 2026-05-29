import { Phone, Mail, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site-config";

const details = [
  {
    icon: Phone,
    label: "Telefon",
    value: siteConfig.contact.phoneDisplay,
    href: siteConfig.contact.phoneHref,
  },
  {
    icon: Mail,
    label: "E-mail",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: MapPin,
    label: "Obszar działania",
    value: siteConfig.contact.area,
    href: null,
  },
];

export function ContactCta() {
  return (
    <section
      id="kontakt"
      className="scroll-mt-20 bg-primary text-primary-foreground [--ring:var(--primary-foreground)]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-14">
          {/* Lewa kolumna — wezwanie */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground/60">
                <span className="h-px w-8 bg-brand" aria-hidden="true" />
                Kontakt
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
                Zacznijmy współpracę
                <br />
                już dziś.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-primary-foreground/80">
                Zadzwoń i zapytaj o wolny termin. Chętnie odpowiemy na wszystkie
                pytania, przyjedziemy, doradzimy i przygotujemy kosztorys — bez
                żadnych zobowiązań.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="brand" size="xl">
                  <a href={siteConfig.contact.phoneHref}>
                    <Phone className="size-4" aria-hidden="true" />
                    Zadzwoń teraz
                  </a>
                </Button>
                <Button asChild variant="inverse" size="xl">
                  <a href={`mailto:${siteConfig.contact.email}`}>
                    <Mail className="size-4" aria-hidden="true" />
                    Napisz e-mail
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Prawa kolumna — dane */}
          <Reveal delay={200} className="lg:col-span-5">
            <dl className="border-t border-primary-foreground/20">
              {details.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-center gap-4 border-b border-primary-foreground/20 py-6"
                >
                  <detail.icon
                    className="size-5 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <dt className="font-mono text-xs uppercase tracking-[0.18em] text-primary-foreground/60">
                      {detail.label}
                    </dt>
                    <dd className="mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="break-words underline-offset-4 transition-colors hover:text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-primary"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <span className="break-words">{detail.value}</span>
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
