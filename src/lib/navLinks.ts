import type { Dictionary } from "./i18n/dictionaries";
import type { Locale } from "./i18n/config";

export function getSiteNavLinks(locale: Locale, dict: Dictionary) {
  return [
    { href: `/${locale}/tours`, label: dict.landing.nav.tours },
    { href: `/${locale}/academy`, label: dict.landing.nav.academy },
    { href: `/${locale}/negocios`, label: dict.landing.nav.business },
    { href: `/${locale}/blog`, label: dict.siteFooter.blog },
  ];
}
