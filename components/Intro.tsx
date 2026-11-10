"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { COCOTTE } from "@/components/Art";

export const INTRO_KEY = "latelier-intro";

/**
 * Ouverture (1,2 s, une fois par session), en CSS (globals.css) : fond crème, une cocotte se dessine au trait bordeaux,
 * un peu de vapeur monte, « L'ATELIER » puis « CUISINE FRANÇAISE » apparaissent, fondu sur le hero.
 * Bouton « Passer » ; rien du tout si l'utilisateur préfère réduire les animations (script dans le layout).
 */
export function Intro({ skipLabel, tagline }: { skipLabel: string; tagline: string }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {}
      document.documentElement.classList.add("intro-seen");
      setGone(true);
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  const draw = [
    [COCOTTE.body, 0],
    [COCOTTE.rim, 0.12],
    [COCOTTE.lid, 0.18],
    [COCOTTE.knob, 0.3],
    [COCOTTE.handleL, 0.22],
    [COCOTTE.handleR, 0.22],
  ] as const;

  return (
    <div className="intro-curtain flex flex-col items-center justify-center text-bordeaux" dir="ltr">
      <svg viewBox="0 -14 64 58" className="h-24 w-auto md:h-28" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          {draw.map(([d, t]) => (
            <path key={d} d={d} pathLength={1} vectorEffect="non-scaling-stroke" className="intro-draw" style={{ "--d": `${t}s` } as CSSProperties} />
          ))}
          {COCOTTE.steam.map((d, i) => (
            <path key={d} d={d} pathLength={1} vectorEffect="non-scaling-stroke" className="intro-steam" style={{ "--d": `${0.42 + i * 0.06}s` } as CSSProperties} />
          ))}
        </g>
      </svg>
      <p className="intro-name mt-6 ps-[0.16em] font-[family-name:var(--font-playfair)] text-[1.75rem] tracking-[0.16em] text-ink md:text-[2.125rem]" style={{ "--d": "0.5s" } as CSSProperties} translate="no" aria-hidden="true">
        L’ATELIER
      </p>
      <p className="intro-sub mt-2 ps-[0.24em] text-[0.6875rem] tracking-[0.24em] text-muted" style={{ "--d": "0.64s" } as CSSProperties} aria-hidden="true">
        {tagline}
      </p>
      <button
        type="button"
        onClick={() => {
          try {
            sessionStorage.setItem(INTRO_KEY, "1");
          } catch {}
          document.documentElement.classList.add("intro-seen");
          setGone(true);
        }}
        className="absolute end-4 bottom-4 min-h-11 px-4 text-[0.9375rem] text-muted transition-colors hover:text-ink"
      >
        {skipLabel}
      </button>
    </div>
  );
}
