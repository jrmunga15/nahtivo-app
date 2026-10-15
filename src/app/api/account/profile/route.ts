import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

type ProfileErrors = Partial<Record<"fullName" | "phone", string>>;

const phonePattern = /^[0-9+()\s-]{7,}$/;

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, errors: {} }, { status: 400 });
  }

  const { fullName, phone } = body as Record<string, unknown>;

  const errors: ProfileErrors = {};
  if (typeof fullName !== "string" || fullName.trim().length === 0) {
    errors.fullName = "required";
  }
  if (typeof phone !== "string" || !phonePattern.test(phone)) {
    errors.phone = "invalidPhone";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName, phone })
    .eq("id", user.id);

  if (error) {
    return NextResponse.json(
      { ok: false, error: "update_failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
