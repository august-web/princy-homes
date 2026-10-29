import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ClipboardList,
  HeartHandshake,
  MapPin,
  MessageCircle,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import { Eyebrow } from "@/components/shared/page-header";
import { SERVICE_ICONS } from "@/components/shared/service-icon";
import { WorkerCard } from "@/components/shared/worker-card";
import { Button } from "@/components/ui/button";
import { NIGERIAN_STATES } from "@/data/nigeria";
import { getServiceAreas, isVerified } from "@/data/queries";
import { SERVICES } from "@/data/services";
import { WORKERS } from "@/data/workers";
import { waLink } from "@/lib/site";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Tell us what you need",
    body: "Pick a service, your city, and a preferred date and time.",
  },
  {
    icon: UserCheck,
    title: "We match you",
    body: "Our team suggests screened workers available in your area.",
  },
  {
    icon: CalendarCheck,
    title: "Confirm together",
    body: "We confirm details, schedule and pricing with you directly.",
  },
  {
    icon: HeartHandshake,
    title: "Ongoing care",
    body: "Share feedback any time — we follow up after every visit.",
  },
];

const HERO_POINTS = [
  "Identity & reference checks",
  "Clear cancellation policy",
  "WhatsApp support",
];

export default function Home() {
  const areas = getServiceAreas();
  const featuredWorkers = WORKERS.filter(isVerified).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        <div className="mx-auto grid max-w-content items-center gap-10 px-4 pt-10 pb-14 sm:px-6 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-20">
          <div>
            <Eyebrow>Trusted domestic help across Nigeria</Eyebrow>
            <h1 className="mt-5 text-[2.6rem] leading-[1.04] font-medium text-primary sm:text-6xl lg:text-[4.2rem]">
              Your Home.
              <br />
              <span className="italic text-gold-foreground">Our Care.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              PRINCY HOME SERVICE connects households with carefully screened cleaners, cooks,
              housekeepers and home managers — so you can come home to calm.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-full px-7 text-base">
                <Link to="/book">
                  Book a service <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-primary/25 bg-transparent px-7 text-base"
              >
                <Link to="/workers">Browse workers</Link>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/75">
              {HERO_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <Check className="size-4 text-primary" aria-hidden="true" /> {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-3 -z-0 rotate-2 rounded-[2rem] bg-gold/25"
              aria-hidden="true"
            />
            <img
              src="/img/hero-1100.webp"
              srcSet="/img/hero-640.webp 640w, /img/hero-1100.webp 1100w"
              sizes="(min-width: 1024px) 560px, 100vw"
              alt="A bright, tidy living room with cream sofa and green accents"
              className="relative aspect-[4/3] w-full rounded-[1.75rem] object-cover shadow-2xl shadow-primary/20"
              fetchPriority="high"
            />
            <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl border bg-card/95 p-4 shadow-xl backdrop-blur sm:left-8">
              <span className="grid size-11 place-items-center rounded-xl bg-primary text-gold">
                <ShieldCheck className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold">Screened before every placement</p>
                <p className="text-xs text-muted-foreground">ID, references &amp; interview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-20 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Our services</Eyebrow>
            <h2 className="mt-3 text-3xl font-medium text-primary md:text-4xl">
              Care for every corner of your home
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Explore all services <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((service, index) => {
            const Icon = SERVICE_ICONS[service.id];

            return (
              <Link
                key={service.id}
                to="/services"
                hash={service.id}
                className={`group relative overflow-hidden rounded-2xl bg-forest text-cream outline-none focus-visible:ring-[3px] focus-visible:ring-ring ${
                  index < 2 ? "lg:col-span-3" : "lg:col-span-2"
                }`}
              >
                <img
                  src={service.image}
                  alt=""
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="mb-3 grid size-10 place-items-center rounded-xl bg-gold text-forest">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-medium">{service.name}</h3>
                  <p className="mt-1 text-sm text-cream/80">{service.short}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-content px-4 py-20 sm:px-6">
          <Eyebrow className="text-gold">How it works</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium md:text-4xl">
            Simple to request. Personally confirmed.
          </h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <li key={step.title} className="relative">
                <span className="font-display text-5xl text-gold/40">0{index + 1}</span>
                <step.icon className="mt-3 size-7 text-gold" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-20 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Meet the team</Eyebrow>
            <h2 className="mt-3 text-3xl font-medium text-primary md:text-4xl">
              Experienced, screened professionals
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              Profiles below are labelled samples that show how worker listings will appear. Photos
              are only displayed once approved.
            </p>
          </div>
          <Link
            to="/workers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            See all workers <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      </section>

      <section className="border-y bg-cream">
        <div className="mx-auto grid max-w-content gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>Where we work</Eyebrow>
            <h2 className="mt-3 text-3xl font-medium text-primary md:text-4xl">
              Growing city by city
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We launch in Lagos, Owerri and Calabar, with the long-term goal of serving all{" "}
              {NIGERIAN_STATES.length - 1} states and the Federal Capital Territory. A location is
              marked available only once we have verified workers there.
            </p>
            <Button asChild variant="outline" className="mt-6 rounded-full">
              <a
                href={waLink(
                  "Hello PRINCY HOME SERVICE, please let me know when you launch in my city: ",
                )}
                target="_blank"
                rel="noreferrer"
              >
                Ask about your city
              </a>
            </Button>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {areas.map((area) => (
              <li
                key={area.city}
                className="flex items-center justify-between gap-3 rounded-xl border bg-card px-4 py-3.5"
              >
                <span className="flex items-center gap-3">
                  <MapPin
                    className={`size-5 ${area.available ? "text-primary" : "text-muted-foreground"}`}
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block font-semibold">{area.city}</span>
                    <span className="block text-xs text-muted-foreground">{area.state} State</span>
                  </span>
                </span>
                {area.available ? (
                  <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-primary">
                    Available
                  </span>
                ) : (
                  <span className="rounded-full bg-gold-soft px-2.5 py-1 text-xs font-semibold text-gold-foreground">
                    Coming soon
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-forest px-6 py-14 text-center text-cream sm:px-12">
          <div
            className="pointer-events-none absolute -top-20 left-1/2 size-96 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl"
            aria-hidden="true"
          />
          <h2 className="relative mx-auto max-w-2xl text-3xl font-medium md:text-4xl">
            Ready for a calmer, cleaner home?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-cream/75">
            Send a booking request in minutes, or chat with our team on WhatsApp.
          </p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-gold px-7 text-base text-forest hover:bg-gold/90"
            >
              <Link to="/book">Book a service</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-cream/30 bg-transparent px-7 text-base text-cream hover:bg-cream/10 hover:text-cream"
            >
              <a href={waLink()} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" /> WhatsApp us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
