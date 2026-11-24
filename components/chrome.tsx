import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { type Locale, getSite, otherLocale } from "@/lib/i18n";

/** Wordmark, section links and the language switch. `switchPath` is this page's path in the other language. */
export function Header({ locale, switchPath, home: isHome = false }: { locale: Locale; switchPath: string; home?: boolean }) {
  const site = getSite(locale);
  const home = `/${locale}`;
  const other = otherLocale(locale);
  return (
    <header data-home={isHome || undefined} className="site-header col flex flex-wrap items-center justify-between gap-x-8 gap-y-3 pt-6 sm:pt-8">
      <a href="#main" className="skip-link">
        {site.nav.skip}
      </a>
      {/* On the home page the big name is the presentation; this wordmark fades in once it scrolls away. */}
      <Link href={home} className="wordmark font-semibold no-underline" translate="no">
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
    <footer className="col grid gap-2 pt-section pb-24 text-small text-soft md:grid-cols-[1fr_auto_1fr] md:items-baseline">
      {/* Fixed in place; appears once the page title has scrolled away (html.past-intro, components/motion.tsx). */}
      <a href="#main" className="icon-button to-top" title={site.nav.top}>
        <span className="sr-only">{site.nav.top}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <p className="footer-name mb-10 md:col-span-3" translate="no" data-reveal>
        {site.name}
      </p>
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
