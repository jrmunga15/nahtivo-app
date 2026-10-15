import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { blogPosts } from "@/data/blog";
import AppShell from "@/components/AppShell";

export default async function BlogPage({
  params,
}: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const t = dict.blog;

  return (
    <AppShell locale={locale} dict={dict}>
      <section className="bg-bosque px-6 pt-16 pb-16 text-center sm:px-10">
        <p className="mb-3 text-xs font-bold tracking-[0.18em] text-acento uppercase">
          {t.eyebrow}
        </p>
        <h1 className="mx-auto max-w-2xl font-heading text-3xl font-black tracking-tight text-white uppercase sm:text-4xl">
          {t.title}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-white/75">{t.subtitle}</p>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-bosque/10 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative h-40">
                <Image
                  src={post.coverImage}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <span className="w-fit rounded-full bg-verde/10 px-3 py-1 text-xs font-semibold text-verde">
                  {post.tag[locale]}
                </span>
                <h2 className="font-heading text-lg font-bold text-bosque group-hover:text-verde">
                  {post.title[locale]}
                </h2>
                <p className="text-sm text-bosque/70">{post.excerpt[locale]}</p>
                <span className="mt-auto pt-2 text-sm font-semibold text-rios">
                  {t.readMore} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
