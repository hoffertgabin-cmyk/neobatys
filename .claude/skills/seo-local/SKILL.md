---
name: seo-local
description: Référencement local (SEO local) pour le site NEOBATYS et pour les sites livrés aux artisans clients. À utiliser pour écrire ou revoir les titres et descriptions des pages, les données structurées schema.org (LocalBusiness / ProfessionalService, Service, FAQPage), les pages par ville ou par métier, la fiche Google Business Profile, la cohérence nom-adresse-téléphone (NAP), le sitemap et le robots.txt. Déclencheurs : « SEO », « référencement », « Google », « être trouvé à <ville> », « fiche Google », « balise title », « meta description », « schema.org ».
argument-hint: "[audit | page <chemin> | client <nom de l'artisan>]"
---

# SEO local

Objectif : qu'un particulier qui cherche « <métier> <ville> » ou « <service> près de chez moi » trouve l'entreprise, et qu'il appelle. Le SEO local repose sur trois piliers : **le site** (textes, titres, données structurées), **la fiche Google Business Profile** et **la cohérence des informations partout sur le web**.

Répondre en français, simplement : l'utilisateur n'est pas développeur.

## Avant toute chose : demander la zone

**Ne jamais inventer ni supposer une zone d'intervention.** Aucune ville, aucun département n'est codé en dur dans ce skill. La zone NEOBATYS a été volontairement retirée du site : ne pas la remettre sans demande explicite.

Toujours demander (ou lire dans `content/`) avant d'écrire :

1. **Pour qui ?** le site NEOBATYS, ou le site d'un artisan client ?
2. **Le métier exact** (couvreur, plombier-chauffagiste, électricien…) et les services principaux.
3. **La zone** : ville du siège, villes ou rayon couverts. Si l'utilisateur ne veut pas afficher de zone, n'en mettre nulle part (ni titre, ni description, ni `areaServed`).
4. **Les coordonnées officielles** : nom commercial exact, adresse, téléphone, horaires (voir « NAP » plus bas).

## Le site NEOBATYS : où se trouve quoi

Domaine : `https://www.neobatys.com` (variable `NEXT_PUBLIC_SITE_URL`, réglée dans Vercel). Toutes les URL absolues (canonical, sitemap, Open Graph, JSON-LD) en découlent via `site.url` : ne jamais écrire le domaine en dur dans un composant.

| Besoin | Où le modifier | Remarque |
| --- | --- | --- |
| Nom, ville, téléphone, e-mail, zone, adresse, horaires | `content/site.ts` | Source unique pour tout le site et pour le JSON-LD |
| Titre et description d'une page | `content/pages.ts` (bloc `seo` de chaque page) | Lus par `pageMetadata()` |
| Titre par défaut, modèle `%s · NEOBATYS`, description de l'accueil | `app/layout.tsx` (`metadata`) | Un des rares textes SEO hors `content/` |
| Questions de la FAQ (aussi en JSON-LD `FAQPage`) | `content/faq.ts`, `faq` dans `content/pages.ts` | |
| Fonctions SEO (canonical, Open Graph, JSON-LD) | `lib/seo.ts` | Code : n'y toucher que pour changer la logique |
| Insertion du JSON-LD dans la page | `components/seo/JsonLd.tsx` | Toujours passer par ce composant (il échappe le contenu) |
| Liste des pages du sitemap | `app/sitemap.ts` | Ajouter chaque nouvelle page ici |
| robots.txt | `app/robots.ts` | `/api/` est exclu |
| Image de partage | `app/opengraph-image.tsx` | |

