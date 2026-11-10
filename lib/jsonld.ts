import site from "@/data/site.json";
import carte from "@/data/carte.json";
import { getDict, locales, type Dict, type Locale } from "@/lib/i18n";
import { weekHours } from "@/lib/hours";
import { pagePath, type PageId } from "@/lib/pages";

const BUSINESS = `${site.url}/#restaurant`;
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
type Item = { price: number | null };

function menu(lang: Locale) {
  const d = getDict(lang);
  const items = carte.items as Record<string, Item>;
  return {
    "@type": "Menu",
    "@id": `${site.url}${pagePath("carte", lang)}#menu`,
    name: d.pages.carte.title,
    url: `${site.url}${pagePath("carte", lang)}`,
    inLanguage: lang,
    hasMenuSection: carte.categories.map((c) => ({
      "@type": "MenuSection",
      name: d.carte.categories[c.id as keyof Dict["carte"]["categories"]],
      hasMenuItem: c.items.map((id) => {
        const t = d.carte.items[id as keyof Dict["carte"]["items"]];
        const p = items[id].price;
        return {
          "@type": "MenuItem",
          name: t.name,
          ...(t.desc ? { description: t.desc } : {}),
          ...(p !== null ? { offers: { "@type": "Offer", price: p.toFixed(2), priceCurrency: "EUR" } } : {}),
        };
      }),
    })),
  };
}

function restaurant(lang: Locale) {
  const d = getDict(lang);
  return {
    "@type": "Restaurant",
    "@id": BUSINESS,
    name: site.name,
    description: d.meta.description,
    url: `${site.url}/${lang}`,
    image: [`${site.url}/og.jpg`],
    logo: `${site.url}/logo.svg`,
    telephone: "+33 3 22 44 60 23",
    priceRange: "€€",
    servesCuisine: ["French", "Cuisine française traditionnelle"],
    address: { "@type": "PostalAddress", streetAddress: site.address.street, postalCode: site.address.postalCode, addressLocality: site.address.city, addressRegion: site.address.region, addressCountry: site.address.country },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapsUrl,
    openingHoursSpecification: weekHours().flatMap((slots, i) => slots.map(([opens, closes]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${DAYS[i]}`, opens, closes }))),
    // Note Google relevée à la main (data/site.json → rating.checked) : à mettre à jour de temps en temps
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
      worstRating: 1,
      description: `Google, ${site.rating.checked}`,
    },
    acceptsReservations: `${site.url}/${lang}#reserver`,
    hasMenu: `${site.url}${pagePath("carte", lang)}`,
    maximumAttendeeCapacity: site.capacity,
    potentialAction: {
      "@type": "ReserveAction",
      target: { "@type": "EntryPoint", urlTemplate: `${site.url}/${lang}#reserver`, inLanguage: lang, actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"] },
      result: { "@type": "FoodEstablishmentReservation", name: d.book.title },
    },
    knowsLanguage: ["fr", "en"],
  };
}

/** Données structurées de l'accueil : Restaurant, horaires, note Google (avec sa date), réservation, FAQ. */
export function homeJsonLd(lang: Locale) {
  const d = getDict(lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, inLanguage: [...locales], publisher: { "@id": BUSINESS } },
      restaurant(lang),
      { "@type": "FAQPage", mainEntity: d.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };
}

/** Données structurées d'une page secondaire, avec fil d'Ariane (et la carte en Menu). */
export function pageJsonLd(lang: Locale, id: PageId) {
  const d = getDict(lang);
  const url = `${site.url}${pagePath(id, lang)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      restaurant(lang),
      ...(id === "carte" ? [menu(lang)] : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: `${site.url}/${lang}` },
          { "@type": "ListItem", position: 2, name: d.pages[id].title, item: url },
        ],
      },
    ],
  };
}
