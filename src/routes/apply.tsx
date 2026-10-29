import {
  BadgeCheck,
  FileCheck2,
  MessageCircle,
  Phone,
  UserRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import { PageHeader, PrototypeNote } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { NIGERIAN_STATES } from "@/data/nigeria";
import { SERVICES } from "@/data/services";
import { waLink } from "@/lib/site";
import { usePageMeta } from "@/lib/use-page-meta";
import type { ServiceId } from "@/data/types";

const BENEFITS: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Wallet, title: "Fair, agreed pay", body: "Rates are agreed up front for every placement." },
  { icon: BadgeCheck, title: "A verified profile", body: "Stand out to households with a trusted badge." },
  { icon: UserRound, title: "Respectful clients", body: "Customers agree to our code of conduct too." },
];

const SCREENING_STEPS = [
  "Send your application",
  "Phone or in-person interview",
  "ID and two references checked",
  "Profile and photo approved",
];

const EXPERIENCE_OPTIONS = ["Less than 1", "1–2", "3–5", "6–10", "10+"];

interface ApplicationForm {
  name: string;
  phone: string;
  state: string;
  city: string;
  years: string;
  about: string;
}

const EMPTY_FORM: ApplicationForm = {
  name: "",
  phone: "",
  state: "",
  city: "",
  years: "",
  about: "",
};

export default function Apply() {
  usePageMeta({ title: "Work with us" });

  const [services, setServices] = useState<ServiceId[]>([]);
  const [form, setForm] = useState<ApplicationForm>(EMPTY_FORM);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  const toggleService = (id: ServiceId) =>
    setServices((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  const update = (patch: Partial<ApplicationForm>) => {
    setForm((current) => ({ ...current, ...patch }));
    setReady(false);
  };

  const message = [
    "Hello PRINCY HOME SERVICE, I would like to apply as a worker.",
    `• Name: ${form.name}`,
    `• Phone: ${form.phone}`,
    `• Location: ${form.city}, ${form.state}`,
    `• Services: ${services.map((id) => SERVICES.find((service) => service.id === id)?.name).join(", ")}`,
    `• Experience: ${form.years} years`,
    form.about ? `• About me: ${form.about}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const invalid =
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.state ||
      !form.city.trim() ||
      !form.years ||
      services.length === 0;

    if (invalid) {
      setError(
        "Please complete your name, phone, location, experience and at least one service.",
      );
      setReady(false);
      return;
    }

    setError("");
    setReady(true);
  }

  return (
    <>
      <PageHeader
        eyebrow="Work with us"
        title="Build a respected career in home care"
        description="We’re recruiting experienced cleaners, cooks, laundry specialists, housekeepers and home managers — starting in Lagos, Owerri and Calabar."
      />

      <div className="mx-auto grid max-w-content gap-10 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <PrototypeNote>
            Applications aren’t stored on this website yet. Completing the form prepares a WhatsApp
            message to our recruitment team. Please don’t send ID documents until we ask for them.
          </PrototypeNote>

          <form
            noValidate
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border bg-card p-5 shadow-sm sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" htmlFor="a-name">
                <Input
                  id="a-name"
                  className="h-11"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => update({ name: event.target.value })}
                />
              </Field>

              <Field label="Phone / WhatsApp" htmlFor="a-phone">
                <Input
                  id="a-phone"
                  type="tel"
                  inputMode="tel"
                  className="h-11"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) => update({ phone: event.target.value })}
                />
              </Field>

              <Field label="State" htmlFor="a-state">
                <Select
                  id="a-state"
                  value={form.state}
                  onChange={(event) => update({ state: event.target.value })}
                >
                  <option value="">Select state</option>
                  {NIGERIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label="City / town" htmlFor="a-city">
                <Input
                  id="a-city"
                  className="h-11"
                  value={form.city}
                  onChange={(event) => update({ city: event.target.value })}
                />
              </Field>

              <Field label="Years of experience" htmlFor="a-years">
                <Select
                  id="a-years"
                  value={form.years}
                  onChange={(event) => update({ years: event.target.value })}
                >
                  <option value="">Select</option>
                  {EXPERIENCE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <fieldset>
              <legend className="text-sm font-semibold">Services you offer</legend>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {SERVICES.map((service) => (
                  <label
                    key={service.id}
                    htmlFor={`svc-${service.id}`}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent/50"
                  >
                    <Checkbox
                      id={`svc-${service.id}`}
                      checked={services.includes(service.id)}
                      onCheckedChange={() => {
                        toggleService(service.id);
                        setReady(false);
                      }}
                    />
                    {service.name}
                  </label>
                ))}
              </div>
            </fieldset>

            <Field label="Tell us about your experience (optional)" htmlFor="a-about">
              <Textarea
                id="a-about"
                rows={4}
                value={form.about}
                onChange={(event) => update({ about: event.target.value })}
                placeholder="Previous roles, specialities, availability (live-in / live-out)…"
              />
            </Field>

            {error ? (
              <p role="alert" className="text-sm font-medium text-destructive">
                {error}
              </p>
            ) : null}

            {ready ? (
              <div className="flex flex-col gap-3 rounded-xl bg-accent/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium text-primary">
                  Your application is ready to send.
                </p>
                <Button asChild className="rounded-full px-6">
                  <a href={waLink(message)} target="_blank" rel="noreferrer">
                    <MessageCircle aria-hidden="true" /> Send on WhatsApp
                  </a>
                </Button>
              </div>
            ) : (
              <Button type="submit" size="lg" className="h-12 rounded-full px-10 text-base">
                Prepare application
              </Button>
            )}
          </form>
        </div>

        <aside className="space-y-5">
          <div className="space-y-4 rounded-2xl border bg-cream p-6">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="flex gap-3">
                <benefit.icon className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                <div>
                  <p className="font-semibold">{benefit.title}</p>
                  <p className="text-sm text-muted-foreground">{benefit.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-forest p-6 text-cream">
            <FileCheck2 className="size-7 text-gold" aria-hidden="true" />
            <h2 className="mt-3 text-xl font-medium">Our screening steps</h2>
            <ol className="mt-4 space-y-3">
              {SCREENING_STEPS.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm text-cream/85">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold text-xs font-bold text-forest">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-4 flex items-center gap-2 text-xs text-cream/60">
              <Phone className="size-3.5" aria-hidden="true" /> Our team contacts you after each
              step.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
