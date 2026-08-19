import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import Header from "./Header";
import Footer from "./Footer";

export default function AppShell({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header locale={locale} dict={dict} />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer dict={dict} />
    </div>
  );
}
