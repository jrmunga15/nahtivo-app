import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/data/experiences";
import type { Guide } from "@/data/guides";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { brandColorClasses } from "@/lib/colors";
import ExperienceCardActions from "./ExperienceCardActions";

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
  const detailPath = `/${locale}/experiencias/${experience.slug}`;

  return (
    <Link
      href={detailPath}
      className="group flex flex-col overflow-hidden rounded-2xl border border-bosque/10 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className={`relative h-40 ${color.bg}`}>
        <Image
          src={experience.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />

        {experience.isNew && (
          <span className="absolute top-3 left-3 rounded-full bg-acento px-3 py-1 text-xs font-bold text-bosque shadow">
            {dict.home.newBadge}
          </span>
        )}

        <ExperienceCardActions
          slug={experience.slug}
          shareTitle={experience.title[locale]}
          sharePath={detailPath}
          labels={{
            addToFavorites: dict.experience.addToFavorites,
            removeFromFavorites: dict.experience.removeFromFavorites,
            share: dict.experience.share,
            linkCopied: dict.experience.linkCopied,
          }}
        />

        <span
          className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-verde text-lg text-white shadow"
          aria-hidden
          title={guide.name}
        >
          {guide.emoji}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="flex items-center gap-1 text-xs font-semibold text-bosque/50">
          <span aria-hidden>📍</span> {experience.city[locale]}
          <span className="text-bosque/30">·</span>
          <span className={color.text}>{experience.category[locale]}</span>
        </p>
        <h3 className="font-heading text-lg font-bold text-bosque group-hover:text-verde">
          {experience.title[locale]}
        </h3>
        <p className="text-sm text-bosque/70">
          {experience.shortDescription[locale]}
        </p>
        <p className="text-sm text-bosque/60">
          {dict.home.guidedBy}{" "}
          <span className="font-semibold text-bosque">{guide.name}</span>
        </p>

        <div className="mt-auto flex items-end justify-between pt-3">
          <p className="text-sm text-bosque/60">
            <span className="font-heading text-xl font-bold text-bosque">
              ${experience.priceUSD}
            </span>{" "}
            / {dict.experience.personUnit}
          </p>
          <span className="rounded-full bg-bosque px-4 py-2 text-xs font-semibold text-white transition-colors group-hover:bg-verde">
            {dict.experience.viewDetails}
          </span>
        </div>
      </div>
    </Link>
  );
}
