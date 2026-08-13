import { cn } from "@/lib/utils";

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  rejected: "Rechazado",
  cancelled: "Cancelado",
  completed: "Completado",
  no_show: "No asistió",
};

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-secondary text-foreground",
  confirmed: "bg-success text-success-foreground",
  rejected: "bg-destructive/15 text-destructive",
  cancelled: "bg-secondary text-muted-foreground",
  completed: "bg-secondary text-muted-foreground",
  no_show: "bg-destructive/15 text-destructive",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
        STATUS_STYLES[status] ?? "bg-secondary text-muted-foreground",
      )}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
