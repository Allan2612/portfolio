import Image, { type StaticImageData } from "next/image";

type Img = { src: StaticImageData; alt: string };

/** A screenshot next to its phone version; stacks on small screens. */
export function FigurePair({ wide, narrow, caption }: { wide: Img; narrow: Img; caption: string }) {
  return (
    <figure className="figure-pair">
      <div className="figure-pair-media">
        <Image src={wide.src} alt={wide.alt} sizes="(min-width: 1024px) 40rem, 100vw" className="h-auto w-full" />
        <Image src={narrow.src} alt={narrow.alt} sizes="(min-width: 1024px) 12rem, 40vw" className="h-auto w-full" />
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
            <span className="diagram-arrow" aria-hidden="true" />
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
