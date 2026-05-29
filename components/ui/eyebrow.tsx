import * as React from "react";

import { cn } from "@/lib/utils";

type EyebrowProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Numer porządkowy sekcji, np. "01". */
  index?: string;
};

/** Mono-label w stylu redakcyjnym: bursztynowa kreska + numer + tekst. */
export function Eyebrow({ index, className, children, ...props }: EyebrowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground",
        className,
      )}
      {...props}
    >
      <span className="h-px w-8 bg-brand" aria-hidden="true" />
      {index && <span className="tnum text-foreground">{index}</span>}
      <span>{children}</span>
    </div>
  );
}
