"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Clock, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { createAppointment } from "@/app/negocio/[slug]/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface BookableService {
  id: string;
  name: string;
  duration_minutes: number;
  price: number;
}

const DAY_LABELS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function nextDays(count: number) {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function BookingSection({
  businessId,
  slug,
  services,
  isLoggedIn,
}: {
  businessId: string;
  slug: string;
  services: BookableService[];
  isLoggedIn: boolean;
}) {
  const [activeService, setActiveService] = useState<BookableService | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const days = useMemo(() => nextDays(14), []);

  useEffect(() => {
    if (!activeService || !selectedDate) {
      setSlots([]);
      return;
    }
    setSelectedSlot(null);
    setLoadingSlots(true);
    const supabase = createClient();
    supabase
      .rpc("available_slots", {
        p_business_id: businessId,
        p_service_id: activeService.id,
        p_date: toDateKey(selectedDate),
      })
      .then(({ data }) => {
        setSlots((data ?? []).map((row: { slot_start: string }) => row.slot_start));
        setLoadingSlots(false);
      });
  }, [activeService, selectedDate, businessId]);

  const handlePickService = (service: BookableService) => {
    if (activeService?.id === service.id) {
      setActiveService(null);
      setSelectedDate(null);
      return;
    }
    setActiveService(service);
    setSelectedDate(days[0]);
  };

  return (
    <div className="flex flex-col divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
      {services.map((service) => (
        <div key={service.id}>
          <button
            type="button"
            onClick={() => handlePickService(service)}
            className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left transition-colors hover:bg-secondary/60"
          >
            <div>
              <p className="font-medium text-foreground">{service.name}</p>
              <p className="flex items-center gap-1 font-mono text-sm text-muted-foreground">
                <Clock className="size-3.5" />
                {service.duration_minutes} min
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="shrink-0 font-mono text-lg font-semibold text-foreground">
                ${service.price.toLocaleString("es-AR")}
              </p>
              <span
                className={cn(
                  "rounded-full border border-accent px-3 py-1.5 font-heading text-sm font-bold transition-colors",
                  activeService?.id === service.id
                    ? "bg-accent text-accent-foreground"
                    : "text-accent",
                )}
              >
                Reservar
              </span>
            </div>
          </button>

          {activeService?.id === service.id && (
            <div className="flex flex-col gap-4 border-t border-border bg-secondary/30 px-4 py-4">
              {!isLoggedIn ? (
                <p className="text-sm text-muted-foreground">
                  <Link
                    href={`/login?next=/negocio/${slug}`}
                    className="font-medium text-accent hover:underline"
                  >
                    Iniciá sesión
                  </Link>{" "}
                  para reservar este turno.
                </p>
              ) : (
                <>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {days.map((day) => {
                      const isSelected =
                        selectedDate &&
                        toDateKey(day) === toDateKey(selectedDate);
                      return (
                        <button
                          key={toDateKey(day)}
                          type="button"
                          onClick={() => setSelectedDate(day)}
                          className={cn(
                            "flex shrink-0 flex-col items-center rounded-xl border px-3 py-2 font-heading text-sm font-bold transition-colors",
                            isSelected
                              ? "border-accent bg-accent text-accent-foreground"
                              : "border-border bg-card text-muted-foreground hover:text-foreground",
                          )}
                        >
                          <span className="text-xs font-normal">
                            {DAY_LABELS[day.getDay()]}
                          </span>
                          {day.getDate()}
                        </button>
                      );
                    })}
                  </div>

                  {loadingSlots ? (
                    <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
                      <Loader2 className="size-4 animate-spin" />
                      Buscando horarios…
                    </div>
                  ) : slots.length === 0 ? (
                    <p className="py-2 text-sm text-muted-foreground">
                      No hay horarios disponibles ese día. Probá otra fecha.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {slots.map((slot) => {
                        const label = new Date(slot).toLocaleTimeString(
                          "es-AR",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone: "America/Argentina/Buenos_Aires",
                          },
                        );
                        const isSelected = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={cn(
                              "rounded-lg border px-3 py-1.5 font-mono text-sm font-medium transition-colors",
                              isSelected
                                ? "border-accent bg-accent text-accent-foreground"
                                : "border-border bg-card text-foreground hover:border-accent",
                            )}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {selectedSlot && (
                    <form action={createAppointment}>
                      <input type="hidden" name="businessId" value={businessId} />
                      <input type="hidden" name="serviceId" value={service.id} />
                      <input type="hidden" name="slug" value={slug} />
                      <input
                        type="hidden"
                        name="durationMinutes"
                        value={service.duration_minutes}
                      />
                      <input
                        type="hidden"
                        name="scheduledAt"
                        value={selectedSlot}
                      />
                      <Button type="submit" size="xl" className="w-full">
                        Confirmar turno
                      </Button>
                    </form>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
