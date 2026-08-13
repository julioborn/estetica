import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/booking/status-badge";

interface ClientAppointment {
  id: string;
  scheduled_at: string;
  duration_minutes: number;
  status: string;
  businesses: { name: string; slug: string } | null;
  services: { name: string; price: number } | null;
}

export default async function MyAppointmentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: appointments } = await supabase
    .from("appointments")
    .select(
      `id, scheduled_at, duration_minutes, status,
       businesses(name, slug),
       services(name, price)`,
    )
    .eq("client_id", user.id)
    .order("scheduled_at", { ascending: false })
    .returns<ClientAppointment[]>();

  const now = new Date();
  const all = appointments ?? [];
  const upcoming = all
    .filter(
      (a) =>
        ["pending", "confirmed"].includes(a.status) &&
        new Date(a.scheduled_at) >= now,
    )
    .sort(
      (a, b) =>
        new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime(),
    );
  const history = all.filter((a) => !upcoming.includes(a));

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3.5 sm:px-6">
        <Link
          href="/app"
          className="flex size-8 items-center justify-center rounded-full hover:bg-secondary"
        >
          <ChevronLeft className="size-5" />
          <span className="sr-only">Volver</span>
        </Link>
        <h1 className="font-heading text-lg font-bold text-foreground">
          Mis turnos
        </h1>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-4 sm:p-6">
        <section className="flex flex-col gap-3">
          <h2 className="font-heading font-bold text-foreground">
            Próximos
          </h2>
          {upcoming.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No tenés turnos próximos. Buscá un negocio y reservá uno.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {upcoming.map((a) => (
                <AppointmentCard key={a.id} appointment={a} />
              ))}
            </div>
          )}
        </section>

        {history.length > 0 && (
          <section className="flex flex-col gap-3">
            <h2 className="font-heading font-bold text-foreground">
              Historial
            </h2>
            <div className="flex flex-col gap-3">
              {history.map((a) => (
                <AppointmentCard key={a.id} appointment={a} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function AppointmentCard({ appointment }: { appointment: ClientAppointment }) {
  const date = new Date(appointment.scheduled_at);
  const dateLabel = date.toLocaleDateString("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "America/Argentina/Buenos_Aires",
  });
  const timeLabel = date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Argentina/Buenos_Aires",
  });

  return (
    <Link
      href={
        appointment.businesses
          ? `/negocio/${appointment.businesses.slug}`
          : "#"
      }
      className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-md"
    >
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">
          {appointment.businesses?.name ?? "Negocio"}
        </p>
        <p className="truncate text-sm text-muted-foreground">
          {appointment.services?.name ?? "Servicio"}
        </p>
        <p className="font-mono text-sm text-muted-foreground capitalize">
          {dateLabel} · {timeLabel}
        </p>
      </div>
      <StatusBadge status={appointment.status} />
    </Link>
  );
}
