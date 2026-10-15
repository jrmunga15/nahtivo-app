import { notFound, redirect } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getCurrentUser } from "@/lib/account";
import AppShell from "@/components/AppShell";
import SignInForm from "@/components/account/SignInForm";

export default async function SignInPage({
  params,
  searchParams,
}: PageProps<"/[locale]/cuenta/ingresar">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const search = await searchParams;
  const redirectParam = search.redirect;
  const redirectTo =
    typeof redirectParam === "string" ? redirectParam : `/${locale}/cuenta`;

  const { user } = await getCurrentUser();
  if (user) redirect(redirectTo);

  const dict = await getDictionary(locale);
  const t = dict.account.signIn;

  const signUpHref = `/${locale}/cuenta/registro${
    redirectTo !== `/${locale}/cuenta`
      ? `?redirect=${encodeURIComponent(redirectTo)}`
      : ""
  }`;

  return (
    <AppShell locale={locale} dict={dict}>
      <div className="mx-auto w-full max-w-sm px-6 py-14">
        <h1 className="font-heading text-2xl font-extrabold text-bosque">
          {t.title}
        </h1>
        <p className="mt-1 text-sm text-bosque/60">{t.subtitle}</p>
        <div className="mt-6">
          <SignInForm
            dict={dict}
            redirectTo={redirectTo}
            signUpHref={signUpHref}
          />
        </div>
      </div>
    </AppShell>
  );
}
