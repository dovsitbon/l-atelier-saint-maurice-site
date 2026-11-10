import type { CSSProperties } from "react";

/**
 * Dessins au trait (1 px, sans remplissage) : la signature visuelle du site tant que les vraies photos ne sont pas là,
 * puis en détail discret. Couleur = currentColor.
 */
type P = { className?: string; style?: CSSProperties };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, vectorEffect: "non-scaling-stroke" as const };

/** Tracés de la cocotte (réutilisés par l'ouverture animée et le logo). viewBox 0 -14 64 58 */
export const COCOTTE = {
  lid: "M9.5 19.5c1.5-6 11-10 22.5-10s21 4 22.5 10",
  rim: "M7 19.5h50",
  knob: "M28 9.5V7.5a4 4 0 0 1 8 0v2",
  body: "M11 19.5V31a8 8 0 0 0 8 8h26a8 8 0 0 0 8-8V19.5",
  handleL: "M11 23.5H6.5a2.5 2.5 0 0 0 0 5H11",
  handleR: "M53 23.5h4.5a2.5 2.5 0 0 1 0 5H53",
  steam: ["M24 1c-2.4-2.4 2.4-4.4 0-8", "M32 -1c-2.4-2.4 2.4-4.4 0-9", "M40 1c-2.4-2.4 2.4-4.4 0-8"],
};

export function Cocotte({ className = "h-8 w-auto", steam = true, style }: P & { steam?: boolean }) {
  return (
    <svg viewBox={steam ? "0 -14 64 58" : "0 2 64 42"} className={className} style={style} aria-hidden="true">
      <g {...base}>
        {[COCOTTE.lid, COCOTTE.rim, COCOTTE.knob, COCOTTE.body, COCOTTE.handleL, COCOTTE.handleR].map((d) => (
          <path key={d} d={d} />
        ))}
        {steam && COCOTTE.steam.map((d) => <path key={d} d={d} opacity={0.6} />)}
      </g>
    </svg>
  );
}

/** Assiette vue de dessus, couteau et fourchette. */
export const Assiette = ({ className = "h-10 w-auto", style }: P) => (
  <svg viewBox="0 0 80 48" className={className} style={style} aria-hidden="true">
    <g {...base}>
      <circle cx="40" cy="24" r="19" />
      <circle cx="40" cy="24" r="12.5" />
      <path d="M11 6v9a3 3 0 0 0 3 3v24M14 6v8M17 6v9a3 3 0 0 1-3 3" />
      <path d="M68 42V6c3.5 2.5 4.5 8 4.5 15H68" />
    </g>
  </svg>
);

/** Verre à pied et pichet. */
export const Verre = ({ className = "h-10 w-auto", style }: P) => (
  <svg viewBox="0 0 60 56" className={className} style={style} aria-hidden="true">
    <g {...base}>
      <path d="M12 6h16c0 10-2 17-8 17S12 16 12 6ZM20 23v22M13 45h14" />
      <path d="M12.6 12h14.8" opacity={0.6} />
      <path d="M38 14h12l-1 4c3 3 4 9 3 16-1 7-3 11-3 11H39s-2-4-3-11c-1-7 0-13 3-16Z" />
      <path d="M50 18c3 0 5 2 5 5s-2 5-4 5" />
    </g>
  </svg>
);

/** Ramequin de crème brûlée et cuillère. */
export const Ramequin = ({ className = "h-10 w-auto", style }: P) => (
  <svg viewBox="0 0 64 44" className={className} style={style} aria-hidden="true">
    <g {...base}>
      <ellipse cx="28" cy="16" rx="20" ry="5" />
      <path d="M8 16v13c0 3 9 6 20 6s20-3 20-6V16" />
      <path d="M12 22v8M17 23v9M22 24v9M28 24v10M34 24v9M39 23v9M44 22v8" opacity={0.45} />
      <path d="M52 8c3-2 7 0 6 3s-5 3-6 1l-6 22" />
    </g>
  </svg>
);

