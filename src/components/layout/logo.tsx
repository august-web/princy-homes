import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/site";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("size-9", className)}>
      <rect width="40" height="40" rx="11" className="fill-primary" />
      <path
        d="M20 9.5 9.5 18v12.5h7.25v-7h6.5v7h7.25V18z"
        className="fill-none stroke-primary-foreground"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M20 15.5c-1.6-1.9-4.6-1.2-4.6 1.2 0 2.1 2.6 3.6 4.6 5.1 2-1.5 4.6-3 4.6-5.1 0-2.4-3-3.1-4.6-1.2z"
        className="fill-gold"
      />
    </svg>
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      aria-label={`${SITE_NAME} — home`}
    >
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.05rem] font-semibold tracking-[0.08em]",
            inverted ? "text-cream" : "text-primary",
          )}
        >
          PRINCY
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.6rem] font-semibold tracking-[0.32em]",
            inverted ? "text-gold" : "text-gold-foreground",
          )}
        >
          HOME SERVICE
        </span>
      </span>
    </Link>
  );
}
