# Campagne SEO du logiciel de devis et factures

Plan de référencement de la page `/logiciel` et de ses guides `/logiciel/[guide]`. Recherche faite le 31 octobre 2026.

**Règle de lecture.** Aucun volume de recherche ni aucune difficulté n'est donné ici : aucune source publique fiable ne les publie pour ces requêtes. Les vrais chiffres viendront de Google Keyword Planner (compte Google Ads gratuit) et, une fois les pages en ligne, de Search Console. Les mots-clés ci-dessous viennent des suggestions de Google (France, 31/10/2026).

## 1. Constat

- **Le marché national est saturé.** Obat, Tolteck, Batappli, Batichiffrage, Abby, Costructor, Axonaut, Henrri, Extrabat, Evoliz et SumUp occupent « logiciel devis artisan » et ses variantes, avec des centaines de pages chacun. Un site neuf ne passera pas devant eux sur la requête générique en 3 mois.
- **Le local est vide.** Aucune page concurrente ne cible Metz, la Moselle ou le Luxembourg. En revanche, personne ne tape « logiciel devis metz » : les recherches locales portent sur des artisans, pas sur des logiciels. Le local se joue donc surtout par Google Business Profile, le bouche-à-oreille et les réseaux professionnels (chambres, fédérations), pas par des pages « logiciel devis Metz ».
- **Les angles qui restent ouverts :**
  1. **Facturation électronique** : la réception est obligatoire depuis le 1er septembre 2026, l'émission le sera au 1er septembre 2027 pour les TPE et PME. La demande va monter pendant toute l'année 2027.
  2. **Pages par métier** : le modèle de tous les concurrents (« logiciel devis + métier »). Des requêtes précises, moins disputées que la requête générique.
  3. **Frontalier France-Luxembourg** : le Luxembourg impose déjà la facture électronique dans les marchés publics (Peppol, depuis le 18 mars 2023) et prépare une obligation entre entreprises (projet de loi n° 8815, déposé le 30/07/2026, obligation prévue à partir de 2028). Aucun concurrent français ne traite les deux pays.
  4. **Informations à jour** : depuis le 1er mars 2025, l'attestation de TVA réduite 1300-SD / 1301-SD est remplacée par une mention sur le devis. Beaucoup de pages concurrentes ne sont pas à jour.

## 2. Mots-clés par cluster

| Cluster | Requêtes (suggestions Google) | Intention | Page cible |
|---|---|---|---|
| Générique | logiciel devis artisan, logiciel devis facture batiment, logiciel devis btp, logiciel devis artisan gratuit, sans abonnement, pas cher, quel est le meilleur logiciel devis facture | Transactionnelle | `/logiciel` |
| Facturation électronique | facturation électronique obligatoire artisan, facturation électronique 2026 pour qui, date facturation électronique, logiciel facturation électronique artisan, plateforme agréée prix | Informationnelle, puis transactionnelle | `/logiciel/facturation-electronique` |
| Luxembourg | logiciel facturation luxembourg, facturation électronique luxembourg (b2b, peppol, myguichet), peppol luxembourg obligatoire | Informationnelle | `/logiciel/facturation-electronique` (section Luxembourg), puis page dédiée si Search Console montre des impressions |
| Métiers | logiciel devis plombier, électricien, maçonnerie, peintre en bâtiment, menuiserie (alu, pvc), couvreur, toiture, carrelage, chauffagiste | Transactionnelle | `/logiciel/[métier]` |
| Réglementation devis | mentions obligatoires devis bâtiment, devis travaux, comment faire un devis bâtiment, tva 10 travaux, assurance décennale devis, devis artisan rge, devis sans tva | Informationnelle | sections des pages métier, puis guide dédié |
| Modèles | modèle devis bâtiment (excel, word, pdf) | Informationnelle | à créer : modèle de devis gratuit à télécharger (aimant à liens) |
| IA | logiciel devis batiment ia | Transactionnelle | `/logiciel` (devis dictés, voir assistants IA) |

## 3. Concurrents (relevé du 31/10/2026)

| Éditeur | Prix d'entrée HT affiché | Ce qu'ils font en SEO |
|---|---|---|
| Obat | 32 €/mois (25 € en annuel) | pages métier `/devis-factures/[métier]/`, page facturation électronique, modèles, calculateurs, devis vocal IA |
| Tolteck | 25 €/mois (19 € en annuel) | pas de page métier, une quarantaine de guides facturation électronique, modèles à télécharger |
| Batappli | 39 €/mois | blog d'environ 470 pages, boîte à outils par métier, liens CAPEB |
| Batichiffrage | 59,90 €/mois | pages `/logiciel-devis-factures-[métier]/` (9 métiers), modèle de devis, DTU |
| Costructor | gratuit puis 15 €/mois | comparatifs « meilleur logiciel 2026 », exemples de devis et factures |
| Abby | gratuit puis 9 €/mois | 9 pages `/artisan/[métier]`, environ 88 pages facturation électronique, micro-entrepreneurs |
| Axonaut, Henrri, Extrabat, Evoliz, SumUp | de 0 à 58 €/mois | généralistes, quelques pages métier ou modèles |

