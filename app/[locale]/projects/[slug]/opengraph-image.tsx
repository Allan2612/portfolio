import { notFound } from "next/navigation";
import { ogImage, ogShot, ogSize } from "@/components/og";
import { getProject, projects } from "@/content/projects";
import { getSite, isLocale } from "@/lib/i18n";

export function generateImageMetadata({ params }: { params: { locale: string; slug: string } }) {
  const project = getProject(params.slug);
  const alt = isLocale(params.locale) && project ? `${project.text[params.locale].title} · ${getSite(params.locale).name}` : "";
  return [{ id: "card", alt, size: ogSize, contentType: "image/png" }];
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) notFound();
  const site = getSite(locale);
  const t = project.text[locale];
  const shot = project.ogShot ? ogShot(project.ogShot[locale]) : undefined;
  return ogImage({ title: t.title, text: t.summary, label: site.kinds[project.kind], footer: site.name, shot });
}
