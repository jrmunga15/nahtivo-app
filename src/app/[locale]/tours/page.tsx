import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { experiences } from "@/data/experiences";
import { getGuideBySlug } from "@/data/guides";
import ExperienceCard from "@/components/ExperienceCard";
import AppShell from "@/components/AppShell";

export default async function ToursPage({
  params,
}: PageProps<"/[locale]/tours">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <AppShell locale={locale} dict={dict}>
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <section className="mb-12 rounded-3xl bg-bosque px-8 py-14 text-center text-white">
          <h1 className="mx-auto max-w-2xl font-heading text-3xl font-extrabold sm:text-4xl">
            {dict.home.heroTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            {dict.home.heroSubtitle}
          </p>
        </section>

        <h2 className="mb-6 font-heading text-2xl font-bold text-bosque">
          {dict.home.catalogTitle}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => {
            const guide = getGuideBySlug(experience.guideSlug);
            if (!guide) return null;

            return (
              <ExperienceCard
                key={experience.slug}
                experience={experience}
                guide={guide}
                locale={locale}
                dict={dict}
              />
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
