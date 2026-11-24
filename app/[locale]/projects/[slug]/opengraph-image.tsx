import { notFound } from "next/navigation";
import { ogImage, ogSize } from "@/components/og";
import { getProject, projects } from "@/content/projects";
import { getSite, isLocale } from "@/lib/i18n";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study by Allan Vargas Torres";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) notFound();
  const site = getSite(locale);
  const t = project.text[locale];
  return ogImage({ title: t.title, text: t.summary, label: site.kinds[project.kind], footer: site.name });
}
