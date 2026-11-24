import en from "@/content/site.en";
import es from "@/content/site.es";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const otherLocale = (locale: Locale): Locale => (locale === "en" ? "es" : "en");

const sites = { en, es };
export const getSite = (locale: Locale) => sites[locale];

/** "2026-07" → "Jul 2026" / "jul. 2026", with the site's own month names (the Spanish CV writes "set."). */
export const formatMonth = (yyyyMm: string, locale: Locale) => {
  const [year, month] = yyyyMm.split("-").map(Number);
  return `${sites[locale].months[month - 1]} ${year}`;
};

export const formatPeriod = (start: string, end: string | null, locale: Locale) =>
  `${formatMonth(start, locale)} – ${end ? formatMonth(end, locale) : sites[locale].present}`;
