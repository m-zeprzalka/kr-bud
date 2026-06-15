import { navLinks, siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { people, area, location } = siteConfig.contact;

  return (
    <footer className="border-t border-primary-foreground/15 bg-primary text-primary-foreground [--ring:var(--primary-foreground)]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-5">
            <span className="font-display text-2xl font-bold tracking-tight">
              KR-BUD<span className="text-brand">.</span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              Solidne wykończenia wnętrz i brukarstwo z pełną, pisemną gwarancją.
            </p>
            <p className="mt-4 font-mono text-xs uppercase leading-relaxed tracking-[0.16em] text-primary-foreground/50">
              {location.city} {location.postalCode} · {location.region}
              <br />
              {area}
            </p>
          </div>

          <nav className="lg:col-span-3" aria-label="Stopka">
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-primary-foreground/50">
              Nawigacja
            </h2>
            <ul className="mt-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block rounded-sm py-1.5 text-sm text-primary-foreground/80 underline-offset-4 transition-colors hover:text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-primary-foreground/50">
              Kontakt
            </h2>
            <div className="mt-4 flex flex-col gap-5">
              {people.map((person) => (
                <div key={person.email}>
                  <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary-foreground/60">
                    {person.role}
                  </div>
                  <a
                    href={person.phoneHref}
                    className="mt-1 block rounded-sm text-sm font-medium text-primary-foreground/90 underline-offset-4 transition-colors hover:text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-primary"
                  >
                    {person.name} · <span className="tnum">{person.phoneDisplay}</span>
                  </a>
                  <a
                    href={`mailto:${person.email}`}
                    className="mt-0.5 block break-all rounded-sm text-xs text-primary-foreground/70 underline-offset-4 transition-colors hover:text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-primary"
                  >
                    {person.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-primary-foreground/15 pt-6 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {siteConfig.legalName} · Puławy
          </span>
          <span>Wykończenia · Brukarstwo · Gwarancja</span>
        </div>
      </div>
    </footer>
  );
}
