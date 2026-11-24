import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "@/components/chrome";
import { getProject, projects } from "@/content/projects";
import { formatPeriod, getSite, isLocale, otherLocale } from "@/lib/i18n";

// Nested under [locale]: called once per locale. With cacheComponents there is no dynamicParams;
// unknown slugs fall through to notFound() below.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};
  const t = project.text[locale];
  const path = `/projects/${slug}`;
  return {
    title: `${t.title} · ${getSite(locale).name}`,
    description: t.summary,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { en: `/en${path}`, es: `/es${path}`, "x-default": `/en${path}` },
    },
    openGraph: { title: t.title, description: t.summary, type: "article" },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) notFound();

  const site = getSite(locale);
  const t = project.text[locale];
  const Body = project.body[locale];
  const index = projects.indexOf(project);
  const prev = projects[index - 1];
  const next = projects[index + 1];
  const cs = site.caseStudy;

  return (
    <>
      <Header locale={locale} switchPath={`/${otherLocale(locale)}/projects/${slug}`} />
      <main id="main">
        <article>
          <header className="col pt-[max(3rem,10vh)]">
            <p className="text-small">
              <a href={`/${locale}#work`} className="link">{cs.back}</a>
            </p>
            <h1 className="page-title mt-6 rise" translate="no">{t.title}</h1>
            <p className="mt-5 max-w-measure text-lead rise rise-2">{t.summary}</p>
          </header>

          {project.cover && (
            <div className="col mt-12">
              <Image
                src={project.cover[locale].src}
                alt={project.cover[locale].alt}
                priority
                sizes="(min-width: 1024px) 52rem, 100vw"
                className="h-auto w-full max-w-wide"
              />
            </div>
          )}

          {/* For readers who will not read the whole case: three points, set apart. */}
          <section className="col mt-12" aria-labelledby="in-short">
            <div className="in-short max-w-wide">
              <h2 id="in-short" className="text-small font-semibold">
                {cs.inShort}
              </h2>
              <ul className="key-points mt-3">
                {t.keyPoints.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </div>
          </section>

          <div className="split mt-14">
            <dl className="facts split-side">
              <div>
                <dt>{cs.role}</dt>
                <dd>{t.role}</dd>
              </div>
              <div>
                <dt>{cs.period}</dt>
                <dd>{formatPeriod(project.start, project.end, locale)}</dd>
              </div>
              <div>
                <dt>{cs.team}</dt>
                <dd>{t.team}</dd>
              </div>
              <div>
                <dt>{cs.status}</dt>
                <dd>{site.kinds[project.kind]}</dd>
              </div>
              <div>
                <dt>{cs.stack}</dt>
                <dd>{project.stack.join(", ")}</dd>
              </div>
              {(project.links.live || project.links.repo) && (
                <div>
                  <dt>{cs.links}</dt>
                  <dd className="grid gap-1">
                    {project.links.live && <a href={project.links.live} className="link">{cs.live}</a>}
                    {project.links.repo && <a href={project.links.repo} className="link">{cs.repo}</a>}
                  </dd>
                </div>
              )}
            </dl>
            <div className="split-main prose">
              {!project.links.repo && <p className="text-small text-soft">{cs.private}</p>}
              <Body />
            </div>
          </div>
        </article>

        <aside className="col pt-section" aria-label={cs.ctaButton}>
          <div className="max-w-measure">
            <p className="text-lead">{cs.cta}</p>
            <p className="mt-6">
              <a href={`/${locale}#contact`} className="button">
                {cs.ctaButton}
              </a>
            </p>
            {(prev || next) && (
              <nav className="mt-12 flex flex-wrap justify-between gap-6" aria-label={`${cs.previous} / ${cs.next}`}>
                {prev && (
                  <Link href={`/${locale}/projects/${prev.slug}`} rel="prev" className="link">
                    {cs.previous}: {prev.text[locale].title}
                  </Link>
                )}
                {next && (
                  <Link href={`/${locale}/projects/${next.slug}`} rel="next" className="link">
                    {cs.next}: {next.text[locale].title}
                  </Link>
                )}
              </nav>
            )}
          </div>
        </aside>
      </main>
      <Footer locale={locale} />
    </>
  );
}
