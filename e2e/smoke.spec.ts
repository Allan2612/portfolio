import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("root redirects to English", async ({ request }) => {
  const res = await request.get("/", { maxRedirects: 0 });
  expect(res.status()).toBe(307);
  expect(res.headers()["location"]).toBe("/en");
});

for (const [locale, other] of [
  ["en", "es"],
  ["es", "en"],
] as const) {
  test(`/${locale} renders, is accessible and links to /${other}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Allan Vargas Torres");

    const axe = await new AxeBuilder({ page }).analyze();
    expect(axe.violations).toEqual([]);

    await page.locator(`a[hreflang="${other}"]`).click();
    await expect(page).toHaveURL(`/${other}`);
  });
}

test("unknown locale is a 404", async ({ request }) => {
  const res = await request.get("/fr");
  expect(res.status()).toBe(404);
});

test("security headers are set", async ({ request }) => {
  const h = (await request.get("/en")).headers();
  expect(h["content-security-policy"]).toContain("default-src 'self'");
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["content-security-policy"]).not.toContain("unsafe-eval");
  expect(h["strict-transport-security"]).toContain("max-age=");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(h["permissions-policy"]).toContain("camera=()");
  expect(h["x-powered-by"]).toBeUndefined();
});
