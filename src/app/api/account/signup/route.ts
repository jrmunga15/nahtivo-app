import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

type SignUpErrors = Partial<
  Record<
    "fullName" | "email" | "phone" | "password" | "confirmPassword",
    string
  >
>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+()\s-]{7,}$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, errors: {} }, { status: 400 });
  }

  const { fullName, email, phone, password, confirmPassword } = body as Record<
    string,
    unknown
  >;

  const errors: SignUpErrors = {};
  if (typeof fullName !== "string" || fullName.trim().length === 0) {
    errors.fullName = "required";
  }
  if (typeof email !== "string" || !emailPattern.test(email)) {
    errors.email = "invalidEmail";
  }
  if (typeof phone !== "string" || !phonePattern.test(phone)) {
    errors.phone = "invalidPhone";
  }
  if (typeof password !== "string" || password.length < 8) {
    errors.password = "shortPassword";
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = "passwordMismatch";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email: email as string,
    password: password as string,
    options: {
      data: { full_name: fullName, phone },
    },
  });

  if (error) {
    const isDuplicate = /already registered|already exists/i.test(
      error.message,
    );
    return NextResponse.json(
      {
        ok: false,
        errors: isDuplicate ? { email: "emailInUse" } : {},
        error: isDuplicate ? undefined : "signup_failed",
      },
      { status: isDuplicate ? 409 : 500 },
    );
  }

  return NextResponse.json({ ok: true, needsEmailConfirmation: !data.session });
}
