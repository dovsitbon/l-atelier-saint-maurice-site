import { Cocotte } from "@/components/Art";

/**
 * Logo typographique : petite cocotte au trait, « L'ATELIER » en capitales à empattements, « Cuisine française · Amiens ».
 * Version fichier (à remplacer par le vrai logo s'il en existe un) : public/logo.svg ; favicon : app/icon.svg.
 */
export function Logo({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={`flex flex-col items-center leading-none ${className}`} translate="no">
      <Cocotte steam={false} className={compact ? "h-3 w-auto" : "h-3.5 w-auto md:h-4"} />
      <span className={`font-[family-name:var(--font-playfair)] tracking-[0.14em] ${compact ? "mt-1 text-[1.25rem]" : "mt-1.5 text-[1.375rem] md:text-[1.625rem]"}`}>L’ATELIER</span>
      <span className={`tracking-[0.2em] uppercase ${compact ? "mt-1 text-[0.5rem]" : "mt-1.5 text-[0.5625rem] md:text-[0.625rem]"}`}>Cuisine française · Amiens</span>
    </span>
  );
}
