import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="mt-auto border-t border-bosque/10 bg-bosque text-white/80">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm">
        <Image
          src="/nahtivo-logo-white.png"
          alt="Nahtivo"
          width={140}
          height={28}
          className="h-6 w-auto"
        />
        <p className="mt-3">{dict.footer.tagline}</p>
        <p className="mt-4 text-white/50">
          © {new Date().getFullYear()} Nahtivo. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
