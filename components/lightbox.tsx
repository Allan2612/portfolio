"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-screen viewer for screenshots. Any .zoom-trigger button (components/themed-image.tsx) opens it with
 * the picture the reader is seeing (light or dark); a click on the picture toggles between fitting the
 * screen and its full size, which then scrolls. The native <dialog> gives Esc, focus return and inert page.
 */
export function Lightbox({ close }: { close: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [shot, setShot] = useState<{ src: string; alt: string } | null>(null);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as Element).closest?.(".zoom-trigger");
      if (!trigger) return;
      // The visible version: the stacked light/dark copies differ only in opacity.
      const imgs = [...trigger.querySelectorAll("img")];
      const img = imgs.find((i) => getComputedStyle(i.parentElement!).opacity !== "0") ?? imgs[0];
      if (!img) return;
      setShot({ src: img.src, alt: img.alt });
      setZoomed(false);
      dialog.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      data-zoomed={zoomed || undefined}
      onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      onClose={() => setShot(null)}
    >
      <button type="button" className="lightbox-close" aria-label={close} onClick={() => dialog.current?.close()}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
        </svg>
      </button>
      {shot && (
        // eslint-disable-next-line @next/next/no-img-element -- shows the URL next/image already produced
        <img src={shot.src} alt={shot.alt} onClick={() => setZoomed((z) => !z)} />
      )}
    </dialog>
  );
}
