import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import LandingNav from "@/components/LandingNav";
import SubscribeForm from "@/components/SubscribeForm";

const whatsapp = "https://wa.me/50370658859";

export default async function LandingPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const t = dict.landing;

  return (
    <div className="flex flex-1 flex-col">
      <LandingNav locale={locale} contactLabel={t.nav.contact} />

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

      {/* GALLERY */}
      <div className="grid grid-cols-2 sm:grid-cols-[1.5fr_1fr_1fr]">
        {[
          {
            src: "/landing/foto1.jpg",
            label: t.gallery.centralPark,
            span: true,
          },
          {
            src: "/landing/foto2.jpg",
            label: t.gallery.parishChurch,
            span: false,
          },
          {
            src: "/landing/foto3.jpg",
            label: t.gallery.aerialView,
            span: false,
          },
        ].map((item) => (
          <div
            key={item.src}
            className={`group relative h-[180px] overflow-hidden sm:h-[360px] ${
              item.span ? "col-span-2 h-[220px] sm:col-span-1 sm:h-[360px]" : ""
            }`}
          >
            <Image
              src={item.src}
              alt={item.label}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-bosque/85 to-transparent px-5 pt-6 pb-3">
              <span className="text-xs font-bold tracking-[0.12em] text-white uppercase">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <section id="servicios" className="bg-[#F4FAF7]">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:px-10">
          <p className="mb-3 text-xs font-bold tracking-[0.18em] text-verde uppercase">
            {t.services.eyebrow}
          </p>
          <h2 className="mb-12 max-w-xl font-heading text-3xl leading-tight font-black tracking-tight text-bosque uppercase sm:text-4xl">
            {t.services.title}
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            <Link
              href={`/${locale}/tours`}
              className="overflow-hidden rounded-2xl border border-[#D1E8DB] bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-bosque/10"
            >
              <div className="relative h-[180px] w-full">
                <Image
                  src="/landing/tour-guide.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="mb-3 inline-block rounded-full bg-[#D4F0E2] px-3 py-1 text-[0.65rem] font-bold tracking-wide text-verde uppercase">
                  {t.services.tours.badge}
                </span>
                <h3 className="mb-2 text-base font-extrabold tracking-wide text-bosque uppercase">
                  {t.services.tours.title}
                </h3>
                <p className="text-sm text-[#6B7280]">
                  {t.services.tours.description}
                </p>
              </div>
            </Link>

            <div className="overflow-hidden rounded-2xl border border-[#D1E8DB] bg-white">
              <div className="relative h-[180px] w-full">
                <Image
                  src="/landing/creator.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="mb-3 inline-block rounded-full bg-[#FEF3DC] px-3 py-1 text-[0.65rem] font-bold tracking-wide text-[#7A5C10] uppercase">
                  {t.services.content.badge}
                </span>
                <h3 className="mb-2 text-base font-extrabold tracking-wide text-bosque uppercase">
                  {t.services.content.title}
                </h3>
                <p className="text-sm text-[#6B7280]">
                  {t.services.content.description}
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#D1E8DB] bg-white">
              <div className="relative h-[180px] w-full">
                <Image
                  src="/landing/academy.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="mb-3 inline-block rounded-full bg-[#D8EDE4] px-3 py-1 text-[0.65rem] font-bold tracking-wide text-bosque uppercase">
                  {t.services.academy.badge}
                </span>
                <h3 className="mb-2 text-base font-extrabold tracking-wide text-bosque uppercase">
                  {t.services.academy.title}
                </h3>
                <p className="text-sm text-[#6B7280]">
                  {t.services.academy.description}
                </p>
              </div>
            </div>
          </div>

          {/* ACADEMY BAND */}
          <div className="mt-8 flex flex-wrap items-center gap-12 rounded-2xl bg-bosque p-8 sm:p-12">
            <div className="min-w-[260px] flex-1">
              <h3 className="mb-2 font-heading text-2xl font-black tracking-wide text-white uppercase">
                {t.academyBand.titlePrefix}{" "}
                <span className="text-acento">
                  {t.academyBand.titleEmphasis}
                </span>
              </h3>
              <p className="max-w-md text-sm font-light text-white/60">
                {t.academyBand.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-10">
              {t.academyBand.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading text-4xl leading-none font-black text-acento">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-semibold tracking-[0.1em] text-white/45 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
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

      {/* FOOTER */}
      <footer className="flex flex-wrap items-center justify-between gap-4 bg-bosque px-6 py-8 sm:px-10">
        <Image
          src="/nahtivo-logo-white.png"
          alt="Nahtivo"
          width={140}
          height={28}
          className="h-7 w-auto"
        />
        <p className="text-sm text-white/45">
          {t.footer.location} — {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
