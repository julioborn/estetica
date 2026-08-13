import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { DiscoveryView } from "@/components/discovery/discovery-view";
import type { Category, NearbyBusiness } from "@/lib/discovery/types";

export default async function ClientHomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name")
    .eq("id", user.id)
    .single();

  const [{ data: categories }, { data: businesses }] = await Promise.all([
    supabase.from("categories").select("id, name, slug").order("name"),
    supabase.rpc("nearby_businesses", {
      user_lat: null,
      user_lng: null,
      category_slug: null,
    }),
  ]);

  const displayName = profile?.first_name
    ? `${profile.first_name} ${profile.last_name ?? ""}`.trim()
    : (user.email ?? "");

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader
        greeting="Hola,"
        name={displayName}
        rightSlot={
          <Button
            variant="ghost"
            size="icon-sm"
            nativeButton={false}
            render={<Link href="/app/turnos" />}
          >
            <CalendarDays className="size-4" />
            <span className="sr-only">Mis turnos</span>
          </Button>
        }
      />
      <DiscoveryView
        categories={(categories ?? []) as Category[]}
        initialBusinesses={(businesses ?? []) as NearbyBusiness[]}
      />
    </div>
  );
}
