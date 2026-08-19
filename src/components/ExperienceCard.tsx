import Link from "next/link";
import type { Experience } from "@/data/experiences";
import type { Guide } from "@/data/guides";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { brandColorClasses } from "@/lib/colors";

export default function ExperienceCard({
  experience,
  guide,
  locale,
  dict,
}: {
  experience: Experience;
  guide: Guide;
  locale: Locale;
  dict: Dictionary;
}) {
  const color = brandColorClasses[experience.color];

  return (
    <Link
      href={`/${locale}/experiencias/${experience.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-bosque/10 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div
        className={`flex h-40 items-center justify-center text-6xl ${color.bg}`}
      >
        <span aria-hidden>{experience.emoji}</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${color.bgSoft} ${color.text}`}
        >
          {experience.category[locale]}
        </span>
        <h3 className="font-heading text-lg font-bold text-bosque group-hover:text-verde">
          {experience.title[locale]}
        </h3>
        <p className="text-sm text-bosque/70">
          {experience.shortDescription[locale]}
        </p>

        <div className="mt-2 flex items-center gap-2 rounded-xl bg-bosque/5 p-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full bg-verde text-lg"
            aria-hidden
          >
            {guide.emoji}
          </span>
          <div className="text-sm">
            <p className="text-bosque/50">{dict.home.guidedBy}</p>
            <p className="font-semibold text-bosque">{guide.name}</p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="text-sm text-bosque/60">
            {dict.experience.priceFrom}{" "}
            <span className="font-heading text-lg font-bold text-bosque">
              ${experience.priceUSD}
            </span>
          </p>
          <span className="text-sm font-semibold text-rios">
            {experience.durationHours}h
          </span>
        </div>
      </div>
    </Link>
  );
}
