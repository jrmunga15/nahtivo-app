import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { socialLinks } from "@/lib/social";

export default function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.siteFooter;

  return (
    <footer className="mt-auto bg-bosque px-6 pt-14 pb-8 text-white/80 sm:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-10 sm:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Image
            src="/nahtivo-logo-white.png"
            alt="Nahtivo"
            width={140}
            height={28}
            className="h-7 w-auto"
          />
          <p className="mt-3 max-w-xs text-sm text-white/60">
            {dict.footer.tagline}
          </p>
          {socialLinks.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-bold tracking-wide text-white/40 uppercase">
                {t.followUs}
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-acento hover:underline"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <p className="mb-3 text-xs font-bold tracking-wide text-white/40 uppercase">
            {t.exploreTitle}
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={`/${locale}/tours`} className="hover:text-white">
                {dict.landing.nav.tours}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/academy`} className="hover:text-white">
                {dict.landing.nav.academy}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/negocios`} className="hover:text-white">
                {dict.landing.nav.business}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/blog`} className="hover:text-white">
                {t.blog}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold tracking-wide text-white/40 uppercase">
            {t.legalTitle}
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={`/${locale}/terminos`} className="hover:text-white">
                {t.terms}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/privacidad`} className="hover:text-white">
                {t.privacy}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-6xl border-t border-white/10 pt-6 text-sm text-white/45">
        © {new Date().getFullYear()} Nahtivo. {dict.footer.rights}
      </div>
    </footer>
  );
}
