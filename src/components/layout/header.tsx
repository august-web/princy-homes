import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MAIN_NAV, waLink } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem]">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-secondary hover:text-foreground motion-reduce:transition-none"
              activeProps={{ className: "bg-secondary !text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden rounded-full px-5 sm:inline-flex">
            <Link to="/book">Book a service</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full lg:hidden" aria-label="Open menu">
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex w-[86vw] max-w-sm flex-col bg-background p-0">
              <SheetHeader className="border-b px-6 py-5">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation for PRINCY HOME SERVICE
                </SheetDescription>
                <div onClick={() => setOpen(false)}>
                  <Logo />
                </div>
              </SheetHeader>

              <nav aria-label="Mobile" className="flex flex-col px-3 py-4">
                {MAIN_NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3.5 font-display text-lg text-foreground transition-colors hover:bg-secondary motion-reduce:transition-none"
                    activeProps={{ className: "bg-secondary text-primary" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto space-y-3 border-t bg-secondary/50 px-6 py-6">
                <Button asChild size="lg" className="w-full rounded-full">
                  <Link to="/book" onClick={() => setOpen(false)}>
                    Book a service
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full rounded-full">
                  <a href={waLink()} target="_blank" rel="noreferrer">
                    <MessageCircle aria-hidden="true" /> Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
