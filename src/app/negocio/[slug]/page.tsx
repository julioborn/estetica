import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ExternalLink, Phone, Store } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookingSection } from "@/components/booking/booking-section";

interface BusinessProfile {
  id: string;
  name: string;
  description: string | null;
  phone: string | null;
  instagram_url: string | null;
  address_text: string | null;
  business_categories: { categories: { name: string } | null }[];
  business_media: { url: string; kind: string; sort_order: number }[];
  services: {
    id: string;
    name: string;
    description: string | null;
    duration_minutes: number;
    price: number;
    active: boolean;
  }[];
}

export default async function BusinessProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { slug } = await params;
  const { error: actionError, message } = await searchParams;
  const supabase = await createClient();

  const [{ data: business }, { data: userData }] = await Promise.all([
    supabase
      .from("businesses")
      .select(
        `id, name, description, phone, instagram_url, address_text,
         business_categories(categories(name)),
         business_media(url, kind, sort_order),
         services(id, name, description, duration_minutes, price, active)`,
      )
      .eq("slug", slug)
      .eq("status", "active")
      .single<BusinessProfile>(),
    supabase.auth.getUser(),
  ]);

  if (!business) {
    notFound();
  }

  const categoryNames = business.business_categories
    .map((bc) => bc.categories?.name)
    .filter((name): name is string => Boolean(name));

  const cover =
    business.business_media.find((m) => m.kind === "cover") ??
    business.business_media[0];

  const gallery = business.business_media
    .filter((m) => m.url !== cover?.url)
    .sort((a, b) => a.sort_order - b.sort_order);

  const activeServices = business.services.filter((s) => s.active);

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative h-48 w-full bg-secondary sm:h-64">
        {cover ? (
          <Image
            src={cover.url}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            <Store className="size-12" strokeWidth={1.5} />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
        <Link
          href="/app"
          className="absolute top-4 left-4 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
        >
          <ChevronLeft className="size-5" />
          <span className="sr-only">Volver</span>
        </Link>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-4 sm:p-6">
        <div className="-mt-16 flex flex-col items-start gap-3">
          <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl border-4 border-background bg-card shadow-md">
            {cover ? (
              <Image
                src={cover.url}
                alt=""
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-secondary text-muted-foreground">
                <Store className="size-9" strokeWidth={1.5} />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-3xl font-bold text-foreground">
            {business.name}
          </h1>
          {categoryNames.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {categoryNames.map((name) => (
                <Badge key={name} variant="secondary" className="font-medium">
                  {name}
                </Badge>
              ))}
            </div>
          )}
          {business.address_text && (
            <p className="text-sm text-muted-foreground">
              {business.address_text}
            </p>
          )}
        </div>

        {business.description && (
          <p className="text-foreground/90">{business.description}</p>
        )}

        {message && <p className="text-sm text-success">{message}</p>}
        {actionError && (
          <p className="text-sm text-destructive">{actionError}</p>
        )}

        {business.phone && (
          <Button
            variant="outline"
            size="xl"
            nativeButton={false}
            render={<a href={`tel:${business.phone}`} />}
            className="w-full sm:w-fit"
          >
            <Phone className="size-4" />
            Llamar
          </Button>
        )}

        {gallery.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {gallery.map((item) => (
              <div
                key={item.url}
                className="relative aspect-square overflow-hidden rounded-xl bg-secondary"
              >
                <Image
                  src={item.url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <h2 className="font-heading text-lg font-bold text-foreground">
            Servicios
          </h2>
          {activeServices.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Este negocio todavía no cargó sus servicios.
            </p>
          ) : (
            <BookingSection
              businessId={business.id}
              slug={slug}
              services={activeServices}
              isLoggedIn={Boolean(userData.user)}
            />
          )}
        </div>

        {business.instagram_url && (
          <Link
            href={business.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
          >
            <ExternalLink className="size-4" />
            Ver en Instagram
          </Link>
        )}
      </div>
    </div>
  );
}
