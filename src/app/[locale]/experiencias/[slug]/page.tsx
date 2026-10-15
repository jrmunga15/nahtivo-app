import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { experiences, getExperienceBySlug } from "@/data/experiences";
import { getGuideBySlug } from "@/data/guides";
import { brandColorClasses } from "@/lib/colors";
import GuideHighlight from "@/components/GuideHighlight";
import BookingForm from "@/components/BookingForm";
import AppShell from "@/components/AppShell";
import ExperienceCardActions from "@/components/ExperienceCardActions";
import { getCurrentUser } from "@/lib/account";

export function generateStaticParams() {
  return experiences.map((experience) => ({ slug: experience.slug }));
}

export default async function ExperiencePage({
  params,
}: PageProps<"/[locale]/experiencias/[slug]">) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const experience = getExperienceBySlug(slug);
  if (!experience) notFound();

  const guide = getGuideBySlug(experience.guideSlug);
  if (!guide) notFound();

  const dict = await getDictionary(locale);
  const color = brandColorClasses[experience.color];
  const detailPath = `/${locale}/experiencias/${experience.slug}`;
  const { user, profile } = await getCurrentUser();

  const stats = [
    {
      icon: "👥",
      label: dict.experience.groupSize,
      value: `${experience.groupSizeMax} ${dict.experience.people}`,
    },
    {
      icon: "⏱️",
      label: dict.experience.duration,
      value: `${experience.durationHours}h`,
    },
    {
      icon: "⛰️",
      label: dict.experience.difficulty,
      value: dict.difficulty[experience.difficulty],
    },
  ];

  return (
    <AppShell locale={locale} dict={dict}>
      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        <Link
          href={`/${locale}/tours`}
          className="text-sm font-semibold text-rios hover:underline"
        >
          ← {dict.experience.backToCatalog}
        </Link>

        <div
          className={`relative mt-4 h-64 overflow-hidden rounded-2xl sm:h-80 ${color.bg}`}
        >
          <Image
            src={experience.image}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
          />
          {experience.isNew && (
            <span className="absolute top-4 left-4 rounded-full bg-acento px-3 py-1 text-xs font-bold text-bosque shadow">
              {dict.home.newBadge}
            </span>
          )}
          <ExperienceCardActions
            slug={experience.slug}
            shareTitle={experience.title[locale]}
            sharePath={detailPath}
            labels={{
              addToFavorites: dict.experience.addToFavorites,
              removeFromFavorites: dict.experience.removeFromFavorites,
              share: dict.experience.share,
              linkCopied: dict.experience.linkCopied,
            }}
          />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="min-w-0">
            <span
              className={`inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${color.bgSoft} ${color.text}`}
            >
              {experience.category[locale]}
            </span>
            <h1 className="mt-2 font-heading text-3xl font-extrabold text-bosque">
              {experience.title[locale]}
            </h1>
            <p className="mt-1 flex items-center gap-1 text-bosque/60">
              <span aria-hidden>📍</span> {experience.location[locale]}
            </p>

            <div className="mt-6">
              <p className="mb-2 text-xs font-bold tracking-wide text-bosque/50 uppercase">
                {dict.experience.yourGuide}
              </p>
              <GuideHighlight guide={guide} locale={locale} dict={dict} />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl bg-bosque/5 p-4 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl" aria-hidden>
                    {stat.icon}
                  </p>
                  <p className="mt-1 text-xs text-bosque/50">{stat.label}</p>
                  <p className="font-heading font-bold text-bosque">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <section className="mt-8">
              <h2 className="font-heading text-xl font-bold text-bosque">
                {dict.experience.aboutExperience}
              </h2>
              <p className="mt-2 leading-relaxed text-bosque/80">
                {experience.description[locale]}
              </p>
            </section>

            <section className="mt-8">
              <h2 className="font-heading text-xl font-bold text-bosque">
                {dict.experience.highlights}
              </h2>
              <ul className="mt-4 space-y-4">
                {experience.highlights[locale].map((item, index) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${color.bgSoft} ${color.text}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-0.5 text-bosque/80">{item}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="font-heading text-xl font-bold text-bosque">
                {dict.experience.includes}
              </h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {experience.includes[locale].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-xl bg-bosque/5 p-3 text-sm text-bosque/80"
                  >
                    <span className="text-verde" aria-hidden>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="font-heading text-xl font-bold text-bosque">
                {dict.experience.meetingPoint}
              </h2>
              <p className="mt-2 flex items-start gap-2 rounded-xl bg-bosque/5 p-4 text-bosque/80">
                <span aria-hidden>📍</span> {experience.meetingPoint[locale]}
              </p>
            </section>
          </div>

          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl bg-bosque p-6 text-white">
              <p className="text-sm text-white/70">
                {dict.experience.priceFrom}
              </p>
              <p className="font-heading text-3xl font-extrabold">
                ${experience.priceUSD}{" "}
                <span className="text-base font-normal text-white/70">
                  {dict.experience.perPerson}
                </span>
              </p>
            </div>

            <div className="mt-4">
              {user ? (
                <BookingForm
                  experience={experience}
                  locale={locale}
                  dict={dict}
                  account={{
                    email: user.email ?? "",
                    fullName: profile?.full_name ?? "",
                    phone: profile?.phone ?? "",
                  }}
                />
              ) : (
                <div className="rounded-2xl border border-bosque/10 bg-white p-6 text-center">
                  <p className="font-heading text-lg font-bold text-bosque">
                    {dict.account.bookingGate.title}
                  </p>
                  <p className="mt-2 text-sm text-bosque/70">
                    {dict.account.bookingGate.body}
                  </p>
                  <div className="mt-5 flex flex-col gap-2">
                    <Link
                      href={`/${locale}/cuenta/ingresar?redirect=${encodeURIComponent(detailPath)}`}
                      className="rounded-full bg-acento px-6 py-3 text-sm font-semibold text-bosque transition-opacity hover:opacity-90"
                    >
                      {dict.account.bookingGate.logInCta}
                    </Link>
                    <Link
                      href={`/${locale}/cuenta/registro?redirect=${encodeURIComponent(detailPath)}`}
                      className="rounded-full border border-bosque/20 px-6 py-3 text-sm font-semibold text-bosque hover:bg-bosque/5"
                    >
                      {dict.account.bookingGate.signUpCta}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
