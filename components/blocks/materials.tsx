import Image from "next/image";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/site-config";

const points = [
  {
    index: "01",
    title: "Sprawdzone rozwiązania",
    description:
      "Pracujemy na materiałach renomowanych marek, które gwarantują najlepsze parametry techniczne i trwałość.",
  },
  {
    index: "02",
    title: "Twój wybór, nasza praca",
    description:
      "Jesteśmy w pełni otwarci na materiały dostarczone przez klienta. Cokolwiek wybierzesz — zamontujemy zgodnie ze sztuką budowlaną.",
  },
];

export function Materials() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <Reveal>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
            <Image
              src={images.paveStacks.src}
              alt={images.paveStacks.alt}
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
            <figcaption className="absolute left-3 top-3 rounded-sm bg-background/90 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-foreground backdrop-blur">
              Materiały · Kostka brukowa
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>Materiały</Eyebrow>
            <h2 className="mt-6 text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Elastyczność bez kompromisów.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
              Dopasowujemy się do Twoich potrzeb i budżetu — niezależnie od tego,
              skąd pochodzą materiały.
            </p>
          </Reveal>

          <dl className="mt-10 border-t border-border">
            {points.map((point, i) => (
              <Reveal key={point.index} delay={i * 90}>
                <div className="flex gap-5 border-b border-border py-6">
                  <span className="tnum font-mono text-sm text-muted-foreground">
                    {point.index}
                  </span>
                  <div>
                    <dt className="font-display text-lg font-semibold tracking-tight">
                      {point.title}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {point.description}
                    </dd>
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
