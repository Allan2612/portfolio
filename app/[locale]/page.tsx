import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type CSSProperties, Fragment } from "react";
import { Footer, Header } from "@/components/chrome";
import { CopyEmail } from "@/components/copy-email";
import { JsonLd, person } from "@/components/json-ld";
import { LocalTime } from "@/components/local-time";
import { TechChip } from "@/components/tech-chip";
import { projects } from "@/content/projects";
import { formatPeriod, getSite, isLocale, otherLocale } from "@/lib/i18n";

/** Stagger index for entrance animations (see .rise / [data-reveal] in globals.css). */
const i = (n: number) => ({ "--i": n }) as CSSProperties;

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = getSite(locale);

  return (
    <>
      <JsonLd data={{ "@type": "ProfilePage", inLanguage: locale, mainEntity: person(locale) }} />
      <Header locale={locale} switchPath={`/${otherLocale(locale)}`} home />
      <main id="main">
        {/* Intro: the presentation first. The name rises word by word from behind its baseline (the signature move). */}
        <section className="col intro" aria-labelledby="intro-title">
          <h1 id="intro-title" className="intro-name">
            <span className="mask-words" translate="no">
              {site.name.split(" ").map((word, n) => (
                <Fragment key={word}>
                  {n > 0 && " "}
                  <span className="mask">
                    <span className="mask-inner" style={i(n)}>
                      {word}
                    </span>
                  </span>
                </Fragment>
              ))}
            </span>
            <span className="intro-role rise" style={i(3)}>
              {site.role}
            </span>
          </h1>
          <div className="intro-grid">
            <p className="intro-statement rise" style={i(4)}>
              {site.hero.statement}
            </p>
            <div className="rise" style={i(5)}>
              <p className="font-semibold">{site.hero.status}</p>
              <p className="mt-1">{site.hero.location}</p>
              <LocalTime locale={locale} label={site.hero.localTime} />
              <p className="mt-1">{site.hero.remote}</p>
              <p className="mt-3 text-soft">{site.hero.education}</p>
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
          <ul className="proof" data-reveal style={i(2)}>
            {site.hero.proof.map((p) => (
              <li key={p.label}>
                <span className="proof-value" data-count={p.value}>
                  {p.value}
                </span>
                <span className="proof-label">{p.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="work" className="col pt-section" aria-labelledby="work-title">
          <h2 id="work-title" className="section-title" data-reveal>
            {site.work.heading}
          </h2>
          <ul className="work">
            {projects.map((p) => {
              const t = p.text[locale];
              const href = `/${locale}/projects/${p.slug}`;
              const countable = /^\d+$/.test(t.highlight.value);
              return (
                <li key={p.slug} className="work-row" data-reveal>
                  <div className="work-text">
                    <h3 className="work-title">
                      <Link href={href} translate="no">
                        {t.title}
                      </Link>
                    </h3>
                    <p className="text-small text-soft">
                      {site.kinds[p.kind]} · {formatPeriod(p.start, p.end, locale)}
                    </p>
                    <p className="mt-4 text-lead">{t.summary}</p>
                    <div className="detail">
                      <div>
                      <ul className="key-points pt-4">
                        {t.keyPoints.map((k) => (
                          <li key={k}>{k}</li>
                        ))}
                      </ul>
                      </div>
                    </div>
                    <p className="mt-4 text-small text-soft">{p.cardStack.join(" · ")}</p>
                    <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                      <Link href={href} className="read-more">
                        {site.work.readCase}<span className="sr-only" translate="no"> ({t.title})</span> <span className="arrow" aria-hidden="true">→</span>
                      </Link>
                      {p.links.live && (
                        <a href={p.links.live} className="link">
                          {site.work.live}<span className="sr-only" translate="no"> ({t.title})</span> <span aria-hidden="true">↗</span>
                        </a>
                      )}
                      {p.links.repo && (
                        <a href={p.links.repo} className="link">
                          {site.work.code}<span className="sr-only" translate="no"> ({t.title})</span> <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </p>
                  </div>
                  <Link href={href} className="work-visual" tabIndex={-1} aria-hidden="true">
                    {p.thumb ? (
                      <span className="shutter">
                        <Image src={p.thumb.src} alt={p.thumb.alt[locale]} sizes="(min-width: 64rem) 45vw, 100vw" className="h-auto w-full" />
                      </span>
                    ) : (
                      <span className="tile">
                        <span className="tile-value" data-count={countable ? t.highlight.value : undefined}>
                          {t.highlight.value}
                        </span>
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
          <h2 id="experience-title" className="section-title" data-reveal>
            {site.experience.heading}
          </h2>
          <ul className="mt-10 grid max-w-wide gap-10">
            {site.experience.items.map((e, n) => (
              <li key={e.org} className="experience-row" data-reveal style={i(n)}>
                <p className="text-small text-soft tabular-nums">{formatPeriod(e.start, e.end, locale)}</p>
                <div>
                  <p className="text-lead">
                    {e.role} <span className="text-soft">· {e.org}</span>
                  </p>
                  <p className="mt-1">{e.line}</p>
                  <div className="detail">
                    <div>
                    <ul className="grid list-disc gap-1 pt-3 pl-5">
                      {e.detail.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="about" className="band mt-section" aria-labelledby="about-title">
          <div className="split py-section">
            <h2 id="about-title" className="section-title split-title" data-reveal>
              {site.about.heading}
            </h2>
            <dl className="facts split-side" data-reveal style={i(1)}>
              {site.about.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="split-main" data-reveal style={i(1)}>
              {/* Summary: the first paragraph; the other two appear in "Full detail". */}
              <p className="text-lead">{site.about.paragraphs[0]}</p>
              <div className="detail">
                <div>
                <div className="grid gap-5 pt-5">
                  {site.about.paragraphs.slice(1).map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
                </div>
              </div>
              <h3 className="mt-14 text-lead">{site.about.stackHeading}</h3>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                {site.about.stack.map((g) => (
                  <div key={g.label}>
                    <dt className="text-small text-soft">{g.label}</dt>
                    <dd>
                      <ul className="chips">
                        {g.items.split(/[,;] /).map((item) => (
                          <TechChip key={item} name={item} locale={locale} />
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="col pt-section" aria-labelledby="more-title">
          <h2 id="more-title" className="section-title" data-reveal>
            {site.more.heading}
          </h2>
          <ul className="more mt-10">
            {site.more.items.map((m, n) => (
              <li key={m.name} data-reveal style={i(n % 2)}>
                <h3 className="text-lead" translate="no">
                  {m.name}
                </h3>
                <p className="mt-2">{m.short}</p>
                <div className="detail">
                  <div>
                    <p className="pt-2">{m.text}</p>
                  </div>
                </div>
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
          <div className="col py-section" data-reveal>
            <h2 id="contact-title" className="sr-only">
              {site.contactSection.heading}
            </h2>
            <p className="text-lead closing-soft">{site.contactSection.prompt}</p>
            <p className="closing-lead">
              <span className="mask">
                <span className="mask-inner">{site.contactSection.lead}</span>
              </span>
            </p>
            <p className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <a href={`mailto:${site.contact.email}`} className="closing-email">
                {site.contact.email}
              </a>
              <CopyEmail email={site.contact.email} label={site.contactSection.copy} done={site.contactSection.copied} />
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
              <li><a href={site.contact.linkedin} className="link">LinkedIn</a></li>
              <li><a href={site.contact.github} className="link">GitHub</a></li>
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="text-small closing-soft">{site.contactSection.cvLabel}</span>
              {(["en", "es"] as const).map((l) => (
                <a key={l} href={site.cv[l]} type="application/pdf" hrefLang={l} className="download" download>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 4v11m-5-5 5 5 5-5M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {l === "en" ? site.contactSection.cvEn : site.contactSection.cvEs}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
