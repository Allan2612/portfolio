import type { Metadata } from "next";
import { STIX_Two_Text } from "next/font/google";
import { notFound } from "next/navigation";
import { getSite, isLocale, locales } from "@/lib/i18n";
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
    title: site.meta.title,
    description: site.meta.description,
    alternates: { languages: { en: "/en", es: "/es", "x-default": "/en" } },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={stix.variable}>
      <body>{children}</body>
    </html>
  );
}
