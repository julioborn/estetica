"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { updateBusinessHours } from "@/app/business/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
const DAY_LABELS: Record<number, string> = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
};

export interface BusinessHourRow {
  day_of_week: number;
  open_time: string;
  close_time: string;
}

export function BusinessHoursForm({
  businessId,
  hours,
}: {
  businessId: string;
  hours: BusinessHourRow[];
}) {
  const byDay = new Map<number, BusinessHourRow[]>();
  for (const h of hours) {
    byDay.set(h.day_of_week, [...(byDay.get(h.day_of_week) ?? []), h]);
  }

  const [openDays, setOpenDays] = useState<Set<number>>(
    new Set(hours.map((h) => h.day_of_week)),
  );
  const [secondBlockDays, setSecondBlockDays] = useState<Set<number>>(
    new Set(
      DAY_ORDER.filter((day) => (byDay.get(day)?.length ?? 0) > 1),
    ),
  );

  const toggleDay = (day: number) => {
    setOpenDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  const toggleSecondBlock = (day: number) => {
    setSecondBlockDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  return (
    <form action={updateBusinessHours} className="flex flex-col gap-4">
      <input type="hidden" name="businessId" value={businessId} />
      {DAY_ORDER.map((day) => {
        const rows = byDay.get(day) ?? [];
        const isOpen = openDays.has(day);
        const hasSecondBlock = secondBlockDays.has(day);
        return (
          <div key={day} className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex w-32 shrink-0 items-center gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  name={`open-${day}`}
                  checked={isOpen}
                  onChange={() => toggleDay(day)}
                  className="size-4 rounded border-border accent-accent"
                />
                {DAY_LABELS[day]}
              </label>
              {isOpen ? (
                <div className="flex flex-wrap items-center gap-2">
                  <Input
                    type="time"
                    name={`openTime-${day}-1`}
                    defaultValue={rows[0]?.open_time?.slice(0, 5) ?? "09:00"}
                    className="w-28"
                    required
                  />
                  <span className="text-sm text-muted-foreground">a</span>
                  <Input
                    type="time"
                    name={`closeTime-${day}-1`}
                    defaultValue={rows[0]?.close_time?.slice(0, 5) ?? "18:00"}
                    className="w-28"
                    required
                  />
                  {!hasSecondBlock && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSecondBlock(day)}
                    >
                      <Plus className="size-3.5" />
                      Corte al mediodía
                    </Button>
                  )}
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">Cerrado</span>
              )}
            </div>
            {isOpen && hasSecondBlock && (
              <div className="ml-[8.75rem] flex flex-wrap items-center gap-2">
                <Input
                  type="time"
                  name={`openTime-${day}-2`}
                  defaultValue={rows[1]?.open_time?.slice(0, 5) ?? "16:00"}
                  className="w-28"
                  required
                />
                <span className="text-sm text-muted-foreground">a</span>
                <Input
                  type="time"
                  name={`closeTime-${day}-2`}
                  defaultValue={rows[1]?.close_time?.slice(0, 5) ?? "20:00"}
                  className="w-28"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => toggleSecondBlock(day)}
                >
                  <X className="size-3.5" />
                  <span className="sr-only">Quitar segundo horario</span>
                </Button>
              </div>
            )}
          </div>
        );
      })}
      <Button type="submit" className="mt-1 self-start">
        Guardar horarios
      </Button>
    </form>
  );
}