Tarifs : obat.fr/tarifs, tolteck.com/fr-fr/tarifs, batappli.fr/tarifs, batichiffrage.fr/tarifs, costructor.co/tarifs, abby.fr/tarifs, axonaut.com/content/prix, henrri.com/nos-formules, extrabat.com/tarifs, evoliz.com/tarifs, sumup.com/fr-fr/factures/prix.

**Notre différence à mettre en avant (sans chiffre inventé) :** mise en place faite pour l'artisan (import des clients et des prix, formation d'une heure, démo avec ses propres devis), interlocuteur unique, logiciel relié au site internet (Pack Gestion), proximité Metz et Luxembourg. Le prix n'est pas un argument : nos offres sont des forfaits avec mise en place, pas un abonnement à 20 €.

## 4. Pages

### Livrées dans cette PR

| URL | Cible | Contenu |
|---|---|---|
| `/logiciel` | générique | JSON-LD `SoftwareApplication` (remplace `Service`) et `FAQPage`, bloc de liens vers les guides |
| `/logiciel/facturation-electronique` | cluster facturation électronique et Luxembourg | dates, formats, plateformes agréées, sanctions, particuliers, Luxembourg, sources officielles, FAQ |
| `/logiciel/plombier` | logiciel devis plombier, chauffagiste | devis de dépannage obligatoire, TVA 10 / 5,5 / 20 % (chaudières), décennale, fonctions |
| `/logiciel/electricien` | logiciel devis électricien | mêmes règles appliquées à l'électricité |

Chaque guide a son fil d'Ariane (`BreadcrumbList`), sa FAQ (`FAQPage`), des liens vers les autres guides et vers `/logiciel`, et figure au sitemap. Le pied de page pointe vers la facturation électronique. Les textes sont dans `content/data/software-guides.json`, modifiables depuis Pages CMS.

### À créer ensuite (même gabarit : ajouter une entrée dans `software-guides.json`)

1. `/logiciel/macon`, `/logiciel/peintre`, `/logiciel/menuisier`, `/logiciel/couvreur`, `/logiciel/carreleur`, `/logiciel/chauffagiste` : les métiers les plus suggérés. Chaque page doit avoir un contenu propre au métier (règles, ouvrages typiques), pas un copier-coller avec le nom changé.
2. `/logiciel/mentions-obligatoires-devis` : mentions du devis du bâtiment, TVA réduite sans attestation depuis 2025, décennale.
3. `/logiciel/modele-devis` : modèle de devis bâtiment gratuit (PDF), demandé par e-mail ou téléchargeable. C'est la page qui attire naturellement des liens.
4. `/logiciel/facturation-electronique-luxembourg` si Search Console montre des impressions sur les requêtes Luxembourg.

## 5. Calendrier sur 3 mois

