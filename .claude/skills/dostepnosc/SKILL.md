---
name: dostepnosc
description: Użyj gdy budujesz jakikolwiek interaktywny element, formularz, nawigację, lub dialog. Użyj gdy reviewujesz komponenty pod kątem dostępności, dodajesz ARIA attributes, zarządzasz focusem, lub poprawiasz nawigację klawiaturą. Triggery: "dostępność", "accessibility", "a11y", "klawiatura", "keyboard", "screen reader", "ARIA", "focus", "kontrast", "contrast", "WCAG", "alt text", "tab order".
---

# Dostępność Essentials

WCAG AA to bar. Nie "nice to have." Każdy interaktywny element musi to spełniać.

## Nienaruszalne

1. **Kontrast koloru** 4.5:1 dla body, 3:1 dla large text (18px+)
2. **Focus visible** na każdym interaktywnym
3. **Reachable klawiaturą** — Tab przez, Enter/Space do aktywacji
4. **Semantic HTML first** — ARIA to naprawa, nie architektura
5. **Alt text** na każdym obrazie (lub `alt=""` dla purely decorative)

## Semantic HTML > ARIA

### Właściwy element do zadania
```tsx
// ❌ NIE — div jako button
<div onClick={handler} className="...">Click me</div>

// ✅ TAK — prawdziwy button
<button onClick={handler} className="...">Click me</button>
```

### Linki vs buttony
- **Link** (`<a>` lub `next/link`): idzie gdzieś (navigation)
- **Button** (`<button>`): robi coś (akcja)

```tsx
// ❌ NIE
<a href="#" onClick={openModal}>Open modal</a>
<button onClick={() => router.push("/about")}>About</button>

// ✅ TAK
<button onClick={openModal}>Open modal</button>
<Link href="/about">About</Link>
```

### Headingi w kolejności
```tsx
// ❌ NIE — pomijanie poziomów dla visual size
<h1>Page title</h1>
<h3>Section</h3>  // pominięty h2!

// ✅ TAK — używaj heading level dla struktury, className dla rozmiaru
<h1>Page title</h1>
<h2 className="text-xl">Section</h2>
```

Tylko JEDEN `<h1>` per page.

## Focus management

### Każdy interaktywny element potrzebuje widocznego focus ringa
```tsx
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
```

### `focus-visible:` nie `focus:`
- `focus:` — pokazuje ring nawet na mouse click (annoying)
- `focus-visible:` — pokazuje ring tylko gdy keyboard-focused (correct UX)

### Nigdy `outline: none` samo
```tsx
// ❌ NIE — usuwa keyboard accessibility
className="focus:outline-none"

// ✅ TAK — replace z focus-visible ring
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
```

### Tab order follows visual order
Nie używaj pozytywnych wartości `tabindex`. DOM order powinien matchować to co user widzi. Jeśli nie matchuje, przebuduj DOM, nie tab order.

```tsx
// ❌ NIE — fragile, łatwo psuje
<button tabIndex={3}>Third</button>
<button tabIndex={1}>First</button>
<button tabIndex={2}>Second</button>

// ✅ TAK — ustrukturyzuj DOM poprawnie
<button>First</button>
<button>Second</button>
<button>Third</button>
```

`tabindex="0"` (focusable) i `tabindex="-1"` (programmatically focusable ale nie w tab order) są fine. Pozytywne wartości nie.

### Focus traps dla modal'i
Dialogi trapują focus w środku. Używaj Radix UI's Dialog (shadcn default) — obsługuje to. Jeśli budujesz custom, zainstaluj `focus-trap-react`.

### Restore focus przy zamknięciu
Gdy modal się zamyka, focus wraca do elementu który go otworzył. Radix Dialog obsługuje to automatycznie.

## Formularze

### Labels są wymagane
```tsx
// ❌ NIE — placeholder nie jest labelem
<input placeholder="Email" />

// ✅ TAK — widoczny label powiązany z input
<label htmlFor="email">Email</label>
<input id="email" name="email" />
```

### Labels nad inputami, nie obok ani wewnątrz
- Nad: najbardziej dostępne, działa na mobile, supportuje long labels
- Obok: psuje się na wąskich ekranach, alignment issues
- Wewnątrz (floating labels): trendy ale gorsze dla accessibility — tylko placeholder, łatwo pomylić

### Error messages związane z inputami
```tsx
<label htmlFor="email">Email</label>
<input
  id="email"
  aria-invalid={!!error}
  aria-describedby={error ? "email-error" : undefined}
/>
{error && (
  <p id="email-error" role="alert" className="text-sm text-destructive">
    {error}
  </p>
)}
```

`role="alert"` sprawia że screen readery anonsują error. `aria-describedby` wiąże error z input'em.

### Required fields
```tsx
<label htmlFor="email">
  Email <span aria-hidden="true">*</span>
</label>
<input id="email" required aria-required="true" />
```

Widoczna gwiazdka plus `aria-required` pokrywa zarówno sighted jak i screen reader userów.

