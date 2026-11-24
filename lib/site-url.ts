// Vercel sets VERCEL_PROJECT_PRODUCTION_URL to the production domain, so a custom domain needs no code change.
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";
