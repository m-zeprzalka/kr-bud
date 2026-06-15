---
name: projektowanie-layoutow
description: Użyj gdy tworzysz nowe strony, layouty, sekcje hero, marketing pages, dashboardy, formularze, lub jakiekolwiek kompozycje elementów UI. Użyj gdy oceniasz czy design jest zbalansowany, hierarchiczny lub dopracowany. Użyj gdy decydujesz o spacingu, alignmentcie, visual weight, lub które elementy emphasize'ować. Triggery: "stwórz stronę", "create page", "zaprojektuj layout", "design a layout", "zbuduj hero", "build a hero", "popraw wygląd", "make this look better", "ustrukturyzuj stronę", "hierarchia wizualna", "spacing", "uczyń to pięknym", "polish this design".
---

# Projektowanie Layoutów

Piękne layouty nie biorą się ze szczęścia — wynikają z zasad. Ten skill koduje osąd seniora designera, żeby layouty wyglądały intencjonalnie, balansowanie i dopracowane domyślnie.

## Siedem zasad

### 1. Jedna primary akcja per widok
Jeśli wszystko jest primary, nic nie jest.

✅ Hero: JEDEN wypełniony primary button + JEDEN outline/ghost secondary
✅ Header dashboardu: JEDNA primary akcja ("Nowy projekt"), inne secondary
❌ Trzy wypełnione buttony równej wagi konkurujące o uwagę

### 2. Visual weight tworzy hierarchię
Najważniejszy element dostaje WIĘCEJ: rozmiaru, kontrastu, pozycji, otaczającej przestrzeni.

Oko jest przyciągane do:
- NAJWIĘKSZEGO elementu (rozmiar dominuje)
- NAJWYŻSZEGO KONTRASTU (względem tła)
- NAJWYŻSZEJ pozycji w czytaniu (góra, lewo w F-pattern)
- NAJWIĘCEJ whitespace wokół (samotne rzeczy wyglądają na ważne)

Żeby coś wyróżnić → dodaj wagi w tych wymiarach.
Żeby coś zde-emphasize'ować → zmniejsz je. Nie krzycz głośniej; szepcz ciszej w kontekście.

### 3. Generous > cramped
Gdy niepewny co do spacingu, wybierz WIĘCEJ.

- Między głównymi sekcjami: `py-16` do `py-24` (mobile: `py-12` do `py-16`)
- W obrębie sekcji: `gap-8` do `gap-12`
- W obrębie karty/grupy: `gap-4` do `gap-6`
- Tight UI (ikona+label, label+input): `gap-2`

Hojność czyta się jako pewność siebie. Cramped czyta się jako nerwowość.

### 4. Alignment jest binarny
Rzeczy się alignują albo nie. "Prawie aligned" = zepsute.

- Heading i body dzielą lewy edge
- Buttony w rzędzie dzielą top edge ORAZ equal height
- Karty w gridzie dzielą wysokości (`h-full` lub `grid-auto-rows-fr`)
- Liczby w kolumnie right-align (cyfry stackują się)
- Form labels i inputs dzielą lewy edge

Skala Tailwind alignuje wszystko do 8pt grid by default — używaj skali.

### 5. Reguła 60-30-10 dla koloru
Większość strony to neutrale. Jeden kolor akcentu. Używany oszczędnie.

- 60% — background, foreground, borders, muted text
- 30% — karty, sekcje, hover states (secondary surfaces)
- 10% — akcent: primary actions, linki, key data points

Kolor używany do wszystkiego = kolor używany do niczego. Zachowaj go dla tego co istotne.

### 6. Trzy rozmiary fontu per widok, max
Więcej rozmiarów = utracona hierarchia. Typowy zestaw na jednym widoku:

- Jeden rozmiar headingu (`text-3xl` do `text-5xl`)
- Jeden rozmiar body (`text-base`)
- Jeden rozmiar supporting (`text-sm` dla captions, metadata)

