"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignInForm({
  dict,
  redirectTo,
  signUpHref,
}: {
  dict: Dictionary;
  redirectTo: string;
  signUpHref: string;
}) {
  const t = dict.account.signIn;
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [genericError, setGenericError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setGenericError(null);
    setFieldError(null);

    if (!emailPattern.test(email) || password.length === 0) {
      setFieldError(t.errors.invalidCredentials);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        const code = data.error as keyof typeof t.errors | undefined;
        setFieldError((code && t.errors[code]) || t.errors.generic);
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setGenericError(t.errors.generic);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-bosque/20 px-3 py-2 text-sm text-bosque focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde";
  const labelClass = "mb-1 block text-xs font-semibold text-bosque/70";
  const errorClass = "mt-1 text-xs font-medium text-red-600";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-bosque/10 bg-white p-6"
    >
      <div>
        <label className={labelClass} htmlFor="signin-email">
          {t.emailLabel}
        </label>
        <input
          id="signin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="mt-4">
        <label className={labelClass} htmlFor="signin-password">
          {t.passwordLabel}
        </label>
        <input
          id="signin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
        />
      </div>

      {(fieldError || genericError) && (
        <p className={`mt-4 ${errorClass}`}>{fieldError ?? genericError}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-full bg-acento px-6 py-3 font-semibold text-bosque transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? t.submitting : t.submit}
      </button>

      <p className="mt-4 text-center text-sm text-bosque/60">
        {t.noAccount}{" "}
        <Link
          href={signUpHref}
          className="font-semibold text-rios hover:underline"
        >
          {t.signUpLink}
        </Link>
      </p>
    </form>
  );
}
