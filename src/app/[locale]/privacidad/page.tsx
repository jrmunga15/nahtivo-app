import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import LandingNav from "@/components/LandingNav";
import SiteFooter from "@/components/SiteFooter";
import { getSiteNavLinks } from "@/lib/navLinks";

export default async function PrivacyPage({
  params,
}: PageProps<"/[locale]/privacidad">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const t = dict.legal.privacy;

  return (
    <div className="flex flex-1 flex-col">
      <LandingNav
        locale={locale}
        contactLabel={dict.landing.nav.contact}
        links={getSiteNavLinks(locale, dict)}
      />

      <article className="mx-auto w-full max-w-2xl px-6 pt-32 pb-20 sm:px-10">
        <h1 className="font-heading text-3xl font-extrabold text-bosque">
          {t.title}
        </h1>
        <p className="mt-2 text-sm text-bosque/50">{t.updated}</p>

        <div className="mt-8 space-y-6">
          {t.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-heading text-lg font-bold text-bosque">
                {section.heading}
              </h2>
              <p className="mt-2 leading-relaxed text-bosque/80">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </article>

      <SiteFooter locale={locale} dict={dict} />
    </div>
  );
}
