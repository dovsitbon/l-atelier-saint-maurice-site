// Affichette A5 imprimable (PDF) avec QR code vers le site, pour la vitrine, les tables ou le comptoir.
//   npm run affichette   →   print/affichette-a5.pdf
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";

const ROOT = path.resolve(import.meta.dirname, "..");
const site = JSON.parse(await readFile(path.join(ROOT, "data/site.json"), "utf8"));
const url = `${site.url}/fr`;

const hex = (h) => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const CREAM = hex("#F5EFE3");
const INK = hex("#1E1B18");
const BORDEAUX = hex("#6E1F27");
const LAITON = hex("#B08D57");
const MUTED = hex("#574C42");

const pdf = await PDFDocument.create();
pdf.setTitle("L'atelier : affichette A5");
pdf.setAuthor("L'atelier");
const W = 419.53;
const H = 595.28;
const page = pdf.addPage([W, H]);
const serif = await pdf.embedFont(StandardFonts.TimesRoman);
const serifI = await pdf.embedFont(StandardFonts.TimesRomanItalic);
const sans = await pdf.embedFont(StandardFonts.Helvetica);

page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: CREAM });
// Cadre double, filet laiton
page.drawRectangle({ x: 18, y: 18, width: W - 36, height: H - 36, borderColor: LAITON, borderWidth: 0.8 });
page.drawRectangle({ x: 22, y: 22, width: W - 44, height: H - 44, borderColor: LAITON, borderWidth: 0.4 });

const center = (text, font, size, y, color = INK, spacing = 0) => {
  const w = font.widthOfTextAtSize(text, size) + spacing * (text.length - 1);
  if (!spacing) return page.drawText(text, { x: (W - w) / 2, y, size, font, color });
  let x = (W - w) / 2;
  for (const ch of text) {
    page.drawText(ch, { x, y, size, font, color });
    x += font.widthOfTextAtSize(ch, size) + spacing;
  }
};

// Cocotte au trait bordeaux (mêmes tracés que le site)
const paths = [
  "M9.5 19.5c1.5-6 11-10 22.5-10s21 4 22.5 10",
  "M7 19.5h50",
  "M28 9.5V7.5a4 4 0 0 1 8 0v2",
  "M11 19.5V31a8 8 0 0 0 8 8h26a8 8 0 0 0 8-8V19.5",
  "M11 23.5H6.5a2.5 2.5 0 0 0 0 5H11",
  "M53 23.5h4.5a2.5 2.5 0 0 1 0 5H53",
  "M24 1c-2.4-2.4 2.4-4.4 0-8",
  "M32 -1c-2.4-2.4 2.4-4.4 0-9",
  "M40 1c-2.4-2.4 2.4-4.4 0-8",
];
const s = 1.3;
for (const d of paths) page.drawSvgPath(d, { x: W / 2 - 32 * s, y: H - 62, scale: s, borderColor: BORDEAUX, borderWidth: 1.1 / s });

let y = H - 140;
center("L'ATELIER", serif, 40, y, INK, 5);
y -= 20;
center("CUISINE FRANÇAISE · AMIENS", sans, 8, y, MUTED, 2.2);
y -= 18;
page.drawLine({ start: { x: W / 2 - 30, y }, end: { x: W / 2 + 30, y }, thickness: 0.6, color: LAITON });
page.drawLine({ start: { x: W / 2 - 30, y: y - 3 }, end: { x: W / 2 + 30, y: y - 3 }, thickness: 0.6, color: LAITON });

y -= 40;
center("Les recettes de toujours", serifI, 24, y, BORDEAUX);
y -= 20;
center("Cassoulet, tête de veau sauce gribiche, plat du jour", serif, 11.5, y, MUTED);

y -= 34;
center("La carte, le plat du jour et la réservation :", sans, 9, y, INK);
const qrPng = await QRCode.toBuffer(url, { margin: 0, width: 600, color: { dark: "#1E1B18", light: "#F5EFE3" }, errorCorrectionLevel: "M" });
const qrS = 118;
y -= 12 + qrS;
page.drawImage(await pdf.embedPng(qrPng), { x: (W - qrS) / 2, y, width: qrS, height: qrS });
y -= 16;
center(url.replace(/^https?:\/\//, ""), sans, 8.5, y, BORDEAUX);

y -= 34;
center("Déjeuner du mardi au vendredi · Dîner vendredi et samedi", sans, 8.5, y, MUTED);
y -= 14;
center("Réservation conseillée", sans, 8.5, y, MUTED);
y -= 22;
center(`${site.address.street}, ${site.address.postalCode} ${site.address.city}`, serif, 12, y);
y -= 16;
center(site.phone, serif, 13, y, BORDEAUX);

await mkdir(path.join(ROOT, "print"), { recursive: true });
await writeFile(path.join(ROOT, "print/affichette-a5.pdf"), await pdf.save());
console.log("affichette prête :", url, "· bas du texte à", Math.round(y), "pt");
