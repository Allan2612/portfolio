import Link from "next/link";
import { getSite, locales } from "@/lib/i18n";

/** Bilingual 404 body: a 404 does not always know which language the visitor came from. */
export function NotFoundContent() {
  return (
    <main id="main" className="col grid gap-16 pt-[max(4rem,16vh)] pb-section">
      {locales.map((locale) => {
        const site = getSite(locale);
        const nf = site.notFound;
        return (
          <section key={locale} lang={locale} className="max-w-measure">
            <h1 className="text-head">{nf.heading}</h1>
            <p className="mt-4 text-lead">{nf.text}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <li><Link href={`/${locale}`}>{nf.home}</Link></li>
              <li><Link href={`/${locale}#work`}>{nf.projects}</Link></li>
              <li><a href={site.cv[locale]} type="application/pdf">{nf.cv}</a></li>
            </ul>
          </section>
        );
      })}
    </main>
  );
}
