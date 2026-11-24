import type { Metadata, Viewport } from "next";
import { STIX_Two_Text } from "next/font/google";
import { getSite, isLocale, locales, ogLocale, otherLocale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-url";
import { themeScript } from "@/lib/theme";
import { Motion } from "@/components/motion";
import "../globals.css";

// Self-hosted at build time by next/font, so the CSP can keep font-src 'self'.
const stix = STIX_Two_Text({ subsets: ["latin", "latin-ext"], style: ["normal", "italic"], variable: "--font-stix" });

// Browser chrome on phones matches the page ground (follows the system; the manual toggle cannot change it statically).
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e8e8e3" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

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
    openGraph: {
      title: site.meta.title,
      description: site.meta.description,
      locale: ogLocale[locale],
      alternateLocale: ogLocale[otherLocale(locale)],
      siteName: site.name,
      type: "website",
    },
  };
}

// Unknown locales are rejected by each page's notFound(), not here: a notFound() thrown by this root
// layout skips [locale]/not-found.tsx and shows Next's bare default 404 instead of the site's own.
export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  return (
    // suppressHydrationWarning: themeScript may set data-theme on <html> before React hydrates.
    <html lang={isLocale(locale) ? locale : "en"} className={stix.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <Motion />
      </body>
    </html>
  );
}
