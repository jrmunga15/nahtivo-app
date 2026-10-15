import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { experiences, categories, cities } from "@/data/experiences";
import { getGuideBySlug } from "@/data/guides";
import ExperienceCard from "@/components/ExperienceCard";
import AppShell from "@/components/AppShell";

export default async function ToursPage({
  params,
  searchParams,
}: PageProps<"/[locale]/tours">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const { category, city } = await searchParams;
  const activeCategory = typeof category === "string" ? category : undefined;
  const activeCity = typeof city === "string" ? city : undefined;

  const dict = await getDictionary(locale);

  const filteredExperiences = experiences.filter(
    (e) =>
      (!activeCategory || e.categorySlug === activeCategory) &&
      (!activeCity || e.citySlug === activeCity),
  );

  const buildHref = (next: { category?: string; city?: string }) => {
    const params = new URLSearchParams();
    const nextCategory = "category" in next ? next.category : activeCategory;
    const nextCity = "city" in next ? next.city : activeCity;
    if (nextCategory) params.set("category", nextCategory);
    if (nextCity) params.set("city", nextCity);
    const query = params.toString();
    return `/${locale}/tours${query ? `?${query}` : ""}`;
  };

  const pillClass = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      active
        ? "bg-verde text-white"
        : "bg-bosque/5 text-bosque hover:bg-bosque/10"
    }`;

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

        <div className="mb-4">
          <p className="mb-2 text-xs font-bold tracking-wide text-bosque/50 uppercase">
            {dict.home.categoryFilterLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildHref({ category: undefined })}
              className={pillClass(!activeCategory)}
            >
              {dict.home.allFilter}
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={buildHref({ category: c.slug })}
                className={pillClass(activeCategory === c.slug)}
              >
                {c.emoji} {c.category[locale]}
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <p className="mb-2 text-xs font-bold tracking-wide text-bosque/50 uppercase">
            {dict.home.cityFilterLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildHref({ city: undefined })}
              className={pillClass(!activeCity)}
            >
              {dict.home.allFilter}
            </Link>
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={buildHref({ city: c.slug })}
                className={pillClass(activeCity === c.slug)}
              >
                {c.city[locale]}
              </Link>
            ))}
          </div>
        </div>

        {filteredExperiences.length > 0 ? (
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
        ) : (
          <p className="rounded-xl border border-bosque/10 bg-bosque/5 p-8 text-center text-bosque/60">
            {dict.home.noResults}
          </p>
        )}
      </div>
    </AppShell>
  );
}
