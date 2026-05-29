# KR-BUD — strona wizytówka

Jednostronicowa witryna klasy premium dla firmy **KR-BUD** (wykończenia wnętrz i brukarstwo).
Kierunek wizualny: **Swiss Editorial** — ciepły papier, ciepły tusz, jeden akcent (bursztyn),
oversize'owa typografia, numerowana siatka, maksymalna powściągliwość.

**Dark mode** w pełni wspierany — przełącznik w headerze (☀/☾), domyślnie wg ustawień
systemu (`next-themes`). Motyw zmieniają wyłącznie tokeny CSS (`.dark` w `globals.css`),
zero prefiksów `dark:`. Panele kontakt/stopka inwertują się świadomie (jasne wykończenie
na ciemnej stronie).

## Stack

Next.js 16 (App Router, RSC, Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS v4
(CSS-first w `app/globals.css`) · wzorce shadcn/ui + CVA · lucide-react · `next/image`.

## Uruchomienie

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # produkcyjny build
pnpm start        # serwer produkcyjny
pnpm lint         # eslint
```

## ✍️ Co podmienić (Twoje dane)

Wszystko w jednym pliku: **`lib/site-config.ts`**

```ts
contact: {
  phoneDisplay: "+48 XXX XXX XXX",    // ← Twój numer (wyświetlany)
  phoneHref: "tel:+48000000000",      // ← Twój numer (do klikania)
  email: "kontakt@kr-bud.pl",         // ← Twój e-mail
  area: "Twoja miejscowość + 100 km", // ← obszar działania
}
```

To samo zasila stopkę, sekcję kontaktu oraz dane strukturalne (SEO / Google).

## 🖼️ Zdjęcia

Obecnie używane są zweryfikowane zdjęcia poglądowe z Unsplash (CDN), zmapowane w
`lib/site-config.ts` (obiekt `images`). Aby wstawić własne realizacje:

1. Wrzuć pliki do `public/realizacje/…`
2. W `images` zmień `src`, np. `src: "/realizacje/taras.jpg"`
3. Zaktualizuj `alt` (opis dla dostępności i SEO).

Po dodaniu własnej domeny zdjęć — dopisz ją w `next.config.ts` (`images.remotePatterns`).

## Struktura

```
app/
  layout.tsx        fonty, SEO, JSON-LD, header + footer, skip-link
  page.tsx          kompozycja sekcji
  globals.css       design system (tokeny, paleta, animacje)
components/
  ui/               atomy: button (CVA + asChild), eyebrow, reveal
  blocks/           sekcje: hero, services, guarantee, materials, why-us,
                    gallery, contact-cta, site-header, site-footer, keyword-marquee
lib/
  site-config.ts    ⭐ treść, kontakt, zdjęcia, usługi
  utils.ts          cn()
```

## Dostępność (zweryfikowane)

- 1× `<h1>`, poprawna hierarchia nagłówków, `lang="pl"`
- Focus ring na każdym elemencie interaktywnym, skip-link, focus trap w menu mobilnym (Radix)
- Wszystkie obrazy z `alt`; brak poziomego scrolla od 375px
- Respektowane `prefers-reduced-motion` (animacje wejścia się wyłączają)
- Tokeny semantyczne — zero `dark:`, zero hardkodowanych kolorów
- Focus ring czytelny w obu motywach; `color-scheme` ustawione dla natywnych kontrolek
- `robots.txt`, `sitemap.xml`, `themeColor`, dane strukturalne JSON-LD (GeneralContractor)
