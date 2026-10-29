import { Link } from "@tanstack/react-router";
import { CalendarX2, Lock, ShieldCheck, type LucideIcon } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { usePageMeta } from "@/lib/use-page-meta";

const POLICIES: { id: string; icon: LucideIcon; title: string; points: string[] }[] = [
  {
    id: "cancellation",
    icon: CalendarX2,
    title: "Cancellation & rescheduling",
    points: [
      "Cancel or reschedule free of charge up to 24 hours before the agreed start time.",
      "Cancellations within 24 hours may attract a fee agreed with you when the booking is confirmed.",
      "If a worker cannot attend, we will tell you as early as possible and offer a replacement or a new time.",
      "No payment is taken on this website. Any fees are agreed with you directly and confirmed in writing.",
      "To cancel, message us on WhatsApp with your name and booking date.",
    ],
  },
  {
    id: "privacy",
    icon: Lock,
    title: "Privacy",
    points: [
      "This website does not currently create accounts or store booking or application details. Information you choose to send reaches us through WhatsApp.",
      "We use your details only to arrange and support your booking or application, and never sell them.",
      "Customer addresses are shared with an assigned worker only once a booking is confirmed.",
      "Worker profiles show a first name and initial, city, services and experience — never home addresses or ID numbers.",
      "Profile photos are displayed only after the worker consents and our team approves them.",
      "You may ask us at any time to see, correct or delete the information we hold about you.",
    ],
  },
  {
    id: "safety",
    icon: ShieldCheck,
    title: "Safety",
    points: [
      "Workers are listed as “Verified” only after our team completes an interview, confirms identity and checks references.",
      "Profiles on this prototype website are clearly labelled samples and do not represent real people.",
      "Customers are expected to provide a safe, respectful working environment. Harassment of workers is not tolerated.",
      "Keep valuables secured and agree house rules with your worker on the first visit.",
      "Report any concern to us on WhatsApp straight away. In an emergency, call 112 first.",
    ],
  },
];

export default function Policies() {
  usePageMeta({ title: "Safety & policies" });

  return (
    <>
      <PageHeader
        eyebrow="Trust"
        title="Cancellation, privacy & safety"
        description="Clear, fair commitments to customers and workers alike."
      >
        <nav aria-label="Policy sections" className="mt-8 flex flex-wrap gap-2">
          {POLICIES.map((policy) => (
            <a
              key={policy.id}
              href={`#${policy.id}`}
              className="rounded-full border bg-card px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary"
            >
              {policy.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:px-6 md:py-16">
        {POLICIES.map((policy) => (
          <section
            key={policy.id}
            id={policy.id}
            className="scroll-mt-24 rounded-2xl border bg-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-primary text-gold">
                <policy.icon className="size-5" aria-hidden="true" />
              </span>
              <h2 className="text-2xl font-medium text-primary">{policy.title}</h2>
            </div>
            <ul className="mt-6 space-y-3">
              {policy.points.map((point) => (
                <li key={point} className="flex gap-3 leading-relaxed text-foreground/85">
                  <span
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="text-center text-sm text-muted-foreground">
          Questions?{" "}
          <Link to="/contact" className="font-semibold text-primary hover:underline">
            Contact our team
          </Link>
          . These summaries will be reviewed and expanded into full terms before launch.
        </p>
      </div>
    </>
  );
}
