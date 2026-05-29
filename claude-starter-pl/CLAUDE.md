# CLAUDE.md

Kontekst projektu dla Claude'a. Czytany przy starcie sesji.
Szczegóły w `.claude/skills/` — ładowane gdy zadanie pasuje do opisu skilla.

## Stack (zablokowany)

```
Next.js          16.x      App Router, RSC default, Turbopack dev
React            19.x
TypeScript       5.5+      strict, brak `any`, brak `@ts-ignore`
Tailwind CSS     v4        CSS-first config w app/globals.css
shadcn/ui        v4        components/ui/, synchronizowane ręcznie
CVA              0.7+      Każdy komponent wariantowy
react-hook-form  7.x       Formularze
zod              3.x       Schematy walidacji
lucide-react     latest    Ikony (WYŁĄCZNIE)
next/image                 Obrazy (WYŁĄCZNIE — żadnego <img>)
```

## Struktura folderów

```
app/                Routes, layouts, pages, Server Actions (actions.ts co-located)
components/ui/      Atomy shadcn (Button, Input, Card, ...)
components/blocks/  Sekcje kompozycyjne (Hero, PricingTable, NavBar, ...)
lib/                Utilities, walidatory, klient db
hooks/              Custom React hooks (tylko client-side)
types/              Współdzielone typy TypeScript
```

## Top 10 nienaruszalnych zasad

1. **Tylko tokeny semantyczne.** `bg-primary`, nigdy `bg-blue-500`. Każdy kolor ma znaczenie.
2. **Zakaz prefiksu `dark:`.** Dark mode obsługują tokeny przez CSS variables.
3. **Mobile-first.** Klasy bazowe dla mobile; `md:`, `lg:` skalują wyłącznie W GÓRĘ.
4. **RSC default.** `'use client'` tylko gdy potrzebny state, eventy lub browser API.
5. **Server Actions dla mutacji.** Nigdy POST do route handlera gdy Server Action wystarczy.
6. **CVA dla wariantów.** Nigdy inline `className` warunkowy dla wariantów.
7. **`asChild` dla polimorfizmu.** Buttons-as-links przez Radix Slot, nie zagnieżdżanie tagów interaktywnych.
8. **Named exports.** `export function NavBar()`, nie default — wyjątek: pliki konwencjonalne Next.js (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`).
9. **Focus ringi zawsze.** `focus-visible:ring-2 focus-visible:ring-ring` na każdym interaktywnym elemencie.
10. **Nazewnictwo:** kebab-case dla plików (`nav-bar.tsx`), PascalCase dla komponentów (`NavBar`).

## Dostępne skille

Gdy zadanie pasuje, odpowiedni skill ładuje się automatycznie:

- **projektowanie-layoutow** → tworzenie stron, hero sekcji, ocena jakości wizualnej, hierarchia, spacing
- **budowa-komponentow** → tworzenie/modyfikacja komponentów, wzorce CVA, asChild
- **system-stylowania** → tokeny, skala spacingu, typografia, dark mode
- **responsywnosc** → wzorce mobile-first, breakpointy
- **dostepnosc** → WCAG AA, nawigacja klawiaturą, focus management, ARIA
- **formularze-i-mutacje** → react-hook-form + zod + Server Actions

## Domyślny workflow per zadanie

1. Załaduj relevant skill(e) dla kontekstu
2. Sprawdź czy w codebase są podobne istniejące wzorce (`grep`)
3. Napisz minimum kodu rozwiązujące problem
4. Zweryfikuj przeciwko sekcji "Częste błędy" w skillu
5. Self-check przed odpowiedzią: typecheck, mobile rendering, klawiatura

## Quality gate (przed każdym commitem)

- TypeScript: zero błędów, zero ostrzeżeń
- Mobile (viewport 375px): brak horizontal scroll, tap targety ≥44px
- Klawiatura: Tab przez wszystkie interaktywne, widoczny focus
- Kontrast: 4.5:1 minimum (WCAG AA)
- Konsola: brak błędów w dev mode

## Gdy niepewne

- Wybierz prostsze rozwiązanie
- Zaznacz `// TODO: review pattern` zamiast zgadywania w ciemno
- Wskaż który skill powinien to regulować — jeśli żaden, flaguj potrzebę nowego skilla

---

*Linie: 87 · Aktualizowany gdy zmienia się stack lub zasady · Szczegóły w skills/, nigdy inline tutaj*
