# Acquisition : être vu par les artisans et cité par les IA

Plan au 2 novembre 2026. Le détail sourcé (une URL par fait) est dans `docs/veille/canaux-et-ia.md` ; les étapes d'indexation à faire à la main sont dans `docs/seo-actions-ilann.md`.

## 1. Être cité par les assistants IA

Quand un artisan demande à ChatGPT, Gemini, Claude, Perplexity ou Copilot « comment créer un site pour mon entreprise » ou « quel logiciel de devis choisir », l'assistant lance une recherche web et cite les pages qu'il trouve. Il n'existe pas de canal à part : **être cité, c'est d'abord être indexé dans le moteur que l'assistant interroge.**

| Assistant | Ce qu'il interroge | Robot à laisser passer | État |
|---|---|---|---|
| Google AI Overviews, AI Mode, Gemini | Index Google | Googlebot | Autorisé ; indexation à confirmer dans Search Console |
| Copilot | Index Bing | Bingbot | Autorisé ; **site absent de Bing au 2/11**, IndexNow en place (PR #42) |
| ChatGPT (recherche) | Son index (OAI-SearchBot) et des moteurs tiers | OAI-SearchBot | Autorisé (réponse 200 vérifiée) |
| Claude | Son index (Claude-SearchBot) et un moteur tiers | Claude-SearchBot | Autorisé |
| Perplexity | Son index | PerplexityBot | Autorisé |

GPTBot, ClaudeBot et Google-Extended servent à l'entraînement des modèles, pas à la présence dans les réponses : les laisser ouverts ne coûte rien, les bloquer ne ferait pas disparaître le site des réponses.

Ce qui fait citer une page, selon Google et Microsoft (documentation officielle) :

- Les bases du référencement suffisent. Google écrit qu'il n'y a « aucune exigence supplémentaire » ni fichier spécial pour ses fonctions IA.
- Un contenu propre, qui répond à une question précise : titres et H1 cohérents, intertitres clairs, réponses courtes compréhensibles hors contexte, listes et tableaux, FAQ. C'est le format des guides et des pages métier du site.
- Des données structurées identiques au texte visible (en place : FAQPage, Article, Service, SoftwareApplication, BreadcrumbList).
- Une fiche Google Business Profile à jour, citée explicitement par Google.
- Pour le local, les avis et les sites qui parlent de l'entreprise (aide Google Business Profile).

Écartés :

- **llms.txt** : simple proposition, aucun éditeur d'assistant ne dit l'utiliser, et Google écrit qu'aucun fichier pour l'IA n'est nécessaire. Non ajouté.
- **Wikidata, Wikipédia** : NEOBATYS ne remplit pas les critères d'admissibilité ; un élément créé serait supprimé.

## 2. Canaux où les artisans peuvent nous découvrir

| Canal | Comment y figurer | Comment y être bien vu | Effort | Qui |
|---|---|---|---|---|
| Google (recherche, Maps, IA) | Search Console, sitemap (`docs/seo-actions-ilann.md`) | Pages par question et par métier, fiche Google à jour, avis réels | S | Ilann |
| Bing, DuckDuckGo, Copilot, ChatGPT | Bing Webmaster Tools, IndexNow (fait) | Mêmes pages ; suivre le rapport de citations IA de Bing quand il est disponible | S | Ilann |
| Fiche Google Business Profile | `docs/fiche-google-et-reseaux.md` | Avis après chaque mise en place, photos, publications | S | session réseaux sociaux |
| G2 (qui rachète Capterra, GetApp, Software Advice) | Profil gratuit à revendiquer | Avis de vrais clients | S | Ilann ou Gabin |
| Appvizer | Compte éditeur gratuit | Avis collectés sur le web | S | Ilann ou Gabin |
| SME Packages Digital (Luxembourg) | Se faire connaître du service eHandwierk de la Chambre des Métiers | L'État rembourse 70 % d'un projet de 3 000 à 25 000 € HTVA (site web, logiciel sectoriel, facturation électronique) : argument de vente direct | M | Ilann |
| France Num, réseau des Activateurs (France) | Candidature auprès de la DGE | Annuaire officiel consulté par les TPE ; éligibilité d'une société luxembourgeoise à vérifier | S | Ilann |
| Logo « solution compatible » facturation électronique | Charte publiée par impots.gouv.fr | Crédibilité du logiciel avant septembre 2027 ; lire la charte avant tout usage | S | Gabin |
| Chambre des Métiers (DigiCheck, agenda) et Fédération des Artisans (Luxembourg) | Proposer une intervention, demander le tarif sponsor | Parler de la facture électronique plutôt que vendre | M | Ilann |
| Club Partenaires BTP 57 (FFB Moselle), CAPEB, CMA | Contact direct (déjà au plan, `docs/seo-logiciel.md` §6) | Présence aux événements, intervention en formation | M | Ilann et Gabin |
| Podcasts BTP (BTP Techno Lab, 6 H du BAT') | Proposer un épisode sur un cas concret | Un cas d'artisan, pas une publicité | S | Ilann |
| YouTube | Démo de 2 minutes du logiciel, une vidéo par métier ensuite | Google cite les vidéos en appui de ses réponses IA | M | Gabin |
| Réseaux sociaux et groupes d'artisans | `docs/reseaux-sociaux.md` | Lire le règlement des groupes, aucune publicité déguisée | M | session réseaux sociaux |

Écartés pour l'instant : Batimat (prochaine édition en 2028), Artibat (Rennes, hors zone), annonces Local Services de Google pour NEOBATYS (pas de catégorie agence ou logiciel ; utiles en revanche comme service à vendre aux clients plombiers, électriciens, couvreurs). À surveiller : Habitatpresto annonce son propre logiciel de devis.

## 3. Pages cibles

| Cible | Page | État |
|---|---|---|
| Marque : neobatys, néobatys, neo batys | Accueil (`WebSite` et `ProfessionalService` au nom NEOBATYS) | En ligne ; dépend de l'indexation, rien à créer |
| Logiciel devis artisan, logiciel facturation artisan, logiciel artisan bâtiment | `/logiciel` et les guides par métier | En ligne |
| Facturation électronique artisan | `/logiciel/facturation-electronique` | En ligne |
| Modèle de devis, calcul de TVA, acompte, retenue, impayés | `/logiciel/modele-devis`, `calculateur-tva`, `facture-acompte`, `retenue-de-garantie`, `facture-impayee`, `devis-excel-ou-logiciel` | En ligne |
| Création site internet artisan | `/sites-internet` | En ligne |
| Site internet plombier, électricien, maçon... | `/sites-internet/<métier>` (9 pages) | En ligne |
| Agence web Metz, Moselle, Luxembourg | Aucune | **Bloqué** : pas de zone desservie dans `content/data/site.json` |
| Assistant IA artisan, agent IA, réponse automatique aux demandes de devis, devis à la voix | `/intelligence-artificielle` | En ligne |
| Conseil IA, automatisation PME bâtiment | `/intelligence-artificielle` | En ligne ; à enrichir si une offre de conseil distincte existe |
| Digitalisation artisan, aides au numérique, accompagnement | `/digitaliser-son-entreprise` (SME Packages Digital et AI au Luxembourg, France Num) | En ligne après fusion |

## 4. Ordre de priorité

1. Indexation Google et Bing (Ilann, 30 minutes) : rien d'autre ne compte tant que le site n'est pas indexé.
2. Fiche Google Business Profile et premiers avis réels.
3. Profil G2 gratuit, fiche Appvizer.
4. Contact eHandwierk (Chambre des Métiers) pour présenter l'offre et confirmer l'éligibilité des projets ; la page `/digitaliser-son-entreprise` explique l'aide aux artisans.
5. Candidature France Num, lecture de la charte « solution compatible ».
6. Épisode de podcast, démo vidéo du logiciel.
7. Club Partenaires BTP 57, Chambre des Métiers, Fédération des Artisans.
