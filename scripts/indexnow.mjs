// Signale toutes les URL du sitemap aux moteurs IndexNow (Bing, Yandex, Seznam...) : https://www.indexnow.org/documentation
// Lancé par .github/workflows/indexnow.yml après chaque déploiement de production, ou à la main : node scripts/indexnow.mjs
// La clé n'est pas un secret : le protocole la publie dans public/<clé>.txt pour prouver la propriété du site.
const KEY = "89e59d44a1822488890dd35e992beb98";
const site = new URL(process.env.SITE_URL ?? "https://www.neobatys.com");

const sitemap = await (await fetch(new URL("/sitemap.xml", site))).text();
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) throw new Error("Sitemap vide ou illisible");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: site.host,
    key: KEY,
    keyLocation: new URL(`/${KEY}.txt`, site).toString(),
    urlList,
  }),
});
console.log(`IndexNow : ${urlList.length} URL envoyées, réponse ${res.status}`);
// 200 : reçu ; 202 : reçu, clé en cours de validation
if (res.status !== 200 && res.status !== 202) process.exit(1);
