import { defineConfig, devices } from "@playwright/test";

// Runs against the production build (`pnpm build` first), so headers and static output are real.
export default defineConfig({
  testDir: "e2e",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  // Reduced motion: axe must measure colours after the intro animation, not halfway through a fade.
  use: { baseURL: "http://localhost:3000", contextOptions: { reducedMotion: "reduce" } },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "phone", use: { ...devices["Pixel 7"] } },
    { name: "safari", use: { ...devices["Desktop Safari"] } },
    { name: "iphone", use: { ...devices["iPhone 15"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  ],
  webServer: {
    command: "pnpm start",
    url: "http://localhost:3000/en",
    reuseExistingServer: !process.env.CI,
  },
});
