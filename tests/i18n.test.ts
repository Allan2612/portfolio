import { describe, expect, it } from "vitest";
import { formatPeriod } from "@/lib/i18n";

describe("formatPeriod", () => {
  it("formats a closed period in each language, with the CV's month names", () => {
    expect(formatPeriod("2026-07", "2026-11", "en")).toBe("Jul 2026 – Nov 2026");
    expect(formatPeriod("2024-09", "2026-11", "es")).toBe("set. 2024 – nov. 2026");
  });

  it("writes an open period as running to the present", () => {
    expect(formatPeriod("2024-09", null, "en")).toBe("Sep 2024 – Present");
    expect(formatPeriod("2026-07", null, "es")).toBe("jul. 2026 – actualidad");
  });
});
