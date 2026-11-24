import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "@/components/chrome";
import { projects } from "@/content/projects";
import { formatPeriod, getSite, isLocale, otherLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = getSite(locale);

  return (
    <>
      <Header locale={locale} switchPath={`/${otherLocale(locale)}`} />
      <main id="main">
        {/* Intro: the presentation first. Name, role, what I do, then where, how to reach me and the reading length. */}
        <section className="col intro" aria-labelledby="intro-title">
          <h1 id="intro-title" className="intro-name rise">
            {site.name}
            <span className="intro-role">{site.role}</span>
          </h1>
          <div className="intro-grid">
            <p className="intro-statement rise rise-2">{site.hero.statement}</p>
            <div className="rise rise-3">
              <p>{site.hero.location}</p>
              <p className="mt-2 text-soft">{site.hero.education}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href="#work" className="button">
                  {site.hero.primary}
                </a>
                <a href={site.cv[locale]} type="application/pdf" className="link">
                  {site.hero.cv}
                </a>
                <a href="#contact" className="link">
                  {site.hero.contact}
                </a>
              </div>
              <fieldset className="reading mt-10">
                <legend className="text-small text-soft">{site.hero.reading.legend}</legend>
                <div className="reading-options">
                  <label>
                    <input type="radio" name="reading" value="short" defaultChecked />
                    {site.hero.reading.short}
                  </label>
                  <label>
                    <input type="radio" name="reading" value="full" id="reading-full" />
                    {site.hero.reading.full}
                  </label>
                </div>
              </fieldset>
            </div>
          </div>
          <ul className="proof">
            {site.hero.proof.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>

        <section id="work" className="col pt-section" aria-labelledby="work-title">
          <h2 id="work-title" className="section-title">
            {site.work.heading}
          </h2>
          <ul className="work">
            {projects.map((p) => {
              const t = p.text[locale];
              const href = `/${locale}/projects/${p.slug}`;
              return (
                <li key={p.slug} className="work-row">
                  <div className="work-text">
                    <h3 className="work-title">
                      <Link href={href}>{t.title}</Link>
                    </h3>
                    <p className="text-small text-soft">
                      {site.kinds[p.kind]} · {formatPeriod(p.start, p.end, locale)}
                    </p>
                    <p className="mt-4 text-lead">{t.summary}</p>
                    <ul className="detail key-points mt-4">
                      {t.keyPoints.map((k) => (
                        <li key={k}>{k}</li>
                      ))}
                    </ul>
                    <p className="mt-4 text-small text-soft">{p.cardStack.join(" · ")}</p>
                    <p className="mt-6">
                      <Link href={href} className="read-more">
                        {site.work.readCase} <span aria-hidden="true">→</span>
                      </Link>
                    </p>
                  </div>
                  <Link href={href} className="work-visual" tabIndex={-1} aria-hidden="true">
                    {p.thumb ? (
                      <Image src={p.thumb.src} alt="" sizes="(min-width: 64rem) 45vw, 100vw" className="h-auto w-full" />
                    ) : (
                      <span className="tile">
                        <span className="tile-value">{t.highlight.value}</span>
                        <span className="tile-label">{t.highlight.label}</span>
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section id="experience" className="col pt-section" aria-labelledby="experience-title">
          <h2 id="experience-title" className="section-title">
            {site.experience.heading}
          </h2>
          <ul className="mt-10 grid max-w-wide gap-10">
            {site.experience.items.map((e) => (
              <li key={e.org} className="experience-row">
                <p className="text-small text-soft tabular-nums">{formatPeriod(e.start, e.end, locale)}</p>
                <div>
                  <p className="text-lead">
                    {e.role} <span className="text-soft">· {e.org}</span>
                  </p>
                  <p className="mt-1">{e.line}</p>
                  <ul className="detail mt-3 grid list-disc gap-1 pl-5">
                    {e.detail.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="about" className="band mt-section" aria-labelledby="about-title">
          <div className="split py-section">
            <h2 id="about-title" className="section-title split-title">
              {site.about.heading}
            </h2>
            <dl className="facts split-side">
              {site.about.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="split-main">
              <div className="grid gap-5">
                {/* 1-minute reading: the first paragraph; the other two appear in the 5-minute mode. */}
                {site.about.paragraphs.map((p, i) => (
                  <p key={p.slice(0, 24)} className={i === 0 ? "text-lead" : "detail"}>
                    {p}
                  </p>
                ))}
              </div>
              <h3 className="mt-14 text-lead">{site.about.stackHeading}</h3>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                {site.about.stack.map((g) => (
                  <div key={g.label}>
                    <dt className="text-small text-soft">{g.label}</dt>
                    <dd>{g.items}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="col pt-section" aria-labelledby="more-title">
          <h2 id="more-title" className="section-title">
            {site.more.heading}
          </h2>
          <ul className="more mt-10">
            {site.more.items.map((m) => (
              <li key={m.name}>
                <h3 className="text-lead">{m.name}</h3>
                <p className="mt-2">{m.short}</p>
                <p className="detail mt-2">{m.text}</p>
                {m.href && (
                  <p className="mt-2 text-small">
                    <a href={m.href} className="link">
                      {site.more.code}
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className="closing mt-section" aria-labelledby="contact-title">
          <div className="col py-section">
            <h2 id="contact-title" className="sr-only">
              {site.contactSection.heading}
            </h2>
            <p className="text-lead closing-soft">{site.contactSection.prompt}</p>
            <p className="closing-lead">{site.contactSection.lead}</p>
            <p className="mt-8">
              <a href={`mailto:${site.contact.email}`} className="closing-email">
                {site.contact.email}
              </a>
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
              <li><a href={site.contact.linkedin} className="link">LinkedIn</a></li>
              <li><a href={site.contact.github} className="link">GitHub</a></li>
              <li>
                {site.contactSection.cvLabel}:{" "}
                <a href={site.cv.en} type="application/pdf" hrefLang="en" className="link">{site.contactSection.cvEn}</a>
                {" · "}
                <a href={site.cv.es} type="application/pdf" hrefLang="es" className="link">{site.contactSection.cvEs}</a>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
