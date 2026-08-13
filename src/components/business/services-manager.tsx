"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { deleteService } from "@/app/business/actions";
import { Button } from "@/components/ui/button";
import { ServiceForm, type ServiceFormValues } from "./service-form";

export function ServicesManager({
  businessId,
  services,
}: {
  businessId: string;
  services: ServiceFormValues[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {services.length === 0 && !adding && (
        <p className="text-sm text-muted-foreground">
          Todavía no cargaste ningún servicio.
        </p>
      )}

      {services.map((service) =>
        editingId === service.id ? (
          <ServiceForm
            key={service.id}
            businessId={businessId}
            service={service}
            onCancel={() => setEditingId(null)}
          />
        ) : (
          <div
            key={service.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-foreground">
                {service.name}
                {!service.active && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    (oculto)
                  </span>
                )}
              </p>
              <p className="font-mono text-sm text-muted-foreground">
                {service.duration_minutes} min · $
                {service.price.toLocaleString("es-AR")}
              </p>
            </div>
            <div className="flex shrink-0 gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => setEditingId(service.id)}
              >
                <Pencil className="size-4" />
                <span className="sr-only">Editar</span>
              </Button>
              <form
                action={deleteService}
                onSubmit={(e) => {
                  if (!confirm(`¿Borrar "${service.name}"?`)) {
                    e.preventDefault();
                  }
                }}
              >
                <input type="hidden" name="serviceId" value={service.id} />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon-sm"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                  <span className="sr-only">Borrar</span>
                </Button>
              </form>
            </div>
          </div>
        ),
      )}

      {adding ? (
        <ServiceForm businessId={businessId} onCancel={() => setAdding(false)} />
      ) : (
        <Button
          type="button"
          variant="outline"
          className="self-start"
          onClick={() => setAdding(true)}
        >
          <Plus className="size-4" />
          Agregar servicio
        </Button>
      )}
    </div>
  );
}
