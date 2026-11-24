import { describe, expect, it } from "vitest";
import { compileTerms, findBanned, parseTerms } from "../scripts/banned-terms.mjs";

// Fake terms only: the real list is private and never enters the repo.
const compiled = compileTerms(parseTerms("# comment\nAcmeCorp\nsecteur\ncafé\n777\n12 34\n"));

describe("banned-terms", () => {
  it("matches case- and accent-insensitively", () => {
    expect(findBanned("Built at ACMECORP.", compiled)).toEqual(["AcmeCorp"]);
    expect(findBanned("CAFE", compiled)).toEqual(["café"]);
  });

  it("matches word stems as prefixes, but only at a word start", () => {
    expect(findBanned("secteurs", compiled)).toEqual(["secteur"]);
    expect(findBanned("intersecteur", compiled)).toEqual([]);
  });

  it("matches numbers only as whole numbers", () => {
    expect(findBanned("about 777 items", compiled)).toEqual(["777"]);
    expect(findBanned("chunk-a777b.js 7770", compiled)).toEqual([]);
  });

  it("treats any whitespace (including nbsp and newlines) as one space", () => {
    expect(findBanned("call 12 \n34", compiled)).toEqual(["12 34"]);
  });

  it("returns nothing for clean text", () => {
    expect(findBanned("A modular ERP for a software company.", compiled)).toEqual([]);
  });
});
