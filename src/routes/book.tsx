import { Link, useSearch } from "@tanstack/react-router";
import { CalendarDays, Check, MessageCircle, Pencil } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader, PrototypeNote } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import {
  findWorker,
  getAvailableCities,
  getAvailableStates,
  isVerified,
  serviceName,
} from "@/data/queries";
import { SERVICES } from "@/data/services";
import { WORKERS } from "@/data/workers";
import { waLink } from "@/lib/site";
import { usePageMeta } from "@/lib/use-page-meta";

const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

interface BookingForm {
  service: string;
  workerId: string;
  state: string;
  city: string;
  area: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  notes: string;
  agreed: boolean;
}

const NIGERIAN_PHONE = /^(\+?234|0)[789]\d{9}$/;

function validate(form: BookingForm): Partial<Record<keyof BookingForm, string>> {
  const errors: Partial<Record<keyof BookingForm, string>> = {};

  if (!form.service) errors.service = "Choose a service.";
  if (!form.state) errors.state = "Choose a state.";
  if (!form.city) errors.city = "Choose a city.";
  if (!form.date) errors.date = "Pick a preferred date.";
  if (!form.time) errors.time = "Pick a preferred time.";
  if (form.name.trim().length < 2) errors.name = "Enter your name.";
  if (!NIGERIAN_PHONE.test(form.phone.replace(/[\s-]/g, ""))) {
    errors.phone = "Enter a valid Nigerian phone number, e.g. 0803 123 4567.";
  }
  if (!form.agreed) errors.agreed = "Please confirm you have read the policies.";

  return errors;
}

function ReviewRow({
  label,
  value,
  wide,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={`rounded-xl bg-secondary/60 px-4 py-3 ${wide ? "sm:col-span-2" : ""}`}>
      <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-1 font-medium break-words">{value}</dd>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p role="alert" className="text-xs font-medium text-destructive">
      {message}
    </p>
  );
}

