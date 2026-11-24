import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/slug";

describe("slugify", () => {
  it("drops accents and punctuation, joins words with hyphens", () => {
    expect(slugify("Qué construí")).toBe("que-construi");
    expect(slugify("What I took from it")).toBe("what-i-took-from-it");
    expect(slugify("  Result!  ")).toBe("result");
  });
});
