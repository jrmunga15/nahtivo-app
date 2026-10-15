"use client";

import { useState, useSyncExternalStore, type MouseEvent } from "react";

const FAVORITES_KEY = "nahtivo:favorites";
const listeners = new Set<() => void>();

function readFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeFavorites(slugs: string[]) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(slugs));
  } catch {
    // localStorage unavailable (private mode, etc.) — favorite just won't persist
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export default function ExperienceCardActions({
  slug,
  shareTitle,
  sharePath,
  labels,
}: {
  slug: string;
  shareTitle: string;
  sharePath: string;
  labels: {
    addToFavorites: string;
    removeFromFavorites: string;
    share: string;
    linkCopied: string;
  };
}) {
  const [copied, setCopied] = useState(false);
  const isFavorite = useSyncExternalStore(
    subscribe,
    () => readFavorites().includes(slug),
    () => false,
  );

  const toggleFavorite = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const current = readFavorites();
    const next = current.includes(slug)
      ? current.filter((item) => item !== slug)
      : [...current, slug];
    writeFavorites(next);
  };

  const handleShare = async (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const shareUrl = `${window.location.origin}${sharePath}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url: shareUrl });
      } catch {
        // user cancelled share sheet — nothing to do
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  return (
    <div className="absolute top-3 right-3 flex gap-2">
      <button
        type="button"
        onClick={toggleFavorite}
        aria-label={
          isFavorite ? labels.removeFromFavorites : labels.addToFavorites
        }
        aria-pressed={isFavorite}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow transition-transform hover:scale-105"
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-[18px] w-[18px] ${isFavorite ? "fill-rios text-rios" : "fill-none text-bosque"}`}
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2.3 4.5 5.6 4c2-.3 3.9.6 5 2.2C11.7 4.6 13.6 3.7 15.6 4c3.3.5 5.1 3.8 3.6 7.2-2.5 4.7-10 9.3-10 9.3Z"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={handleShare}
        aria-label={labels.share}
        className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow transition-transform hover:scale-105"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px] text-bosque"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.7 10.7 15.3 7M8.7 13.3l6.6 3.7M7 14a3 3 0 1 1 0-4 3 3 0 0 1 0 4Zm10-6a3 3 0 1 1 0-4 3 3 0 0 1 0 4Zm0 12a3 3 0 1 1 0-4 3 3 0 0 1 0 4Z"
          />
        </svg>
        {copied && (
          <span className="absolute top-10 right-0 w-max rounded-md bg-bosque px-2 py-1 text-xs font-medium text-white shadow">
            {labels.linkCopied}
          </span>
        )}
      </button>
    </div>
  );
}
