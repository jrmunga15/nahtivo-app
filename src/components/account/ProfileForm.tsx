"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type FieldErrors = Partial<Record<"fullName" | "phone", string>>;

const phonePattern = /^[0-9+()\s-]{7,}$/;

export default function ProfileForm({
  dict,
  email,
  initialFullName,
  initialPhone,
}: {
  dict: Dictionary;
  email: string;
  initialFullName: string;
  initialPhone: string;
}) {
  const t = dict.account.dashboard;
  const signUpT = dict.account.signUp;

  const [fullName, setFullName] = useState(initialFullName);
  const [phone, setPhone] = useState(initialPhone);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [genericError, setGenericError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const errorMessage = (key: keyof FieldErrors) => {
    const code = errors[key];
    if (!code) return null;
    return (
      signUpT.errors[code as keyof typeof signUpT.errors] ??
      signUpT.errors.generic
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setGenericError(null);
    setSaved(false);

    const next: FieldErrors = {};
    if (fullName.trim().length === 0) next.fullName = "required";
    if (!phonePattern.test(phone)) next.phone = "invalidPhone";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, phone }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrors(data.errors ?? {});
        if (!data.errors || Object.keys(data.errors).length === 0) {
          setGenericError(signUpT.errors.generic);
        }
        return;
      }

      setSaved(true);
    } catch {
      setGenericError(signUpT.errors.generic);
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
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="profile-name">
            {signUpT.fullNameLabel}
          </label>
          <input
            id="profile-name"
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
          <label className={labelClass} htmlFor="profile-phone">
            {signUpT.phoneLabel}
          </label>
          <input
            id="profile-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
          {errorMessage("phone") && (
            <p className={errorClass}>{errorMessage("phone")}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <p className={labelClass}>{signUpT.emailLabel}</p>
        <p className="rounded-lg bg-bosque/5 px-3 py-2 text-sm text-bosque/60">
          {email}
        </p>
      </div>

      {genericError && <p className={`mt-4 ${errorClass}`}>{genericError}</p>}
      {saved && (
        <p className="mt-4 text-sm font-medium text-verde">{t.profileSaved}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 rounded-full bg-verde px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? t.savingProfile : t.editProfile}
      </button>
    </form>
  );
}
