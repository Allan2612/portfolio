import Link from "next/link";
import { notFound } from "next/navigation";
import { getSite, isLocale, otherLocale } from "@/lib/i18n";

// Phase 0 shell: real data only, no design yet. The home page is built in Phase 3.
export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = getSite(locale);

  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-4xl font-semibold">{site.name}</h1>
      <p className="mt-2 text-xl">{site.role}</p>
      <p className="mt-1">{site.location}</p>
      <ul className="mt-8 flex gap-6 underline">
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
    </main>
  );
}
