const keywords = [
  "Systemy GK",
  "Gładzie",
  "Szpachlowanie",
  "Malowanie",
  "Panele podłogowe",
  "Sufity podwieszane",
  "Ścianki działowe",
  "Kostka brukowa",
  "Podjazdy",
  "Tarasy",
  "Chodniki",
  "Podbudowa",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {keywords.map((word) => (
        <div key={word} className="flex items-center">
          <span className="px-6 font-display text-xl font-medium text-foreground/80 sm:text-2xl">
            {word}
          </span>
          <span className="text-brand" aria-hidden="true">
            ◆
          </span>
        </div>
      ))}
    </div>
  );
}

/** Dekoracyjny, nieskończony pasek słów-kluczy. Czysto wizualny. */
export function KeywordMarquee() {
  return (
    <div className="overflow-hidden border-y border-border bg-secondary py-5">
      <div className="flex w-max animate-marquee" aria-hidden="true">
        <Row />
        <Row />
      </div>
    </div>
  );
}
