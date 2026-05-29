import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

const stats = [
  { value: "2", label: "Specjalizacje — wnętrza i teren wokół domu" },
  { value: "100%", label: "Pełna, pisemna gwarancja na każdą usługę" },
  { value: "0 zł", label: "Wycena, dojazd i kosztorys bez zobowiązań" },
];

export function Statement() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <Reveal>
        <Eyebrow>Filozofia</Eyebrow>
      </Reveal>

      <Reveal delay={80}>
        <p className="mt-8 max-w-4xl text-balance font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl lg:text-4xl">
          Łączymy pasję do budownictwa z rzetelnością, której możesz zaufać. Nie
          znikamy po wystawieniu rachunku —{" "}
          <span className="text-muted-foreground">
            bierzemy odpowiedzialność za efekt końcowy i inwestujemy w Twój
            święty spokój na lata.
          </span>
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-16 grid grid-cols-1 border-l border-t border-border sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="flex flex-col gap-4 border-b border-r border-border bg-background p-6 lg:p-8"
            >
              <div className="tnum font-display text-5xl font-bold tracking-tight lg:text-6xl">
                {stat.value}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
