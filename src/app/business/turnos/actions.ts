"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function setStatus(appointmentId: string, status: string) {
  const supabase = await createClient();
  await supabase
    .from("appointments")
    .update({ status })
    .eq("id", appointmentId);

  revalidatePath("/business/turnos");
}

export async function acceptAppointment(formData: FormData) {
  await setStatus(formData.get("appointmentId") as string, "confirmed");
}

export async function rejectAppointment(formData: FormData) {
  await setStatus(formData.get("appointmentId") as string, "rejected");
}

export async function completeAppointment(formData: FormData) {
  await setStatus(formData.get("appointmentId") as string, "completed");
}

export async function markNoShow(formData: FormData) {
  await setStatus(formData.get("appointmentId") as string, "no_show");
}
