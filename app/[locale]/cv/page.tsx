import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Header } from "@/components/chrome";
import { formatPeriod, getSite, isLocale, otherLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[locale]/cv">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const site = getSite(locale);
  return {
    title: `${site.cvPage.title} · ${site.name}`,
    description: site.cvPage.description,
    alternates: { canonical: `/${locale}/cv`, languages: { en: "/en/cv", es: "/es/cv", "x-default": "/en/cv" } },
  };
}

export default async function CvPage({ params }: PageProps<"/[locale]/cv">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = getSite(locale);
  const cv = site.cvPage;

  return (
    <>
      <Header locale={locale} switchPath={`/${otherLocale(locale)}/cv`} />
      <main id="main" className="col pt-[max(3rem,10vh)]">
        <div className="max-w-measure">
          <h1 className="text-head">{cv.title}</h1>
          <p className="mt-4 text-lead">{cv.intro}</p>
          <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={site.cv[locale]} type="application/pdf" className="button">
              {locale === "en" ? cv.downloadEn : cv.downloadEs}
            </a>
            <a href={site.cv[otherLocale(locale)]} type="application/pdf" hrefLang={otherLocale(locale)}>
              {locale === "en" ? cv.downloadEs : cv.downloadEn}
            </a>
          </p>
          <p className="mt-3 text-small text-soft">{cv.phone}</p>

          <h2 className="section-title mt-16">{cv.profileHeading}</h2>
          <p className="mt-4">{cv.profile}</p>

          <h2 className="section-title mt-16">{site.experience.heading}</h2>
          <ul className="mt-6 grid gap-8">
            {site.experience.items.map((e) => (
              <li key={e.org}>
                <div className="two-ends">
                  <span>
                    <strong className="font-semibold">{e.role}</strong> · {e.org}
                  </span>
                  <span className="two-ends-value">{formatPeriod(e.start, e.end, locale)}</span>
                </div>
                <p className="mt-1 text-soft">{e.line}</p>
                <ul className="mt-2 grid list-disc gap-1 pl-5">
                  {e.detail.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <h2 className="section-title mt-16">{cv.projectsHeading}</h2>
          <ul className="mt-6 grid gap-6">
            {cv.projects.map((p) => (
              <li key={p.name}>
                <div className="two-ends">
                  <strong className="font-semibold">
                    {p.href ? <a href={p.href}>{p.name}</a> : p.name}
                  </strong>
                  <span className="two-ends-value">{p.note}</span>
                </div>
                <p className="text-small text-soft">{p.stack}</p>
                <p className="mt-1">{p.text}</p>
              </li>
            ))}
          </ul>

          <h2 className="section-title mt-16">{cv.skillsHeading}</h2>
          <dl className="mt-6 grid gap-4">
            {site.about.stack.map((g) => (
              <div key={g.label}>
                <dt className="text-small text-soft">{g.label}</dt>
                <dd>{g.items}</dd>
              </div>
            ))}
          </dl>

          <h2 className="section-title mt-16">{cv.educationHeading}</h2>
          <ul className="mt-6 grid gap-6">
            {cv.education.map((ed) => (
              <li key={ed.title}>
                <div className="two-ends">
                  <strong className="font-semibold">{ed.title}</strong>
                  <span className="two-ends-value">{ed.when}</span>
                </div>
                <p className="text-soft">{ed.place}</p>
                {ed.note && <p className="mt-1">{ed.note}</p>}
              </li>
            ))}
          </ul>

          <h2 className="section-title mt-16">{cv.languagesHeading}</h2>
          <p className="mt-4">{cv.languages}</p>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
