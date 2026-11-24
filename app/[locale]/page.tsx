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
        {/* Intro: who, what, where, and the reading-length control (CSS only, see .reading in globals.css). */}
        <section className="col pt-[max(4rem,14vh)]" aria-labelledby="intro-title">
          <div className="max-w-measure">
            <h1 id="intro-title" className="text-head">
              {site.name}
              <span className="block">{site.role}</span>
            </h1>
            <p className="mt-6 text-lead">{site.hero.statement}</p>
            <p className="mt-4 text-soft">{site.hero.location}</p>
            <p className="text-soft">{site.hero.education}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="#work" className="button">
                {site.hero.primary}
              </a>
              <a href={site.cv[locale]} type="application/pdf">
                {site.hero.cv}
              </a>
              <a href="#contact">{site.hero.contact}</a>
            </div>
            <ul className="mt-10 grid gap-1 text-small">
              {site.hero.proof.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
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
        </section>

        <section id="work" className="col ledger-section pt-section" aria-labelledby="work-title">
          <h2 id="work-title" className="section-title">
            {site.work.heading}
          </h2>
          <ul className="ledger mt-8 max-w-measure">
            {projects.map((p) => {
              const t = p.text[locale];
              const href = `/${locale}/projects/${p.slug}`;
              return (
                <li key={p.slug}>
                  <Link href={href} className="ledger-row">
                    <span className="ledger-name">{t.title}</span>
                    <span className="ledger-kind">{site.kinds[p.kind]}</span>
                    <span className="ledger-year">{p.start.slice(0, 4)}</span>
                  </Link>
                  <p className="ledger-summary">{t.summary}</p>
                  <div className="detail ledger-detail">
                    <p>{t.detail}</p>
                    <p className="text-soft">{p.cardStack.join(" · ")}</p>
                    <p>
                      <Link href={href}>{site.work.readCase}</Link>
                    </p>
                  </div>
                  {p.cover && (
                    <Image
                      className="ledger-preview"
                      src={p.cover[locale].src}
                      alt={p.cover[locale].alt}
                      sizes="(min-width: 1024px) 22rem, 100vw"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section id="experience" className="col pt-section" aria-labelledby="experience-title">
          <h2 id="experience-title" className="section-title">
            {site.experience.heading}
          </h2>
          <ul className="mt-8 grid max-w-measure gap-6">
            {site.experience.items.map((e) => (
              <li key={e.org}>
                <div className="two-ends">
                  <span>
                    <strong className="font-semibold">{e.role}</strong> · {e.org}
                  </span>
                  <span className="two-ends-value">{formatPeriod(e.start, e.end, locale)}</span>
                </div>
                <p className="mt-1 text-soft">{e.line}</p>
                <ul className="detail mt-2 grid list-disc gap-1 pl-5">
                  {e.detail.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section id="about" className="split pt-section" aria-labelledby="about-title">
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
              {site.about.paragraphs.map((p, i) => (
                <p key={p.slice(0, 24)} className={i === 0 ? "text-lead" : undefined}>
                  {p}
                </p>
              ))}
            </div>
            <h3 className="mt-14 font-semibold">{site.about.stackHeading}</h3>
            <dl className="mt-4 grid gap-4">
              {site.about.stack.map((g) => (
                <div key={g.label}>
                  <dt className="text-small text-soft">{g.label}</dt>
                  <dd>{g.items}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="col pt-section" aria-labelledby="more-title">
          <h2 id="more-title" className="section-title">
            {site.more.heading}
          </h2>
          <ul className="mt-8 grid max-w-measure gap-6">
            {site.more.items.map((m) => (
              <li key={m.name}>
                <p className="font-semibold">{m.name}</p>
                <p className="mt-1">{m.text}</p>
                {m.href && (
                  <p className="mt-1 text-small">
                    <a href={m.href}>{site.more.code}</a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className="col pt-section" aria-labelledby="contact-title">
          <h2 id="contact-title" className="sr-only">
            {site.contactSection.heading}
          </h2>
          <div className="max-w-measure">
            <p className="text-lead">
              <span className="block text-soft">{site.contactSection.prompt}</span>
              <span className="block">{site.contactSection.lead}</span>
            </p>
            <p className="mt-6 text-head">
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <li><a href={site.contact.linkedin}>LinkedIn</a></li>
              <li><a href={site.contact.github}>GitHub</a></li>
              <li>
                {site.contactSection.cvLabel}:{" "}
                <a href={site.cv.en} type="application/pdf" hrefLang="en">{site.contactSection.cvEn}</a>
                {" · "}
                <a href={site.cv.es} type="application/pdf" hrefLang="es">{site.contactSection.cvEs}</a>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
