import { CalendarDays, ClipboardList, Users } from "lucide-react";

import { PageHeader, PrototypeNote } from "@/components/shared/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APPLICATIONS } from "@/data/applications";
import { BOOKINGS } from "@/data/bookings";
import { serviceName } from "@/data/queries";
import type { ApplicationStage, BookingStatus } from "@/data/types";
import { WORKERS } from "@/data/workers";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/lib/use-page-meta";

const BOOKING_STATUS_STYLES: Record<BookingStatus, string> = {
  new: "bg-gold-soft text-gold-foreground",
  contacted: "bg-secondary text-secondary-foreground",
  matched: "bg-accent text-primary",
  confirmed: "bg-primary text-primary-foreground",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

const STAGE_STYLES: Record<ApplicationStage, string> = {
  received: "bg-secondary text-secondary-foreground",
  documents: "bg-gold-soft text-gold-foreground",
  interview: "bg-accent text-primary",
  "background-check": "bg-primary text-primary-foreground",
};

const STAGE_LABELS: Record<ApplicationStage, string> = {
  received: "Received",
  documents: "Documents",
  interview: "Interview",
  "background-check": "Background check",
};

function StatusPill({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
        className,
      )}
    >
      {label}
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Users;
  label: string;
  value: number;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-primary text-gold">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      </div>
      <p className="mt-4 font-display text-4xl text-primary">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

function workerName(workerId: string | null) {
  if (!workerId) return "Awaiting match";
  return WORKERS.find((worker) => worker.id === workerId)?.displayName ?? workerId;
}

export default function Admin() {
  usePageMeta({ title: "Admin", noindex: true });

  const openBookings = BOOKINGS.filter(
    (booking) => booking.status !== "completed" && booking.status !== "cancelled",
  ).length;
  const activeApplications = APPLICATIONS.filter(
    (application) => application.stage !== "background-check",
  ).length;

  return (
    <>
      <PageHeader
        eyebrow="Internal preview"
        title="Operations dashboard"
        description="A read-only preview of how booking requests and worker applications will be triaged by our team. Nothing on this page is connected to a backend yet."
      />

      <div className="mx-auto max-w-content px-4 py-10 sm:px-6 md:py-14">
        <PrototypeNote>
          All bookings and applications below are static sample records. This dashboard is a layout
          preview only and does not read from or write to a database.
        </PrototypeNote>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={CalendarDays}
            label="Open bookings"
            value={openBookings}
            hint={`${BOOKINGS.length} total requests`}
          />
          <StatCard
            icon={ClipboardList}
            label="Applications in progress"
            value={activeApplications}
            hint={`${APPLICATIONS.length} total applications`}
          />
          <StatCard
            icon={Users}
            label="Worker profiles"
            value={WORKERS.length}
            hint="All labelled as samples"
          />
        </div>

        <Tabs defaultValue="bookings" className="mt-10">
          <TabsList className="h-11 w-full justify-start p-1 sm:w-fit">
            <TabsTrigger value="bookings" className="h-9 px-4">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="applications" className="h-9 px-4">
              Applications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="mt-4">
            <section
              aria-label="Booking requests"
              className="rounded-2xl border bg-card p-2 sm:p-4"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Assigned worker</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date &amp; time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {BOOKINGS.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-semibold">{booking.id}</TableCell>
                      <TableCell>{booking.customerName}</TableCell>
                      <TableCell>{serviceName(booking.serviceId)}</TableCell>
                      <TableCell
                        className={booking.workerId ? undefined : "text-muted-foreground"}
                      >
                        {workerName(booking.workerId)}
                      </TableCell>
                      <TableCell>
                        {booking.city}, {booking.state}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {booking.date} · {booking.time}
                      </TableCell>
                      <TableCell>
                        <StatusPill
                          label={booking.status}
                          className={BOOKING_STATUS_STYLES[booking.status]}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
          </TabsContent>

          <TabsContent value="applications" className="mt-4">
            <section
              aria-label="Worker applications"
              className="rounded-2xl border bg-card p-2 sm:p-4"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Services</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Stage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {APPLICATIONS.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-semibold">{application.id}</TableCell>
                      <TableCell>{application.applicantName}</TableCell>
                      <TableCell>{application.services.map(serviceName).join(", ")}</TableCell>
                      <TableCell>
                        {application.city}, {application.state}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {application.yearsExperience} yrs
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {application.submittedAt}
                      </TableCell>
                      <TableCell>
                        <StatusPill
                          label={STAGE_LABELS[application.stage]}
                          className={STAGE_STYLES[application.stage]}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
