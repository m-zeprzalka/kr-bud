---
name: responsywnosc
description: Użyj gdy implementujesz responsywne layouty, adaptujesz designy przez różne rozmiary ekranów, wybierasz breakpointy, budujesz mobile UI, lub obsługujesz touch interactions. Triggery: "mobile", "responsywny", "responsive", "breakpoint", "tablet", "desktop", "małe ekrany", "small screen", "media query", "touch", "telefon", "dotyk".
---

# Responsywność

Mobile to default reality. Większość userów na małych ekranach. Projektuj mobile-first; pozwól designowi skalować się w górę.

## Mobile-first execution

### Klasy bazowe celują w mobile; `md:`/`lg:` skalują WYŁĄCZNIE w górę

```tsx
// ❌ NIE — desktop-first, trudniejsze utrzymanie
<div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1">

// ✅ TAK — mobile-first, skaluje up
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

Jeśli ciągle używasz `sm:` żeby skalować W DÓŁ, twój mobile design nie jest dobrze przemyślany.

## Breakpointy Tailwind

| Prefiks | Min width | Urządzenia |
|---|---|---|
| (brak) | 0px | Telefony (default — pisz dla tego) |
| `sm:` | 640px | Duże telefony / małe tablety — używaj oszczędnie |
| `md:` | 768px | Tablety |
| `lg:` | 1024px | Laptopy |
| `xl:` | 1280px | Desktopy |
| `2xl:` | 1536px | Duże desktopy — używaj rzadko |

### Standardowa breakpoint strategy
- Mobile-only design na bazie (brak prefiksu)
- Tablet adjustments na `md:` (większość appek)
- Desktop layout na `lg:` (sidebar się pojawia, multi-column grids)
- `xl:` i `2xl:` dla typography scale-up na bardzo szerokich

Rzadko potrzebujesz wszystkich pięciu. Większość designów działa z baza + `md:` + `lg:`.

## Częste wzorce responsywne

### Stack → Row
```tsx
<div className="flex flex-col gap-3 sm:flex-row">
  <Button>Primary</Button>
  <Button variant="outline">Secondary</Button>
</div>
```

### Single col → Multi col grid
```tsx
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  {features.map(...)}
</div>
```

### Hide na mobile / show na desktop
```tsx
<aside className="hidden lg:block">
  Sidebar content (tylko desktop)
</aside>

<button className="lg:hidden">
  Menu (tylko mobile — otwiera drawer)
</button>
```

### Mobile drawer → desktop sidebar
```tsx
// Na mobile: hamburger otwiera Sheet drawer
// Na desktop: sidebar zawsze widoczny
<aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r">
  <nav>...</nav>
</aside>

<Sheet>
  <SheetTrigger asChild className="lg:hidden">
    <Button variant="ghost" size="icon"><Menu /></Button>
  </SheetTrigger>
  <SheetContent side="left">
    <nav>...</nav>
  </SheetContent>
</Sheet>
```

### Container z responsywnym paddingiem
```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
```

Lub prościej z built-in Tailwind container behavior.

### Typografia która skaluje
```tsx
<h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
  Hero headline
</h1>
```

Tylko headlines muszą dramatycznie skalować. Body text zazwyczaj zostaje consistent (`text-base` wszędzie).

## Touch targety

### Minimum 44×44px dla tappable elements
Apple HIG i Material guidelines się zgadzają.

```tsx
// ❌ NIE — tap target za mały
<button className="text-xs p-1">×</button>

// ✅ TAK — spełnia 44px minimum
<button className="size-11 inline-flex items-center justify-center">
  <X className="size-4" />
</button>
```

shadcn `Button` z `size="icon"` to `size-10` (40px) — lekko poniżej. Dla mobile-heavy appek, override do `size-11` lub `size-12` dla icon buttons.

### Spacing między tap targets
Minimum 8px gap między sąsiednimi tappables żeby zapobiec mis-taps.

## Mobile-specific concerns

### Safe areas (iOS notch, home bar)
```tsx
<div className="px-4 pb-safe-bottom">
  {/* pb-safe-bottom używa env(safe-area-inset-bottom) */}
</div>
```

Dodaj do `globals.css`:
```css
@theme inline {
  --spacing-safe-bottom: env(safe-area-inset-bottom);
  --spacing-safe-top: env(safe-area-inset-top);
}
```

### Sticky bottom CTAs na mobile
Dla form pages lub artykułów, sticky primary action na dole:
```tsx
<div className="sticky bottom-0 border-t bg-background p-4 sm:static sm:border-0 sm:p-0">
  <Button className="w-full sm:w-auto">Continue</Button>
</div>
```

### Unikaj horizontal scroll
- Testuj na 320px width (najmniejszy common viewport)
- Long words break z `break-words` lub `hyphens-auto`
- Tabele: wrap w `overflow-x-auto` container
- Obrazy: `max-w-full h-auto` lub używaj `next/image` z proper sizing

### Form inputs na mobile
- `font-size: 16px` minimum na inputach (mniejsze triggeruje iOS zoom)
- shadcn `Input` defaultuje do `text-base` (16px) — zostaw to
- `autocomplete`, `inputmode`, `autocapitalize` attributes dla lepszych keyboards

```tsx
<input
  type="email"
  inputMode="email"
  autoComplete="email"
  autoCapitalize="none"
/>
```

## Strategia container width

```
Full bleed (brak max-width):    hero backgrounds, footery, headery
Wide (max-w-7xl):                dashboardy, feature grids
Standard (max-w-6xl):            marketing sections
Reading (max-w-prose ~65ch):     blog posts, long-form content
Form (max-w-md/lg):              formularze, login pages
```

Większość layoutów: jeden container `mx-auto px-4 sm:px-6 lg:px-8` wrapping content, z content w środku mającym własne `max-w-*`.

## Responsive obrazów

### Zawsze używaj `next/image`
```tsx
import Image from "next/image";

<Image
  src="/hero.jpg"
  alt="Opis"
  width={1200}
  height={600}
  className="h-auto w-full"
  priority  // dla above-fold images
/>
```

### Responsive sizing przez `sizes`
```tsx
<Image
  src="/feature.jpg"
  alt="Feature"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

Bez `sizes` serwujesz zły rozmiar na mobile i marnujesz bandwidth.

## Testowanie responsywności

Zawsze testuj na:
- **375px** — iPhone SE / standard phone (TO JEST BASELINE)
- **768px** — tablet portrait
- **1024px** — laptop
- **1440px** — common desktop

Używaj Chrome DevTools device toolbar. Nie ufaj samemu browser resize — touch events różnią się.

## Częste błędy

❌ **Projektowanie desktop-first** — adaptacja w dół do mobile produkuje cramped mobile
❌ **`sm:hidden md:block` wszędzie** — za dużo breakpoint conditions; uprość
❌ **Hover-only interactions** — mobile nie ma hover; używaj focus + active states
❌ **Tiny tap targets** — buttony poniżej 44px nie spełniają accessibility
❌ **Auto-rotating carousels** — users na touch nie mogą zatrzymać; accessibility nightmare
❌ **Horizontal scroll** wszędzie poza intentional carousels — zazwyczaj layout bug
❌ **Zapomnienie safe areas** na iOS — content znika za notch lub home bar
❌ **`100vh` dla full-screen** — mobile browsers' address bar overflowuje; użyj `100dvh` (dynamic viewport)
❌ **Tiny mobile typography** — `text-xs` ciężko czytać; minimum `text-sm` dla body
❌ **Hidden CTAs na mobile** — primary action musi być reachable bez scrollowania
