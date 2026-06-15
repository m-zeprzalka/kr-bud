import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/site-config";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 lg:pb-24 lg:pt-20">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Tekst */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="h-px w-8 bg-brand" aria-hidden="true" />
                Wykończenia wnętrz · Brukarstwo · Puławy
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-balance font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
                Solidne wykończenia
                <br />i{" "}
                <span className="relative whitespace-nowrap">
                  brukarstwo
                  <span
                    className="absolute -bottom-1 left-0 h-2 w-full bg-brand lg:h-3"
                    aria-hidden="true"
                  />
                </span>
                .
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Wykonawca, który bierze pełną odpowiedzialność za swoją pracę.
                Zrealizujemy metamorfozę wnętrza i profesjonalnie zagospodarujemy
                teren wokół domu w Puławach i okolicy — z rzetelnością, której
                możesz zaufać.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild variant="brand" size="xl">
                  <a href="#kontakt">Bezpłatna wycena</a>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <a href="#uslugi">Zobacz zakres usług</a>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Puławy + 100 km · Pełna pisemna gwarancja · Bezpłatny dojazd
              </p>
            </Reveal>
          </div>

          {/* Obraz */}
          <Reveal delay={200} className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
              <Image
                src={images.heroInterior.src}
                alt={images.heroInterior.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              {/* Caption chip */}
              <div className="absolute left-3 top-3 rounded-sm bg-background/90 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-foreground backdrop-blur">
                Realizacja · Wnętrze
              </div>
              {/* Floating stat */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between rounded-sm bg-foreground/90 p-4 text-background backdrop-blur sm:right-auto">
                <div>
                  <div className="tnum font-display text-3xl font-bold leading-none">
                    100%
                  </div>
                  <div className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-background/70">
                    Gwarancja na piśmie
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
