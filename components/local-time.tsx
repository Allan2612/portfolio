"use client";

import { useEffect, useState } from "react";

/** Allan's current time in Costa Rica, for visitors in other time zones. Filled in on the client only:
 *  a time baked into the static build would be wrong, and rendering it on the server would not hydrate. */
export function LocalTime({ locale, label }: { locale: "en" | "es"; label: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat(locale === "es" ? "es-CR" : "en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Costa_Rica",
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [locale]);

  // Same markup before and after the time arrives (a non-breaking space holds the line), so nothing moves.
  return (
    <p className="local-time mt-1">
      {time ? (
        <>
          <time>{time}</time> {label}
        </>
      ) : (
        " "
      )}
    </p>
  );
}
