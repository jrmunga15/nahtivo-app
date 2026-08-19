import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { guides, getGuideBySlug } from "@/data/guides";
import { getExperiencesByGuide } from "@/data/experiences";
import { brandColorClasses } from "@/lib/colors";
import AppShell from "@/components/AppShell";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export default async function GuidePage({
  params,
}: PageProps<"/[locale]/guias/[slug]">) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const dict = await getDictionary(locale);
  const guideExperiences = getExperiencesByGuide(guide.slug);

  return (
    <AppShell locale={locale} dict={dict}>
      <div className="mx-auto w-full max-w-3xl px-6 py-10">
        <Link
          href={`/${locale}/tours`}
          className="text-sm font-semibold text-rios hover:underline"
        >
          ← {dict.guide.backToCatalog}
        </Link>

        <div className="mt-6 flex flex-col items-center gap-4 rounded-2xl border-2 border-sol bg-sol/10 p-8 text-center sm:flex-row sm:text-left">
          <span
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-verde text-5xl text-white"
            aria-hidden
          >
            {guide.emoji}
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-verde">
              {dict.experience.certifiedGuide}
            </p>
            <h1 className="font-heading text-2xl font-extrabold text-bosque">
              {guide.name}
            </h1>
            <p className="text-bosque/60">{guide.location[locale]}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-bosque/5 p-3">
            <p className="text-xs text-bosque/50">
              {dict.guide.certifiedSince}
            </p>
            <p className="font-heading font-bold text-bosque">
              {guide.certifiedSince}
            </p>
          </div>
          <div className="rounded-xl bg-bosque/5 p-3">
            <p className="text-xs text-bosque/50">{dict.guide.yearsGuiding}</p>
            <p className="font-heading font-bold text-bosque">
              {guide.yearsExperience}
            </p>
          </div>
          <div className="rounded-xl bg-bosque/5 p-3">
            <p className="text-xs text-bosque/50">{dict.guide.languages}</p>
            <p className="font-heading font-bold text-bosque">
              {guide.languages.join(" / ")}
            </p>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="font-heading text-xl font-bold text-bosque">
            {dict.guide.about} {guide.name.split(" ")[0]}
          </h2>
          <p className="mt-2 leading-relaxed text-bosque/80">
            {guide.bio[locale]}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="font-heading text-xl font-bold text-bosque">
            {dict.guide.specialties}
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {guide.specialties[locale].map((item) => (
              <span
                key={item}
                className="rounded-full bg-verde/10 px-3 py-1 text-sm font-semibold text-verde"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="font-heading text-xl font-bold text-bosque">
            {dict.guide.experiencesOffered}
          </h2>
          <div className="mt-3 space-y-3">
            {guideExperiences.map((experience) => {
              const color = brandColorClasses[experience.color];
              return (
                <Link
                  key={experience.slug}
                  href={`/${locale}/experiencias/${experience.slug}`}
                  className="flex items-center gap-4 rounded-xl border border-bosque/10 p-4 transition-colors hover:bg-bosque/5"
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl ${color.bgSoft}`}
                    aria-hidden
                  >
                    {experience.emoji}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-bosque">
                      {experience.title[locale]}
                    </p>
                    <p className="text-sm text-bosque/60">
                      {experience.location[locale]}
                    </p>
                  </div>
                  <p className="font-heading font-bold text-bosque">
                    ${experience.priceUSD}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
