import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { SERVICE_ICONS } from "@/components/shared/service-icon";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/data/services";
import { usePageMeta } from "@/lib/use-page-meta";

export default function Services() {
  usePageMeta({ title: "Our services" });

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Five ways we care for your home"
        description="From a single deep clean to a full-time home manager, every service is delivered by screened workers and confirmed personally by our team."
      >
        <nav aria-label="Jump to service" className="mt-8 flex flex-wrap gap-2">
          {SERVICES.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="rounded-full border bg-card px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary"
            >
              {service.name}
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="mx-auto max-w-content space-y-20 px-4 py-16 sm:px-6 md:py-24">
        {SERVICES.map((service, index) => {
          const Icon = SERVICE_ICONS[service.id];

          return (
            <section
              key={service.id}
              id={service.id}
              className="grid scroll-mt-24 items-center gap-8 md:grid-cols-2 md:gap-14"
            >
              <img
                src={service.image}
                alt=""
                loading="lazy"
                className={`aspect-[4/3] w-full rounded-3xl object-cover shadow-xl shadow-primary/10 ${
                  index % 2 ? "md:order-2" : ""
                }`}
              />
              <div>
                <span className="grid size-12 place-items-center rounded-2xl bg-primary text-gold">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-3xl font-medium text-primary">{service.name}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{service.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-xl bg-secondary px-4 py-3 text-sm">
                  <span className="font-semibold text-primary">Ideal for: </span>
                  {service.idealFor}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild className="rounded-full px-6">
                    <Link to="/book" search={{ service: service.id }}>
                      Book {service.name.toLowerCase()}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full px-6">
                    <Link to="/workers" search={{ service: service.id }}>
                      See workers
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          );
        })}

        <p className="mx-auto max-w-reading text-center text-sm text-muted-foreground">
          Pricing depends on home size, frequency and location, and is agreed with you before any
          work begins. Online payment is not yet available.
        </p>
      </div>
    </>
  );
}
