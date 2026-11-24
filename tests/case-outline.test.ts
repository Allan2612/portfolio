import { readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { caseOutline } from "@/lib/case-outline";

// Read the folder rather than content/projects.ts, which imports the MDX bodies.
const cases = readdirSync("content/projects")
  .map((f) => f.match(/^(.+)\.(en|es)\.mdx$/))
  .filter((m) => m !== null);

describe("caseOutline", () => {
  it("finds the sections and a reading time for every case study in both languages", () => {
    expect(cases.length).toBeGreaterThan(0);
    for (const [, slug, locale] of cases) {
      const { headings, minutes } = caseOutline(slug, locale);
      expect(headings.length, `${slug}.${locale}`).toBeGreaterThan(1);
      expect(new Set(headings.map((h) => h.id)).size).toBe(headings.length);
      expect(minutes).toBeGreaterThan(0);
    }
  });
});
