import type { Metadata } from "next";
import { STIX_Two_Text } from "next/font/google";
import { getSite, isLocale, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-url";
import "../globals.css";

// Self-hosted at build time by next/font, so the CSP can keep font-src 'self'.
const stix = STIX_Two_Text({ subsets: ["latin", "latin-ext"], style: ["normal", "italic"], variable: "--font-stix" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const site = getSite(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: site.meta.title,
    description: site.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", es: "/es", "x-default": "/en" },
    },
    openGraph: { title: site.meta.title, description: site.meta.description, locale, type: "website" },
  };
}

// Unknown locales are rejected by each page's notFound(), not here: a notFound() thrown by this root
// layout skips [locale]/not-found.tsx and shows Next's bare default 404 instead of the site's own.
export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  return (
    <html lang={isLocale(locale) ? locale : "en"} className={stix.variable}>
      <body>{children}</body>
    </html>
  );
}
