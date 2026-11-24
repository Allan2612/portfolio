import { notFound } from "next/navigation";
import { ogImage, ogSize } from "@/components/og";
import { getSite, isLocale, locales } from "@/lib/i18n";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Allan Vargas Torres · Full Stack Developer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = getSite(locale);
  return ogImage({ title: site.name, text: site.hero.statement, label: site.role, footer: "Pérez Zeledón, Costa Rica" });
}
