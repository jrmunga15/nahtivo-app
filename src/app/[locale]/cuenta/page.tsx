import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getCurrentUser } from "@/lib/account";
import { getExperienceBySlug } from "@/data/experiences";
import AppShell from "@/components/AppShell";
import ProfileForm from "@/components/account/ProfileForm";
import { signOutCustomer } from "@/lib/account-actions";

type Reservation = {
  id: string;
  experience_slug: string;
  reservation_date: string;
  people: number;
  confirmation_code: string;
  total_usd: number;
  created_at: string;
};

export default async function AccountPage({
  params,
}: PageProps<"/[locale]/cuenta">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const { supabase, user, profile } = await getCurrentUser();
  if (!user) redirect(`/${locale}/cuenta/ingresar`);

  const dict = await getDictionary(locale);
  const t = dict.account.dashboard;

  const { data: reservations } = await supabase
    .from("reservations")
    .select(
      "id, experience_slug, reservation_date, people, confirmation_code, total_usd, created_at",
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .returns<Reservation[]>();

  return (
    <AppShell locale={locale} dict={dict}>
      <div className="mx-auto w-full max-w-3xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-2xl font-extrabold text-bosque">
            {t.title}
          </h1>
          <form action={signOutCustomer}>
            <input type="hidden" name="locale" value={locale} />
            <button
              type="submit"
              className="rounded-full border border-bosque/20 px-4 py-2 text-sm font-semibold text-bosque hover:bg-bosque/5"
            >
              {t.logOut}
            </button>
          </form>
        </div>

        <section className="mt-8">
          <h2 className="mb-3 font-heading text-lg font-bold text-bosque">
            {t.profileTitle}
          </h2>
          <ProfileForm
            dict={dict}
            email={user.email ?? ""}
            initialFullName={profile?.full_name ?? ""}
            initialPhone={profile?.phone ?? ""}
          />
        </section>

        <section className="mt-10">
          <h2 className="mb-3 font-heading text-lg font-bold text-bosque">
            {t.reservationsTitle}
          </h2>

          {reservations && reservations.length > 0 ? (
            <div className="space-y-3">
              {reservations.map((r) => {
                const experience = getExperienceBySlug(r.experience_slug);
                return (
                  <div
                    key={r.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-bosque/10 bg-white p-4"
                  >
                    <div>
                      <p className="font-semibold text-bosque">
                        {experience?.title[locale] ?? r.experience_slug}
                      </p>
                      <p className="text-sm text-bosque/60">
                        {r.reservation_date} · {r.people}{" "}
                        {dict.experience.people}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-verde">
                        {r.confirmation_code}
                      </p>
                      <p className="text-sm text-bosque/60">${r.total_usd}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-bosque/10 bg-bosque/5 p-8 text-center">
              <p className="text-bosque/60">{t.noReservations}</p>
              <Link
                href={`/${locale}/tours`}
                className="mt-3 inline-block text-sm font-semibold text-rios hover:underline"
              >
                {t.exploreCta} →
              </Link>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
