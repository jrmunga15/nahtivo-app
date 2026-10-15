"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type FieldErrors = Partial<
  Record<
    "fullName" | "email" | "phone" | "password" | "confirmPassword",
    string
  >
>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+()\s-]{7,}$/;

export default function SignUpForm({
  dict,
  redirectTo,
  loginHref,
}: {
  dict: Dictionary;
  redirectTo: string;
  loginHref: string;
}) {
  const t = dict.account.signUp;
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [genericError, setGenericError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  const errorMessage = (key: keyof FieldErrors) => {
    const code = errors[key];
    if (!code) return null;
    return t.errors[code as keyof typeof t.errors] ?? t.errors.generic;
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (fullName.trim().length === 0) next.fullName = "required";
    if (!emailPattern.test(email)) next.email = "invalidEmail";
    if (!phonePattern.test(phone)) next.phone = "invalidPhone";
    if (password.length < 8) next.password = "shortPassword";
    if (password !== confirmPassword) next.confirmPassword = "passwordMismatch";
    return next;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setGenericError(null);

    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/account/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrors(data.errors ?? {});
        if (!data.errors || Object.keys(data.errors).length === 0) {
          setGenericError(t.errors.generic);
        }
        return;
      }

      if (data.needsEmailConfirmation) {
        setCheckEmail(true);
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

  if (checkEmail) {
    return (
      <div className="rounded-2xl border-2 border-acento bg-acento/10 p-6 text-center">
        <p className="font-heading text-xl font-bold text-bosque">
          {t.checkEmailTitle}
        </p>
        <p className="mt-2 text-bosque/70">{t.checkEmailBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-bosque/10 bg-white p-6"
    >
      <div>
        <label className={labelClass} htmlFor="signup-name">
          {t.fullNameLabel}
        </label>
        <input
          id="signup-name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={inputClass}
        />
        {errorMessage("fullName") && (
          <p className={errorClass}>{errorMessage("fullName")}</p>
        )}
      </div>

      <div className="mt-4">
        <label className={labelClass} htmlFor="signup-email">
          {t.emailLabel}
        </label>
        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
        {errorMessage("email") && (
          <p className={errorClass}>{errorMessage("email")}</p>
        )}
      </div>

      <div className="mt-4">
        <label className={labelClass} htmlFor="signup-phone">
          {t.phoneLabel}
        </label>
        <input
          id="signup-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
        />
        {errorMessage("phone") && (
          <p className={errorClass}>{errorMessage("phone")}</p>
        )}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="signup-password">
            {t.passwordLabel}
          </label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
          {errorMessage("password") && (
            <p className={errorClass}>{errorMessage("password")}</p>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor="signup-confirm">
            {t.confirmPasswordLabel}
          </label>
          <input
            id="signup-confirm"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClass}
          />
          {errorMessage("confirmPassword") && (
            <p className={errorClass}>{errorMessage("confirmPassword")}</p>
          )}
        </div>
      </div>

      {genericError && <p className={`mt-4 ${errorClass}`}>{genericError}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-full bg-acento px-6 py-3 font-semibold text-bosque transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? t.submitting : t.submit}
      </button>

      <p className="mt-4 text-center text-sm text-bosque/60">
        {t.haveAccount}{" "}
        <Link
          href={loginHref}
          className="font-semibold text-rios hover:underline"
        >
          {t.logInLink}
        </Link>
      </p>
    </form>
  );
}
