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
