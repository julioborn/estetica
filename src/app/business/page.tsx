import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/app-header";
import { CoverPhotoForm } from "@/components/business/cover-photo-form";
import { CategoryPicker } from "@/components/business/category-picker";
import { ServicesManager } from "@/components/business/services-manager";
import { BusinessHoursForm } from "@/components/business/business-hours-form";
import { updateBusinessProfile, updateBusinessCategories } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Category } from "@/lib/discovery/types";

interface OwnedBusiness {
  id: string;
  name: string;
  description: string | null;
  phone: string | null;
  instagram_url: string | null;
  address_text: string | null;
  business_media: { url: string; kind: string }[];
  business_categories: { category_id: string }[];
  services: {
    id: string;
    name: string;
    duration_minutes: number;
    price: number;
    active: boolean;
  }[];
  business_hours: {
    day_of_week: number;
    open_time: string;
    close_time: string;
  }[];
}

export default async function BusinessHomePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error: actionError, message } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name, role")
    .eq("id", user.id)
    .single();

  const [{ data: business }, { data: categories }] = await Promise.all([
    supabase
      .from("businesses")
      .select(
        `id, name, description, phone, instagram_url, address_text,
         business_media(url, kind),
         business_categories(category_id),
         services(id, name, duration_minutes, price, active),
         business_hours(day_of_week, open_time, close_time)`,
      )
      .eq("owner_id", user.id)
      .maybeSingle<OwnedBusiness>(),
    supabase.from("categories").select("id, name, slug").order("name"),
  ]);

  const displayName = profile?.first_name
    ? `${profile.first_name} ${profile.last_name ?? ""}`.trim()
    : (user.email ?? "");

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader
        greeting="Tu negocio,"
        name={displayName}
        rightSlot={
          <Button
            variant="ghost"
            size="icon-sm"
            nativeButton={false}
            render={<Link href="/business/turnos" />}
          >
            <CalendarDays className="size-4" />
            <span className="sr-only">Agenda</span>
          </Button>
        }
      />
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-4 sm:p-6">
        {message && <p className="text-sm text-success">{message}</p>}
        {actionError && (
          <p className="text-sm text-destructive">{actionError}</p>
        )}

      {profile?.role === "employee" && (
        <p className="text-muted-foreground">
          Todavía no podés editar el negocio — tocá el calendario de arriba
          para ver y gestionar los turnos que te asignaron.
        </p>
      )}

      {profile?.role === "business_admin" && !business && (
        <p className="text-muted-foreground">
          No tenés un negocio asociado a esta cuenta todavía.
        </p>
      )}

      {business && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Foto de portada</CardTitle>
            </CardHeader>
            <CardContent>
              <CoverPhotoForm
                businessId={business.id}
                coverUrl={
                  business.business_media.find((m) => m.kind === "cover")
                    ?.url ?? null
                }
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información del negocio</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={updateBusinessProfile} className="flex flex-col gap-4">
                <input type="hidden" name="businessId" value={business.id} />
                <input
                  type="hidden"
                  name="previousAddress"
                  value={business.address_text ?? ""}
                />
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={business.name}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Input
                    id="description"
                    name="description"
                    defaultValue={business.description ?? ""}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    defaultValue={business.phone ?? ""}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="instagramUrl">Instagram (link)</Label>
                  <Input
                    id="instagramUrl"
                    name="instagramUrl"
                    defaultValue={business.instagram_url ?? ""}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="addressText">Dirección</Label>
                  <Input
                    id="addressText"
                    name="addressText"
                    defaultValue={business.address_text ?? ""}
                  />
                  <p className="text-xs text-muted-foreground">
                    Si cambiás la dirección, la ubicación en el mapa se
                    actualiza sola.
                  </p>
                </div>
                <Button type="submit">Guardar</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rubros</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                action={updateBusinessCategories}
                className="flex flex-col gap-4"
              >
                <input type="hidden" name="businessId" value={business.id} />
                <CategoryPicker
                  categories={(categories ?? []) as Category[]}
                  selectedIds={business.business_categories.map(
                    (bc) => bc.category_id,
                  )}
                />
                <Button type="submit" className="self-start">
                  Guardar rubros
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Servicios</CardTitle>
            </CardHeader>
            <CardContent>
              <ServicesManager
                businessId={business.id}
                services={business.services}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horarios de atención</CardTitle>
            </CardHeader>
            <CardContent>
              <BusinessHoursForm
                businessId={business.id}
                hours={business.business_hours}
              />
            </CardContent>
          </Card>
        </>
      )}
      </div>
    </div>
  );
}
