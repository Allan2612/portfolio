import Link from "next/link";
import { notFound } from "next/navigation";
import { getSite, isLocale, otherLocale } from "@/lib/i18n";

// Shell with the Phase 2 tokens applied. The real home page is built in Phase 3.
export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = getSite(locale);

  return (
    <main className="pl-inset pr-gutter py-section">
      <div className="max-w-measure">
      <h1 className="text-head">{site.name}</h1>
      <p className="mt-2 text-lead">{site.role}</p>
      <p className="mt-1 text-soft">{site.location}</p>
      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 underline underline-offset-4">
        <li>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        </li>
        <li>
          <a href={site.contact.linkedin} rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={site.contact.github} rel="noopener noreferrer">
            GitHub
          </a>
        </li>
      </ul>
      <Link
        className="mt-8 inline-block underline"
        href={`/${otherLocale(locale)}`}
        hrefLang={otherLocale(locale)}
        aria-label={site.nav.switchLocaleLabel}
      >
        {site.nav.switchLocale}
      </Link>
      </div>
    </main>
  );
}
