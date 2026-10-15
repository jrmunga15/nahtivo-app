import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import LandingNav from "@/components/LandingNav";
import SiteFooter from "@/components/SiteFooter";
import { getSiteNavLinks } from "@/lib/navLinks";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const dict = await getDictionary(locale);
  const t = dict.blog;

  return (
    <div className="flex flex-1 flex-col">
      <LandingNav
        locale={locale}
        contactLabel={dict.landing.nav.contact}
        links={getSiteNavLinks(locale, dict)}
      />

      <article className="mx-auto w-full max-w-3xl px-6 pt-28 pb-20 sm:px-10">
        <Link
          href={`/${locale}/blog`}
          className="text-sm font-semibold text-rios hover:underline"
        >
          ← {t.backToBlog}
        </Link>

        <div className="relative mt-4 h-64 overflow-hidden rounded-2xl">
          <Image
            src={post.coverImage}
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>

        <span className="mt-6 inline-block w-fit rounded-full bg-verde/10 px-3 py-1 text-xs font-semibold text-verde">
          {post.tag[locale]}
        </span>
        <h1 className="mt-2 font-heading text-3xl font-extrabold text-bosque">
          {post.title[locale]}
        </h1>
        <p className="mt-2 text-bosque/70">{post.excerpt[locale]}</p>

        {post.comingSoon ? (
          <div className="mt-8 rounded-2xl border-2 border-sol bg-sol/10 p-6 text-center">
            <p className="font-heading text-lg font-bold text-bosque">
              {t.comingSoonTitle}
            </p>
            <p className="mt-2 text-bosque/70">{t.comingSoonBody}</p>
          </div>
        ) : (
          <div className="mt-8 space-y-4 leading-relaxed text-bosque/80">
            {post.content[locale].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}
      </article>

      <SiteFooter locale={locale} dict={dict} />
    </div>
  );
}
