"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import LanguageSwitcher from "./LanguageSwitcher";

export default function LandingNav({
  locale,
  contactLabel,
}: {
  locale: Locale;
  contactLabel: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex h-[68px] items-center justify-between px-5 transition-colors duration-300 sm:px-10 ${
        scrolled ? "bg-bosque shadow-lg shadow-bosque/40" : "bg-transparent"
      }`}
    >
      <Link href={`/${locale}`} className="flex items-center">
        <Image
          src="/nahtivo-logo-white.png"
          alt="Nahtivo"
          width={140}
          height={28}
          className="h-8 w-auto"
          priority
        />
      </Link>
      <div className="flex items-center gap-4">
        <LanguageSwitcher locale={locale} variant="dark" />
        <a
          href="https://wa.me/50370658859"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-verde px-5 py-2 text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-85"
        >
          {contactLabel}
        </a>
      </div>
    </nav>
  );
}
