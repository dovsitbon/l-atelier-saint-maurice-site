// Image de partage (Open Graph) 1200 × 630 : vert bistrot, cocotte au trait laiton, nom et adresse.
//   npm run og   →   public/og.jpg   (à refaire avec une vraie photo quand elle sera là)
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const cocotte = `<g fill="none" stroke="#B08D57" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" transform="translate(790 150) scale(4.6)">
<path d="M9.5 19.5c1.5-6 11-10 22.5-10s21 4 22.5 10"/><path d="M7 19.5h50"/><path d="M28 9.5V7.5a4 4 0 0 1 8 0v2"/><path d="M11 19.5V31a8 8 0 0 0 8 8h26a8 8 0 0 0 8-8V19.5"/><path d="M11 23.5H6.5a2.5 2.5 0 0 0 0 5H11"/><path d="M53 23.5h4.5a2.5 2.5 0 0 1 0 5H53"/>
<path d="M24 1c-2.4-2.4 2.4-4.4 0-8" opacity=".6"/><path d="M32 -1c-2.4-2.4 2.4-4.4 0-9" opacity=".6"/><path d="M40 1c-2.4-2.4 2.4-4.4 0-8" opacity=".6"/></g>`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#2E4A3A"/>
<rect x="28" y="28" width="1144" height="574" fill="none" stroke="#B08D57" stroke-opacity=".55"/>
${cocotte}
<text x="96" y="250" font-family="Georgia, serif" font-size="96" letter-spacing="10" fill="#F5EFE3">L’ATELIER</text>
<text x="100" y="300" font-family="Arial, sans-serif" font-size="20" letter-spacing="6" fill="#F5EFE3" fill-opacity=".8">CUISINE FRANÇAISE TRADITIONNELLE</text>
<line x1="100" y1="340" x2="220" y2="340" stroke="#B08D57"/><line x1="100" y1="345" x2="220" y2="345" stroke="#B08D57"/>
<text x="98" y="420" font-family="Georgia, serif" font-style="italic" font-size="44" fill="#F5EFE3">Les recettes de toujours</text>
<text x="100" y="500" font-family="Arial, sans-serif" font-size="24" fill="#F5EFE3" fill-opacity=".8">47 quai Saint-Maurice, Amiens · 03 22 44 60 23</text>
</svg>`;
await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(path.join(ROOT, "public/og.jpg"));
console.log("public/og.jpg prêt");
