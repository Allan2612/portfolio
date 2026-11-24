import { getSite, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-url";

/** Structured data for search engines. "<" is escaped so no string can close the script tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c") }}
    />
  );
}

/** The site's owner, shared by the home page (as the profile) and the case studies (as the author). */
export function person(locale: Locale) {
  const site = getSite(locale);
  return {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: site.name,
    jobTitle: site.role,
    url: `${siteUrl}/${locale}`,
    address: { "@type": "PostalAddress", addressLocality: "Pérez Zeledón", addressCountry: "CR" },
    knowsLanguage: ["es", "en"],
    sameAs: [site.contact.linkedin, site.contact.github],
  };
}
