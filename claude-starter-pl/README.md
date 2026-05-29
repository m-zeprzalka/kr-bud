# Claude Starter dla Next.js + shadcn + Tailwind

System konfiguracji, który zamienia Claude'a w seniorskiego frontend developera podążającego za Twoimi standardami na każdym projekcie.

---

## Spis treści

1. [Co to jest](#1-co-to-jest)
2. [Architektura systemu](#2-architektura-systemu)
3. [Jak Claude tego używa (mechanizm)](#3-jak-claude-tego-używa-mechanizm)
4. [Setup w nowym projekcie](#4-setup-w-nowym-projekcie)
5. [Workflow dzienny](#5-workflow-dzienny)
6. [Dlaczego to podejście wygrywa](#6-dlaczego-to-podejście-wygrywa)
7. [Co świadomie pominęliśmy](#7-co-świadomie-pominęliśmy)
8. [Utrzymanie długoterminowe](#8-utrzymanie-długoterminowe)
9. [Roadmapa rozwoju](#9-roadmapa-rozwoju)

---

## 1. Co to jest

Zestaw plików konfiguracyjnych w formacie Markdown, który Claude czyta przy każdej sesji pracy nad projektem. Definiuje:

- **Stack technologiczny** z konkretnymi wersjami
- **Architekturę folderów** i zależności między warstwami
- **Top 10 nienaruszalnych zasad** kodowania
- **6 wyspecjalizowanych skilli** z głęboką wiedzą domenową

Efekt: Claude generuje kod, który wygląda jakby napisał go senior z 10-letnim doświadczeniem, podążający za konkretnymi konwencjami. Bez konieczności powtarzania zasad w każdym promptcie.

**Dla kogo:** programiści używający Claude Code, Claude w przeglądarce lub innych narzędzi Anthropic, którzy budują strony i aplikacje w Next.js + shadcn + Tailwind.

---

## 2. Architektura systemu

```
projekt/
├── CLAUDE.md                              ← MASTER (~80 linii, zawsze ładowane)
└── .claude/
    └── skills/                            ← DOMENY (ładowane na żądanie)
        ├── projektowanie-layoutow/
        │   └── SKILL.md                   Estetyka i hierarchia wizualna
        ├── budowa-komponentow/
        │   └── SKILL.md                   Wzorce komponentów + shadcn + CVA
        ├── system-stylowania/
        │   └── SKILL.md                   Tokeny, spacing, typografia
        ├── responsywnosc/
        │   └── SKILL.md                   Mobile-first patterns
        ├── dostepnosc/
        │   └── SKILL.md                   WCAG AA, klawiatura, ARIA
        └── formularze-i-mutacje/
            └── SKILL.md                   react-hook-form + zod + Server Actions
```

### Dwie warstwy dokumentacji

**WARSTWA 1: CLAUDE.md** — kontekst projektu

- Czytany przy starcie każdej sesji
- Pod 100 linii (kluczowe dla skuteczności)
- Zawiera: stack, strukturę folderów, top 10 zasad, indeks skilli
- Stabilny — rzadko zmieniany

**WARSTWA 2: Skille** — wiedza specjalistyczna

- Ładowane tylko gdy aktualne zadanie pasuje do opisu skilla
- Każdy skill ma frontmatter YAML z `name` i `description`
- `description` to **trigger** — Claude czyta wszystkie opisy i decyduje który skill załadować
- Mogą być długie (200–300 linii) bo nie ładują się wszystkie naraz

### Dlaczego ta separacja

LLM-y mają ograniczoną uwagę. Badania (Vercel evals, 2026) pokazały:
- **Statyczny zwarty kontekst = 100% pass rate**
- **Dynamiczne pobieranie kontekstu = 79% pass rate**
- **AI zawodzi w 56% decyzji "fetch albo nie fetch"**

Wniosek: krótki, stabilny master file + głęboka wiedza ładowana po pewnym matchingu (description match) > jeden ogromny plik > AI decyduje sam co czytać.

---

## 3. Jak Claude tego używa (mechanizm)

### Co dzieje się przy starcie sesji

```
1. Claude otwiera projekt
2. Czyta CLAUDE.md → ma stack, foldery, top 10 zasad, indeks skilli
3. Czyta frontmatter (description) każdego SKILL.md → wie co umie który skill
4. Czeka na pierwsze zadanie
```

### Co dzieje się przy zadaniu

```
TY: "Stwórz hero section dla landing page SaaS"

CLAUDE: 
  → Już ma CLAUDE.md w kontekście (stack, zasady)
  → Matchuje "hero section", "landing page" przeciwko description każdego skilla
  → Auto-invokes 3 skille jednocześnie:
      • projektowanie-layoutow (matched: "hero", "landing", "layout")
      • budowa-komponentow (matched: "stwórz", "section")
      • responsywnosc (matched: "landing page" — zawsze responsywna)
  → Generuje hero respektując wszystkie zasady tych skilli
```

### Co konkretnie dostajesz w outputie

Bez tego systemu Claude generuje "AI-generic":
- Wszystko wycentrowane
- 5 różnych font sizes na jednej stronie
- 3 primary CTA obok siebie
- Decoracyjne shadowy wszędzie
- Hardcoded kolory `bg-blue-500`
- Brak focus rings
- Desktop-first z `sm:hidden` na mobile

Z tym systemem:
- Jedna primary akcja, jasna hierarchia
- 3 font sizes max
- Generous spacing (py-24+)
- Tokens (`bg-primary`, `bg-background`)
- Focus rings na każdym interaktywnym elemencie
- Mobile-first z `md:`/`lg:` skalującym up
- `asChild` polymorphism dla Button-as-Link
- Server Components default, `'use client'` tylko gdy niezbędne

To różnica między kodem od juniora a od seniora — zakodowana w plikach.

---

## 4. Setup w nowym projekcie

### Krok 1: Skopiuj pliki

```bash
# W roocie nowego projektu Next.js
cp -r path/to/claude-starter-pl/.claude .
cp path/to/claude-starter-pl/CLAUDE.md .

# Lub jeśli rozpakowałeś zip:
cp -r ~/Downloads/claude-starter-pl/.claude ~/Downloads/claude-starter-pl/CLAUDE.md .
```

### Krok 2: Dostosuj CLAUDE.md (5 minut)

Otwórz `CLAUDE.md` i dostosuj:
- Nazwę projektu (sekcja "Stack")
- Wersje bibliotek jeśli używasz innych niż domyślne
- Dodaj feature-specific zasady jeśli projekt tego wymaga (np. "używamy Supabase, nie Drizzle")

### Krok 3: Dodaj do .gitignore (opcjonalnie)

Jeśli chcesz przechowywać prywatne notatki:
```
# .gitignore
CLAUDE.local.md
.claude/skills/private/
```

Claude czyta także `CLAUDE.local.md` — używaj na osobiste preferencje, nie commitowane.

### Krok 4: Test

Otwórz projekt w Claude Code lub innym narzędziu Anthropic. Napisz:

> "Stwórz pricing section z 3 planami: Free, Pro, Enterprise"

Sprawdź czy output:
- ✅ Używa semantic tokenów (`bg-card`, `text-foreground`)
- ✅ Ma jedną wyraźną primary akcję per plan
- ✅ Mobile-first (jedna kolumna na mobile, 3 na desktop)
- ✅ Spójną typografię (max 3 font sizes)
- ✅ Generous spacing (gap-6 między planami, py-16+ na sekcję)
- ✅ Focus rings na buttonach
- ✅ Server Component (brak `'use client'`)

Jeśli któryś punkt zawodzi — wzmocnij regułę w odpowiednim skillu.

---

## 5. Workflow dzienny

### Pisanie nowych komponentów

```
TY: "Stwórz Card komponent z obrazkiem, tytułem i opisem"

CLAUDE:
1. Czyta budowa-komponentow SKILL
2. Decyduje: to atom (jeśli generic) → components/ui/card.tsx
3. Stosuje CVA dla wariantów (default, elevated, outlined)
4. Spread props dla rozszerzalności
5. asChild jeśli ma być linkiem
6. Focus ring + dostępność
```

### Projektowanie nowych stron

```
TY: "Zaprojektuj dashboard z sidebarem i grid'em kart statystyk"

CLAUDE:
1. Czyta projektowanie-layoutow + budowa-komponentow + responsywnosc
2. Sidebar collapsible (drawer na mobile, sticky na desktop)
3. Grid: 1 col mobile → 2 cols tablet → 4 cols desktop
4. py-8 na sekcję, gap-6 między kartami
5. Page header z h1 i primary action po prawej
6. Empty states gdy brak danych
```

### Formularz z walidacją

```
TY: "Formularz rejestracji: email, hasło, hasło potwierdzenie"

CLAUDE:
1. Czyta formularze-i-mutacje + dostepnosc
2. zod schema z refine() dla matching passwords
3. Server Action z Result type
4. react-hook-form z onBlur mode
5. Labels above inputs, aria-describedby dla errors
6. Submit disabled podczas isSubmitting + spinner
```

### Refactor istniejącego kodu

```
TY: "Zrefaktoruj ten komponent — używa bg-blue-500 wszędzie"

CLAUDE:
1. Czyta system-stylowania
2. Wymienia hardcoded kolory na semantic tokens
3. Usuwa dark: prefiksy (tokeny załatwiają dark mode)
4. Dodaje focus-visible:ring tam gdzie brakuje
```

### Code review przez Claude

```
TY: "Sprawdź ten plik pod kątem naszych standardów"

CLAUDE:
1. Czyta CLAUDE.md + relevant skille
2. Raportuje violations top 10 zasad
3. Sugeruje konkretne poprawki z code samples
```

---

## 6. Dlaczego to podejście wygrywa

### vs. brak konfiguracji (default Claude)

| Bez systemu | Z systemem |
|---|---|
| Random konwencje per chat | Jednolite konwencje w projekcie |
| Mieszane `default` + `named` exports | Konsekwentne named exports |
| `bg-blue-500` losowo z `bg-primary` | Wyłącznie semantic tokens |
| Brak focus ringów | Focus ring na każdym interaktywnym |
| Desktop-first | Mobile-first konsekwentnie |
| Brak hierarchii | Senior-grade visual hierarchy |
| Power użytkownik musi pamiętać | Power użytkownik dostaje to za darmo |

### vs. monolityczny AGENTS.md / .cursorrules

| Monolit (800 linii) | Modułowy (CLAUDE.md + skille) |
|---|---|
| AI ignoruje >200 instrukcji zbiorczo | Aktywne reguły zawsze pod kontrolą |
| Wszystko w kontekście = drogi token cost | Lazy loading = ~10x niższy default cost |
| Trudny do utrzymania (gdzie była ta reguła?) | Jedna troska per plik |
| Sprzeczności między sekcjami | Każda domena izolowana |
| Update = ryzyko regresji | Update jednego skilla = bezpieczne |

### vs. .cursor/rules/*.mdc (Cursor-specific)

**Cursor MDC** ma path-scoped rules przez glob frontmatter — to ciekawa technika, ale:
- Działa tylko w Cursor
- Wymaga sztywnego globowania ścieżek
- Nie jest mechanizmem skills (description-based invocation)

**CLAUDE.md + Skills** są szersze i mocniejsze:
- ✅ Działa w Claude Code, Claude.ai, Claude API, claude w Slack/JetBrains
- ✅ Skills uruchamiane przez **semantic match** (description), nie tylko ścieżki
- ✅ Skills są re-używalne między projektami (jedno źródło wiedzy)
- ✅ Native do Anthropic — będzie rozwijane przez Anthropic

### vs. SaaS w stylu "AI Coding Assistant" (Cursor, Cody, etc.)

Nie konkurujemy — uzupełniamy. **Skills działają obok dowolnego narzędzia AI**. To kontekst, nie zastępstwo Claude'a. Możesz używać Cursor + Skills przez Claude (w Cursor), Claude Code + Skills (terminal), Claude.ai + Skills (browser, jeśli wkleisz CLAUDE.md do projektu).

### Główne korzyści w jednym zdaniu

**Pisz zasady raz, zbieraj korzyści na każdym projekcie przez następne lata.**

Każdy projekt klienta korzysta z tego samego systemu. Zasady można aktualizować centralnie (template repo + GitHub Actions sync). Nowy projekt to `gh repo create my-project --template ...` z pełnym setupem.

---

## 7. Co świadomie pominęliśmy

Każdy projekt frontend wymaga **DZIESIĄTKI** umiejętności. Świadomie ograniczyliśmy się do 6, bo:

**Reguła "150–200 instrukcji"**: Claude konsekwentnie podąża za pierwszymi ~200 instrukcjami. Więcej = ignorowanie zbiorcze. 6 skilli × ~150 instrukcji each = 900 max, ale ładowanych jednocześnie maksymalnie 2-3 = ~450 aktywnych. To w sweet spot.

Świadomie pominięte (na razie):

- **Server-side rendering & data fetching** — RSC + Supabase patterns. Domyślne CLAUDE.md zasady wystarczą dla 80% przypadków
- **State management** — większość przypadków rozwiązuje RSC; client state to useState w komponencie
- **Animations** — Tailwind defaults i Motion. Dodawaj skill gdy zaczynasz robić więcej animacji
- **Testing** — Vitest + Playwright. Dodaj gdy projekt ma test coverage wymagane
- **SEO & metadata** — Next.js Metadata API jest declarative. Dodaj skill jeśli SEO jest core
- **Internationalization** — gdy faktycznie potrzebujesz, nie wcześniej
- **Performance optimization** — gdy mierzysz problem, nie spekulatywnie

**Zasada:** dodawaj skill DOPIERO gdy AI w tym obszarze konsekwentnie zawodzi w prawdziwych zadaniach. Nie spekulatywnie.

---

## 8. Utrzymanie długoterminowe

### Quarterly review (co 3 miesiące)

```
[ ] Otwórz każdy SKILL.md i CLAUDE.md
[ ] Dla każdej reguły zapytaj: "Czy Claude by to złamał bez tej zasady?"
    → NIE = usuń zasadę (token waste)
    → TAK = zostaw
[ ] Sprawdź pinned versions vs. aktualne (Next.js, shadcn)
[ ] Skonsoliduj jeśli widzisz duplikację między skillami
[ ] Zaktualizuj o nowe wnioski z minionych 3 miesięcy
```

### Gdy AI robi coś źle (continuous improvement)

```
1. Zauważasz Claude zrobił X źle (np. dodał decoracyjny shadow)
2. Idziesz do odpowiedniego skilla (projektowanie-layoutow)
3. Dodajesz regułę w sekcji "Common mistakes" + example
4. Następnym razem AI nie robi tego błędu
```

To **continuous learning system**. Im dłużej go używasz, tym lepszy się staje.

### Czego NIE robić

- ❌ Dodawanie zasad na zapas ("może kiedyś...")
- ❌ Dodawanie zasad zbyt szczegółowych dla jednego projektu
- ❌ Kopiowanie zasad z internetu bez sprawdzenia czy AI je łamie
- ❌ Pisanie zasad narracyjnie ("zazwyczaj preferujemy X choć są wyjątki")
- ❌ Dłuższy CLAUDE.md niż 200 linii

---

## 9. Roadmapa rozwoju

### Faza 1: użycie (pierwsze 2-4 tygodnie)

- Skopiuj system do następnych 2-3 projektów klienckich
- Obserwuj, gdzie Claude łamie zasady mimo skilli — to są luki
- Notuj feedback w `CLAUDE.local.md` (nie commitujesz)

### Faza 2: dostrajanie (miesiąc 2-3)

- Wzmocnij skille bazując na feedbacku
- Dodaj 1-2 nowe skille jeśli realnie potrzebne (`server-data`, `animations`, `testing`)
- Skonsoliduj duplikujące się reguły

### Faza 3: szablon (miesiąc 4)

- Push'uj wersję 1.0 jako GitHub template repo
- `gh repo create m-zeprzalka/claude-starter --template`
- Każdy nowy projekt: `gh repo create my-project --template m-zeprzalka/claude-starter`

### Faza 4: monetyzacja (opcjonalnie, miesiąc 6+)

To podstawa pod **commercial product**:
- Free tier: bazowe skille (open source, GitHub)
- Pro tier ($49–99): rozszerzone skille (server-data, animations, testing, performance, seo)
- Każdy nowy SaaS / agency landing kupiony przez ciebie = customer

Konkurencyjna pozycja: nie "AI tool" (jest ich miliard), ale **opinionated configuration that turns AI into a senior**. Dobre pozycjonowanie, bo:
- Wartość jest mierzalna (czas oszczędzony)
- Pozycja "senior" odróżnia (większość konkurencji to "boilerplate")
- Polski rynek nikt jeszcze nie zaadresował

---

## Stan obecny pakietu

```
Pliki:     8 (1 README, 1 CLAUDE.md, 6 SKILL.md)
Linii:     ~1700
Skills:    6 (projektowanie, komponenty, stylowanie, responsywność, dostępność, formularze)
Język:     polski (kod i terminy techniczne po angielsku, jak w branży)
Stack:     Next.js 16 + React 19 + TypeScript strict + Tailwind v4 + shadcn/ui v4
Licencja:  MIT (możesz robić co chcesz)
```

**Następny krok:** otwórz `CLAUDE.md` i sprawdź czy stack pasuje do twojego użycia. Jeśli tak — masz gotowy starter. Jeśli nie — dostosuj wersje.
