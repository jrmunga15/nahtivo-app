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

  return (
    <AppShell locale={locale} dict={dict}>
      <div className="mx-auto w-full max-w-3xl px-6 py-10">
        <Link
          href={`/${locale}/tours`}
          className="text-sm font-semibold text-rios hover:underline"
        >
          ← {dict.experience.backToCatalog}
        </Link>

        <div
          className={`mt-4 flex h-48 items-center justify-center rounded-2xl text-8xl ${color.bg}`}
        >
          <span aria-hidden>{experience.emoji}</span>
        </div>

        <span
          className={`mt-6 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${color.bgSoft} ${color.text}`}
        >
          {experience.category[locale]}
        </span>
        <h1 className="mt-2 font-heading text-3xl font-extrabold text-bosque">
          {experience.title[locale]}
        </h1>
        <p className="mt-1 text-bosque/60">{experience.location[locale]}</p>

        <div className="mt-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-bosque/50">
            {dict.experience.yourGuide}
          </p>
          <GuideHighlight guide={guide} locale={locale} dict={dict} />
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-bosque/5 p-3">
            <p className="text-xs text-bosque/50">{dict.experience.duration}</p>
            <p className="font-heading font-bold text-bosque">
              {experience.durationHours}h
            </p>
          </div>
          <div className="rounded-xl bg-bosque/5 p-3">
            <p className="text-xs text-bosque/50">
              {dict.experience.groupSize}
            </p>
            <p className="font-heading font-bold text-bosque">
              {experience.groupSizeMax} {dict.experience.people}
            </p>
          </div>
          <div className="rounded-xl bg-bosque/5 p-3">
            <p className="text-xs text-bosque/50">
              {dict.experience.difficulty}
            </p>
            <p className="font-heading font-bold text-bosque">
              {dict.difficulty[experience.difficulty]}
            </p>
          </div>
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
          <ul className="mt-2 space-y-1">
            {experience.highlights[locale].map((item) => (
              <li key={item} className="flex items-start gap-2 text-bosque/80">
                <span className="text-acento">●</span> {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="font-heading text-xl font-bold text-bosque">
            {dict.experience.includes}
          </h2>
          <ul className="mt-2 space-y-1">
            {experience.includes[locale].map((item) => (
              <li key={item} className="flex items-start gap-2 text-bosque/80">
                <span className="text-rios">✓</span> {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="font-heading text-xl font-bold text-bosque">
            {dict.experience.meetingPoint}
          </h2>
          <p className="mt-2 text-bosque/80">
            {experience.meetingPoint[locale]}
          </p>
        </section>

        <div className="mt-10 flex items-center justify-between rounded-2xl bg-bosque p-6 text-white">
          <div>
            <p className="text-sm text-white/70">{dict.experience.priceFrom}</p>
            <p className="font-heading text-3xl font-extrabold">
              ${experience.priceUSD}{" "}
              <span className="text-base font-normal text-white/70">
                {dict.experience.perPerson}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6">
          <BookingForm experience={experience} locale={locale} dict={dict} />
        </div>
      </div>
    </AppShell>
  );
}
