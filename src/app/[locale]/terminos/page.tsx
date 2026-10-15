import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import AppShell from "@/components/AppShell";

export default async function TermsPage({
  params,
}: PageProps<"/[locale]/terminos">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const t = dict.legal.terms;

  return (
    <AppShell locale={locale} dict={dict}>
      <article className="mx-auto w-full max-w-2xl px-6 py-14 sm:px-10">
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
    </AppShell>
  );
}
