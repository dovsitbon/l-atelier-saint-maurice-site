import site from "@/data/site.json";
import { fill, type Dict, type Locale } from "@/lib/i18n";
import { StarIcon } from "@/components/icons";

export const numberLocale = (lang: Locale) => (lang === "fr" ? "fr-FR" : "en-GB");

/** Note Google, toujours près des boutons (data/site.json → rating, relevée à la main). */
export function Rating({ d, lang, className = "", starClass = "text-laiton" }: { d: Dict; lang: Locale; className?: string; starClass?: string }) {
  return (
    <a href={site.reviewsUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-6 items-center gap-2 hover:underline hover:underline-offset-4 ${className}`}>
      <span className={`flex ${starClass}`} aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon key={i} />
        ))}
      </span>
      <span>
        {fill(d.hero.rating, { value: site.rating.value.toLocaleString(numberLocale(lang)) })} · {fill(d.hero.ratingCount, { count: site.rating.count })}
      </span>
    </a>
  );
}
