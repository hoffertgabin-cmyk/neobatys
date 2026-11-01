# Référencement : ce qu'Ilann doit faire lui-même

Le site est prêt côté code (sitemap, robots.txt, canonicals, données structurées, pages guides et métiers). Ces étapes demandent un compte ou une validation de propriétaire : elles ne peuvent pas être faites depuis le dépôt. Liens vérifiés le 1er novembre 2026.

## Données à garder identiques partout (NAP)

À recopier tel quel dans chaque fiche, depuis `content/data/site.json` :

- Nom : NEOBATYS
- Adresse : 44, rue de l'Industrie, L-8069 Strassen, Luxembourg
- Site : https://www.neobatys.com
- E-mail : contact@neobatys.com
- Téléphone : pas encore renseigné dans `site.json`. Le remplir là d'abord (Pages CMS), puis le même numéro partout.
- Zone desservie : absente de `site.json`. À décider et à y ajouter avant de la déclarer dans les fiches (voir décisions en fin de page).

La fiche Google Business Profile est traitée par la session réseaux sociaux, avec ces mêmes données.

## Étapes

| # | Étape | Lien officiel |
|---|---|---|
| 1 | Google Search Console : ajouter une propriété « Domaine » `neobatys.com` et la valider par un enregistrement DNS TXT chez le registraire (couvre www et sans www) | https://search.google.com/search-console · aide : https://support.google.com/webmasters/answer/9008080?hl=fr |
| 2 | Search Console : envoyer `https://www.neobatys.com/sitemap.xml` dans le rapport Sitemaps | https://support.google.com/webmasters/answer/7451001?hl=fr |
| 3 | Search Console : demander l'indexation de /logiciel, /sites-internet, /logiciel/modele-devis et d'une page métier avec l'outil d'inspection d'URL | https://support.google.com/webmasters/answer/9012289?hl=fr |
| 4 | Bing Webmaster Tools : importer le site depuis Search Console (pas de seconde validation), le sitemap suit | https://www.bing.com/webmasters · procédure : https://blogs.bing.com/webmaster/september-2019/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools |
| 5 | Bing Places (fiche locale Bing, importable depuis Google Business Profile une fois celle-ci validée) | https://www.bing.com/forbusiness/ |
| 6 | Apple Business (fiche Plans) | https://business.apple.com/ |
| 7 | PagesJaunes : créer la fiche gratuite via Solocal Manager. Page protégée contre les robots : lien relevé par recherche, à ouvrir dans un navigateur | https://www.solocal.com/solocalmanager |
| 8 | Editus (annuaire professionnel du Luxembourg), bouton « Créer son profil entreprise ». Page protégée contre les robots, gratuité de la fiche de base non confirmée : ne rien payer | https://www.editus.lu/fr/catalogue/editus-luxembourg-sa-kayl-1/pourquoi-creer-votre-profil-sur-editus-lu-413087a |
| 9 | Un mois après : dans Search Console, rapport « Pages » (pages non indexées) et « Performances » (requêtes). Noter les requêtes qui montent pour choisir les prochains guides | https://search.google.com/search-console |

Annuaires et liens locaux (CAPEB, FFB, CMA, partenaires) : voir `docs/seo-logiciel.md`, section 6.

## Décisions qui attendent Ilann et Gabin

1. **Zone desservie** : l'écrire dans `site.json` (par exemple « Luxembourg et Moselle », si c'est la réalité). Sans elle, pas de pages locales ni de zone déclarée dans les données structurées.
2. **Parrainage** (idée 5 de `docs/veille/seo-acquisition.md`) : fixer la récompense, par exemple un mois de maintenance offert au parrain et au filleul. La page `/parrainage` se code ensuite (effort S).
3. **Calculateurs gratuits** (idée 2) : valider la liste (taux horaire, prix de vente avec marge, HT/TTC aux taux du bâtiment). Pas de conseil fiscal, formules affichées.
