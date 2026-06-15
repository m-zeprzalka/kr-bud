import Image from "next/image";
import { Plus } from "lucide-react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { services, type Service } from "@/lib/site-config";

function ServiceRow({ service, imageFirst }: { service: Service; imageFirst: boolean }) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Obraz */}
      <Reveal
        className={`lg:col-span-6 ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
      >
        <figure className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted lg:aspect-[4/5]">
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
          />
          <figcaption className="absolute left-3 top-3 rounded-sm bg-background/90 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-foreground backdrop-blur">
            {service.index} · {service.title}
          </figcaption>
        </figure>
      </Reveal>

      {/* Treść */}
      <div
        className={`lg:col-span-6 ${imageFirst ? "lg:order-2" : "lg:order-1"}`}
      >
        <Reveal>
          <div className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-px w-8 bg-brand" aria-hidden="true" />
            <span className="tnum text-foreground">{service.index}</span>
            <span>Zakres</span>
          </div>
          <h3 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {service.title}
          </h3>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            {service.lead}
          </p>
        </Reveal>

        <ul className="mt-8 border-t border-border">
          {service.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 70}>
              <li className="group flex gap-4 border-b border-border py-5 transition-colors hover:bg-secondary/60">
                <Plus
                  className="mt-1 size-4 shrink-0 text-foreground/40 transition-colors group-hover:text-brand"
                  aria-hidden="true"
                />
                <div>
                  <h4 className="font-display text-lg font-semibold tracking-tight">
                    {item.name}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="uslugi" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <Eyebrow>Usługi</Eyebrow>
          <h2 className="mt-6 max-w-2xl text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Wykończenia wnętrz i brukarstwo w Puławach.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Działamy w Puławach i okolicy do 100 km. Dwa rzemiosła, jeden standard
            wykonania — z pełną, pisemną gwarancją.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20 lg:mt-20 lg:gap-28">
          {services.map((service, i) => (
            <ServiceRow key={service.id} service={service} imageFirst={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
