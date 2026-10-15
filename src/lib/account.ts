import { createServerSupabaseClient } from "./supabase-server";

export type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  is_admin: boolean;
};

export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, user: null, profile: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, phone, is_admin")
    .eq("id", user.id)
    .single<Profile>();

  return { supabase, user, profile: profile ?? null };
}
