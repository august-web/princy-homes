import { Link } from "@tanstack/react-router";
import { BadgeCheck, Briefcase, Clock3, Languages, MapPin, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { isVerified, serviceName } from "@/data/queries";
import type { Verification, Worker } from "@/data/types";
import { cn } from "@/lib/utils";

const VERIFICATION_STYLES: Record<
  Verification,
  { label: string; icon: typeof BadgeCheck; cls: string }
> = {
  verified: { label: "Verified", icon: BadgeCheck, cls: "bg-accent text-primary" },
  pending: {
    label: "Verification in progress",
    icon: Clock3,
    cls: "bg-gold-soft text-gold-foreground",
  },
  "not-verified": {
    label: "Not yet verified",
    icon: ShieldAlert,
    cls: "bg-muted text-muted-foreground",
  },
};

export function VerificationBadge({
  status,
  className,
}: {
  status: Verification;
  className?: string;
}) {
  const { label, icon: Icon, cls } = VERIFICATION_STYLES[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        cls,
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}

function initials(displayName: string) {
  return displayName
    .replace(/^Sample\s*—\s*/, "")
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function WorkerAvatar({
  worker,
  size = "lg",
}: {
  worker: Worker;
  size?: "lg" | "sm";
}) {
  const sizeClass = size === "lg" ? "size-20 text-2xl" : "size-10 text-sm";

  if (worker.photoUrl) {
    return <img src={worker.photoUrl} alt="" className={cn(sizeClass, "rounded-2xl object-cover")} />;
  }

  return (
    <div
      className={cn(
        sizeClass,
        "grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-forest font-display text-gold ring-1 ring-gold/30",
      )}
      aria-hidden="true"
    >
      {initials(worker.displayName)}
    </div>
  );
}

export function WorkerCard({ worker }: { worker: Worker }) {
  const verified = isVerified(worker);

  return (
    <article className="group flex h-full flex-col rounded-2xl border bg-card p-5 shadow-[0_1px_2px_rgba(20,40,30,0.04)] transition-shadow hover:shadow-[0_12px_32px_-12px_rgba(20,60,40,0.25)] motion-reduce:transition-none">
      <div className="flex items-start gap-4">
        <WorkerAvatar worker={worker} />
        <div className="min-w-0 flex-1">
          {worker.isSample ? (
            <span className="mb-1.5 inline-block rounded-md border border-dashed border-gold px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wider text-gold-foreground uppercase">
              Sample profile
            </span>
          ) : null}
          <h3 className="truncate text-lg font-medium text-foreground">{worker.displayName}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden="true" />
            {worker.city}, {worker.state}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <VerificationBadge status={worker.verification} />
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-foreground/80">{worker.bio}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Services offered">
        {worker.services.map((id) => (
          <li
            key={id}
            className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
          >
            {serviceName(id)}
          </li>
        ))}
      </ul>

      <dl className="mt-4 grid grid-cols-2 gap-3 border-t pt-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Briefcase className="size-4 text-gold" aria-hidden="true" />
          <dt className="sr-only">Experience</dt>
          <dd>{worker.yearsExperience} yrs experience</dd>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Languages className="size-4 text-gold" aria-hidden="true" />
          <dt className="sr-only">Languages</dt>
          <dd className="truncate">{worker.languages.join(", ")}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-5">
        {verified ? (
          <Button asChild className="w-full rounded-full">
            <Link to="/book" search={{ worker: worker.id, service: worker.services[0] }}>
              Request this worker
            </Link>
          </Button>
        ) : (
          <Button disabled variant="outline" className="w-full rounded-full">
            Available after verification
          </Button>
        )}
      </div>
    </article>
  );
}
