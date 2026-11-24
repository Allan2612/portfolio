import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// The site is fully static, so script nonces are not available: Next.js inlines
// bootstrap scripts, which needs 'unsafe-inline'. 'unsafe-eval' is dev-only (React debugging).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // No upgrade-insecure-requests: every resource is same-origin and HSTS already forces HTTPS, while
  // WebKit applies the upgrade to http://localhost too and loads the production build without CSS.
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Only features Chrome still knows: an unknown one (interest-cohort, browsing-topics) is logged as a console error.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Off on purpose: with it, unknown slugs get a prerendered fallback shell sent as 200 before
  // notFound() runs, so /en/projects/<typo> would not be a real 404. The site has few routes anyway.
  partialPrefetching: false,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  // A 404 for URLs outside /en and /es: the root layout is inside [locale], so app/global-not-found.tsx renders it.
  experimental: { globalNotFound: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    // Temporary (307) so switching to browser-language detection later is not cached by browsers.
    return [{ source: "/", destination: "/en", permanent: false }];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

// Case studies are .mdx files imported by the project page (not routes), so pageExtensions stays default.
export default createMDX()(nextConfig);
