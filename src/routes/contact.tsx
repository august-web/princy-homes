import { Link } from "@tanstack/react-router";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { getServiceAreas } from "@/data/queries";
import { PHONE_DISPLAY, PHONE_TEL, waLink } from "@/lib/site";
import { usePageMeta } from "@/lib/use-page-meta";

const TOPICS = [
  {
    label: "Book a worker",
    text: "Hello PRINCY HOME SERVICE, I would like help booking a domestic worker.",
  },
  {
    label: "Question about a booking",
    text: "Hello PRINCY HOME SERVICE, I have a question about my booking request.",
  },
  {
    label: "Apply to work",
    text: "Hello PRINCY HOME SERVICE, I would like to apply to work with you.",
  },
  {
    label: "Report a concern",
    text: "Hello PRINCY HOME SERVICE, I would like to report a safety concern.",
  },
];

export default function Contact() {
  usePageMeta({ title: "Contact" });
  const areas = getServiceAreas();

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We’re a message away"
        description="The fastest way to reach our team is WhatsApp. Tell us what you need and we’ll respond as soon as we can."
      />

      <div className="mx-auto grid max-w-content gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.2fr_1fr]">
        <section className="relative overflow-hidden rounded-3xl bg-forest p-8 text-cream sm:p-10">
          <div
            className="pointer-events-none absolute -right-16 -bottom-16 size-72 rounded-full bg-gold/20 blur-3xl"
            aria-hidden="true"
          />
          <span className="grid size-14 place-items-center rounded-2xl bg-[#25D366] text-white">
            <MessageCircle className="size-7" aria-hidden="true" />
          </span>
          <h2 className="mt-6 text-3xl font-medium">Chat on WhatsApp</h2>
          <p className="mt-2 font-display text-4xl text-gold">{PHONE_DISPLAY}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-gold px-7 text-forest hover:bg-gold/90"
            >
              <a href={waLink()} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" /> Open WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-cream/30 bg-transparent px-7 text-cream hover:bg-cream/10 hover:text-cream"
            >
              <a href={`tel:${PHONE_TEL}`}>
                <Phone aria-hidden="true" /> Call 09162119265
              </a>
            </Button>
          </div>

          <h3 className="mt-10 font-sans text-sm font-semibold tracking-[0.2em] text-gold uppercase">
            Start with a topic
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {TOPICS.map((topic) => (
              <a
                key={topic.label}
                href={waLink(topic.text)}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-cream/25 px-4 py-2 text-sm hover:border-gold hover:text-gold"
              >
                {topic.label}
              </a>
            ))}
          </div>
        </section>

        <div className="space-y-5">
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center gap-3">
              <Clock className="size-5 text-gold" aria-hidden="true" />
              <h2 className="text-lg font-medium">Response times</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              We aim to reply to WhatsApp messages during business hours, Monday to Saturday.
              Messages sent outside these hours are answered the next working day.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center gap-3">
              <MapPin className="size-5 text-gold" aria-hidden="true" />
              <h2 className="text-lg font-medium">Launch cities</h2>
            </div>
            <ul className="mt-3 divide-y text-sm">
              {areas.map((area) => (
                <li key={area.city} className="flex justify-between py-2.5">
                  <span>
                    {area.city}, {area.state}
                  </span>
                  <span
                    className={
                      area.available ? "font-semibold text-primary" : "text-muted-foreground"
                    }
                  >
                    {area.available ? "Available" : "Coming soon"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-sm">
            <p className="font-semibold text-destructive">In an emergency</p>
            <p className="mt-1 text-muted-foreground">
              If anyone is in immediate danger, call the national emergency line{" "}
              <strong className="text-foreground">112</strong> first, then let us know. See our{" "}
              <Link to="/policies" hash="safety" className="text-primary hover:underline">
                safety information
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
