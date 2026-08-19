"use client";

import { useState, type FormEvent } from "react";
import type { Experience } from "@/data/experiences";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

type FieldErrors = Partial<
  Record<"date" | "people" | "fullName" | "email" | "phone", string>
>;

type Confirmation = {
  code: string;
  totalUSD: number;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+()\s-]{7,}$/;

function tomorrowISODate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
}

export default function BookingForm({
  experience,
  locale,
  dict,
}: {
  experience: Experience;
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.booking;
  const minDate = tomorrowISODate();

  const [date, setDate] = useState("");
  const [people, setPeople] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [genericError, setGenericError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const errorMessage = (key: keyof FieldErrors) => {
    const code = errors[key];
    if (!code) return null;
    const message = t.errors[code as keyof typeof t.errors] ?? t.errors.generic;
    return message.replace("{max}", String(experience.groupSizeMax));
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};

    if (!date || date < minDate) next.date = "invalidDate";
    if (!Number.isInteger(people) || people < 1) next.people = "minPeople";
    else if (people > experience.groupSizeMax) next.people = "maxPeople";
    if (fullName.trim().length === 0) next.fullName = "required";
    if (!emailPattern.test(email)) next.email = "invalidEmail";
    if (!phonePattern.test(phone)) next.phone = "invalidPhone";

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
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experienceSlug: experience.slug,
          locale,
          date,
          people,
          fullName,
          email,
          phone,
          notes,
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

      setConfirmation({ code: data.confirmationCode, totalUSD: data.totalUSD });
    } catch {
      setGenericError(t.errors.generic);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setConfirmation(null);
    setDate("");
    setPeople(1);
    setFullName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setErrors({});
  };

  if (confirmation) {
    return (
      <div className="rounded-2xl border-2 border-acento bg-acento/10 p-6 text-center">
        <p className="font-heading text-xl font-bold text-bosque">
          {t.successTitle}
        </p>
        <p className="mt-2 text-bosque/70">{t.successMessage}</p>
        <p className="mt-4 text-xs font-bold uppercase tracking-wide text-bosque/50">
          {t.confirmationCode}
        </p>
        <p className="font-heading text-2xl font-extrabold text-verde">
          {confirmation.code}
        </p>
        <p className="mt-2 text-bosque/70">
          {t.totalLabel}:{" "}
          <span className="font-semibold text-bosque">
            ${confirmation.totalUSD}
          </span>
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="mt-5 rounded-full border-2 border-verde px-5 py-2 text-sm font-semibold text-verde hover:bg-verde hover:text-white"
        >
          {t.newBooking}
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-bosque/20 px-3 py-2 text-sm text-bosque focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde";
  const labelClass = "mb-1 block text-xs font-semibold text-bosque/70";
  const errorClass = "mt-1 text-xs font-medium text-red-600";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-bosque/10 bg-white p-6"
    >
      <p className="font-heading text-xl font-bold text-bosque">{t.title}</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="booking-date">
            {t.dateLabel}
          </label>
          <input
            id="booking-date"
            type="date"
            min={minDate}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
          />
          {errorMessage("date") && (
            <p className={errorClass}>{errorMessage("date")}</p>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor="booking-people">
            {t.peopleLabel}
          </label>
          <input
            id="booking-people"
            type="number"
            min={1}
            max={experience.groupSizeMax}
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))}
            className={inputClass}
          />
          {errorMessage("people") && (
            <p className={errorClass}>{errorMessage("people")}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClass} htmlFor="booking-name">
          {t.fullNameLabel}
        </label>
        <input
          id="booking-name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={inputClass}
        />
        {errorMessage("fullName") && (
          <p className={errorClass}>{errorMessage("fullName")}</p>
        )}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="booking-email">
            {t.emailLabel}
          </label>
          <input
            id="booking-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
          {errorMessage("email") && (
            <p className={errorClass}>{errorMessage("email")}</p>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor="booking-phone">
            {t.phoneLabel}
          </label>
          <input
            id="booking-phone"
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
        <label className={labelClass} htmlFor="booking-notes">
          {t.notesLabel}
        </label>
        <textarea
          id="booking-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={t.notesPlaceholder}
          rows={3}
          className={inputClass}
        />
      </div>

      {genericError && (
        <p className={`mt-4 ${errorClass}`}>{genericError}</p>
      )}

      <div className="mt-6 flex items-center justify-between rounded-xl bg-bosque/5 px-4 py-3">
        <span className="text-sm font-semibold text-bosque/70">
          {t.totalLabel}
        </span>
        <span className="font-heading text-xl font-extrabold text-bosque">
          ${experience.priceUSD * Math.max(people || 0, 0)}
        </span>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 w-full rounded-full bg-acento px-6 py-3 font-semibold text-bosque transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? t.submitting : t.submit}
      </button>
    </form>
  );
}
