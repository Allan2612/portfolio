"use client";

import { useState } from "react";

/** Icon button that copies the address; the icon turns into a check and the change is announced. */
export function CopyEmail({ email, label, done }: { email: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context or permissions): the address stays selectable on the page.
    }
  };

  return (
    <button
      type="button"
      className="icon-button copy-button"
      onClick={copy}
      aria-label={copied ? done : label}
      title={copied ? done : label}
      data-copied={copied || undefined}
    >
      {copied ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="8.5" y="8.5" width="11" height="11" rx="1.5" />
          <path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" />
        </svg>
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? done : ""}
      </span>
    </button>
  );
}
