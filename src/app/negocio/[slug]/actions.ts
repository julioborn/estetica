"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createAppointment(formData: FormData) {
  const businessId = formData.get("businessId") as string;
  const serviceId = formData.get("serviceId") as string;
  const scheduledAt = formData.get("scheduledAt") as string;
  const durationMinutes = Number(formData.get("durationMinutes"));
  const slug = formData.get("slug") as string;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=/negocio/${slug}`);
  }

  const { error } = await supabase.from("appointments").insert({
    business_id: businessId,
    client_id: user.id,
    service_id: serviceId,
    scheduled_at: scheduledAt,
    duration_minutes: durationMinutes,
  });

  if (error) {
    redirect(`/negocio/${slug}?error=${encodeURIComponent(error.message)}`);
  }

  redirect(
    `/negocio/${slug}?message=${encodeURIComponent("¡Turno solicitado! El negocio te va a confirmar.")}`,
  );
}
