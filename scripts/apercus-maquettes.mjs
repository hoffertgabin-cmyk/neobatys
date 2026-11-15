/**
 * Refait les images d'aperçu des maquettes (public/images/maquettes/apercus/<métier>.jpg),
 * affichées dans les cartes et en haut des pages métier.
 *
 *   1. lancer le site en local : npm run dev
 *   2. dans un autre terminal : node scripts/apercus-maquettes.mjs [plombier macon …]
 *
 * Utilise le Chrome installé sur le poste (aucun outil à installer).
 * Options : URL=http://localhost:3000  CHROME=/chemin/vers/chrome
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const URL = process.env.URL ?? "http://localhost:3000";
const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const projects = JSON.parse(readFileSync("content/data/projects.json", "utf8")).projects;
const all = [...new Set(projects.filter((p) => p.placeholder).map((p) => p.mockup))];
const wanted = process.argv.slice(2).length ? process.argv.slice(2) : all;

const tmp = mkdtempSync(join(tmpdir(), "apercus-"));
for (const mockup of wanted) {
  const png = join(tmp, `${mockup}.png`);
  execFileSync(CHROME, [
    "--headless=new",
    "--hide-scrollbars",
    "--window-size=1280,800",
    "--force-device-scale-factor=1.5",
    "--virtual-time-budget=10000",
    `--screenshot=${png}`,
    `${URL}/apercu-maquette/${mockup}`,
  ]);
  const out = `public/images/maquettes/apercus/${mockup}.jpg`;
  await sharp(png).resize(1440, 900).jpeg({ quality: 78, mozjpeg: true }).toFile(out);
  console.log(out);
}
rmSync(tmp, { recursive: true, force: true });
