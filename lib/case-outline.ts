import { readFileSync } from "node:fs";
import { join } from "node:path";
import { slugify } from "@/lib/slug";

/**
 * Section headings and reading time of a case study, read from its MDX source when the static page is
 * built. If the file cannot be read, the page still renders, just without the index and the time.
 */
export function caseOutline(slug: string, locale: string) {
  try {
    const src = readFileSync(join(process.cwd(), "content", "projects", `${slug}.${locale}.mdx`), "utf8");
    const headings = [...src.matchAll(/^## (.+)$/gm)].map((m) => ({ text: m[1].trim(), id: slugify(m[1].trim()) }));
    // Prose only: drop imports and JSX components (diagrams, figures) before counting words.
    const prose = src.replace(/^import .*$/gm, "").replace(/<[A-Z][\s\S]*?\/>/g, " ");
    const words = prose.split(/\s+/).filter((w) => /\p{L}/u.test(w)).length;
    return { headings, minutes: Math.max(1, Math.round(words / 220)) };
  } catch {
    return { headings: [], minutes: null };
  }
}
