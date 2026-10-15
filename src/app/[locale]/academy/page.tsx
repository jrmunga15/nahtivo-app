import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import AppShell from "@/components/AppShell";
import SubscribeForm from "@/components/SubscribeForm";

export default async function AcademyPage({
  params,
}: PageProps<"/[locale]/academy">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const t = dict.landing;
  const page = t.academyPage;

  return (
    <AppShell locale={locale} dict={dict}>
      <section className="bg-bosque px-6 pt-16 pb-20 sm:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-acento/15 px-4 py-1 text-xs font-bold tracking-[0.1em] text-acento uppercase">
            {page.badge}
          </span>
          <h1 className="font-heading text-4xl leading-tight font-black tracking-tight text-white uppercase sm:text-5xl">
            {page.title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-white/75">
            {page.description}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10">
        <ul className="grid gap-4 sm:grid-cols-2">
          {page.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 rounded-xl border border-bosque/10 bg-white p-4"
            >
              <span className="text-acento">●</span>
              <span className="text-sm text-bosque/80">{point}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative bg-bosque">
        <div className="relative mx-auto w-full max-w-3xl px-6 py-20 text-center sm:px-10">
          <h2 className="mb-3 font-heading text-3xl leading-tight font-black tracking-tight text-white uppercase sm:text-4xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-sm text-white/75">
            {t.cta.subtitle}
          </p>
          <div className="text-left">
            <SubscribeForm dict={dict} defaultInterest="creator" />
          </div>
        </div>
      </section>
    </AppShell>
  );
}
