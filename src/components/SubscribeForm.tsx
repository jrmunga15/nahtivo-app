"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type FieldErrors = Partial<Record<"fullName" | "email" | "interest", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SubscribeForm({ dict }: { dict: Dictionary }) {
  const t = dict.landing.subscribe;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [genericError, setGenericError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const errorMessage = (key: keyof FieldErrors) => {
    const code = errors[key];
    if (!code) return null;
    return t.errors[code as keyof typeof t.errors] ?? t.errors.generic;
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (fullName.trim().length === 0) next.fullName = "required";
    if (!emailPattern.test(email)) next.email = "invalidEmail";
    if (!interest) next.interest = "required";
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
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, interest }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrors(data.errors ?? {});
        if (!data.errors || Object.keys(data.errors).length === 0) {
          setGenericError(t.errors.generic);
        }
        return;
      }

      setSuccess(true);
    } catch {
      setGenericError(t.errors.generic);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-acento focus:outline-none focus:ring-1 focus:ring-acento";
  const labelClass = "mb-1 block text-xs font-semibold text-white/70";
  const errorClass = "mt-1 text-xs font-medium text-sol";

  if (success) {
    return (
      <div className="rounded-2xl border-2 border-acento bg-white/10 p-8 text-center backdrop-blur-sm">
        <p className="font-heading text-xl font-bold text-white">
          {t.successTitle}
        </p>
        <p className="mt-2 text-white/70">{t.successMessage}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="subscribe-name">
            {t.fullNameLabel}
          </label>
          <input
            id="subscribe-name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputClass}
          />
          {errorMessage("fullName") && (
            <p className={errorClass}>{errorMessage("fullName")}</p>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor="subscribe-email">
            {t.emailLabel}
          </label>
          <input
            id="subscribe-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
          {errorMessage("email") && (
            <p className={errorClass}>{errorMessage("email")}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClass} htmlFor="subscribe-interest">
          {t.interestLabel}
        </label>
        <select
          id="subscribe-interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className={`${inputClass} [color-scheme:dark]`}
        >
          <option value="" className="text-bosque">
            —
          </option>
          {Object.entries(t.interestOptions).map(([value, label]) => (
            <option key={value} value={value} className="text-bosque">
              {label}
            </option>
          ))}
        </select>
        {errorMessage("interest") && (
          <p className={errorClass}>{errorMessage("interest")}</p>
        )}
      </div>

      {genericError && <p className={`mt-4 ${errorClass}`}>{genericError}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-full bg-acento px-6 py-3 font-semibold text-bosque transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? t.submitting : t.submit}
      </button>
    </form>
  );
}
