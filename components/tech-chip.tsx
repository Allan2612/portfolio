import { getTech } from "@/content/stack";
import type { Locale } from "@/lib/i18n";
import { techIcons } from "@/lib/tech-icons";

const count = { en: (n: number) => `${n} projects`, es: (n: number) => `${n} proyectos` };

/**
 * A stack item: icon and name. With a mouse it flips to show where it was used. Both faces share one
 * grid cell, so the chip is as wide as its wider face and never covers a neighbour; to keep chips
 * compact the back names one or two projects and counts three or more (the full list is in the title
 * and in the text read by screen readers).
 */
export function TechChip({ name, locale }: { name: string; locale: Locale }) {
  const { icon, used } = getTech(name);
  const face = (
    <span className="tech-face">
      {icon && (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d={techIcons[icon]} />
        </svg>
      )}
      <span>{name}</span>
    </span>
  );
  if (!used) {
    return (
      <li className="tech">
        <span className="tech-card">{face}</span>
      </li>
    );
  }
  const full = used[locale];
  const parts = full.split(" · ");
  const short = parts.length <= 2 ? full : count[locale](parts.length);
  return (
    <li className="tech tech-flip" title={full}>
      <span className="tech-card">
        {face}
        <span className="tech-back" aria-hidden="true">
          {short}
        </span>
        <span className="sr-only">: {full}</span>
      </span>
    </li>
  );
}
