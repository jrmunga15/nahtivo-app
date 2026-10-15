"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function signIn(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    redirect("/admin/login?error=1");
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/admin/login?error=1");
  }

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function deleteReservation(formData: FormData) {
  const id = formData.get("id");
  if (typeof id !== "string") return;

  const supabase = await createServerSupabaseClient();
  await supabase.from("reservations").delete().eq("id", id);
  revalidatePath("/admin");
}

export async function deleteSubscriber(formData: FormData) {
  const id = formData.get("id");
  if (typeof id !== "string") return;

  const supabase = await createServerSupabaseClient();
  await supabase.from("subscribers").delete().eq("id", id);
  revalidatePath("/admin");
}
