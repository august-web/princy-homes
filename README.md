# PRINCY HOME SERVICE

Marketing and booking prototype for a Nigerian domestic-worker agency — **Your Home. Our Care.**

Connects households with screened cleaners, cooks, housekeepers and home managers across Lagos,
Owerri and Calabar.

## Stack

- **React 19** with **Vite 8** (rolldown)
- **TanStack Router** — code-based route definitions in `src/router.tsx`
- **Tailwind CSS v4** with a custom oklch design system (`src/styles/index.css`)
- **Radix UI** primitives, **lucide-react** icons

## Getting started

```bash
npm install
npm run dev
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Typecheck, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Run `tsc --noEmit` only |

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — hero, services, how it works, featured workers, coverage |
| `/services` | The five service offerings in detail |
| `/workers` | Browse and filter worker profiles |
| `/book` | Multi-step booking request form |
| `/apply` | Worker application form |
| `/contact` | Contact details and service-area coverage |
| `/policies` | Cancellation, privacy and safety policies |
| `/admin` | Read-only operations dashboard preview (`noindex`) |

## Project layout

```
src/
  components/
    layout/    header, footer, logo
    shared/    page header, worker card, service icons
    ui/        button, checkbox, field, sheet, table, tabs
  data/        static sample data (services, workers, bookings, applications)
  lib/         site constants, page metadata, class-name helper
  routes/      one file per page
  styles/      Tailwind entry + design tokens
```

## Prototype status

This is a **front-end prototype with no backend**. There are no accounts, no database and no
payment processing — booking and application forms compose a WhatsApp message rather than
persisting anything. Worker profiles are explicitly labelled samples, and the admin dashboard
renders static sample records. Copy in the policies page notes that terms will be expanded before
launch.

## Deploying

Configured for Vercel via `vercel.json` (SPA rewrites to `index.html`). Build command
`npm run build`, output directory `dist`.
