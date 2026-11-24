import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { type Locale, getSite, otherLocale } from "@/lib/i18n";

/** Wordmark, section links and the language switch. `switchPath` is this page's path in the other language. */
export function Header({ locale, switchPath }: { locale: Locale; switchPath: string }) {
  const site = getSite(locale);
  const home = `/${locale}`;
  const other = otherLocale(locale);
  return (
    <header className="col flex flex-wrap items-center justify-between gap-x-8 gap-y-3 pt-6 sm:pt-8">
      <a href="#main" className="skip-link">
        {site.nav.skip}
      </a>
      <Link href={home} className="font-semibold no-underline">
        {site.name}
      </Link>
      <nav aria-label={site.nav.label} className="order-last w-full sm:order-none sm:ml-auto sm:w-auto">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-small">
          <li><a href={`${home}#work`}>{site.nav.work}</a></li>
          <li><a href={`${home}#experience`}>{site.nav.experience}</a></li>
          <li><a href={`${home}#about`}>{site.nav.about}</a></li>
          <li><Link href={`${home}/cv`}>{site.nav.cv}</Link></li>
          <li><a href={`${home}#contact`}>{site.nav.contact}</a></li>
        </ul>
      </nav>
      <div className="header-controls">
        <div className="lang-switch" role="group" aria-label={site.nav.language}>
          {(["en", "es"] as const).map((l) =>
            l === locale ? (
              <span key={l} aria-current="true" title={getSite(l).nav.languageName}>
                {l.toUpperCase()}
              </span>
            ) : (
              // A plain <a>, not <Link>: each language has its own root layout, and a client-side switch
              // re-renders <html> without data-theme, dropping the theme the visitor chose.
              <a key={l} href={switchPath} hrefLang={other} lang={other} title={getSite(l).nav.languageName}>
                {l.toUpperCase()}
              </a>
            ),
          )}
        </div>
        <ThemeToggle label={site.nav.theme} />
      </div>
    </header>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  return (
    <footer className="col grid gap-2 pt-section pb-8 text-small text-soft md:grid-cols-[1fr_auto_1fr] md:items-baseline">
      <p>{site.footer.description}</p>
      <ul className="flex flex-wrap gap-x-6 gap-y-1 text-ink">
        <li><a href={site.contact.linkedin}>LinkedIn</a></li>
        <li><a href={site.contact.github}>GitHub</a></li>
        <li><a href={site.contact.repo}>{site.footer.source}</a></li>
      </ul>
      <p className="md:text-right">
        <a href={`mailto:${site.contact.email}`} className="text-ink">{site.contact.email}</a>
      </p>
    </footer>
  );
}