export default function Book() {
  usePageMeta({ title: "Book a service" });

  const search = useSearch({ from: "/book" });
  const requestedWorker = search.worker ? findWorker(search.worker) : undefined;
  const preferredWorker =
    requestedWorker && isVerified(requestedWorker) ? requestedWorker : undefined;

  const [form, setForm] = useState<BookingForm>({
    service: search.service ?? preferredWorker?.services[0] ?? "",
    workerId: preferredWorker?.id ?? "",
    state: preferredWorker?.state ?? "",
    city: preferredWorker?.city ?? "",
    area: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    notes: "",
    agreed: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingForm, string>>>({});
  const [reviewing, setReviewing] = useState(false);

  const update = (key: keyof BookingForm, value: string | boolean) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const states = getAvailableStates();
  const cities = getAvailableCities(form.state || undefined);

  const matchableWorkers = useMemo(
    () =>
      WORKERS.filter(
        (worker) =>
          isVerified(worker) &&
          (!form.service || worker.services.includes(form.service as never)) &&
          (!form.state || worker.state === form.state) &&
          (!form.city || worker.city === form.city),
      ),
    [form.service, form.state, form.city],
  );

  const today = new Date().toISOString().slice(0, 10);
  const selectedWorker = form.workerId ? findWorker(form.workerId) : undefined;

  const message = [
    "Hello PRINCY HOME SERVICE, I would like to request a booking:",
    `• Service: ${form.service ? serviceName(form.service) : ""}`,
    `• Preferred worker: ${
      selectedWorker ? `${selectedWorker.displayName} (${selectedWorker.id})` : "No preference"
    }`,
    `• Location: ${[form.area, form.city, form.state].filter(Boolean).join(", ")}`,
    `• Date & time: ${form.date} at ${form.time}`,
    `• Name: ${form.name}`,
    `• Phone: ${form.phone}`,
    form.notes ? `• Notes: ${form.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setReviewing(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(Object.keys(nextErrors)[0])?.focus();
  }

  return (
    <>
      <PageHeader
        eyebrow="Book a service"
        title="Request trusted help for your home"
        description="Tell us what you need. Our team reviews every request personally and confirms availability, schedule and pricing with you before anything is booked."
      />

      <div className="mx-auto grid max-w-content gap-10 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <PrototypeNote>
            Online booking isn’t live yet — requests are not stored on this website and no payment
            is taken. When you continue, your request is sent to our team as a WhatsApp message so
            we can confirm it with you.
          </PrototypeNote>

          {reviewing ? (
            <section
              aria-labelledby="review-title"
              className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
            >
              <div className="flex items-center gap-3">
                <Check className="size-7 text-primary" aria-hidden="true" />
                <h2 id="review-title" className="text-2xl font-medium text-primary">
                  Review your request
                </h2>
              </div>

              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <ReviewRow label="Service" value={form.service ? serviceName(form.service) : ""} />
                <ReviewRow
                  label="Preferred worker"
                  value={selectedWorker?.displayName ?? "No preference"}
                />
                <ReviewRow
                  label="Location"
                  value={[form.area, form.city, form.state].filter(Boolean).join(", ")}
                />
                <ReviewRow label="Date & time" value={`${form.date} · ${form.time}`} />
                <ReviewRow label="Name" value={form.name} />
                <ReviewRow label="Phone" value={form.phone} />
                {form.notes ? <ReviewRow label="Notes" value={form.notes} wide /> : null}
              </dl>

              <p className="mt-6 text-sm text-muted-foreground">
                This is a request, not a confirmed booking. We’ll reply on WhatsApp to confirm.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full px-6">
                  <a href={waLink(message)} target="_blank" rel="noreferrer">
                    <MessageCircle aria-hidden="true" /> Send request on WhatsApp
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-6"
                  onClick={() => setReviewing(false)}
                >
                  <Pencil aria-hidden="true" /> Edit details
                </Button>
              </div>
            </section>
          ) : (
            <form
              noValidate
              onSubmit={handleSubmit}
              className="space-y-8 rounded-2xl border bg-card p-5 shadow-sm sm:p-8"
            >
              <fieldset className="space-y-5">
                <legend className="font-display text-xl text-primary">1. Service</legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Service" htmlFor="service">
                    <Select
                      id="service"
                      value={form.service}
                      aria-invalid={Boolean(errors.service)}
                      onChange={(event) => {
                        update("service", event.target.value);
                        update("workerId", "");
                      }}
                    >
                      <option value="">Select a service</option>
                      {SERVICES.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </Select>
                    <FieldError message={errors.service} />
                  </Field>

                  <Field
                    label="Preferred worker (optional)"
                    htmlFor="workerId"
                    hint="Only verified workers in your area are listed."
                  >
                    <Select
                      id="workerId"
                      value={form.workerId}
                      onChange={(event) => update("workerId", event.target.value)}
                    >
                      <option value="">No preference — match me</option>
                      {matchableWorkers.map((worker) => (
                        <option key={worker.id} value={worker.id}>
                          {worker.displayName} · {worker.city}
                        </option>
                      ))}
                    </Select>
                  </Field>
                </div>
              </fieldset>

              <fieldset className="space-y-5">
                <legend className="font-display text-xl text-primary">2. Location</legend>
                <div className="grid gap-5 sm:grid-cols-3">
                  <Field label="State" htmlFor="state">
                    <Select
                      id="state"
                      value={form.state}
                      aria-invalid={Boolean(errors.state)}
                      onChange={(event) => {
                        update("state", event.target.value);
                        update("city", "");
                        update("workerId", "");
                      }}
                    >
                      <option value="">Select state</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </Select>
                    <FieldError message={errors.state} />
                  </Field>

                  <Field label="City" htmlFor="city">
                    <Select
                      id="city"
                      value={form.city}
                      aria-invalid={Boolean(errors.city)}
                      disabled={!form.state}
                      onChange={(event) => {
                        update("city", event.target.value);
                        update("workerId", "");
                      }}
                    >
                      <option value="">{form.state ? "Select city" : "Choose state first"}</option>
                      {cities.map((area) => (
                        <option key={area.city} value={area.city}>
                          {area.city}
                        </option>
                      ))}
                    </Select>
                    <FieldError message={errors.city} />
                  </Field>

                  <Field label="Area / estate (optional)" htmlFor="area">
                    <Input
                      id="area"
                      className="h-11"
                      value={form.area}
                      onChange={(event) => update("area", event.target.value)}
                      placeholder="e.g. Admiralty Way"
                    />
                  </Field>
                </div>

                <p className="text-xs text-muted-foreground">
                  Only locations with verified workers are listed. Not seeing your city?{" "}
                  <Link
                    to="/contact"
                    className="font-semibold text-primary underline-offset-2 hover:underline"
                  >
                    Let us know
                  </Link>
                  .
                </p>
              </fieldset>

              <fieldset className="space-y-5">
                <legend className="font-display text-xl text-primary">3. Date &amp; time</legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Preferred date" htmlFor="date">
                    <Input
                      id="date"
                      type="date"
                      min={today}
                      className="h-11"
                      value={form.date}
                      aria-invalid={Boolean(errors.date)}
                      onChange={(event) => update("date", event.target.value)}
                    />
                    <FieldError message={errors.date} />
                  </Field>

                  <Field label="Preferred start time" htmlFor="time">
                    <Select
                      id="time"
                      value={form.time}
                      aria-invalid={Boolean(errors.time)}
                      onChange={(event) => update("time", event.target.value)}
                    >
                      <option value="">Select time</option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </Select>
                    <FieldError message={errors.time} />
                  </Field>
                </div>
              </fieldset>

              <fieldset className="space-y-5">
                <legend className="font-display text-xl text-primary">4. Your details</legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" htmlFor="name">
                    <Input
                      id="name"
                      autoComplete="name"
                      className="h-11"
                      value={form.name}
                      aria-invalid={Boolean(errors.name)}
                      onChange={(event) => update("name", event.target.value)}
                    />
                    <FieldError message={errors.name} />
                  </Field>

                  <Field label="Phone / WhatsApp number" htmlFor="phone">
                    <Input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="0803 123 4567"
                      className="h-11"
                      value={form.phone}
                      aria-invalid={Boolean(errors.phone)}
                      onChange={(event) => update("phone", event.target.value)}
                    />
                    <FieldError message={errors.phone} />
                  </Field>
                </div>

                <Field label="Anything we should know? (optional)" htmlFor="notes">
                  <Textarea
                    id="notes"
                    rows={4}
                    value={form.notes}
                    onChange={(event) => update("notes", event.target.value)}
                    placeholder="Home size, number of rooms, dietary needs, pets…"
                  />
                </Field>

                <div>
                  <label htmlFor="agreed" className="flex items-start gap-3 text-sm">
                    <Checkbox
                      id="agreed"
                      checked={form.agreed}
                      aria-invalid={Boolean(errors.agreed)}
                      onCheckedChange={(checked) => update("agreed", checked === true)}
                      className="mt-0.5"
                    />
                    <span>
                      I have read the{" "}
                      <Link
                        to="/policies"
                        hash="cancellation"
                        className="font-semibold text-primary underline-offset-2 hover:underline"
                      >
                        cancellation
                      </Link>
                      ,{" "}
                      <Link
                        to="/policies"
                        hash="privacy"
                        className="font-semibold text-primary underline-offset-2 hover:underline"
                      >
                        privacy
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/policies"
                        hash="safety"
                        className="font-semibold text-primary underline-offset-2 hover:underline"
                      >
                        safety
                      </Link>{" "}
                      information.
                    </span>
                  </label>
                  <FieldError message={errors.agreed} />
                </div>
              </fieldset>

              <Button
                type="submit"
                size="lg"
                className="h-12 w-full rounded-full text-base sm:w-auto sm:px-10"
              >
                Review request
              </Button>
            </form>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-forest p-6 text-cream">
            <CalendarDays className="size-7 text-gold" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-medium">What happens next</h2>
            <ol className="mt-4 space-y-3 text-sm text-cream/80">
              <li>
                <span className="font-semibold text-gold">1.</span> You send your request via
                WhatsApp.
              </li>
              <li>
                <span className="font-semibold text-gold">2.</span> We check worker availability in
                your area.
              </li>
              <li>
                <span className="font-semibold text-gold">3.</span> We agree schedule and price with
                you.
              </li>
              <li>
                <span className="font-semibold text-gold">4.</span> Your booking is confirmed in
                writing.
              </li>
            </ol>
          </div>

          <div className="rounded-2xl border bg-cream p-6 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Free cancellation</p>
            <p className="mt-1">
              Cancel or reschedule up to 24 hours before your visit.{" "}
              <Link to="/policies" hash="cancellation" className="text-primary hover:underline">
                Details
              </Link>
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
