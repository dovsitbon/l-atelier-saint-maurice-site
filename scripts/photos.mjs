// Prépare les photos prises sur place : assets/{hero,plats,salle,facade}/*.jpg → public/media/<dossier>/<nom>.jpg
// (redimensionnées à 2400 px max, orientation corrigée, métadonnées retirées). next/image sert ensuite AVIF/WebP en lazy loading.
//   npm run photos   puis renseigner data/photos.json (ex. "hero": "/media/hero/salle-du-soir.jpg")
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
let n = 0;
for (const dir of ["hero", "plats", "salle", "facade"]) {
  const src = path.join(ROOT, "assets", dir);
  const out = path.join(ROOT, "public/media", dir);
  await mkdir(out, { recursive: true });
  for (const f of (await readdir(src).catch(() => [])).filter((x) => /\.(jpe?g|png|webp|heic)$/i.test(x))) {
    const name = f.replace(/\.\w+$/, "").toLowerCase().replace(/[^a-z0-9-]+/g, "-") + ".jpg";
    await sharp(path.join(src, f)).rotate().resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(out, name));
    console.log(`/media/${dir}/${name}`);
    n++;
  }
}
console.log(n ? `${n} photo(s) prête(s) : indiquez leur chemin dans data/photos.json` : "Aucune photo dans assets/{hero,plats,salle,facade}/");