Hero strony marketingowej może mieć 4 — sam H1 na `text-6xl`+. Poza tym powściągliwość.

### 7. Powściągliwość to cecha seniora
Każdy element wizualny zarabia swoje miejsce. Jeśli nie umiesz wyartykułować dlaczego coś tam jest, usuń.

Częste rzeczy do usunięcia:
- Dekoracyjne cienie na kartach które nie potrzebują elevation
- Ikony dekorujące buttony bez dodawania znaczenia
- Borders separujące rzeczy które whitespace już separuje
- Gradienty deploy'owane żeby "make it pop"
- Wiele entrance animations konkurujących na pierwszym ładowaniu
- Background patterns i tekstury dodające visual noise
- Center-alignment body textu (left-aligned jest bardziej czytelny)

## Wzorce layoutu per typ strony

### Marketing landing page
```
HEADER     compact, sticky-after-scroll, logo + 3-5 nav itemów + CTA
HERO       H1 (text-5xl/6xl, max-w-3xl), tagline (text-lg, muted),
           primary CTA + secondary CTA side-by-side
SOCIAL     logos row LUB "trusted by N teams"
PROBLEM    single column, max-w-prose, ból użytkownika
SOLUTION   3 features w grid (icon + h3 + p), lub alternating sekcje
PROOF      testimonial (single quote, large) lub testimonial grid
CTA        wycentrowane, duże, restate value prop z jednym buttonem
FAQ        accordion, max-w-3xl
FOOTER     minimal: linki + © + maybe social
```

### Dashboard / app interior
```
TOP NAV    logo + (optional search) + user menu, h-14 do h-16
SIDEBAR    collapsible, primary nav, w-60 do w-64 expanded
MAIN
  HEADER   h1 (text-2xl/3xl) + breadcrumb + primary action po prawej
  CONTENT  grid kart / tabela / wykresy w gridzie — zaprojektowane empty states
  EMPTY    gdy brak danych: ilustracja + helpful copy + primary action
```

### Form page
```
SINGLE COLUMN, max-w-md do max-w-lg
H1 (text-2xl/3xl) + krótki opis (co + dlaczego)
Labels NAD inputami (nigdy obok, nigdy w środku jako placeholders only)
Logiczne grupy z gap-6 między grupami, gap-2 w grupie
Inline validation: errors pod field, destructive color, role="alert"
Submit: full-width na mobile, right-aligned na desktop
NIGDY captcha walls zanim user nic nie wpisał
```

### Content / blog page
```
SINGLE COLUMN, max-w-prose (≈65ch) — czytelność first
H1 (text-4xl), subtitle (text-lg muted), data publikacji (text-sm muted)
Body: leading-relaxed, generous paragraph spacing
Obrazy break out: max-w-4xl, centered, z captionem
Footnotes / references na końcu
Reading time na górze to miły dotyk
```

### Empty / error / loading states
```
EMPTY     center, ilustracja (lub duża ikona), heading, krótki copy, jedna akcja
ERROR     center, ikona (destructive tone), co się stało, sugerowany fix
LOADING   skeleton screens > spinnery dla content; spinnery dla akcji
```

Zaprojektuj je ZANIM ich potrzebujesz. Empty state to często pierwsza rzecz którą widzi nowy user.

## System spacingu (8pt grid)

Tailwind defaults śledzą 8pt. Używaj wartości ze skali, nigdy arbitrary:

| Kontekst | Tailwind | px |
|---|---|---|
| Tightly related (ikona + label) | `gap-2` | 8 |
| W obrębie karty | `gap-4` | 16 |
| Między kartami w gridzie | `gap-6` | 24 |
| Między sub-sekcjami | `gap-8` | 32 |
| Między głównymi sekcjami (vertical) | `py-16` | 64 |
| Między głównymi sekcjami (large) | `py-24` | 96 |
| Wokół hero | `py-24` do `py-32` | 96–128 |

**Zakazane:** `mt-[17px]`, `gap-[23px]`. Jeśli skala tego nie ma, nie potrzebujesz tego.

