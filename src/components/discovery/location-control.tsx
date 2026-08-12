"use client";

import { LocateFixed, LocateOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type LocationState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "granted" }
  | { status: "denied" };

export function LocationControl({
  state,
  onRequest,
}: {
  state: LocationState;
  onRequest: () => void;
}) {
  if (state.status === "granted") {
    return (
      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <LocateFixed className="size-3.5" />
        Ordenado por cercanía
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={onRequest}
      disabled={state.status === "loading"}
      className={cn(
        "flex items-center gap-1.5 text-sm font-medium underline underline-offset-4",
        state.status === "denied"
          ? "text-muted-foreground"
          : "text-foreground",
      )}
    >
      {state.status === "loading" ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : state.status === "denied" ? (
        <LocateOff className="size-3.5" />
      ) : (
        <LocateFixed className="size-3.5" />
      )}
      {state.status === "loading"
        ? "Buscando tu ubicación…"
        : state.status === "denied"
          ? "Ubicación no disponible — mostrando todos"
          : "Activar ubicación para ver qué está más cerca"}
    </button>
  );
}