Règle du projet : **un texte se modifie dans `content/`, pas dans les composants.** Une fois la PR Pages CMS fusionnée, les textes sont dans `content/data/*.json` (les `.ts` ne font que les lire) : modifier le JSON, et mettre à jour `.pages.yml` si on ajoute ou renomme un champ. Faire `git pull` avant de commencer (l'associé peut avoir modifié des textes).

### Comment ça marche déjà

- `pageMetadata({ title, description, path })` produit titre, description, URL canonique, Open Graph et carte Twitter. Le titre final devient `<titre de la page> · NEOBATYS` grâce au modèle du layout.
- `localBusinessJsonLd()` (inséré une fois dans `app/layout.tsx`) décrit l'entreprise en `ProfessionalService`, un sous-type de `LocalBusiness`, avec l'identifiant `<site>/#entreprise`.
- `serviceJsonLd()` décrit une offre et la rattache à l'entreprise par cet `@id`.
- `faqJsonLd()` transforme une liste question/réponse en `FAQPage`.
- **Valeurs entre crochets** (`[TÉLÉPHONE]`, `[ZONE]`…) : `lib/seo.ts` les retire automatiquement du JSON-LD. Une valeur non remplie n'apparaît donc pas chez Google, mais elle peut rester visible sur la page : le signaler à l'utilisateur.
- `areaServed` vient de `site.zone` : si la zone est entre crochets, elle est omise. C'est le comportement voulu tant qu'aucune zone n'est choisie (une chaîne vide, elle, serait envoyée telle quelle : préférer retirer le champ ou corriger `lib/seo.ts`).

## Titres et descriptions

Pour chaque page :

- **Titre (title)** : 50 à 60 caractères, suffixe ` · NEOBATYS` compris. Le service d'abord, puis la cible, puis la ville **seulement si une zone a été validée**. Un titre différent par page.
  - Avec zone : « Création de site internet pour artisans à <Ville> »
  - Sans zone : « Création de site internet pour artisans du bâtiment »
- **Description** : 140 à 160 caractères, une promesse concrète + une action (« Devis gratuit », « Appelez-nous »). Pas de liste de mots-clés.
- **Un seul H1 par page**, proche du titre mais rédigé pour l'humain.
- Quand la zone change ou est retirée, chercher les anciennes mentions de ville partout (titres, descriptions, `app/layout.tsx`, textes de `content/`) : `grep -rni "<ancienne ville>" app content components lib`.

## Données structurées (schema.org)

- Une seule fiche entreprise, du type le plus précis possible : `ProfessionalService` pour NEOBATYS ; pour un artisan client `RoofingContractor`, `Plumber`, `Electrician`, `HVACBusiness`, `GeneralContractor`, `HousePainter`, `Locksmith`…
- Mêmes nom, adresse et téléphone que sur la page et sur Google Business Profile.
- `areaServed` : uniquement les villes ou la zone confirmées par l'utilisateur, en texte ou en liste de `City`.
- Ne jamais ajouter d'avis (`aggregateRating`, `review`) inventés ou recopiés : Google le sanctionne. Les témoignages du site sont pour l'instant des exemples (`showPlaceholderBadges: true`).
- Vérifier après mise en ligne avec le test des résultats enrichis de Google (search.google.com/test/rich-results) et le validateur schema.org (validator.schema.org).

## Pages par ville ou par service

À proposer seulement si l'utilisateur a validé une zone. Règles :

- Une page par ville **seulement s'il y a du contenu propre** : chantiers réalisés sur place, délais, photos, avis locaux. Des pages identiques où seul le nom de ville change sont vues par Google comme du contenu de faible qualité.
- Mieux vaut une page par **service** (couverture, zinguerie, ravalement…) bien remplie qu'une page par ville vide.
- Côté code : textes dans `content/`, page dans `app/<chemin>/page.tsx` avec `pageMetadata()` et, si utile, `serviceJsonLd()`, puis ajout du chemin dans `app/sitemap.ts` et un lien depuis le menu ou le pied de page (`content/navigation.ts`). Une page sans lien interne est difficile à trouver pour Google.

## Google Business Profile (fiche Google)

Souvent le levier le plus fort pour un artisan. Checklist à donner au client (c'est lui qui gère son compte, Claude ne s'y connecte pas) :

1. Créer ou revendiquer la fiche sur business.google.com, la faire valider (courrier, appel ou vidéo).
2. Catégorie principale = le métier exact ; catégories secondaires pour les autres services.
3. Zone desservie : celle donnée par le client. S'il ne reçoit pas de public, masquer l'adresse et n'indiquer que la zone.
4. Nom, téléphone, site, horaires identiques au site (NAP).
5. Photos réelles de chantiers, régulièrement ; description de 750 caractères maximum.
6. Demander des avis aux clients satisfaits (lien court fourni par Google) et répondre à tous, y compris aux négatifs.
7. Publier une actualité de temps en temps (chantier terminé, offre de saison).

## Cohérence NAP (nom, adresse, téléphone)

Le nom, l'adresse et le téléphone doivent être écrits **exactement de la même façon** partout : site (`content/site.ts`), fiche Google, Pages Jaunes, annuaires professionnels, réseaux sociaux, devis et factures. Même format de téléphone, même nom commercial, même adresse.

Lors d'un audit, lister chaque endroit où l'entreprise apparaît et signaler les écarts dans un tableau.

## Sites des artisans clients

Pour un site livré à un artisan, reprendre la même organisation que le site NEOBATYS : un fichier de contenu (comme `content/site.ts`) comme source unique des coordonnées, des fonctions SEO centralisées, le JSON-LD généré à partir de ces données, un sitemap qui liste toutes les pages. La zone, le métier et les coordonnées sont des **paramètres demandés au client**, jamais repris d'un autre projet.

## Format de rendu d'un audit

```markdown
## Audit SEO local : <site>
Zone indiquée par l'utilisateur : <zone ou « aucune »>

### Ce qui va bien
- …

### À corriger (par ordre d'importance)
| # | Problème | Où | Correction proposée |
|---|---|---|---|

### Cohérence NAP
| Source | Nom | Adresse | Téléphone | OK ? |
|---|---|---|---|---|

### À faire hors du site
- Fiche Google, annuaires, avis…
```

## Après une modification

Lancer `npm run typecheck` et `npm run build`, puis publier en suivant le skill `publier` (branche, PR, vérification sur l'aperçu Vercel). Après la mise en ligne, contrôler `https://www.neobatys.com/sitemap.xml` et le code source d'une page (balise `<title>`, bloc `application/ld+json`).
