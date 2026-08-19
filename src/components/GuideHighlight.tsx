import Link from "next/link";
import type { Guide } from "@/data/guides";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export default function GuideHighlight({
  guide,
  locale,
  dict,
}: {
  guide: Guide;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <Link
      href={`/${locale}/guias/${guide.slug}`}
      className="flex items-center gap-4 rounded-2xl border-2 border-sol bg-sol/10 p-5 transition-colors hover:bg-sol/20"
    >
      <span
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-verde text-3xl text-white"
        aria-hidden
      >
        {guide.emoji}
      </span>
      <div className="flex-1">
        <p className="text-xs font-bold uppercase tracking-wide text-verde">
          {dict.experience.certifiedGuide}
        </p>
        <p className="font-heading text-xl font-bold text-bosque">
          {guide.name}
        </p>
        <p className="text-sm text-bosque/60">{guide.location[locale]}</p>
      </div>
      <span className="hidden shrink-0 text-sm font-semibold text-rios sm:inline">
        {dict.experience.seeFullProfile} →
      </span>
    </Link>
  );
}