/** Terrine et cornichon. */
export const Terrine = ({ className = "h-10 w-auto", style }: P) => (
  <svg viewBox="0 0 72 44" className={className} style={style} aria-hidden="true">
    <g {...base}>
      <path d="M6 14h44l-3 22H9Z" />
      <path d="M4 14h48M10 22h38" opacity={0.6} />
      <path d="M58 30c2-6 6-10 9-9s0 7-4 10-6 3-5-1Z" />
    </g>
  </svg>
);

/** Ardoise du plat du jour. */
export const Ardoise = ({ className = "h-10 w-auto", style }: P) => (
  <svg viewBox="0 0 56 56" className={className} style={style} aria-hidden="true">
    <g {...base}>
      <path d="M28 4 17 13M28 4l11 9" />
      <rect x="6" y="13" width="44" height="32" rx="1" />
      <rect x="9.5" y="16.5" width="37" height="25" opacity={0.6} />
      <path d="M16 25h24M19 31h18M22 36h12" opacity={0.6} />
      <path d="M14 45l-3 8M42 45l3 8" />
    </g>
  </svg>
);

/** Façade avec store, au bord de l'eau. */
export const Facade = ({ className = "h-10 w-auto", style }: P) => (
  <svg viewBox="0 0 96 64" className={className} style={style} aria-hidden="true">
    <g {...base}>
      <path d="M14 8h68v44H14Z" />
      <path d="M10 18h76l-4 8H14Z" />
      <path d="M22 18l-2 8M34 18l-1 8M46 18v8M58 18l1 8M70 18l2 8" opacity={0.6} />
      <path d="M22 52V32h16v20M27 42h1" />
      <path d="M46 32h28v14H46ZM60 32v14" />
      <path d="M30 12h36" opacity={0.6} />
      <path d="M2 57c4 0 4-2 8-2s4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2" opacity={0.6} />
    </g>
  </svg>
);

/** Toque de cuisinier. */
export const Toque = ({ className = "h-10 w-auto", style }: P) => (
  <svg viewBox="0 0 56 56" className={className} style={style} aria-hidden="true">
    <g {...base}>
      <path d="M16 34c-6 0-10-4-10-10s5-10 10-9c1-6 6-10 12-10s11 4 12 10c5-1 10 3 10 9s-4 10-10 10" />
      <path d="M16 30v18h24V30M16 42h24" />
    </g>
  </svg>
);

/** Table dressée : deux assiettes, une bougie. */
export const Table = ({ className = "h-10 w-auto", style }: P) => (
  <svg viewBox="0 0 96 56" className={className} style={style} aria-hidden="true">
    <g {...base}>
      <path d="M6 30h84M10 30l-2 18M86 30l2 18M14 30v8M82 30v8" />
      <path d="M22 30c0-3 5-5 12-5s12 2 12 5M50 30c0-3 5-5 12-5s12 2 12 5" />
      <path d="M48 24V12M46 12h4M48 12c-1-2 0-4 0-6 0 2 1 4 0 6" />
    </g>
  </svg>
);

/** Ondulations de la Somme. */
export const Vagues = ({ className = "h-4 w-auto", style }: P) => (
  <svg viewBox="0 0 120 12" className={className} style={style} aria-hidden="true" preserveAspectRatio="none">
    <g {...base}>
      <path d="M0 4c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3 5-3 10-3 5 3 10 3 5-3 10-3 5 3 10 3 5-3 10-3 5 3 10 3 5-3 10-3 5 3 10 3 5-3 10-3 5 3 10 3" />
      <path d="M0 10c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3 5-3 10-3 5 3 10 3 5-3 10-3 5 3 10 3 5-3 10-3 5 3 10 3 5-3 10-3 5 3 10 3" opacity={0.5} />
    </g>
  </svg>
);

export const ART = { cocotte: Cocotte, assiette: Assiette, verre: Verre, ramequin: Ramequin, terrine: Terrine, ardoise: Ardoise, facade: Facade, toque: Toque, table: Table } as const;
export type ArtId = keyof typeof ART;
