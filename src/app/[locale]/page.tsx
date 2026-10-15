import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { categories, getExperienceBySlug } from "@/data/experiences";
import { getGuideBySlug } from "@/data/guides";
import { brandColorClasses } from "@/lib/colors";
import LandingNav from "@/components/LandingNav";
import LandingFooter from "@/components/LandingFooter";
import SubscribeForm from "@/components/SubscribeForm";
import ExperienceCard from "@/components/ExperienceCard";

const featuredSlugs = [
  "sendero-el-imposible",
  "murales-arte-ataco",
  "ausoles-santa-teresa",
];

const whatsapp = "https://wa.me/50370658859";

export default async function LandingPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const t = dict.landing;

  const featured = featuredSlugs
    .map((slug) => {
      const experience = getExperienceBySlug(slug);
      const guide = experience
        ? getGuideBySlug(experience.guideSlug)
        : undefined;
      return experience && guide ? { experience, guide } : null;
    })
    .filter((item) => item !== null);

  return (
    <div className="flex flex-1 flex-col">
      <LandingNav
        locale={locale}
        contactLabel={t.nav.contact}
        links={[
          { href: `/${locale}/tours`, label: t.nav.tours },
          { href: `/${locale}/academy`, label: t.nav.academy },
          { href: `/${locale}/negocios`, label: t.nav.business },
        ]}
      />

      {/* HERO */}
      <section className="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden text-center">
        <Image
          src="/landing/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-bosque/65 via-bosque/35 to-bosque/85" />
        <div className="relative z-10 mx-auto max-w-3xl px-8">
          <h1 className="font-heading text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.05] font-black tracking-tight text-white uppercase">
            {t.hero.titleLine1}
            <br />
            <span className="text-acento">{t.hero.titleEmphasis}</span>
            <br />
            {t.hero.titleLine3}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg font-light text-white/80">
            {t.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#unete"
              className="rounded-full bg-verde px-9 py-4 text-sm font-bold tracking-wide text-white uppercase transition-transform hover:-translate-y-0.5 hover:opacity-90"
            >
              {t.hero.ctaJoin}
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-white/55 px-9 py-4 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-white/10"
            >
              {t.hero.ctaContact}
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="text-[0.62rem] font-bold tracking-[0.15em] text-white/45 uppercase">
            {t.hero.scrollHint}
          </span>
          <span className="block h-3 w-3 rotate-45 animate-bounce border-r-2 border-b-2 border-white/40" />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10">
        <h2 className="mb-6 font-heading text-2xl font-bold text-bosque sm:text-3xl">
          {t.categories.title}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => {
            const color = brandColorClasses[c.color];
            return (
              <Link
                key={c.slug}
                href={`/${locale}/tours?category=${c.slug}`}
                className="group overflow-hidden rounded-2xl border border-bosque/10 transition-shadow hover:shadow-lg"
              >
                <div
                  className={`flex h-24 items-center justify-center text-4xl ${color.bg}`}
                >
                  <span aria-hidden>{c.emoji}</span>
                </div>
                <div className="bg-white p-3 text-center">
                  <span className="text-sm font-semibold text-bosque">
                    {c.category[locale]}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED EXPERIENCES */}
      <section className="bg-[#F4FAF7]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-heading text-2xl font-bold text-bosque sm:text-3xl">
              {t.featured.title}
            </h2>
            <Link
              href={`/${locale}/tours`}
              className="text-sm font-semibold text-verde hover:underline"
            >
              {t.featured.cta} →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map(({ experience, guide }) => (
              <ExperienceCard
                key={experience.slug}
                experience={experience}
                guide={guide}
                locale={locale}
                dict={dict}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section id="unete" className="relative">
        <Image
          src="/landing/foto3.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-bosque/92" />
        <div className="relative mx-auto w-full max-w-3xl px-6 py-20 text-center sm:px-10">
          <h2 className="mb-3 font-heading text-3xl leading-tight font-black tracking-tight text-white uppercase sm:text-4xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-sm text-white/75">
            {t.cta.subtitle}
          </p>

          <div className="text-left">
            <SubscribeForm dict={dict} />
          </div>

          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm font-semibold text-acento hover:underline"
          >
            {t.cta.whatsappLink}
          </a>
        </div>
      </section>

      <LandingFooter dict={dict} />
    </div>
  );
}
