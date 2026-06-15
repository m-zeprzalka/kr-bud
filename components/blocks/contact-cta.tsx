import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site-config";

const { people, area, location } = siteConfig.contact;

export function ContactCta() {
  return (
    <section
      id="kontakt"
      className="scroll-mt-20 bg-primary text-primary-foreground [--ring:var(--primary-foreground)]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-14">
          {/* Lewa kolumna — wezwanie */}
          <div className="lg:col-span-5">
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
              <p className="mt-8 max-w-md text-lg leading-relaxed text-primary-foreground/80">
                Zadzwoń bezpośrednio do specjalisty od interesującej Cię usługi —
                odpowiemy na pytania, przyjedziemy, doradzimy i przygotujemy
                kosztorys bez żadnych zobowiązań.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary-foreground/60">
                    Obszar działania
                  </div>
                  <div className="mt-1 font-display text-lg font-semibold tracking-tight">
                    {area}
                  </div>
                  <div className="text-sm text-primary-foreground/70">
                    {location.city} · {location.region}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Prawa kolumna — dwie karty kontaktowe */}
          <Reveal delay={200} className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {people.map((person) => (
                <div
                  key={person.email}
                  className="flex flex-col rounded-sm border border-primary-foreground/20 p-6"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary-foreground/70">
                    {person.role}
                  </span>
                  <span className="mt-3 font-display text-2xl font-bold tracking-tight">
                    {person.name}
                  </span>

                  <div className="mt-5 flex flex-col">
                    <a
                      href={person.phoneHref}
                      className="flex items-center gap-3 rounded-sm py-3 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                    >
                      <Phone className="size-4 shrink-0 text-brand" aria-hidden="true" />
                      <span className="tnum font-display text-lg font-semibold tracking-tight">
                        {person.phoneDisplay}
                      </span>
                    </a>

                    {person.whatsapp && (
                      <a
                        href={person.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-sm border-t border-primary-foreground/15 py-3 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                      >
                        <MessageCircle className="size-4 shrink-0 text-brand" aria-hidden="true" />
                        <span className="text-sm font-medium">WhatsApp</span>
                      </a>
                    )}

                    <a
                      href={`mailto:${person.email}`}
                      className="flex items-center gap-3 rounded-sm border-t border-primary-foreground/15 py-3 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                    >
                      <Mail className="size-4 shrink-0 text-brand" aria-hidden="true" />
                      <span className="break-all text-sm text-primary-foreground/80">
                        {person.email}
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
