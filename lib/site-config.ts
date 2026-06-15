/**
 * KR-BUD — centralna konfiguracja strony (single source of truth).
 *
 * Dane kontaktowe to prawdziwe dane dwóch wykonawców:
 *   • Grzegorz — wykończenia wnętrz (kontakt też przez WhatsApp)
 *   • Marek    — brukarstwo / kostka
 *
 * Zdjęcia: wyłącznie realne realizacje z /public (żadnych zewnętrznych CDN).
 * Aby dodać zdjęcie, wrzuć plik do /public i wskaż jego ścieżkę w `images`.
 */

export type SiteImage = { src: string; alt: string };

export const siteConfig = {
  name: "KR-BUD",
  legalName: "KR-BUD",
  tagline: "Wykończenia wnętrz i brukarstwo · Puławy",
  description:
    "Wykończenia wnętrz i brukarstwo w Puławach i okolicy (do 100 km) — z pełną, pisemną gwarancją. Systemy GK, gładzie, malowanie, panele podłogowe, układanie kostki brukowej. Bezpłatna wycena i dojazd.",
  url: "https://kr-bud.pl",

  // ── DANE KONTAKTOWE ─────────────────────────────────────────────────
  contact: {
    area: "Puławy + 100 km",
    location: {
      city: "Puławy",
      postalCode: "24-100",
      region: "województwo lubelskie",
      country: "PL",
      // środek Puław — do danych strukturalnych (geo / areaServed)
      lat: 51.4866,
      lng: 21.9686,
    },
    people: [
      {
        name: "Grzegorz",
        role: "Wykończenia wnętrz",
        phoneDisplay: "797 060 079",
        phoneHref: "tel:+48797060079",
        whatsapp: "https://wa.me/48797060079",
        email: "thegoodpainter1984@gmail.com",
      },
      {
        name: "Marek",
        role: "Brukarstwo",
        phoneDisplay: "731 976 191",
        phoneHref: "tel:+48731976191",
        whatsapp: null,
        email: "marek.kramek@wp.pl",
      },
    ],
  },
} as const;

export const navLinks = [
  { label: "Usługi", href: "#uslugi" },
  { label: "Realizacje", href: "#realizacje" },
  { label: "Gwarancja", href: "#gwarancja" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

/**
 * Biblioteka zdjęć — wyłącznie realne realizacje wnętrz z /public.
 * (Brak zdjęć brukarstwa — sekcja brukarska ma wariant typograficzny do czasu
 *  dostarczenia zdjęć kostki.)
 */
export const images = {
  // Hero + sekcje
  heroInterior: {
    src: "/5964.jpg",
    alt: "Jasny salon z bordowymi fotelami klubowymi i rośliną przy oknie — realizacja KR-BUD w Puławach",
  },
  interiorHallway: {
    src: "/5970.jpg",
    alt: "Przestronny hol z podłogą z jasnego drewna ułożoną w jodełkę i ciemnymi ościeżnicami drzwi",
  },
  interiorMaterials: {
    src: "/6010.jpg",
    alt: "Luksusowy salon ze skórzanymi sofami, marmurowym kominkiem i mosiężnymi lampami",
  },

  // Galeria realizacji
  gSalon: {
    src: "/5986.jpg",
    alt: "Elegancki, symetryczny salon z kremowymi sofami i grafikami na beżowej ścianie",
  },
  gKitchen: {
    src: "/5954.jpg",
    alt: "Jasna kuchnia z marmurową wyspą i przeszkloną ścianą wychodzącą na patio",
  },
  gBedroom: {
    src: "/6001.jpg",
    alt: "Stylowa sypialnia z koralową ścianą akcentową i rattanowym wezgłowiem łóżka",
  },
  gFloor: {
    src: "/5992.jpg",
    alt: "Hol z ciepłą podłogą z drewna orzechowego i białą sztukaterią",
  },
  gCorridor: {
    src: "/5922.jpg",
    alt: "Jasny korytarz wejściowy z białymi przeszklonymi drzwiami i drewnianą podłogą",
  },
  gStairs: {
    src: "/6025.jpg",
    alt: "Klasyczny hol z drewnianymi schodami, beżowym chodnikiem i białą boazerią kasetonową",
  },
  gLiving: {
    src: "/6007.jpg",
    alt: "Przestronny salon z aksamitną sofą otwarty na kuchnię z jadalnią",
  },

  // Brukarstwo — realne zdjęcie układania kostki brukowej.
  paving: {
    src: "/kostka.jpg",
    alt: "Układanie kostki brukowej na podsypce — realizacja brukarska KR-BUD w Puławach",
  },
} as const satisfies Record<string, SiteImage>;

/** Zakresy usług — rdzeń oferty. `image` opcjonalne (brak = wariant typograficzny). */
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
    image: images.interiorHallway,
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
    image: images.paving,
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
