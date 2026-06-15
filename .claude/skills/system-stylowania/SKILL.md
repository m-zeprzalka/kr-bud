---
name: system-stylowania
description: Użyj gdy pracujesz z tokenami designu, kolorami, spacingiem, typografią, lub dark mode. Użyj gdy konfigurujesz Tailwind, definiujesz CSS variables, wybierasz paletę kolorów, dobierasz rozmiary fontów, lub implementujesz theme switching. Triggery: "dodaj token", "kolor", "dark mode", "typografia", "font size", "spacing", "tailwind config", "globals.css", "motyw", "theme".
---

# System Stylowania

Single source of truth: `app/globals.css`. Tailwind v4 zbiera tokeny przez `@theme inline`. Bez `tailwind.config.{js,ts}`.

## Setup tokenów

```css
/* app/globals.css */
@import "tailwindcss";

@theme inline {
  /* Kolory — wired do HSL variables poniżej */
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));

  /* Border radii */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;

  /* Fonty (setup przez next/font w layout.tsx) */
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, monospace;
}

:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;

  --primary: 222 47% 11%;
  --primary-foreground: 210 40% 98%;

  --secondary: 210 40% 96%;
  --secondary-foreground: 222 47% 11%;

  --destructive: 0 84% 60%;
  --destructive-foreground: 210 40% 98%;

  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;

  --accent: 210 40% 96%;
  --accent-foreground: 222 47% 11%;

  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: 222 84% 5%;
}

.dark {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;

  --primary: 210 40% 98%;
  --primary-foreground: 222 47% 11%;

  --secondary: 217 33% 17%;
  --secondary-foreground: 210 40% 98%;

  --destructive: 0 63% 31%;
  --destructive-foreground: 210 40% 98%;

  --muted: 217 33% 17%;
  --muted-foreground: 215 20% 65%;

  --accent: 217 33% 17%;
  --accent-foreground: 210 40% 98%;

  --border: 217 33% 17%;
  --input: 217 33% 17%;
  --ring: 213 27% 84%;
}
```

## Wyłącznie tokeny semantyczne

### Dlaczego
Nazwy tokenów opisują **intencję**, nie wygląd. Gdy zmieniasz design, zmieniasz wartości; consumers nie zmieniają nic.

```tsx
// ❌ NIGDY
<div className="bg-blue-500 text-white border-gray-200">

// ✅ ZAWSZE
<div className="bg-primary text-primary-foreground border-border">
```

### Dodawanie nowego tokenu
1. Dodaj HSL variable w obu selektorach `:root` i `.dark`
2. Wire do `@theme inline` block
3. Udokumentuj semantyczne znaczenie w tym skillu lub w komentarzu

## Dark mode: ZAKAZ prefiksu `dark:`

```tsx
// ❌ NIGDY — parallel className maintenance
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">

// ✅ ZAWSZE — tokeny swap automatycznie
<div className="bg-background text-foreground">
```

### Setup theme switching
```bash
pnpm add next-themes
```

```tsx
// app/layout.tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

`suppressHydrationWarning` na `<html>` jest wymagane bo next-themes ustawia klasę przed hydration React'a.

## Skala spacingu (8pt grid, Tailwind defaults)

Wyłącznie wartości ze skali. Arbitrary values są zakazane.

| Klasa | Wartość | Kiedy używać |
|---|---|---|
| `gap-1` / `p-1` | 4px | Hair-thin separatory, dense UI |
| `gap-2` / `p-2` | 8px | Tightly related (ikona + label, label + input) |
| `gap-3` / `p-3` | 12px | Compact buttons, małe karty |
| `gap-4` / `p-4` | 16px | **Default dla component spacingu** |
| `gap-6` / `p-6` | 24px | Section sub-spacing, card padding |
| `gap-8` / `p-8` | 32px | Między głównymi UI blokami |
| `gap-12` / `py-12` | 48px | Section padding (mobile) |
| `gap-16` / `py-16` | 64px | Section padding (desktop) |
| `py-24` | 96px | Major section padding |
| `py-32` | 128px | Hero section padding |

### Zakazane
- `mt-[17px]`, `gap-[23px]`, `p-[1.4rem]` — arbitrary spacing
- Niespójny rhythm — wybierz bazę i trzymaj się

## Skala typografii

| Klasa | Użycie |
|---|---|
| `text-xs` | Metadata, captions, labels |
| `text-sm` | Secondary text, form labels, table cells |
| `text-base` | **Body text (default)** |
| `text-lg` | Lead paragraphs, hero taglines |
| `text-xl` | h4, large body emphasis |
| `text-2xl` | h3 |
| `text-3xl` | h2 small, page title |
| `text-4xl` | h2 large, marketing h1 small |
| `text-5xl` | h1 medium |
| `text-6xl` | Hero h1 |
| `text-7xl`+ | Special cases (marketing display) |

### Line height pairings
```
text-xs   → leading-4   (1rem)
text-sm   → leading-5   (1.25rem)
text-base → leading-7   (1.75rem)  dla body — generous
text-lg   → leading-7   lub leading-8
text-2xl  → leading-tight
text-4xl+ → leading-tight lub leading-none
```

Body text dostaje WIĘCEJ line-height dla czytelności. Headingi dostają MNIEJ dla visual density.

### Letter spacing
- Display sizes (`text-4xl+`): `tracking-tight` (lekko negatywny)
- Body: default (brak klasy)
- All-caps labels: `tracking-wider` lub `tracking-widest`

### Font weight scale
- `font-normal` (400) — body
- `font-medium` (500) — labels, secondary emphasis, button text
- `font-semibold` (600) — h3-h6, strong UI emphasis
- `font-bold` (700) — h1-h2, true emphasis

Pomiń `font-black` i `font-thin` — rzadko pasują do reszty type system.

## Border radii

Używaj skali tokenów:
- `rounded-sm` (0.375rem) — small UI (badges, small buttons)
- `rounded-md` (0.5rem) — **default** (buttons, inputs, cards)
- `rounded-lg` (0.75rem) — emphasized cards, modale
- `rounded-full` — avatary, pills, icon buttons
- `rounded-none` — full-width banners, tabele

Unikaj `rounded-xl`, `rounded-2xl` chyba że design system explicit ich używa.

## Cienie

Używaj oszczędnie. Cień sygnalizuje elevation (nad surface).

- `shadow-sm` — subtelny: input focus, hovered card
- `shadow` (default) — standard card elevation
- `shadow-md` — popovers, dropdowns
- `shadow-lg` — modale, dialogi
- `shadow-xl`+ — prawie nigdy; sygnalizuje over-design

**Zakazane:** shadow na każdej karcie "for style". Jeśli nie ma hierarchii elevation, nie ma shadow.

## Częste błędy

❌ Używanie `bg-white` zamiast `bg-background` (psuje dark mode)
❌ Używanie `text-black` zamiast `text-foreground`
❌ Dwa near-identical tokeny (`--surface` i `--background` robiące to samo)
❌ Zapomnienie wartości HSL (zdefiniowane w `:root`, zapomniane w `.dark`, dark mode breaks)
❌ Mieszanie tokenów z raw colors w tym samym komponencie
❌ Użycie `@apply` w CSS — komponuj utilities w JSX
❌ Custom CSS w plikach komponentów — trzymaj CSS w `globals.css`, Tailwind elsewhere
❌ `!important` żeby walczyć ze specificity — przestrukturyzuj zamiast
❌ `font-bold` dla wszystkich headingów — używaj weight scale dopasowanej do rozmiaru
