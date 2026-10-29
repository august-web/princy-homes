import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/lib/use-page-meta";

export default function NotFound() {
  usePageMeta({ title: "Page not found" });

  return (
    <section className="mx-auto flex max-w-content flex-col items-center px-4 py-28 text-center sm:px-6">
      <p className="font-display text-6xl text-gold">404</p>
      <h1 className="mt-4 text-3xl font-medium text-primary md:text-4xl">
        We couldn’t find that page
      </h1>
      <p className="mt-3 max-w-reading text-muted-foreground">
        The link may be out of date. Head back to the homepage or browse our services.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="rounded-full px-7">
          <Link to="/">Back to homepage</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="rounded-full px-7">
          <Link to="/services">Browse services</Link>
        </Button>
      </div>
    </section>
  );
}
