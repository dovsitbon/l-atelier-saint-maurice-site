// Génère CONTENU.md : tous les textes du site (fr, en), la carte et les prix, pour validation.
//   npm run contenu
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const load = async (f) => JSON.parse(await readFile(path.join(ROOT, f), "utf8"));
const L = { fr: await load("locales/fr.json"), en: await load("locales/en.json") };
const carte = await load("data/carte.json");
const horaires = await load("data/horaires.json");
const annonces = await load("data/annonces.json");
const pdj = await load("data/plat-du-jour.json");

const out = [];
const p = (s = "") => out.push(s);
const eur = (it) => (it.price === null ? "**à remplir**" : `${it.from ? "à partir de " : ""}${String(it.price).replace(".", ",")} €`);

p("# L'atelier : contenu du site, pour validation");
p();
p("Tous les textes en français et en anglais, la carte et les prix. Les points **À VALIDER** et **à remplir** sont à confirmer avec le restaurant.");
p("Fichier généré par `npm run contenu` à partir de `locales/*.json` et `data/*.json` : modifiez ces fichiers, pas celui-ci.");
p();
p("## Titre du hero : 3 propositions");
p();
p("1. **Les recettes de toujours** (retenu sur le site) · EN : Old-school French cooking, done right");
p("2. Cuisine de bistrot, au bord de l'eau · EN : Bistro cooking by the water");
p("3. Comme à la maison, en mieux · EN : Like home cooking, only better (repris dans le bloc « La cuisine »)");
p();
p("## À valider en priorité");
p();
p("- **Carte** : plats proposés d'après les avis Google (cassoulet, veau, sauce gribiche) et la fiche Amiens Tourisme. Tous les prix sont **à remplir**.");
p("- **Formule du midi** : « à partir de 17 € » (prix minimum indiqué par Amiens Tourisme), à confirmer.");
p("- **Plat du jour** : un exemple par jour (mardi → vendredi), à remplacer chaque semaine dans `data/plat-du-jour.json`. Prix à remplir.");
p("- **Capacité** : environ 30 couverts (Amiens Tourisme), à confirmer.");
p("- **Horaires** : d'après la fiche Google, à confirmer. Le site propose le déjeuner de 11 h 45 à 13 h 45 et le dîner de 18 h 30 à 21 h (`data/site.json → reservation.services`).");
p("- **Paiement, stationnement, validité du bon cadeau, SIRET** : à remplir.");
p("- **Avis** : aucun avis inventé. Emplacements vides, à remplir avec de vrais avis Google et l'accord de leurs auteurs (`data/avis.json`).");
p();

p("## La carte (data/carte.json)");
p();
for (const c of carte.categories) {
  p(`### ${L.fr.carte.categories[c.id]} · ${L.en.carte.categories[c.id]}`);
  p();
  p("| Plat | Description | Prix | English |");
  p("|---|---|---|---|");
  for (const id of c.items) {
    const t = (l) => L[l].carte.items[id];
    p(`| ${t("fr").name} | ${t("fr").desc} | ${eur(carte.items[id])} | ${t("en").name} |`);
  }
  p();
}
p("### Formules");
p();
for (const f of carte.formules) p(`- ${L.fr.carte.formules[f.id].title} : ${eur(f)}${f.source ? ` (source : ${f.source})` : ""}`);
p();

p("## Plat du jour (data/plat-du-jour.json)");
p();
for (const [n, dish] of Object.entries(pdj.semaine)) p(`- ${L.fr.pdj.days[n]} : ${dish.fr} · ${dish.en}`);
p(`- Prix : ${pdj.prix === null ? "**à remplir**" : pdj.prix + " €"}`);
p();

p("## Horaires (data/horaires.json)");
p();
const days = L.fr.infos.days;
for (let i = 1; i <= 7; i++) {
  const s = horaires.week[String(i)];
  p(`- ${days[i - 1]} : ${s.length ? s.map(([a, b]) => `${a} – ${b}`).join(", ") : "fermé"}`);
}
p();
p("## Bandeau d'annonces (data/annonces.json)");
p();
p("Sans annonce en cours, le bandeau affiche « Plat du jour : … ».");
for (const a of annonces.items) {
  p(`- **${a.id}** (${a.from} → ${a.to})${a.active === false ? " · désactivée" : ""}`);
  p(`  - fr : ${a.fr}`);
  p(`  - en : ${a.en}`);
}
p();

const SKIP = new Set(["carte.items"]);
const get = (o, key) => key.split(".").reduce((x, k) => (x == null ? "" : x[k]), o) ?? "";
function walk(obj, key) {
  if (SKIP.has(key)) return;
  if (typeof obj === "string") {
    p(`- \`${key}\``);
    for (const l of ["fr", "en"]) p(`  - ${l} : ${String(get(L[l], key)).replace(/\n/g, " ⏎ ")}`);
    return;
  }
  if (Array.isArray(obj)) return obj.forEach((v, i) => walk(v, `${key}.${i}`));
  for (const k of Object.keys(obj)) walk(obj[k], key ? `${key}.${k}` : k);
}
p("## Tous les textes du site");
for (const section of Object.keys(L.fr)) {
  p();
  p(`### ${section}`);
  p();
  walk(L.fr[section], section);
}

await writeFile(path.join(ROOT, "CONTENU.md"), out.join("\n") + "\n");
console.log("CONTENU.md :", out.length, "lignes");
