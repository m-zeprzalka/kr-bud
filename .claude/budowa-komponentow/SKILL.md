---
name: budowa-komponentow
description: Użyj gdy tworzysz nowe komponenty React, modyfikujesz istniejące, dodajesz warianty komponentów, ekstraktujesz reusable komponenty, lub decydujesz gdzie komponent powinien żyć w architekturze. Pokrywa wzorce shadcn primitives, konfigurację wariantów CVA, polimorfizm asChild, layer placement (components/ui vs components/blocks), oraz konwencje nazewnictwa. Triggery: "stwórz komponent", "create a component", "dodaj wariant buttonu", "add a button variant", "extract this", "zbuduj kartę", "build a card", "make this a component", "gdzie ten komponent powinien być".
---

# Budowa Komponentów

## Gdzie ten komponent żyje?

```
Generic atom (Button, Input, Badge, Card, Dialog)?
  → components/ui/<kebab-name>.tsx
  → shadcn pattern + CVA + asChild
  → Context-agnostic, brak business logic

Composed reusable section (Hero, PricingTable, NavBar, Footer)?
  → components/blocks/<kebab-name>.tsx
  → Composed z ui/ atomów, accepts dane przez props
  → Reusable across multiple pages

Page-specific composition?
  → app/<route>/page.tsx
  → Inline; extract do blocks/ tylko gdy reused
```

**Reguła:** lower layers nie importują z higher layers.
- `ui/` nie może importować z `blocks/`
- `blocks/` nie może importować z `app/`

## Anatomia atomu (shadcn pattern)

```tsx
// components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { buttonVariants };
```

### Wymagane dla każdego atomu
- ✅ CVA dla wariantów (nawet jeśli tylko jeden slot — dla spójności)
- ✅ `cn()` helper dla kompozycji className
- ✅ Spread `...props` dla dostępu do native attributes
- ✅ Focus ring przez `focus-visible:ring-*`
- ✅ Disabled state przez Tailwind `disabled:*` modifiers
- ✅ Export zarówno komponentu jak i `buttonVariants` (żeby consumers mogli komponować style)

### Zakazane w atomach
- ❌ Business logic (fetch, walidacja, kalkulacje)
- ❌ Route awareness (`useRouter`, hardcoded paths)
- ❌ Imports z `blocks/` lub `app/`

## Anatomia bloku

```tsx
// components/blocks/hero-section.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function HeroSection({ title, description, primaryCta, secondaryCta }: HeroSectionProps) {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            {description}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
            {secondaryCta && (
              <Button asChild size="lg" variant="outline">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Konwencje bloków
- Server Component default (brak `'use client'`)
- Dane przez props — nigdy nie fetchuj wewnątrz bloku
- 3-5 variant props max — ekstraktuj dodatkowe warianty do osobnych bloków
- Brak business logic — deleguj do `lib/`
- Reusable across multiple pages (jeśli używany tylko raz, zostaw inline w page)

## Polimorfizm `asChild`

### Kiedy używać
Gdy Button powinien renderować się jako Link (lub inny element) zachowując całe stylowanie:

```tsx
// ❌ NIE — zagnieżdżone interactive elementy psują a11y i semantykę
<a href="/about">
  <button className="...">About</button>
</a>

// ❌ NIE — duplikowanie stylów Buttona na Link
<Link href="/about" className="inline-flex items-center justify-center bg-primary ...">
  About
</Link>

// ✅ TAK — Button deleguje rendering do Link przez Slot
<Button asChild>
  <Link href="/about">About</Link>
</Button>
```

Klasy CVA Buttona zostają zastosowane do Link. Jeden DOM node, poprawna semantyka.

### Kiedy NIE używać
Gdy faktycznie potrzebujesz semantyki `<button>` (submit form, onClick bez navigation). Default `asChild={false}` jest right.

## Konwencje CVA

### Zawsze base classes
```tsx
const variants = cva(
  "BAZOWE KLASY ZAWSZE APLIKOWANE",  // ← to jest wymagane
  { variants: { ... } }
);
```

### Discrete variant slots
```tsx
// ❌ NIE — continuous "size" prop wymusza inline calc
size: number  // potem className={`p-${size}`}

// ✅ TAK — discrete opcje
size: { sm: "p-2", md: "p-4", lg: "p-6" }
```

### Default variants dla sensible defaults
```tsx
defaultVariants: { variant: "default", size: "md" }
```

Większość użyć nie powinna wymagać żadnych propsów.

### Compound variants gdy kombinacje mają znaczenie
```tsx
compoundVariants: [
  {
    variant: "outline",
    size: "icon",
    className: "border-2",  // outline icon buttons potrzebują thicker border
  },
]
```

Używaj oszczędnie. Jeśli potrzebujesz wielu compound variants, te warianty powinny być oddzielnymi komponentami.

## Kiedy ekstraktować komponent

| Sygnał | Akcja |
|---|---|
| Użyty w 3+ miejscach | Ekstraktuj |
| Użyty w 2 miejscach + ma jasną nazwę | Ekstraktuj |
| Inline structure ponad 40 linii złożone | Rozważ ekstrakcję dla czytelności |
| Page-specific, użyty raz, prosty | Nie ekstraktuj — inline |

### Nazewnictwo
- Pliki: kebab-case (`hero-section.tsx`)
- Komponenty: PascalCase (`HeroSection`)
- Props type: `<Component>Props` (`HeroSectionProps`)
- Variants export: `<component>Variants` (`heroSectionVariants`)

## Wzorce propsów

### Props jako osobny typ, nie inline
```tsx
// ❌ NIE
export function Card({ title, children }: { title: string; children: ReactNode }) {}

// ✅ TAK
type CardProps = {
  title: string;
  children: ReactNode;
};
export function Card({ title, children }: CardProps) {}
```

### Spread native attributes
```tsx
// ✅ Pozwól consumerom przekazać aria-*, data-*, onClick, itp.
type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
};

export function Card({ title, className, ...props }: CardProps) {
  return <div className={cn("...", className)} {...props}>...</div>;
}
```

### Zrób optional props prawdziwie optional
```tsx
// ❌ NIE — caller musi przekazać undefined explicitly
type Props = { description: string | undefined };

// ✅ TAK — używa optional marker
type Props = { description?: string };
```

## Częste błędy

❌ **Kitchen-sink komponent** z 20+ propsami — ekstraktuj warianty do osobnych komponentów
❌ **`memo` wszędzie prewencyjnie** — najpierw zmierz, optymalizuj gdzie potrzeba
❌ **Deep prop drilling** — jeśli przekazujesz przez 3+ poziomy, lift state lub użyj composition
❌ **Inline styles** przez `style={...}` — używaj klas Tailwind; zostaw `style` dla dynamic values (np. progress bar widths)
❌ **Dwa `Button` komponenty** w różnych folderach — używaj shadcn `Button`, rozszerz jeśli potrzeba
❌ **Mieszanie ui/ i blocks/ odpowiedzialności** — atomy nie powinny wiedzieć o pages; bloki nie powinny fetchować
❌ **`export default` dla komponentów** — używaj named exports dla grepability (wyjątek: pliki konwencjonalne Next.js)
❌ **forwardRef w React 19 odruchowo** — React 19 przekazuje ref jako prop; używaj forwardRef tylko wrapując biblioteki które go oczekują
