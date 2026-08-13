import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/booking/status-badge";
import { Button } from "@/components/ui/button";
import {
  acceptAppointment,
  rejectAppointment,
  completeAppointment,
  markNoShow,
} from "./actions";

interface AgendaAppointment {
  id: string;
  scheduled_at: string;
  duration_minutes: number;
  status: string;
  profiles: { first_name: string | null; last_name: string | null } | null;
  services: { name: string } | null;
}

export default async function BusinessAgendaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "business_admin" && profile?.role !== "employee") {
    redirect("/business");
  }

  const { data: appointments } = await supabase
    .from("appointments")
    .select(
      `id, scheduled_at, duration_minutes, status,
       profiles:client_id(first_name, last_name),
       services(name)`,
    )
    .order("scheduled_at", { ascending: true })
    .returns<AgendaAppointment[]>();

  const all = appointments ?? [];
  const pending = all.filter((a) => a.status === "pending");
  const now = new Date();
  const upcoming = all.filter(
    (a) => a.status === "confirmed" && new Date(a.scheduled_at) >= now,
  );
  const past = all
    .filter((a) => !pending.includes(a) && !upcoming.includes(a))
    .sort(
      (a, b) =>
        new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime(),
    )
    .slice(0, 20);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3.5 sm:px-6">
        <Link
          href="/business"
          className="flex size-8 items-center justify-center rounded-full hover:bg-secondary"
        >
          <ChevronLeft className="size-5" />
          <span className="sr-only">Volver</span>
        </Link>
        <h1 className="font-heading text-lg font-bold text-foreground">
          Agenda
        </h1>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-4 sm:p-6">
        <section className="flex flex-col gap-3">
          <h2 className="font-heading font-bold text-foreground">
            Pendientes de confirmar
          </h2>
          {pending.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No hay turnos esperando confirmación.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {pending.map((a) => (
                <div
                  key={a.id}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4"
                >
                  <AppointmentInfo appointment={a} />
                  <div className="flex gap-2">
                    <form action={acceptAppointment} className="flex-1">
                      <input type="hidden" name="appointmentId" value={a.id} />
                      <Button type="submit" className="w-full" size="sm">
                        Aceptar
                      </Button>
                    </form>
                    <form action={rejectAppointment} className="flex-1">
                      <input type="hidden" name="appointmentId" value={a.id} />
                      <Button
                        type="submit"
                        variant="outline"
                        className="w-full"
                        size="sm"
                      >
                        Rechazar
                      </Button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-heading font-bold text-foreground">
            Próximos confirmados
          </h2>
          {upcoming.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No tenés turnos confirmados próximos.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {upcoming.map((a) => (
                <div
                  key={a.id}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4"
                >
                  <AppointmentInfo appointment={a} />
                  <div className="flex gap-2">
                    <form action={completeAppointment} className="flex-1">
                      <input type="hidden" name="appointmentId" value={a.id} />
                      <Button
                        type="submit"
                        variant="outline"
                        className="w-full"
                        size="sm"
                      >
                        Marcar completado
                      </Button>
                    </form>
                    <form action={markNoShow} className="flex-1">
                      <input type="hidden" name="appointmentId" value={a.id} />
                      <Button
                        type="submit"
                        variant="outline"
                        className="w-full text-destructive"
                        size="sm"
                      >
                        No asistió
                      </Button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {past.length > 0 && (
          <section className="flex flex-col gap-3">
            <h2 className="font-heading font-bold text-foreground">
              Historial
            </h2>
            <div className="flex flex-col gap-2">
              {past.map((a) => (
                <div
                  key={a.id}
                  className="rounded-2xl border border-border bg-card p-4"
                >
                  <AppointmentInfo appointment={a} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function AppointmentInfo({ appointment }: { appointment: AgendaAppointment }) {
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
  const clientName = appointment.profiles
    ? `${appointment.profiles.first_name ?? ""} ${appointment.profiles.last_name ?? ""}`.trim()
    : "Cliente";

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">{clientName}</p>
        <p className="truncate text-sm text-muted-foreground">
          {appointment.services?.name ?? "Servicio"}
        </p>
        <p className="font-mono text-sm text-muted-foreground capitalize">
          {dateLabel} · {timeLabel}
        </p>
      </div>
      <StatusBadge status={appointment.status} />
    </div>
  );
}
