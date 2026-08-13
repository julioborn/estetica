"use client";

import { createService, updateService } from "@/app/business/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ServiceFormValues {
  id: string;
  name: string;
  duration_minutes: number;
  price: number;
  active: boolean;
}

export function ServiceForm({
  businessId,
  service,
  onCancel,
}: {
  businessId: string;
  service?: ServiceFormValues;
  onCancel: () => void;
}) {
  const isEditing = Boolean(service);

  return (
    <form
      action={isEditing ? updateService : createService}
      className="flex flex-col gap-3 rounded-xl border border-border bg-background/60 p-3"
    >
      <input type="hidden" name="businessId" value={businessId} />
      {service && (
        <input type="hidden" name="serviceId" value={service.id} />
      )}
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Nombre del servicio</Label>
        <Input
          id="name"
          name="name"
          defaultValue={service?.name}
          placeholder="Corte clásico"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="durationMinutes">Duración (min)</Label>
          <Input
            id="durationMinutes"
            name="durationMinutes"
            type="number"
            min={5}
            step={5}
            defaultValue={service?.duration_minutes ?? 30}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="price">Precio ($)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min={0}
            step={100}
            defaultValue={service?.price}
            required
          />
        </div>
      </div>
      {isEditing && (
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            name="active"
            defaultChecked={service?.active ?? true}
            className="size-4 rounded border-border accent-accent"
          />
          Visible para clientes
        </label>
      )}
      <div className="flex gap-2">
        <Button type="submit" size="sm">
          {isEditing ? "Guardar" : "Agregar"}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
