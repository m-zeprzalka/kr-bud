"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type RevealProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Opóźnienie startu animacji w ms (do efektu kaskady). */
  delay?: number;
};

/**
 * Subtelne wejście on-scroll (fade + lekki translate).
 * Respektuje prefers-reduced-motion (pokazuje od razu, bez ruchu).
 * Fallback no-JS: [data-reveal] jest wymuszany na widoczny w globalnym <noscript>.
 */
export function Reveal({ className, delay = 0, children, ...props }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        // Reduced-motion: pokaż od razu, bez ruchu (motion-reduce override).
        "transition-[opacity,transform] duration-700 ease-out will-change-[opacity,transform] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
