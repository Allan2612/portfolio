import { describe, expect, it } from "vitest";
import { getTech } from "@/content/stack";
import en from "@/content/site.en";
import es from "@/content/site.es";

const items = (site: typeof en) => site.about.stack.flatMap((g) => g.items.split(/[,;] /));

describe("stack metadata", () => {
  it.each([
    ["en", en],
    ["es", es],
  ] as const)("every %s stack item has an icon or a 'used in' line", (_, site) => {
    const missing = items(site).filter((name) => {
      const t = getTech(name);
      return !t.icon && !t.used;
    });
    expect(missing).toEqual([]);
  });
});
