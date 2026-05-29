import { navLinks, siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-primary-foreground/15 bg-primary text-primary-foreground [--ring:var(--primary-foreground)]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="font-display text-2xl font-bold tracking-tight">
              KR-BUD<span className="text-brand">.</span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              Solidne wykończenia wnętrz i brukarstwo z pełną, pisemną gwarancją.
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

          <div className="lg:col-span-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-primary-foreground/50">
              Kontakt
            </h2>
            <ul className="mt-4 flex flex-col gap-1 text-sm">
              <li>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="inline-block rounded-sm py-1.5 text-primary-foreground/80 underline-offset-4 transition-colors hover:text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-primary"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-block break-words rounded-sm py-1.5 text-primary-foreground/80 underline-offset-4 transition-colors hover:text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-primary"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="py-1.5 text-primary-foreground/70">
                {siteConfig.contact.area}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-primary-foreground/15 pt-6 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {siteConfig.legalName}
          </span>
          <span>Wykończenia · Brukarstwo · Gwarancja</span>
        </div>
      </div>
    </footer>
  );
}
