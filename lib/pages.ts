import type { Locale } from "@/lib/locales";

// Pages secondaires et leurs adresses dans chaque langue
export const PAGE_IDS = ["carte", "traditionnel", "dejeuner", "cadeau", "legal"] as const;
export type PageId = (typeof PAGE_IDS)[number];

export const SLUGS: Record<PageId, Record<Locale, string>> = {
  carte: { fr: "carte", en: "menu" },
  traditionnel: { fr: "restaurant-traditionnel-amiens", en: "traditional-french-restaurant-amiens" },
  dejeuner: { fr: "dejeuner-amiens", en: "lunch-amiens" },
  cadeau: { fr: "bon-cadeau", en: "gift-voucher" },
  legal: { fr: "mentions-legales", en: "legal-notice" },
};

export const pagePath = (id: PageId, lang: Locale) => `/${lang}/${SLUGS[id][lang]}`;

export const pageOfSlug = (slug: string, lang: Locale) => PAGE_IDS.find((id) => SLUGS[id][lang] === slug) ?? null;
