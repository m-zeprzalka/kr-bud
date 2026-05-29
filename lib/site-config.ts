/**
 * KR-BUD — centralna konfiguracja strony.
 *
 * ⚠️  EDYTUJ TUTAJ: dane kontaktowe poniżej to placeholdery.
 *     Podmień telefon / e-mail / obszar na prawdziwe — to jedyne miejsce.
 *
 * Zdjęcia: zweryfikowane realne zdjęcia z Unsplash (CDN). Aby użyć własnych,
 * wrzuć plik do /public i zamień `src` na np. "/realizacje/taras.jpg".
 */

export type SiteImage = { src: string; alt: string };

/** Buduje URL Unsplash; next/image dokłada wymiary i format responsywnie. */
const u = (id: string): string =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop`;

export const siteConfig = {
  name: "KR-BUD",
  legalName: "KR-BUD",
  tagline: "Wykończenia wnętrz i brukarstwo",
  description:
    "Solidne wykończenia wnętrz i brukarstwo z pełną, pisemną gwarancją. Systemy GK, gładzie, malowanie, panele, układanie kostki brukowej. Bezpłatna wycena.",
  url: "https://kr-bud.pl",

  // ── DANE KONTAKTOWE (placeholdery — podmień na prawdziwe) ───────────
  contact: {
    phoneDisplay: "+48 XXX XXX XXX",
    phoneHref: "tel:+48000000000",
    email: "kontakt@kr-bud.pl",
    area: "Twoja miejscowość + 100 km",
  },
} as const;

export const navLinks = [
  { label: "Usługi", href: "#uslugi" },
  { label: "Realizacje", href: "#realizacje" },
  { label: "Gwarancja", href: "#gwarancja" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

/** Zweryfikowana biblioteka zdjęć (wszystkie sprawdzone: 200 OK + content). */
export const images = {
  // Wnętrza
  interiorMustard: {
    src: u("1586023492125-27b2c045efd7"),
    alt: "Minimalistyczny salon z musztardowym fotelem i gładkimi ścianami",
  },
  interiorLiving: {
    src: u("1600566753086-00f18fb6b3ea"),
    alt: "Nowoczesny salon z otwartą klatką schodową po wykończeniu",
  },
  interiorWarm: {
    src: u("1600210492486-724fe5c67fb0"),
    alt: "Ciepły salon ze skórzaną sofą i wykończonymi powierzchniami",
  },
  floorHerringbone: {
    src: u("1493809842364-78817add7ffb"),
    alt: "Salon z podłogą w jodełkę i listwami przypodłogowymi",
  },
  kitchenBrass: {
    src: u("1565538810643-b5bdb714032a"),
    alt: "Nowoczesna kuchnia z blatem kwarcowym i mosiężną armaturą",
  },
  kitchenDark: {
    src: u("1484154218962-a197022b5858"),
    alt: "Kuchnia z białymi frontami, ciemną ścianą i drewnianą podłogą",
  },
  bathroomTiles: {
    src: u("1604709177225-055f99402ea3"),
    alt: "Łazienka wykończona wielkoformatowymi płytami w odcieniu betonu",
  },
  bedroomNavy: {
    src: u("1521783988139-89397d761dce"),
    alt: "Sypialnia premium z tapicerowanym zagłówkiem w kolorze granatu",
  },
  concreteFloor: {
    src: u("1497366216548-37526070297c"),
    alt: "Przestrzeń z gładką posadzką betonową i ścianką działową",
  },

  // Bryła / kontekst
  houseDusk: {
    src: u("1600585154340-be6161a56a0c"),
    alt: "Nowoczesny dom o zmierzchu z rozświetlonym wnętrzem",
  },

  // Brukarstwo
  paveDriveway: {
    src: u("1707313980602-398d13f6a9e4"),
    alt: "Podjazd z kostki brukowej ułożonej w jodełkę",
  },
  paveGarden: {
    src: u("1719805020273-dbacf7b940fd"),
    alt: "Ścieżka z kostki brukowej prowadząca przez ogród",
  },
  paveTexture: {
    src: u("1657045898661-1a56bc5a8fd2"),
    alt: "Zbliżenie na ułożoną kostkę brukową — precyzyjne spoiny",
  },
  paveStacks: {
    src: u("1777269390561-3528b8c2cfd4"),
    alt: "Spaletowana kostka brukowa renomowanej marki gotowa do układania",
  },
  paveCourtyard: {
    src: u("1710216833775-2df26e7d8870"),
    alt: "Rozległy plac wyłożony kostką brukową",
  },

  // Proces
  workSite: {
    src: u("1504307651254-35680f356dfd"),
    alt: "Ekipa KR-BUD podczas prac na budowie",
  },
  blueprint: {
    src: u("1503387762-592deb58ef4e"),
    alt: "Przygotowanie kosztorysu i planu prac na podstawie rysunku",
  },
} as const satisfies Record<string, SiteImage>;

/** Zakresy usług — rdzeń oferty. */
export type ServiceItem = { name: string; description: string };
export type Service = {
  index: string;
  id: string;
  title: string;
  lead: string;
  items: ServiceItem[];
  image: SiteImage;
};

export const services: Service[] = [
  {
    index: "01",
    id: "wnetrza",
    title: "Wykończenia wnętrz",
    lead: "Dbamy o to, by wnętrze Twojego domu było nie tylko ładne, ale i trwałe — od stanu surowego po gotowy do zamieszkania.",
    image: images.interiorWarm,
    items: [
      {
        name: "Systemy GK",
        description:
          "Sufity podwieszane i ścianki działowe. Szybka i efektowna zmiana układu pomieszczeń.",
      },
      {
        name: "Gładzie i szpachlowanie",
        description:
          "Powierzchnie idealnie przygotowane pod malowanie — bez pęknięć i nierówności.",
      },
      {
        name: "Malowanie",
        description:
          "Estetyka na najwyższym poziomie: czyste narożniki i równomierne pokrycie kolorem.",
      },
      {
        name: "Panele podłogowe",
        description:
          "Precyzyjne układanie podłóg wraz z kompletnym wykończeniem listwowym.",
      },
    ],
  },
  {
    index: "02",
    id: "brukarstwo",
    title: "Brukarstwo",
    lead: "Solidny podjazd to wizytówka Twojego domu. Klucz do sukcesu leży pod ziemią — i właśnie tam zaczynamy.",
    image: images.paveDriveway,
    items: [
      {
        name: "Układanie kostki brukowej",
        description: "Tarasy, podjazdy, chodniki i ścieżki — równo i z charakterem.",
      },
      {
        name: "Solidna baza",
        description:
          "Profesjonalne korytowanie i podbudowa, które gwarantują brak zapadlisk na lata.",
      },
    ],
  },
];