| Semaine | Site | Hors site |
|---|---|---|
| S1 (novembre) | fusion de cette PR | Search Console : propriété de domaine, envoi du sitemap, demande d'indexation des 4 pages. Google Business Profile créé ou complété. |
| S2 | `/logiciel/macon` | Bing Webmaster Tools (import depuis Search Console). Fiches Bing Places et Apple Business. |
| S3 | `/logiciel/peintre` | Inscription Editus.lu, PagesJaunes, annuaire-entreprises.data.gouv.fr (vérifier la fiche). |
| S4 | `/logiciel/mentions-obligatoires-devis` | Fiches Capterra, GetApp, Appvizer (gratuites pour l'éditeur). |
| S5 (décembre) | `/logiciel/menuisier` | Prise de contact CAPEB Moselle et Fédération BTP Moselle (atelier facturation électronique). |
| S6 | `/logiciel/couvreur` | Chambre des Métiers du Luxembourg, Fédération des Artisans : proposer une intervention ou un article. |
| S7 | `/logiciel/modele-devis` | Premier bilan Search Console : requêtes avec impressions, pages non indexées. |
| S8 | mise à jour de la page facturation électronique (vérifier dates et amendes) | Réseaux Metz (Inspire Metz, MOSL) : présentation. |
| S9 (janvier) | `/logiciel/carreleur` | Demander un avis Google aux premiers vrais clients (jamais d'avis inventé). |
| S10 | `/logiciel/chauffagiste` | |
| S11 | ajustement des titres et descriptions selon le taux de clic Search Console | |
| S12 | bilan des 3 mois, choix des 3 mois suivants | |

Rythme : une page par semaine, chacune relue par Ilann ou Gabin avant publication (les règles changent).

## 6. Netlinking local réaliste

Objectif : une dizaine de liens propres en 3 mois, pas de lien acheté, pas d'échange de liens massif.

| Source | Type de lien | Comment |
|---|---|---|
| Google Business Profile, Bing Places, Apple Business | fiche | création directe |
| Editus.lu, PagesJaunes | annuaire | inscription gratuite |
| Capterra, GetApp, Appvizer | fiche éditeur de logiciel | inscription éditeur |
| CAPEB Moselle (capeb57.fr), Fédération BTP Moselle (ffbatiment.fr) | partenaire, article, atelier | proposer un atelier « facturation électronique 2027 » aux adhérents |
| CMA Alsace-Moselle-Grand Est (cma-alsace-moselle-grandest.fr) | agenda, partenaires | atelier ou fiche prestataire numérique |
| Chambre des Métiers du Luxembourg (cdm.lu), Fédération des Artisans (fda.lu) | article, événement | sujet frontalier : facture électronique France et Luxembourg |
| CCI Moselle (moselle.cci.fr), Chambre de Commerce Luxembourg (cc.lu), House of Entrepreneurship | annuaire, événements | inscription, participation |
| Inspire Metz, Euro-Métropole Metz, MOSL, Réseau Entreprendre Lorraine | réseau | adhésion ou présentation |
| Sites des clients artisans | « Site réalisé par NEOBATYS » | lien discret en pied de page des sites que nous créons, avec accord du client |

Organismes vérifiés existants le 31/10/2026. Les adresses initiative-metz.fr, frenchtech-east.com et bni-france.com n'ont pas répondu : ne pas les citer sans vérifier.

## 7. Google Business Profile

- Catégorie principale : « Éditeur de logiciels » ou « Service de conception de sites Web » (choisir celle qui correspond à l'activité principale ; une seule principale, les autres en secondaires).
- Adresse : le siège à Strassen. Si aucun accueil client sur place, la masquer et déclarer une zone desservie (Metz, Moselle, Luxembourg).
- Services : logiciel de devis et factures, création de site internet, assistants IA, chacun avec un lien vers sa page.
- Description reprenant les mots du site, sans promesse de résultat.
- Photos réelles (équipe, écrans du logiciel), publications mensuelles (par exemple les échéances de la facturation électronique).
- Avis : uniquement de vrais clients, demandés après la mise en place. Ne jamais en publier ni en inventer.

## 8. Suivi

- **Search Console** : propriété de domaine `neobatys.com` (validation DNS), sitemap `https://www.neobatys.com/sitemap.xml`. À suivre chaque mois : impressions et clics par page, requêtes qui apparaissent (y compris celles qu'on ne vise pas encore), pages exclues de l'index.
- **Indicateurs** : pages indexées sur 4 (puis sur le total), impressions mensuelles des guides, demandes de démo venant de `/logiciel` et des guides (`/contact?service=logiciel`).
- **Mesure d'audience** : à brancher uniquement après consentement (voir `lib/consent.ts`).
- **Données structurées** : tester `/logiciel` et un guide avec l'outil de test des résultats enrichis de Google. Le `SoftwareApplication` ne déclare ni prix ni note : Google n'affichera pas d'étoiles, c'est voulu tant qu'il n'y a ni prix seul du logiciel ni vrais avis.

## 9. Actions humaines

| Action | Qui | Quand |
|---|---|---|
| Relire les 3 guides (dates, amendes, TVA) et confirmer que le logiciel passe bien par une plateforme agréée (laquelle ?) | Ilann, Gabin | avant fusion |
| Créer la propriété Search Console et envoyer le sitemap | Ilann | S1 |
| Créer ou compléter Google Business Profile | Ilann | S1 |
| Inscriptions annuaires et fiches logiciel | Ilann ou Gabin | S2 à S4 |
| Contacts CAPEB, FFB, CMA, Chambre des Métiers | Ilann, Gabin | S5 à S8 |
| Ouvrir Google Keyword Planner pour obtenir les volumes réels et reprioriser les métiers | Ilann | S2 |

## Sources réglementaires

- Calendrier de la facturation électronique : https://entreprendre.service-public.gouv.fr/actualites/A15683 et https://www.impots.gouv.fr/professionnel/je-decouvre-la-facturation-electronique
- Plateformes agréées : https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees et https://entreprendre.service-public.gouv.fr/actualites/A18759
- Sanctions (loi de finances 2026) : https://entreprendre.service-public.gouv.fr/actualites/A18802
- Luxembourg, marchés publics : https://guichet.public.lu/fr/entreprises/gestion-juridique-comptabilite/marche-public-concession/facturation/transmission-facture-electronique-marche-public-contrat-concession.html
- Luxembourg, projet de loi 8815 : https://www.chd.lu/en/node/3878
- Devis obligatoire dans le bâtiment : https://entreprendre.service-public.gouv.fr/vosdroits/F31144
- TVA des travaux : https://www.impots.gouv.fr/professionnel/questions/quel-taux-de-tva-appliquer-pour-les-travaux-realises-dans-les-logements et https://entreprendre.service-public.gouv.fr/actualites/A18088

Certaines pages de legifrance.gouv.fr et economie.gouv.fr n'ont pas pu être lues directement (accès refusé aux robots) : les montants des amendes et la décennale (art. L243-2 du Code des assurances) sont à vérifier à la main avant chaque mise à jour.
