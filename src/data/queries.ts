import { LAUNCH_CITIES } from "./locations";
import { SERVICES } from "./services";
import { WORKERS } from "./workers";
import type { ServiceArea, ServiceId, Worker } from "./types";

export function findService(id: string) {
  return SERVICES.find((service) => service.id === id);
}

export function serviceName(id: string) {
  return findService(id)?.name ?? id;
}

export function findWorker(id: string) {
  return WORKERS.find((worker) => worker.id === id);
}

export function isVerified(worker: Worker) {
  return worker.verification === "verified";
}

export function getServiceAreas(): ServiceArea[] {
  return LAUNCH_CITIES.map((location) => {
    const verifiedCount = WORKERS.filter(
      (worker) =>
        worker.city === location.city &&
        worker.state === location.state &&
        isVerified(worker),
    ).length;

    return { ...location, verifiedCount, available: verifiedCount > 0 };
  });
}

export function getAvailableStates(): string[] {
  return [
    ...new Set(getServiceAreas().filter((area) => area.available).map((area) => area.state)),
  ];
}

export function getAvailableCities(state?: string): ServiceArea[] {
  return getServiceAreas().filter(
    (area) => area.available && (!state || area.state === state),
  );
}

export interface WorkerFilters {
  state?: string;
  city?: string;
  service?: string;
  q?: string;
}

export function filterWorkers(filters: WorkerFilters): Worker[] {
  const q = filters.q?.trim().toLowerCase();

  return WORKERS.filter(
    (worker) =>
      (!filters.state || worker.state === filters.state) &&
      (!filters.city || worker.city === filters.city) &&
      (!filters.service || worker.services.includes(filters.service as ServiceId)) &&
      (!q ||
        worker.displayName.toLowerCase().includes(q) ||
        worker.bio.toLowerCase().includes(q) ||
        worker.city.toLowerCase().includes(q)),
  ).sort((a, b) => Number(isVerified(b)) - Number(isVerified(a)));
}
