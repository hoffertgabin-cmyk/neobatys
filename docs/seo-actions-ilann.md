# Référencement : ce qu'Ilann doit faire lui-même

Le site est prêt côté code (sitemap, robots.txt, canonicals, données structurées, pages guides et métiers). Ces étapes demandent un compte ou une validation de propriétaire : elles ne peuvent pas être faites depuis le dépôt. Liens vérifiés le 1er novembre 2026.

## Données à garder identiques partout (NAP)

À recopier tel quel dans chaque fiche, depuis `content/data/site.json` :

- Nom : NEOBATYS
- Adresse : 44, rue de l'Industrie, L-8069 Strassen, Luxembourg
- Site : https://www.neobatys.com
- E-mail : contact@neobatys.com
- Téléphone : pas encore renseigné dans `site.json`. Le remplir là d'abord (Pages CMS), puis le même numéro partout.
- Zone desservie : à distance partout en France, et sur place dans un rayon d'environ 50 km autour de Metz (champ `zone` de `site.json`, décision du 13/11/2026 à confirmer par Ilann).

La fiche Google Business Profile est traitée par la session réseaux sociaux, avec ces mêmes données.

## À faire en premier : faire indexer le site

Au 2 novembre 2026, `site:neobatys.com` ne donne aucun résultat sur Bing, et rien ne montre que Search Console est en place. Bing alimente aussi DuckDuckGo et la recherche de ChatGPT et de Copilot : tant que le site n'y est pas indexé, il ne peut pas y apparaître.

Le site est prêt : il suffit de coller un code. Deux façons, au choix :

- **Balise (le plus simple)** : dans Pages CMS, « Infos de l'entreprise » puis « Codes de vérification des moteurs de recherche ». Coller seulement la valeur `content="..."` donnée par Google ou Bing. La balise apparaît sur toutes les pages après le déploiement (2 à 3 minutes), puis cliquer sur « Valider » chez Google ou Bing.
- **Fichier** : déposer le fichier HTML de Google ou `BingSiteAuth.xml` dans le dossier `public/` du dépôt (via une PR).

Pour Google, la propriété « Domaine » validée par DNS reste la meilleure (elle couvre www et sans www), mais demande l'accès au registraire du nom de domaine.

| # | Étape | Lien officiel |
|---|---|---|
| 1 | Google Search Console : ajouter la propriété (« Domaine » par DNS, ou « Préfixe d'URL » `https://www.neobatys.com/` par balise HTML), coller le code, valider | https://search.google.com/search-console · aide : https://support.google.com/webmasters/answer/9008080?hl=fr |
| 2 | Bing Webmaster Tools : importer le site depuis Search Console (pas de seconde validation), ou l'ajouter et le valider par balise `msvalidate.01` ou fichier `BingSiteAuth.xml` | https://www.bing.com/webmasters · import : https://blogs.bing.com/webmaster/september-2019/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools · aide : https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b |
| 3 | Dans les deux outils : envoyer `https://www.neobatys.com/sitemap.xml` | https://support.google.com/webmasters/answer/7451001?hl=fr |
| 4 | Search Console : demander l'indexation de l'accueil, /sites-internet, /logiciel et /logiciel/calculateur-tva avec l'outil d'inspection d'URL | https://support.google.com/webmasters/answer/9012289?hl=fr |

IndexNow est en place : après chaque déploiement de production, `.github/workflows/indexnow.yml` signale toutes les URL du sitemap à Bing et aux autres moteurs IndexNow. Le suivi se voit dans Bing Webmaster Tools, rubrique IndexNow. Google n'utilise pas IndexNow : pour lui, Search Console et le sitemap.

## Ensuite

| # | Étape | Lien officiel |
|---|---|---|
| 5 | Bing Places (fiche locale Bing, importable depuis Google Business Profile une fois celle-ci validée) | https://www.bing.com/forbusiness/ |
| 6 | Apple Business (fiche Plans) | https://business.apple.com/ |
| 7 | Un mois après : dans Search Console, rapport « Pages » (pages non indexées) et « Performances » (requêtes). Noter les requêtes qui montent pour choisir les prochains guides | https://search.google.com/search-console |

Pas d'inscription dans les annuaires (PagesJaunes, Editus) : décision d'Ilann du 12/11/2026, NEOBATYS est une des activités de TAG Delme SARL, pas une entreprise à part.

Liens locaux (CAPEB, FFB, CMA, partenaires) : voir `docs/seo-logiciel.md`, section 6.

## Décisions qui attendent Ilann et Gabin

1. **Zone desservie** : proposée le 13/11/2026, à distance partout en France, et sur place dans un rayon d'environ 50 km autour de Metz. Écrite dans `site.json` et déclarée dans les données structurées (`areaServed`) ; à confirmer par Ilann.
2. **Parrainage** (idée 5 de `docs/veille/seo-acquisition.md`) : fixer la récompense, par exemple un mois de maintenance offert au parrain et au filleul. La page `/parrainage` se code ensuite (effort S).
3. **Calculateurs gratuits** (idée 2) : valider la liste (taux horaire, prix de vente avec marge, HT/TTC aux taux du bâtiment). Pas de conseil fiscal, formules affichées.
