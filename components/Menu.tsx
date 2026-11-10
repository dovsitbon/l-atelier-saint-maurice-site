import carte from "@/data/carte.json";
import type { Dict, Locale } from "@/lib/i18n";
import { price } from "@/lib/format";

type Item = { price: number | null; from?: boolean; signature?: boolean };
type CatId = keyof Dict["carte"]["categories"];
type ItemId = keyof Dict["carte"]["items"];

/** Prix affiché : « 14 € », « à partir de 5 € », ou « à remplir » tant que le prix n'est pas connu. */
export function Price({ value, from, lang, d, className = "" }: { value: number | null; from?: boolean; lang: Locale; d: Dict; className?: string }) {
  if (value === null) return <span className={`text-[0.875rem] whitespace-nowrap text-muted italic ${className}`}>{d.carte.toFill}</span>;
  return (
    <span className={`whitespace-nowrap tabular-nums ${className}`}>
      {from && <span className="me-1 text-[0.8125rem] text-muted">{d.carte.from}</span>}
      {price(value, lang)}
    </span>
  );
}

/** La carte en vraie page HTML : entrées, plats, desserts, vins, avec les prix (data/carte.json). */
export function Menu({ lang, d, headingLevel = 3, only }: { lang: Locale; d: Dict; headingLevel?: 2 | 3; only?: CatId[] }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const items = carte.items as Record<string, Item>;
  const cats = carte.categories.filter((c) => !only || only.includes(c.id as CatId));
  return (
    <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
      {cats.map((c) => (
        <section key={c.id} id={c.id} className="scroll-mt-28" aria-labelledby={`cat-${c.id}`}>
          <H id={`cat-${c.id}`} className="display text-[1.75rem] md:text-[2rem]">
            {d.carte.categories[c.id as CatId]}
          </H>
          <div className="rule mt-4" aria-hidden="true" />
          <ul className="mt-6 space-y-5">
            {c.items.map((id) => {
              const it = items[id];
              const t = d.carte.items[id as ItemId];
              return (
                <li key={id}>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[1.0625rem]">
                      {t.name}
                      {it.signature && <span className="ms-2 font-[family-name:var(--font-playfair)] text-[0.875rem] text-bordeaux italic">{d.carte.signature}</span>}
                    </span>
                    <span className="leader" aria-hidden="true" />
                    <Price value={it.price} from={it.from} lang={lang} d={d} />
                  </div>
                  {t.desc && <p className="mt-1 text-[0.9375rem] text-muted">{t.desc}</p>}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
