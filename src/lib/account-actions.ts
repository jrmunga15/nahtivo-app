"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function signOutCustomer(formData: FormData) {
  const locale = formData.get("locale");
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect(typeof locale === "string" ? `/${locale}` : "/");
}
