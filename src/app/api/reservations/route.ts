import { NextResponse } from "next/server";
import { getExperienceBySlug } from "@/data/experiences";
import { getSupabaseClient } from "@/lib/supabase";

type ReservationErrors = Partial<
  Record<"date" | "people" | "fullName" | "email" | "phone", string>
>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+()\s-]{7,}$/;

function isFutureDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return false;

  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return date.getTime() >= tomorrow.getTime();
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, errors: {} }, { status: 400 });
  }

  const {
    experienceSlug,
    locale,
    date,
    people,
    fullName,
    email,
    phone,
    notes,
  } = body as Record<string, unknown>;

  const experience =
    typeof experienceSlug === "string"
      ? getExperienceBySlug(experienceSlug)
      : undefined;

  if (!experience) {
    return NextResponse.json(
      { ok: false, errors: {}, error: "unknown_experience" },
      { status: 404 },
    );
  }

  const errors: ReservationErrors = {};
  const peopleCount = Number(people);

  if (typeof date !== "string" || !isFutureDate(date)) {
    errors.date = "invalidDate";
  }
  if (!Number.isInteger(peopleCount) || peopleCount < 1) {
    errors.people = "minPeople";
  } else if (peopleCount > experience.groupSizeMax) {
    errors.people = "maxPeople";
  }
  if (typeof fullName !== "string" || fullName.trim().length === 0) {
    errors.fullName = "required";
  }
  if (typeof email !== "string" || !emailPattern.test(email)) {
    errors.email = "invalidEmail";
  }
  if (typeof phone !== "string" || !phonePattern.test(phone)) {
    errors.phone = "invalidPhone";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const confirmationCode = `NAHT-${Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()}`;
  const totalUSD = experience.priceUSD * peopleCount;

  const { error: insertError } = await getSupabaseClient()
    .from("reservations")
    .insert({
      experience_slug: experience.slug,
      locale: typeof locale === "string" ? locale : null,
      reservation_date: date,
      people: peopleCount,
      full_name: fullName,
      email,
      phone,
      notes: typeof notes === "string" && notes.length > 0 ? notes : null,
      confirmation_code: confirmationCode,
      total_usd: totalUSD,
    });

  if (insertError) {
    return NextResponse.json(
      { ok: false, errors: {}, error: "insert_failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    confirmationCode,
    totalUSD,
  });
}
