import type { StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { ThemedImage } from "@/components/themed-image";

type Img = { src: StaticImageData; dark?: StaticImageData; alt: string };

/** A screenshot next to its phone version; stacks on small screens. */
export function FigurePair({ wide, narrow, caption }: { wide: Img; narrow: Img; caption: string }) {
  return (
    <figure className="figure-pair">
      <div className="figure-pair-media">
        <ThemedImage zoom src={wide.src} dark={wide.dark} alt={wide.alt} sizes="(min-width: 1280px) 40rem, 78vw" className="h-auto w-full" />
        <ThemedImage zoom src={narrow.src} dark={narrow.dark} alt={narrow.alt} sizes="(min-width: 1280px) 12rem, 22vw" className="h-auto w-full" />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** Diagram arrow drawn in SVG, so the line and the head always meet and stay centred. */
function Arrow({ to = "down" }: { to?: "down" | "right" }) {
  return to === "down" ? (
    <svg className="diagram-arrow-svg" width="14" height="24" viewBox="0 0 14 24" aria-hidden="true">
      <path d="M7 2v19M2 15.5 7 21l5-5.5" />
    </svg>
  ) : (
    <svg className="diagram-arrow-svg" width="24" height="14" viewBox="0 0 24 14" aria-hidden="true">
      <path d="M2 7h19M15.5 2 21 7l-5.5 5" />
    </svg>
  );
}

type Step = [title: string, note: string | null];

/** Steps in order, top to bottom, with an arrow between each. */
export function FlowDiagram({ label, steps, caption }: { label: string; steps: Step[]; caption: string }) {
  return (
    <figure className="diagram" aria-label={label}>
      <ol className="diagram-flow">
        {steps.map(([title, note], n) => (
          <li key={title} data-reveal style={{ "--i": n } as CSSProperties}>
            {n > 0 && (
              <span className="diagram-flow-arrow">
                <Arrow />
              </span>
            )}
            <strong>{title}</strong>
            {note && <span>{note}</span>}
          </li>
        ))}
      </ol>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** Business modules sitting on a shared core. */
export function ModulesDiagram({
  label,
  modules,
  link,
  core,
  coreNote,
  caption,
}: {
  label: string;
  modules: string[];
  link: string;
  core: string;
  coreNote: string;
  caption: string;
}) {
  return (
    <figure className="diagram" aria-label={label}>
      <ul className="diagram-modules">
        {modules.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
      <div className="diagram-link">
        <Arrow />
        <p>{link}</p>
        <Arrow />
      </div>
      <div className="diagram-core">
        <strong>{core}</strong>
        <span>{coreNote}</span>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

type Row = [port: string, adapter: string, note: string | null];

/** Ports and adapters drawn in HTML, so labels stay readable at every width and in both themes. */
export function PortsDiagram({
  label,
  core,
  coreNote,
  rows,
  caption,
}: {
  label: string;
  core: string;
  coreNote: string;
  rows: Row[];
  caption: string;
}) {
  return (
    <figure className="diagram" aria-label={label}>
      <div className="diagram-core">
        <strong>{core}</strong>
        <span>{coreNote}</span>
      </div>
      <ul className="diagram-rows">
        {rows.map(([port, adapter, note]) => (
          <li key={port}>
            <span className="diagram-port">{port}</span>
            <span className="diagram-arrow">
              <Arrow to="right" />
            </span>
            <span className="diagram-adapter">
              {adapter}
              {note && <small>{note}</small>}
            </span>
          </li>
        ))}
      </ul>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/**
 * A picture that is planned but not ready (missing permission or not taken yet). Locally and on preview
 * deployments it shows a dashed box saying what goes there; on the production site it renders nothing,
 * so no public page shows an "image coming soon" gap.
 */
export function PhotoSlot({ children }: { children: string }) {
  if (process.env.VERCEL_ENV === "production") return null;
  return (
    <figure className="photo-slot" aria-hidden="true">
      <span className="photo-slot-mark">Foto pendiente · Planned picture</span>
      <span>{children}</span>
    </figure>
  );
}

/** Extra screens near the end of a case: small screenshots that open in the lightbox. `wide` is for desktop screens. */
export function Gallery({ items, wide = false }: { items: (Img & { caption: string })[]; wide?: boolean }) {
  return (
    <ul className={wide ? "gallery gallery-wide" : "gallery"}>
      {items.map((item) => (
        <li key={item.caption}>
          <figure>
            <ThemedImage zoom src={item.src} dark={item.dark} alt={item.alt} sizes={wide ? "(min-width: 80rem) 30rem, (min-width: 48rem) 45vw, 100vw" : "(min-width: 80rem) 14rem, (min-width: 48rem) 22vw, 45vw"} className="h-auto w-full" />
            <figcaption>{item.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

/** One screenshot with its caption, in the light and dark themes when both exist. */
export function Figure({ image, caption }: { image: Img; caption: string }) {
  return (
    <figure className="figure-single">
      <ThemedImage zoom src={image.src} dark={image.dark} alt={image.alt} sizes="(min-width: 1280px) 52rem, 100vw" className="h-auto w-full" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
