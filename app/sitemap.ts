import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteUrl } from "@/lib/site-url";

// Every page exists in both languages; each entry lists its alternates.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/cv", ...projects.map((p) => `/projects/${p.slug}`)];
  return paths.flatMap((path) =>
    (["en", "es"] as const).map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      alternates: { languages: { en: `${siteUrl}/en${path}`, es: `${siteUrl}/es${path}` } },
    })),
  );
}
