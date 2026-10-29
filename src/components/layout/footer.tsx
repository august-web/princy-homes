import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";

import { Logo } from "@/components/layout/logo";
import { SERVICES } from "@/data/services";
import { PHONE_DISPLAY, waLink } from "@/lib/site";

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
        {title}
      </h2>
      <div className="flex flex-col gap-2.5 text-sm text-cream/80">{children}</div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo inverted />
          <p className="font-display text-xl text-gold">Your Home. Our Care.</p>
          <p className="max-w-xs text-sm leading-relaxed text-cream/70">
            Connecting Nigerian households with carefully screened domestic workers — starting in
            Lagos, Owerri and Calabar.
          </p>
        </div>

        <FooterColumn title="Services">
          {SERVICES.map((service) => (
            <Link key={service.id} to="/services" hash={service.id} className="hover:text-gold">
              {service.name}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Company">
          <Link to="/workers" className="hover:text-gold">
            Find a worker
          </Link>
          <Link to="/book" className="hover:text-gold">
            Book a service
          </Link>
          <Link to="/apply" className="hover:text-gold">
            Apply as a worker
          </Link>
          <Link to="/contact" className="hover:text-gold">
            Contact
          </Link>
          <Link to="/admin" className="hover:text-gold">
            Admin (preview)
          </Link>
        </FooterColumn>

        <FooterColumn title="Trust">
          <Link to="/policies" hash="cancellation" className="hover:text-gold">
            Cancellation policy
          </Link>
          <Link to="/policies" hash="privacy" className="hover:text-gold">
            Privacy
          </Link>
          <Link to="/policies" hash="safety" className="hover:text-gold">
            Safety
          </Link>
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-gold hover:underline"
          >
            <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp {PHONE_DISPLAY}
          </a>
        </FooterColumn>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-content flex-col gap-2 px-4 py-6 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} PRINCY HOME SERVICE. All rights reserved.</p>
          <p>Prototype website — worker profiles shown are clearly labelled samples.</p>
        </div>
      </div>
    </footer>
  );
}
