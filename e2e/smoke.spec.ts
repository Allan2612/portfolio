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
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Allan Vargas Torres");

    const axe = await new AxeBuilder({ page }).analyze();
    expect(axe.violations).toEqual([]);

    await page.locator(`header a[hreflang="${other}"]`).click();
    await expect(page).toHaveURL(`/${other}`);
  });

  test(`/${locale}/projects/tyt renders, is accessible and keeps the project when switching language`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/projects/tyt`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("TyT Tecnología");
    await expect(page.locator(`link[rel="alternate"][hreflang="${other}"]`)).toHaveAttribute(
      "href",
      new RegExp(`/${other}/projects/tyt$`),
    );

    const axe = await new AxeBuilder({ page }).analyze();
    expect(axe.violations).toEqual([]);

    await page.locator(`header a[hreflang="${other}"]`).click();
    await expect(page).toHaveURL(`/${other}/projects/tyt`);
  });
}

test("the home page links to the TyT case study", async ({ page }) => {
  await page.goto("/en");
  await page.locator("#work").getByRole("link", { name: /TyT Tecnología/ }).first().click();
  await expect(page).toHaveURL("/en/projects/tyt");
});

test("reading for 5 minutes reveals the details; 1 minute hides them", async ({ page }) => {
  await page.goto("/en");
  const detail = page.locator(".ledger-detail").first();
  await expect(detail).toBeHidden();
  await page.getByText("5 minutes", { exact: true }).click();
  await expect(detail).toBeVisible();
  await page.getByText("1 minute", { exact: true }).click();
  await expect(detail).toBeHidden();
});

test("the CV links serve PDFs", async ({ request }) => {
  for (const lang of ["EN", "ES"]) {
    const res = await request.get(`/cv/Allan-Vargas-Torres-CV-${lang}.pdf`);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("application/pdf");
  }
});

test("unknown locale and unknown project are 404", async ({ request }) => {
  expect((await request.get("/fr")).status()).toBe(404);
  expect((await request.get("/en/projects/nope")).status()).toBe(404);
});

test("no page scrolls sideways", async ({ page }) => {
  for (const path of ["/en", "/es", "/en/projects/tyt"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
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
