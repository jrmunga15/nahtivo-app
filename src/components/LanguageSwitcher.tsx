"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";

const labels: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};

export default function LanguageSwitcher({
  locale,
  variant = "light",
}: {
  locale: Locale;
  variant?: "light" | "dark";
}) {
  const pathname = usePathname();
  const segments = pathname.split("/");

  const wrapperClass =
    variant === "dark" ? "border-white/35" : "border-bosque/15";
  const inactiveClass =
    variant === "dark"
      ? "text-white/55 hover:text-white"
      : "text-bosque/60 hover:text-bosque";

  return (
    <div
      className={`flex items-center gap-1 rounded-full border p-1 text-sm font-semibold ${wrapperClass}`}
    >
      {locales.map((loc) => {
        const isActive = loc === locale;
        segments[1] = loc;
        const href = segments.join("/") || "/";

        return (
          <Link
            key={loc}
            href={href}
            className={`rounded-full px-3 py-1 transition-colors ${
              isActive ? "bg-verde text-white" : inactiveClass
            }`}
            aria-current={isActive ? "true" : undefined}
          >
            {labels[loc]}
          </Link>
        );
      })}
    </div>
  );
}
