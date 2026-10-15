import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function LandingFooter({ dict }: { dict: Dictionary }) {
  const t = dict.landing;

  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 bg-bosque px-6 py-8 sm:px-10">
      <Image
        src="/nahtivo-logo-white.png"
        alt="Nahtivo"
        width={140}
        height={28}
        className="h-7 w-auto"
      />
      <p className="text-sm text-white/45">
        {t.footer.location} — {new Date().getFullYear()}
      </p>
    </footer>
  );
}
