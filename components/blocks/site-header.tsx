"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/lib/site-config";

function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-lg font-bold tracking-tight text-foreground",
        className,
      )}
    >
      KR-BUD<span className="text-brand">.</span>
    </span>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Zamknij menu i — po zdjęciu blokady scrolla przez Radix — płynnie przewiń do
  // sekcji. Offset spod sticky headera daje scroll-mt-20 na sekcjach docelowych.
  const goToSection = (href: string) => {
    setOpen(false);
    window.setTimeout(() => {
      const el = document.querySelector(href);
      if (!(el instanceof HTMLElement)) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      window.history.replaceState(
        null,
        "",
        href === "#top" ? window.location.pathname : href,
      );
    }, 130);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20">
        <a
          href="#top"
          className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="KR-BUD — strona główna"
        >
          <Wordmark />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Główna">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative rounded-sm text-sm font-medium text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {link.label}
              <span
                className="absolute -bottom-1.5 left-0 h-px w-0 bg-brand transition-[width] duration-300 ease-out group-hover:w-full"
                aria-hidden="true"
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <Button asChild variant="brand" size="md" className="hidden lg:inline-flex">
            <a href="#kontakt">Bezpłatna wycena</a>
          </Button>

          {/* Mobile menu */}
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Otwórz menu">
                <Menu className="size-5" />
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm" />
              <Dialog.Content
                className="fixed inset-0 z-50 flex flex-col bg-background focus:outline-none"
                aria-describedby={undefined}
              >
                <Dialog.Title className="sr-only">Menu nawigacji</Dialog.Title>

                {/* Górna belka — identyczna geometria jak sticky header (h-16 lg:h-20,
                    ten sam padding i mx-auto/max-w-7xl), by X pokrywał się z hamburgerem. */}
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20">
                  <button
                    type="button"
                    onClick={() => goToSection("#top")}
                    className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-label="KR-BUD — strona główna"
                  >
                    <Wordmark />
                  </button>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <ThemeToggle />
                    <Dialog.Close asChild>
                      <Button variant="ghost" size="icon" aria-label="Zamknij menu">
                        <X className="size-5" />
                      </Button>
                    </Dialog.Close>
                  </div>
                </div>

                <nav
                  className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-2 px-5 sm:px-8"
                  aria-label="Mobilna"
                >
                  {navLinks.map((link, i) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        goToSection(link.href);
                      }}
                      className="group flex items-baseline gap-4 border-b border-border py-4 font-display text-3xl font-semibold tracking-tight text-foreground transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-4xl"
                    >
                      <span className="font-mono text-sm font-normal text-muted-foreground">
                        0{i + 1}
                      </span>
                      {link.label}
                    </a>
                  ))}
                </nav>

                <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 pt-6 pb-[max(1.25rem,var(--spacing-safe-bottom))] sm:px-8">
                  <Button asChild variant="brand" size="lg">
                    <a
                      href="#kontakt"
                      onClick={(e) => {
                        e.preventDefault();
                        goToSection("#kontakt");
                      }}
                    >
                      Bezpłatna wycena
                    </a>
                  </Button>
                  {siteConfig.contact.people.map((person) => (
                    <Button key={person.email} asChild variant="outline" size="lg">
                      <a
                        href={person.phoneHref}
                        onClick={() => setOpen(false)}
                        aria-label={`Zadzwoń — ${person.role}, ${person.phoneDisplay}`}
                      >
                        <Phone className="size-4" aria-hidden="true" />
                        {person.role}
                      </a>
                    </Button>
                  ))}
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
