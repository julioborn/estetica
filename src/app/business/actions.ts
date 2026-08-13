"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { geocodeAddress } from "@/lib/geocode";

export async function updateBusinessProfile(formData: FormData) {
  const businessId = formData.get("businessId") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const phone = formData.get("phone") as string;
  const instagramUrl = formData.get("instagramUrl") as string;
  const addressText = formData.get("addressText") as string;
  const previousAddress = formData.get("previousAddress") as string;

  const supabase = await createClient();

  const update: Record<string, unknown> = {
    name,
    description: description || null,
    phone: phone || null,
    instagram_url: instagramUrl || null,
    address_text: addressText || null,
  };

  if (addressText && addressText !== previousAddress) {
    const geocoded = await geocodeAddress(addressText);
    if (geocoded) {
      update.location = `SRID=4326;POINT(${geocoded.lng} ${geocoded.lat})`;
    }
  }

  const { error } = await supabase
    .from("businesses")
    .update(update)
    .eq("id", businessId);

  if (error) {
    redirect(`/business?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/business");
  redirect("/business?message=Perfil actualizado");
}

export async function updateBusinessCategories(formData: FormData) {
  const businessId = formData.get("businessId") as string;
  const selectedCategoryIds = formData.getAll("categoryIds") as string[];

  const supabase = await createClient();

  const { error: deleteError } = await supabase
    .from("business_categories")
    .delete()
    .eq("business_id", businessId);

  if (deleteError) {
    redirect(`/business?error=${encodeURIComponent(deleteError.message)}`);
  }

  if (selectedCategoryIds.length > 0) {
    const { error: insertError } = await supabase
      .from("business_categories")
      .insert(
        selectedCategoryIds.map((categoryId) => ({
          business_id: businessId,
          category_id: categoryId,
        })),
      );

    if (insertError) {
      redirect(`/business?error=${encodeURIComponent(insertError.message)}`);
    }
  }

  revalidatePath("/business");
  redirect("/business?message=Rubros actualizados");
}

export async function createService(formData: FormData) {
  const businessId = formData.get("businessId") as string;
  const name = formData.get("name") as string;
  const durationMinutes = Number(formData.get("durationMinutes"));
  const price = Number(formData.get("price"));

  const supabase = await createClient();
  const { error } = await supabase.from("services").insert({
    business_id: businessId,
    name,
    duration_minutes: durationMinutes,
    price,
  });

  if (error) {
    redirect(`/business?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/business");
  redirect("/business?message=Servicio agregado");
}

export async function updateService(formData: FormData) {
  const serviceId = formData.get("serviceId") as string;
  const name = formData.get("name") as string;
  const durationMinutes = Number(formData.get("durationMinutes"));
  const price = Number(formData.get("price"));
  const active = formData.get("active") === "on";

  const supabase = await createClient();
  const { error } = await supabase
    .from("services")
    .update({
      name,
      duration_minutes: durationMinutes,
      price,
      active,
    })
    .eq("id", serviceId);

  if (error) {
    redirect(`/business?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/business");
  redirect("/business?message=Servicio actualizado");
}

export async function deleteService(formData: FormData) {
  const serviceId = formData.get("serviceId") as string;

  const supabase = await createClient();
  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", serviceId);

  if (error) {
    redirect(`/business?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/business");
  redirect("/business?message=Servicio eliminado");
}

export async function uploadBusinessCoverPhoto(formData: FormData) {
  const businessId = formData.get("businessId") as string;
  const file = formData.get("file") as File;

  if (!file || file.size === 0) {
    return { error: "No se seleccionó ninguna imagen" };
  }

  const supabase = await createClient();
  const extension = file.name.split(".").pop() ?? "jpg";
  const path = `${businessId}/cover-${Date.now()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("business-media")
    .upload(path, file, { upsert: true });

  if (uploadError) {
    return { error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("business-media").getPublicUrl(path);

  // replace the existing cover, if any
  await supabase
    .from("business_media")
    .delete()
    .eq("business_id", businessId)
    .eq("kind", "cover");

  const { error: insertError } = await supabase.from("business_media").insert({
    business_id: businessId,
    url: publicUrl,
    kind: "cover",
    sort_order: 0,
  });

  if (insertError) {
    return { error: insertError.message };
  }

  revalidatePath("/business");
  return { error: null };
}
