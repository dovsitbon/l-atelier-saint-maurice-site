import Image from "next/image";
import photos from "@/data/photos.json";
import type { Dict } from "@/lib/i18n";
import { ART, type ArtId } from "@/components/Art";

export type PhotoId = Exclude<keyof typeof photos, "_doc">;

export const hasPhoto = (id: PhotoId) => Boolean(photos[id]);

/**
 * Emplacement photo. Avec une vraie photo (data/photos.json) : l'image, optimisée par next/image (AVIF/WebP, lazy).
 * Sans photo : un panneau vichy avec un dessin au trait et une légende discrète, jamais de fausse photo.
 * Le parent doit être positionné (relative) et dimensionné.
 */
export function PhotoSlot({
  id,
  d,
  art = "cocotte",
  dark = false,
  sizes = "100vw",
  priority = false,
  caption = true,
  artClass = "h-16 w-auto md:h-20",
}: {
  id: PhotoId;
  d: Dict;
  art?: ArtId;
  dark?: boolean;
  sizes?: string;
  priority?: boolean;
  caption?: boolean;
  artClass?: string;
}) {
  const src = photos[id] as string | null;
  const t = d.photos[id];
  if (src) return <Image src={src} alt={t.alt} fill sizes={sizes} priority={priority} quality={78} className="object-cover" />;
  const Art = ART[art];
  return (
    <div className={`absolute inset-0 flex items-center justify-center ${dark ? "vichy-dark bg-vert text-laiton" : "vichy text-bordeaux/70"}`} role="img" aria-label={t.alt}>
      <Art className={artClass} />
      {caption && (
        <span className={`absolute start-4 bottom-3 text-[0.75rem] ${dark ? "text-cream/60" : "text-muted"}`} aria-hidden="true">
          {d.placeholder} · {t.label}
        </span>
      )}
    </div>
  );
}
