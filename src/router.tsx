import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { SiteFooter } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/header";

export interface WorkersSearch {
  state?: string;
  city?: string;
  service?: string;
  q?: string;
}

export interface BookSearch {
  service?: string;
  worker?: string;
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function RootLayout() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <SiteFooter />
      <ScrollRestoration />
    </>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: lazy(() => import("@/routes/not-found")),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazy(() => import("@/routes/home")),
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: lazy(() => import("@/routes/services")),
});

const workersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/workers",
  validateSearch: (search: Record<string, unknown>): WorkersSearch => ({
    state: optionalString(search.state),
    city: optionalString(search.city),
    service: optionalString(search.service),
    q: optionalString(search.q),
  }),
  component: lazy(() => import("@/routes/workers")),
});

const bookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book",
  validateSearch: (search: Record<string, unknown>): BookSearch => ({
    service: optionalString(search.service),
    worker: optionalString(search.worker),
  }),
  component: lazy(() => import("@/routes/book")),
});

const applyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/apply",
  component: lazy(() => import("@/routes/apply")),
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: lazy(() => import("@/routes/contact")),
});

const policiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/policies",
  component: lazy(() => import("@/routes/policies")),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: lazy(() => import("@/routes/admin")),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  workersRoute,
  bookRoute,
  applyRoute,
  contactRoute,
  policiesRoute,
  adminRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