## Obrazy

### Reguły alt text
```tsx
// Informative image — opisz content
<Image src="..." alt="Sarah Chen, CEO Acme, prezentuje na konferencji 2025" />

// Decorative image — empty alt
<Image src="..." alt="" />

// Image z adjacent text — empty alt (nie duplikuj info)
<a href="/cart">
  <Image src="/cart-icon.svg" alt="" />
  Koszyk (3 produkty)
</a>

// Image jako link content — opisz destination, nie image
<a href="/profile">
  <Image src="/avatar.jpg" alt="Przejdź do ustawień profilu" />
</a>
```

### Nigdy alt="obraz" lub alt="zdjęcie"
To gorsze niż empty alt. Screen readery i tak anonsują "image".

## Interactive komponenty (wzorce shadcn/Radix)

### Dialog
shadcn Dialog (Radix Dialog pod spodem) obsługuje:
- Focus trap
- ESC do zamknięcia
- Focus restoration przy zamknięciu
- `aria-modal`, `aria-labelledby`, `aria-describedby`

Po prostu używaj poprawnie:
```tsx
<Dialog>
  <DialogTrigger asChild><Button>Otwórz</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Wymagany tytuł</DialogTitle>
      <DialogDescription>Wymagany opis dla screen reader'ów</DialogDescription>
    </DialogHeader>
    {/* content */}
  </DialogContent>
</Dialog>
```

`DialogTitle` i `DialogDescription` są WYMAGANE dla dostępności. Jeśli ukryte wizualnie, użyj `<VisuallyHidden>`.

### Dropdown menus
Używaj shadcn `DropdownMenu` (Radix). Obsługuje keyboard nav (strzałki), Enter/Space do select, ESC do zamknięcia.

### Tooltips
- Zawsze paruj z focusable elementem (nie kładź tooltip na div)
- Nie umieszczaj critical info tylko w tooltip — keyboard/touch userzy mogą przegapić

## Skip links

Dla stron z extensive navigation, dostarczy skip link:
```tsx
// app/layout.tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
>
  Skip to main content
</a>
<header>...</header>
<main id="main-content">{children}</main>
```

`sr-only` ukrywa wizualnie ale zostawia accessible. Pojawia się na keyboard focus.

## Kolor i kontrast

### Nie komunikuj wyłącznie kolorem
```tsx
// ❌ NIE — tylko czerwony wskazuje error
<p className="text-red-600">Invalid email</p>

// ✅ TAK — kolor + ikona + tekst
<p className="flex items-center gap-2 text-destructive">
  <AlertCircle className="size-4" />
  Invalid email
</p>
```

### Targety kontrastu (WCAG AA)
- Body text: 4.5:1
- Large text (18pt+/24px+ regular, 14pt+/18.66px+ bold): 3:1
- UI components & graphical objects: 3:1
- Decorative text: brak wymagania

### Testuj kontrast
- Chrome DevTools: inspect element → Styles → color picker pokazuje contrast ratio
- Browser extension: axe DevTools, WAVE
- Nie ufaj oku — mierz

## Motion & animation

### Respect `prefers-reduced-motion`
```css
/* globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Dla Motion komponentów
```tsx
"use client";
import { motion, useReducedMotion } from "motion/react";

export function Component() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      ...
    </motion.div>
  );
}
```

### Nie auto-play
- Brak auto-playing video z dźwiękiem
- Brak auto-rotating carousels (lub dostarczyć widoczny pause button)
- Brak animacji które migają > 3 razy na sekundę (seizure risk)

## Quick audit checklist

Przed uznaniem strony za skończoną:

- [ ] Tab przez każdy interaktywny element — widoczny focus ring na każdym
- [ ] Można dokończyć primary task tylko klawiaturą
- [ ] Każdy image ma appropriate alt text (lub `alt=""` jeśli decorative)
- [ ] Form errors anonsowane (testuj ze screen readerem jeśli możliwe)
- [ ] Kontrast sprawdzony na 4.5:1 minimum
- [ ] Page ma logical heading hierarchy (h1 → h2 → h3)
- [ ] Touch targety ≥44×44px na mobile
- [ ] `<html lang="pl">` (lub appropriate) ustawione na layout
- [ ] Page ma meaningful `<title>` przez Metadata API

## Częste błędy

❌ `<div onClick>` zamiast `<button>`
❌ `outline: none` bez replacement focus ring
❌ Placeholder używany jako label
❌ Kolor jako jedyny wskaźnik błędu
❌ Auto-playing media
❌ Pomijanie heading levels dla visual sizing
❌ Tab order przez pozytywne `tabIndex` values
❌ Brak `aria-label` na icon-only buttons (`<Button size="icon">` potrzebuje `aria-label="Otwórz menu"`)
❌ Custom focus styles mniej widoczne niż default
❌ Usuwanie focus indicator "bo jest brzydki" — zaprojektuj piękny zamiast
