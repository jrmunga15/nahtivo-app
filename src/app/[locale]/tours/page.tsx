import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { experiences, categories } from "@/data/experiences";
import { getGuideBySlug } from "@/data/guides";
import ExperienceCard from "@/components/ExperienceCard";
import AppShell from "@/components/AppShell";

export default async function ToursPage({
  params,
  searchParams,
}: PageProps<"/[locale]/tours">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const { category } = await searchParams;
  const activeCategory = typeof category === "string" ? category : undefined;

  const dict = await getDictionary(locale);

  const filteredExperiences = activeCategory
    ? experiences.filter((e) => e.categorySlug === activeCategory)
    : experiences;

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

        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href={`/${locale}/tours`}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              !activeCategory
                ? "bg-verde text-white"
                : "bg-bosque/5 text-bosque hover:bg-bosque/10"
            }`}
          >
            {dict.home.allFilter}
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/${locale}/tours?category=${c.slug}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeCategory === c.slug
                  ? "bg-verde text-white"
                  : "bg-bosque/5 text-bosque hover:bg-bosque/10"
              }`}
            >
              {c.emoji} {c.category[locale]}
            </Link>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredExperiences.map((experience) => {
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
