import { NextResponse } from "next/server";

type SubscriberErrors = Partial<
  Record<"fullName" | "email" | "interest", string>
>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const interests = ["tourist", "guide", "business", "creator"] as const;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, errors: {} }, { status: 400 });
  }

  const { fullName, email, interest } = body as Record<string, unknown>;

  const errors: SubscriberErrors = {};

  if (typeof fullName !== "string" || fullName.trim().length === 0) {
    errors.fullName = "required";
  }
  if (typeof email !== "string" || !emailPattern.test(email)) {
    errors.email = "invalidEmail";
  }
  if (
    typeof interest !== "string" ||
    !interests.includes(interest as (typeof interests)[number])
  ) {
    errors.interest = "required";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
