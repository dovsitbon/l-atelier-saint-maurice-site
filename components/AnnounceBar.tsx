"use client";

import Link from "next/link";
import { useState } from "react";
import annonces from "@/data/annonces.json";
import { CloseIcon } from "@/components/icons";
import { useLocale } from "@/components/providers";
import { useMounted } from "@/lib/useMounted";
import { fill } from "@/lib/i18n";
import { formatDay, isoDay } from "@/lib/format";
import { nextDish } from "@/lib/platDuJour";

type Item = { id: string; active?: boolean; from?: string; to?: string; fr: string; en: string };

/**
 * Bandeau d'infos refermable (mémorisé pour la session) : une annonce datée de data/annonces.json (fermeture, congés…),
 * sinon « Plat du jour : … » d'après data/plat-du-jour.json. Calculé avec la date du jour.
 */
export function AnnounceBar({ buildDay }: { buildDay: string }) {
  const { lang, d } = useLocale();
  const mounted = useMounted();
  const [closed, setClosed] = useState(false);
  const today = mounted ? isoDay(new Date()) : buildDay;

  const notice = (annonces.items as Item[]).find((a) => a.active !== false && (!a.from || a.from <= today) && (!a.to || today <= a.to));
  const next = nextDish(today);
  let id = "";
  let text = "";
  if (notice) {
    id = notice.id;
    text = notice[lang];
  } else if (next) {
    id = `pdj-${next.day}`;
    text = next.day === today ? fill(d.announce.dish, { dish: next.dish[lang] }) : fill(d.announce.dishOn, { day: formatDay(next.day, lang, { weekday: "long" }), dish: next.dish[lang] });
  }

  let stored = false;
  if (mounted && id)
    try {
      stored = sessionStorage.getItem(`latelier-bar-${id}`) === "1";
    } catch {}

  if (!text || closed || stored) return null;
  return (
    <div className="relative z-[51] flex min-h-10 items-center justify-center bg-vert px-12 py-2 text-center text-[0.875rem] leading-snug text-cream">
      {notice ? (
        <p>{text}</p>
      ) : (
        <Link href={`/${lang}#plat-du-jour`} className="hover:underline hover:underline-offset-4">
          {text}
        </Link>
      )}
      <button
        type="button"
        onClick={() => {
          setClosed(true);
          try {
            sessionStorage.setItem(`latelier-bar-${id}`, "1");
          } catch {}
        }}
        className="absolute end-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center opacity-70 transition-opacity hover:opacity-100"
        aria-label={d.announce.close}
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
