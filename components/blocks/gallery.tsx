import Image from "next/image";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { images, type SiteImage } from "@/lib/site-config";

type GalleryItem = {
  image: SiteImage;
  tag: string;
  span: string;
  ratio: string;
};

const items: GalleryItem[] = [
  { image: images.gSalon, tag: "Salon", span: "lg:col-span-7", ratio: "aspect-[16/10]" },
  { image: images.gKitchen, tag: "Kuchnia", span: "lg:col-span-5", ratio: "aspect-[16/10]" },
  { image: images.gBedroom, tag: "Sypialnia", span: "lg:col-span-4", ratio: "aspect-[4/5]" },
  { image: images.gFloor, tag: "Podłogi", span: "lg:col-span-4", ratio: "aspect-[4/5]" },
  { image: images.gCorridor, tag: "Korytarz", span: "lg:col-span-4", ratio: "aspect-[4/5]" },
  { image: images.gStairs, tag: "Schody", span: "lg:col-span-5", ratio: "aspect-[16/10]" },
  { image: images.gLiving, tag: "Strefa dzienna", span: "lg:col-span-7", ratio: "aspect-[16/10]" },
];

export function Gallery() {
  return (
    <section id="realizacje" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <Eyebrow>Realizacje</Eyebrow>
          <h2 className="mt-6 max-w-xl text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Efekty, które mówią same za siebie.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
          {items.map((item, i) => (
            <Reveal key={item.image.src} delay={(i % 3) * 80} className={item.span}>
              <figure
                className={`group relative ${item.ratio} overflow-hidden rounded-sm bg-muted`}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <figcaption className="absolute left-3 top-3 rounded-sm bg-background/90 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-foreground backdrop-blur">
                  {item.tag}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
