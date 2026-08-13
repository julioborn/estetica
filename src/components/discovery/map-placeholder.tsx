import { MapPinned } from "lucide-react";

export function MapPlaceholder() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-secondary/40 px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-card text-muted-foreground">
        <MapPinned className="size-6" strokeWidth={1.5} />
      </div>
      <p className="font-heading font-bold text-foreground">
        El mapa todavía no está configurado
      </p>
      <p className="max-w-xs text-sm text-muted-foreground">
        Falta la clave de Google Maps. Mientras tanto, mirá los negocios en la
        lista.
      </p>
    </div>
  );
}
