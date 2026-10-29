import * as React from "react";

import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-gold-foreground uppercase",
        className,
      )}
    >
      <span className="h-px w-6 bg-gold" aria-hidden="true" />
      {children}
    </p>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b bg-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-gold/15 blur-3xl"
      />
      <div className="relative mx-auto max-w-content px-4 py-14 sm:px-6 md:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] font-medium text-primary md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-reading text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function PrototypeNote({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="note"
      className="flex items-start gap-3 rounded-xl border border-gold/50 bg-gold-soft/60 px-4 py-3 text-sm leading-relaxed text-gold-foreground"
    >
      <span className="mt-0.5 rounded-full bg-gold px-2 py-0.5 text-[0.65rem] font-bold tracking-wider text-forest uppercase">
        Prototype
      </span>
      <p>{children}</p>
    </div>
  );
}
