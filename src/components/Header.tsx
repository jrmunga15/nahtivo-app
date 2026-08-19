import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-bosque/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <Image
            src="/nahtivo-logo.png"
            alt="Nahtivo"
            width={130}
            height={29}
            className="h-7 w-auto"
            priority
          />
          <span className="hidden text-sm text-verde sm:inline">
            {dict.brand.tagline}
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href={`/${locale}/tours`}
            className="text-sm font-semibold text-bosque hover:text-verde"
          >
            {dict.nav.catalog}
          </Link>
          <LanguageSwitcher locale={locale} />
        </nav>
      </div>
    </header>
  );
}
