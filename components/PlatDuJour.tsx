"use client";

import Link from "next/link";
import pdj from "@/data/plat-du-jour.json";
import { useLocale } from "@/components/providers";
import { Price } from "@/components/Menu";
import { useMounted } from "@/lib/useMounted";
import { fill } from "@/lib/i18n";
import { formatDay, isoDay } from "@/lib/format";
import { dishPrice, nextDish, weekDishes } from "@/lib/platDuJour";
import { weekday } from "@/lib/hours";

/**
 * L'ardoise : le plat du jour (data/plat-du-jour.json), calculé avec la date du jour du visiteur,
 * et le programme de la semaine. Fond encre, filet laiton, écriture crème.
 */
export function PlatDuJour({ buildDay }: { buildDay: string }) {
  const { lang, d } = useLocale();
  const mounted = useMounted();
  const today = mounted ? isoDay(new Date()) : buildDay;
  const next = nextDish(today);
  const current = next ? weekday(next.day) : 0;
  const days = d.pdj.days as Record<string, string>;

  return (
    <div className="relative bg-ink p-3 text-cream md:p-4">
      <div className="grid gap-10 border border-laiton/60 px-6 py-10 md:grid-cols-[1.4fr_1fr] md:gap-14 md:px-12 md:py-14">
        <div>
          <p className="font-[family-name:var(--font-playfair)] text-[1.0625rem] text-laiton italic">
            {next ? (next.day === today ? d.pdj.today : formatDay(next.day, lang, { weekday: "long", day: "numeric", month: "long" })) : d.pdj.title}
          </p>
          {next ? (
            <>
              <p className="display mt-4 text-[2.25rem] md:text-[3.25rem]">{next.dish[lang]}</p>
              <p className="mt-5 flex items-baseline gap-3 text-[1.0625rem]">
                <span className="text-cream/70">{d.pdj.price}</span>
                <Price value={dishPrice} lang={lang} d={d} className="!text-cream/80" />
              </p>
            </>
          ) : (
            <p className="lead mt-4 !text-cream/85">{d.pdj.none}</p>
          )}
          <Link href={`/${lang}#reserver`} className="btn btn-cream mt-8">
            {d.pdj.cta}
          </Link>
        </div>
        <div className="md:border-s md:border-cream/15 md:ps-12">
          <p className="text-[0.9375rem] text-laiton">{d.pdj.week}</p>
          <ul className="mt-3">
            {weekDishes().map(({ n, dish }) => (
              <li key={n} className={`flex flex-col gap-0.5 border-b border-cream/10 py-3 last:border-0 ${n === current ? "text-cream" : "text-cream/65"}`}>
                <span className="text-[0.8125rem] tracking-[0.06em]">{days[String(n)]}</span>
                <span className="font-[family-name:var(--font-playfair)] text-[1.125rem]">{dish ? dish[lang] : "—"}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.8125rem] text-cream/55">{fill(d.pdj.updated, { date: formatDay(pdj.maj, lang, { day: "numeric", month: "long", year: "numeric" }) })}</p>
        </div>
      </div>
    </div>
  );
}
