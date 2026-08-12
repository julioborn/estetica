import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/logout-button";
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

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="text-sm text-muted-foreground">Hola,</p>
          <p className="font-medium text-foreground">
            {profile?.first_name
              ? `${profile.first_name} ${profile.last_name ?? ""}`.trim()
              : user.email}
          </p>
        </div>
        <LogoutButton />
      </header>
      <DiscoveryView
        categories={(categories ?? []) as Category[]}
        initialBusinesses={(businesses ?? []) as NearbyBusiness[]}
      />
    </div>
  );
}
