import Image from "next/image";
import photos from "@/data/photos.json";
import type { Dict } from "@/lib/i18n";
import { ART, type ArtId } from "@/components/Art";

export type PhotoId = Exclude<keyof typeof photos, "_doc">;
type Entry = { src: string; kind: "reel" | "illustration" } | null;

const entry = (id: PhotoId) => photos[id] as Entry;
export const hasPhoto = (id: PhotoId) => Boolean(entry(id));

/**
 * Emplacement photo. Avec une photo (data/photos.json) : l'image, optimisée par next/image (AVIF/WebP, lazy).
 * Une photo libre de droits (kind « illustration ») porte la mention « Photo d'illustration » : jamais présentée comme le restaurant.
 * Sans photo : un panneau vichy avec un dessin au trait, jamais de fausse photo.
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
  position = "center",
}: {
  id: PhotoId;
  d: Dict;
  art?: ArtId;
  dark?: boolean;
  sizes?: string;
  priority?: boolean;
  caption?: boolean;
  artClass?: string;
  position?: string;
}) {
  const p = entry(id);
  const t = d.photos[id];
  if (p)
    return (
      <>
        <Image src={p.src} alt={t.alt} fill sizes={sizes} priority={priority} quality={80} className="object-cover" style={{ objectPosition: position }} />
        {p.kind === "illustration" && (
          <span className="absolute end-2 bottom-2 bg-ink/60 px-2 py-0.5 text-[0.6875rem] text-cream" aria-hidden="true">
            {d.illustration}
          </span>
        )}
      </>
    );
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
