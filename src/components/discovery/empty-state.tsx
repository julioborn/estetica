import { Store } from "lucide-react";

export function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-sm border border-dashed border-border bg-card/50 px-6 py-14 text-center">
      <div className="flex size-14 items-center justify-center rounded-sm bg-secondary text-muted-foreground">
        <Store className="size-6" strokeWidth={1.5} />
      </div>
      {filtered ? (
        <>
          <p className="font-heading font-black text-foreground">
            Todavía no hay negocios de este rubro cerca tuyo
          </p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Probá con otro rubro o mirá todos los negocios disponibles.
          </p>
        </>
      ) : (
        <>
          <p className="font-heading font-black text-foreground">
            Todavía no hay negocios cargados en tu zona
          </p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Estamos arrancando por Calchaquí — si conocés una barbería,
            peluquería o centro de estética, contales que ya pueden sumarse.
          </p>
        </>
      )}
    </div>
  );
}
