import { notFound } from "next/navigation";
import { ogImage, ogSize } from "@/components/og";
import { getSite, isLocale } from "@/lib/i18n";

export function generateImageMetadata({ params }: { params: { locale: string } }) {
  const alt = isLocale(params.locale) ? getSite(params.locale).meta.title : "";
  return [{ id: "card", alt, size: ogSize, contentType: "image/png" }];
}


export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = getSite(locale);
  return ogImage({ title: site.name, text: site.hero.statement, label: site.role, footer: "Pérez Zeledón, Costa Rica" });
}
