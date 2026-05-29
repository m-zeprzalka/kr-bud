import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const points = [
  "Pisemna gwarancja na każdą wykonaną usługę.",
  "Pewność umiejętności i odpowiedzialność za efekt końcowy.",
];

export function Guarantee() {
  return (
    <section id="gwarancja" className="scroll-mt-20 bg-brand text-brand-foreground">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-brand-foreground/70">
                <span className="h-px w-8 bg-brand-foreground" aria-hidden="true" />
                Gwarancja
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
                Bierzemy pełną odpowiedzialność za efekt końcowy.
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pt-2">
            <Reveal delay={120}>
              <ShieldCheck className="size-8" aria-hidden="true" />
              <p className="mt-6 text-lg leading-relaxed text-brand-foreground/90">
                Wierzymy w to, co robimy — dlatego nie znikamy po wystawieniu
                rachunku. Wybierając nas, inwestujesz w święty spokój na lata.
              </p>
              <ul className="mt-8 overflow-hidden rounded-sm border border-brand-foreground/20">
                {points.map((point) => (
                  <li
                    key={point}
                    className="border-t border-brand-foreground/20 px-5 py-4 text-sm font-medium leading-relaxed first:border-t-0"
                  >
                    {point}
                  </li>
                ))}
              </ul>
              <Button asChild variant="default" size="lg" className="mt-8">
                <a href="#kontakt">Umów bezpłatną wycenę</a>
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
