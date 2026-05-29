import { FileSignature, CalendarCheck, Sparkles, Calculator } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

type Reason = {
  index: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const reasons: Reason[] = [
  {
    index: "01",
    icon: FileSignature,
    title: "Bezpieczeństwo",
    description: "Pisemna gwarancja na każdą wykonaną usługę.",
  },
  {
    index: "02",
    icon: CalendarCheck,
    title: "Terminowość",
    description: "Szanujemy ustalony kalendarz prac i dotrzymujemy terminów.",
  },
  {
    index: "03",
    icon: Sparkles,
    title: "Porządek",
    description: "Czystość na każdym etapie — od pierwszej gładzi po ostatnią kostkę.",
  },
  {
    index: "04",
    icon: Calculator,
    title: "Bezpłatna wycena",
    description: "Przyjedziemy, doradzimy i przygotujemy kosztorys bez zobowiązań.",
  },
];

export function WhyUs() {
  return (
    <section className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <Eyebrow>Dlaczego my</Eyebrow>
          <h2 className="mt-6 max-w-2xl text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Dlaczego klienci wybierają właśnie nas.
          </h2>
        </Reveal>

        <Reveal>
          <div className="mt-14 grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => (
              <article
                key={reason.index}
                className="flex flex-col gap-5 border-b border-r border-border bg-background p-6 lg:p-8"
              >
                <div className="flex items-center justify-between">
                  <reason.icon className="size-6 text-foreground" aria-hidden="true" />
                  <span className="tnum font-mono text-xs text-muted-foreground">
                    {reason.index}
                  </span>
                </div>
                <div className="mt-2">
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