## Decyzje kompozycyjne

### Center czy left-align dla headline?
- Marketing landing hero: center działa (to moment)
- Wewnątrz aplikacji: left-align (szybciej skanować)
- Single CTA section: center
- Multi-section content: wybierz jedno i trzymaj się

### Container width per content
| Content | max-w-* |
|---|---|
| Body paragraphs | `prose` (~65ch) |
| Marketing headlines | `3xl` |
| Feature grids | `6xl` do `7xl` |
| Formularze | `md` do `lg` |
| Hero text + tagline | `3xl` |
| Dashboard main | `7xl` lub full z sidebarem |

### Grid column counts
- **1 col mobile → 3 cols desktop** — klasyk dla features, services, cards
- **1 col mobile → 2 cols desktop** — testimonials, blog index, side-by-side comparisons
- **4 cols na desktop** — tylko dla icon+title-only cards (no deep content)
- **2 cols mobile→desktop** — rzadko; zazwyczaj czuje się boxy

### Unikaj grid orphans
`grid-cols-3` z 7 itemami zostawia samotny rząd 1.
- Zaplanuj content count żeby pasował do grida
- Lub użyj `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` z content count podzielnym przez 6
- Lub zaprojektuj ostatni rząd intencjonalnie (centered, lub full-width hero card)

## Component sizing standards

| Element | Mobile min | Desktop typical |
|---|---|---|
| Tap target (button, link) | 44×44px (`h-11`) | 40×40px (`h-10`) |
| Form input height | `h-11` | `h-10` |
| Icon button | `size-10` | `size-9` |
| Card padding | `p-4` do `p-6` | `p-6` do `p-8` |
| Section vertical padding | `py-12` | `py-16` do `py-24` |

## Częste błędy (review checklist)

❌ **Wszystkie buttony równej wagi wizualnej** — różnicuj primary / secondary / tertiary przez filled / outline / ghost
❌ **Wycentrowany body text** — left-aligned czyta się szybciej; center tylko krótkie copy
❌ **Brak jasnej primary akcji** — każdy widok powinien mieć JEDEN oczywisty next step
❌ **Dekoracyjne cienie wszędzie** — shadow sygnalizuje elevation; jeśli nic nie jest elevated, brak shadow
❌ **Cramped sekcje** — `py-8` wygląda na nerwowe; celuj w `py-16+` dla głównych sekcji
❌ **Utracona hierarchia** — wiele `font-bold` paragrafów = nic nie jest emphasized
❌ **Random max-widths** — `max-w-[742px]` to code smell; używaj skali
❌ **Pierwszy viewport upchany** — pozwól hero oddychać; nie wszystko above the fold
❌ **Brak zaprojektowanego empty state** — "no data" to lenistwo; zaprojektuj absencję
❌ **Headingi pominięte** — h1 → h2 → h3 w kolejności; nigdy h1 → h3 dla powodów rozmiarowych (użyj `<h2 className="text-xl">`)
❌ **Tap targety za małe** — `<button className="text-xs p-1">` nie spełnia 44px minimum

## Model mentalny: "senior review pass"

Przed uznaniem layoutu za skończony, zapytaj:

1. **Jaka jest JEDNA rzecz, której chcę żeby user zrobił tu?** Czy to widać od razu?
2. **Czy mogę cokolwiek usunąć?** Dekoracyjne borders, redundant ikony, niepotrzebne shadows?
3. **Czy moje oko wie gdzie pójść first?** Jeśli nie, hierarchia nie działa.
4. **Przy 375px wide, czy to nadal działa?** Mobile to default reality.
5. **Tab klawiaturą — czy mogę dotrzeć do wszystkiego?** Jeśli nie, napraw focus order.
6. **Czy to wygląda intencjonalnie, czy AI-generic?** Jeśli generic: less jest zazwyczaj odpowiedzią.

W razie wątpliwości: USUŃ przed dodaniem.
