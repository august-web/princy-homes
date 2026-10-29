import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Search, SearchX } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { WorkerCard } from "@/components/shared/worker-card";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/field";
import { LAUNCH_CITIES } from "@/data/locations";
import { filterWorkers, getAvailableCities, getAvailableStates } from "@/data/queries";
import { SERVICES } from "@/data/services";
import { usePageMeta } from "@/lib/use-page-meta";
import type { WorkersSearch } from "@/router";

export default function Workers() {
  usePageMeta({ title: "Find a worker" });

  const search = useSearch({ from: "/workers" });
  const navigate = useNavigate({ from: "/workers" });

  const workers = filterWorkers(search);
  const availableStates = getAvailableStates();
  const states = [...new Set(LAUNCH_CITIES.map((location) => location.state))];
  const cities = LAUNCH_CITIES.filter(
    (location) => !search.state || location.state === search.state,
  );
  const availableCityNames = new Set(getAvailableCities().map((area) => area.city));

  const updateSearch = (patch: Partial<WorkersSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const hasFilters = Boolean(search.state || search.city || search.service || search.q);

  return (
    <>
      <PageHeader
        eyebrow="Find a worker"
        title="Browse screened home professionals"
        description="Filter by state, city and service. Only workers who have completed verification can be requested; locations show as available once verified workers are active there."
      />

      <div className="mx-auto max-w-content px-4 py-10 sm:px-6 md:py-14">
        <form
          role="search"
          onSubmit={(event) => event.preventDefault()}
          className="grid gap-4 rounded-2xl border bg-card p-4 shadow-sm sm:grid-cols-2 sm:p-5 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:items-end"
        >
          <Field label="Search" htmlFor="q">
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="q"
                value={search.q ?? ""}
                onChange={(event) => updateSearch({ q: event.target.value || undefined })}
                placeholder="Name, skill or area"
                className="h-11 rounded-lg bg-card pl-9"
              />
            </div>
          </Field>

          <Field label="State" htmlFor="state">
            <Select
              id="state"
              value={search.state ?? ""}
              onChange={(event) =>
                updateSearch({ state: event.target.value || undefined, city: undefined })
              }
            >
              <option value="">All states</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                  {availableStates.includes(state) ? "" : " (coming soon)"}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="City" htmlFor="city">
            <Select
              id="city"
              value={search.city ?? ""}
              onChange={(event) => updateSearch({ city: event.target.value || undefined })}
            >
              <option value="">All cities</option>
              {cities.map((location) => (
                <option key={location.city} value={location.city}>
                  {location.city}
                  {availableCityNames.has(location.city) ? "" : " (coming soon)"}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Service" htmlFor="service">
            <Select
              id="service"
              value={search.service ?? ""}
              onChange={(event) => updateSearch({ service: event.target.value || undefined })}
            >
              <option value="">All services</option>
              {SERVICES.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </Select>
          </Field>

          <Button
            type="button"
            variant="ghost"
            className="h-11 rounded-lg"
            disabled={!hasFilters}
            onClick={() => navigate({ search: {}, replace: true })}
          >
            Clear
          </Button>
        </form>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            <span className="font-semibold text-foreground">{workers.length}</span>{" "}
            {workers.length === 1 ? "profile" : "profiles"} · all profiles are labelled samples
          </p>
        </div>

        {workers.length > 0 ? (
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {workers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        ) : (
          <div className="mt-5 flex flex-col items-center rounded-2xl border border-dashed bg-cream px-6 py-16 text-center">
            <SearchX className="size-10 text-gold" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-medium text-primary">No workers match yet</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              We may not have verified workers for this combination yet. Send us a request and
              we’ll let you know as soon as someone is available.
            </p>
            <Button asChild className="mt-6 rounded-full">
              <Link to="/book" search={{ service: search.service }}>
                Send a request anyway
              </Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
