import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/logout-button";

export default async function AdminHomePage() {
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

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Panel superadmin —{" "}
          {profile?.first_name
            ? `${profile.first_name} ${profile.last_name ?? ""}`.trim()
            : user.email}
        </h1>
        <LogoutButton />
      </div>
      <p className="text-muted-foreground">
        Rol: {profile?.role} · Acá vas a ver todos los negocios, su estado de
        suscripción y estadísticas de la plataforma.
      </p>
    </div>
  );
}
