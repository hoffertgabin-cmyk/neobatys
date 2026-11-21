# Stratégie de référencement NEOBATYS

Rédigée le 21 novembre 2026, à la demande d'Ilann : ressortir sur Google sur ce que les clients cherchent vraiment, et vendre l'offre au mieux. Ce document s'appuie sur `docs/ORGANISATION-SITE.md` (décisions déjà prises), `docs/seo-logiciel.md` (campagne du logiciel, 31/10/2026) et `docs/acquisition-canaux.md`. Il ne les remplace pas : il dit quoi faire ensuite et dans quel ordre.

**Règle de lecture.**

- Aucun volume de recherche n'est donné : aucune source gratuite et sans compte ne les publie pour ces recherches. Google Trends n'a pas pu être lu (Google a bloqué les requêtes automatiques le 21/11/2026, voir 1.1). Partout où un volume serait utile, c'est écrit « volume non vérifié ». Les recherches sont classées par **signal** : la suggestion de Google existe ou non, Google ajoute des variantes ou non, et qui occupe la première page.
- Les résultats de Google dépendent du lieu, de l'appareil et de la personne. Ceux d'ici ont été relevés le 21/11/2026 depuis la France, en français, sur un navigateur connecté : ils donnent une tendance, pas une position garantie.
- Les mots « artisan seul », « PME » et « grosse entreprise » attribués à une recherche sont une lecture de ma part, d'après les mots employés (« auto entrepreneur », « pme », « erp »), pas une mesure.

## En bref

1. **Le site est techniquement propre mais invisible.** 47 pages, toutes en ligne, un seul titre principal par page, titres et descriptions uniques, données structurées partout, PageSpeed mobile à 100. Mais le domaine a un mois (créé le 21/10/2026), Search Console n'est pas ouvert, Bing ne connaît pas le site, même sur son nom, et NEOBATYS ne sort dans les 10 premiers résultats d'aucune des 22 recherches testées.
2. **Priorité n° 1 : ouvrir Google Search Console et Bing Webmaster Tools.** Sans eux, on ne sait ni ce qui est indexé ni ce que les gens tapent avant d'arriver. C'est 30 minutes pour Ilann ou Gabin (section 7).
3. **Le terrain le plus ouvert est celui des agents IA et de la relance des devis.** Sur « agent ia artisan » ou « agent ia btp », la première page est faite de petites agences et de blogs récents, sans éditeur installé. Sur « relancer un devis », Google propose une quinzaine de variantes, et aucune page du bâtiment ne sort. Ces deux sujets sont aussi ce que les artisans reprochent aux logiciels de ne pas faire.
4. **Le logiciel seul est un marché saturé.** Sur « logiciel devis facture batiment », Costructor, Progbat, Batiprix, Sage, la CAPEB et Batichiffrage tiennent la première page. On y va par les métiers, la facture électronique et le Luxembourg, pas par la recherche générique.
5. **Le dépôt GitHub du site est public** et c'est lui, pas neobatys.com, que les moteurs associent à la marque, avec des notes internes lisibles par tous (section 2.3). C'est une décision pour Ilann et Gabin.

## 1. Ce que cherchent les clients

### 1.1 Comment le relevé a été fait

| Source | Ce qui a été relevé | Date | Limite |
|---|---|---|---|
| Suggestions de Google (saisie semi-automatique, `suggestqueries.google.com`, France, français) | 75 débuts de recherche, jusqu'à 10 suggestions chacun | 21/11/2026 | Une suggestion prouve que la recherche existe, pas qu'elle est fréquente |
| Pages de résultats Google (google.fr, navigateur connecté) | 10 premiers résultats, « Autres questions posées », recherches associées, pour 13 recherches | 21/11/2026 | Google a ensuite renvoyé sa page anti-robots, non contournée. Annonces : comptage non fiable dans ce relevé |
| Pages de résultats Bing (bing.com, France) | 10 premiers résultats pour 9 recherches de plus | 21/11/2026 | Bing n'est pas Google, mais il alimente la recherche de ChatGPT et de Copilot |
| Avis Capterra, Trustpilot, Appvizer, App Store sur Obat, Tolteck, Batappli, Costructor, Axonaut, Extrabat, Graneet, Batigest ; questions Quora et Forum Construire ; 6 comparatifs | Les mots des artisans, ce qu'ils reprochent et apprécient | 21/11/2026 | Capterra en partie (première page d'avis), GetApp et Reddit illisibles. Peu de vrais forums d'artisans en ligne |
| Offres concurrentes (agents IA, standards téléphoniques, agences de sites) | Ce qui est vendu, prix affiché | 21/11/2026 | Liste non exhaustive |

Le relevé complet des avis et des concurrents est gardé hors du dépôt, dans les notes de session (`seo-avis-forums.md`, `seo-paysage-ia-agences-annuaires.md`) ; les sources utiles sont citées ci-dessous.

### 1.2 Agents IA : ce que les gens tapent

| Recherche | Signal (suggestions Google) | Intention | Pour qui (lecture) |
|---|---|---|---|
| agent ia artisan, agent ia pour artisan, assistant ia pour artisan, meilleur ia pour artisan | Suggestion présente, variantes | Comparer | Artisan seul, petite entreprise |
| agent ia btp, agent ia batiment, agent ia construction | Suggestion présente | Comparer | PME |
| ia btp devis, ia devis batiment, ia devis travaux, ia devis artisan, devis avec ia, devis ia gratuit | Nombreuses variantes | Se renseigner, puis acheter | Tous |
| chatgpt pour devis, comment faire un devis avec chatgpt | Suggestion présente | Se renseigner | Artisan seul |
| devis vocal ia, devis vocal obat | Suggestion présente (Obat cité par Google) | Comparer | Artisan seul |
| relance devis automatique, relance devis par sms, relance devis par téléphone, relance devis par mail exemple, relance devis client, relance devis artisan | 9 variantes sur « relance devis » | Se renseigner | Tous |
| comment relancer un devis client, quand relancer un devis, formule pour relancer un devis, mail pour relancer un devis | 9 variantes sur « relancer un devis » | Se renseigner | Tous |
| devis non signé mais travaux réalisés, devis non signé mais acompte versé, devis non signé mais accord par mail | 9 variantes | Se renseigner (litige) | Tous |
| répondeur ia, répondeur ia gratuit, ia répondeur téléphonique, répondeur vocal ia | Variantes, surtout grand public (« iphone », « samsung ») | Comparer | Tous |
| appels manqués artisan, standard téléphonique artisan, secrétaire téléphonique artisan | **Aucune suggestion** | (pas de demande visible sous cette forme) | |
| comment demander un avis google, mail demande avis google client, comment avoir des avis google gratuitement | Nombreuses variantes | Se renseigner | Tous |
| automatisation ia btp | Suggestion présente ; « automatisation entreprise batiment » : aucune | Se renseigner | PME |

**Autres questions posées par Google** (relevées sur les pages de résultats) : « Quel est le prix d'un agent IA ? », « C'est quoi une agence IA ? », « Comment faire un devis avec l'IA ? », « Comment relancer une demande de devis par mail ? », « Quel est un bon texte pour relancer un client ? ».

**Recherches associées** en bas de page sur « agent ia artisan » et « ia devis batiment » : « Devis IA gratuit », « IA pour devis de construction », « Faire un devis avec IA », « Devis vocal », et trois noms de produits : Artibot, Flowdevis, Renalto.

Lecture : la demande existe sous les mots « agent IA » et « IA devis », et elle est la plus fournie sur la **relance des devis**. Personne ne tape « appels manqués artisan » : le besoin de répondre au téléphone se cherche sous « répondeur IA » ou « standard téléphonique IA », et les offres qui sortent sont des standards à 49 € HT par mois (On Répond, Voice Pilot).

### 1.3 Logiciel de gestion : ce que les gens tapent

| Recherche | Signal | Intention | Pour qui (lecture) |
|---|---|---|---|
| logiciel devis artisan, logiciel devis facture batiment, logiciel devis facture btp | Nombreuses variantes | Comparer | Tous |
| logiciel devis facture gratuit, sans abonnement, auto entrepreneur, micro entreprise | Variantes | Comparer, prix bas | Artisan seul |
| meilleur logiciel devis facture bâtiment, meilleur logiciel devis btp | Variantes | Comparer | Tous |
| logiciel devis facture batiment prix, logiciel devis facture prix | Variantes | Acheter | Tous |
| logiciel gestion entreprise batiment, logiciel gestion pme batiment, logiciel gestion entreprise btp, logiciel gestion commerciale batiment | Variantes | Comparer | PME |
| logiciel btp complet, logiciel btp suivi chantier, logiciel btp pme, logiciel btp ia | Variantes | Comparer | PME |
| logiciel suivi chantier, application suivi chantier, logiciel planning chantier, logiciel planning btp | Nombreuses variantes | Comparer | PME, plus grosse entreprise |
| erp btp, erp btp france | Variantes (beaucoup hors sujet : Maroc, conseil) | Comparer | Plus grosse entreprise |
| obat avis, tolteck avis, costructor avis, axonaut avis, extrabat avis, equivalent obat | Présentes | Comparer un concurrent | Tous |
| facturation électronique 2027 (pour qui, auto entrepreneur, tpe, pme, report), facturation électronique obligatoire artisan, logiciel facturation électronique artisan, plateforme agréée facturation électronique artisan | Nombreuses variantes | Se renseigner, puis acheter | Tous |
| facturation électronique luxembourg (2026, b2b, obligation, peppol, myguichet, date) | 9 variantes | Se renseigner | Entreprises au Luxembourg ou frontalières |
| logiciel facturation luxembourg, logiciel de facturation luxembourg gratuit | Variantes | Comparer | Entreprises au Luxembourg |
| logiciel devis luxembourg | **Aucune suggestion** | | |

**Autres questions posées** : « Quel est le meilleur logiciel pour les artisans ? », « Quel est le meilleur logiciel gratuit de devis pour le BTP ? », « Quel est le meilleur logiciel devis-facture pour la maçonnerie ? », « Quel est le meilleur logiciel de gestion d'entreprise ? », « Comment faire un suivi de chantier ? », « Est-ce obligatoire d'avoir un logiciel de facturation électronique ? », « Qui n'est pas concerné par la facturation électronique ? ».

**Recherches associées** : « Logiciel BTP complet », « Meilleur logiciel BTP », « Logiciel ERP Bâtiment », « Logiciel bâtiment gratuit », « Logiciel de suivi de chantier gratuit », « Facturation électronique report 2028 ».

### 1.4 Sites internet : ce que les gens tapent

| Recherche | Signal | Intention | Pour qui (lecture) |
|---|---|---|---|
| création site internet artisan, site internet pour artisan, créer site internet artisan | Variantes, dont des villes (Saint-Étienne, Firminy) | Acheter, local | Artisan seul |
| prix site internet artisan, combien coûte un site internet pour artisan, création de site internet pour artisan pas cher, site internet artisan 390 € par mois tout compris | Variantes, dont un prix | Acheter | Artisan seul |
| créer un site internet artisan gratuit | Présente | Se renseigner (faire soi-même) | Artisan seul |
| création site internet plombier, site internet plombier chauffagiste, site internet btp, site internet entreprise batiment, site internet peintre en batiment | Variantes | Acheter | Tous |
| création site internet metz | **Aucune suggestion** | | |
| creation site internet luxembourg, creation site internet moselle | Suggestion présente (sans variantes) | Acheter, local | Toute entreprise, pas seulement le bâtiment |
| agence web luxembourg, agence digitale luxembourg, agence web metz, agence communication metz | Variantes | Acheter, local | Toute entreprise |
| comment trouver des clients artisan, trouver des chantiers (particuliers, sous-traitance, btp) | Variantes | Se renseigner | Artisan seul |

### 1.5 Les mots des artisans eux-mêmes

Relevés dans les avis et les forums le 21/11/2026. Citations courtes, sources lues.

| Ce qu'ils disent | Où |
|---|---|
| Des clients qui « ne répondent plus, ni au téléphone, ni par mail » après un devis | [Quora](https://fr.quora.com/Lorsque-je-fais-des-devis-et-que-je-les-transmets-aux-clients-certains-ne-r%C3%A9pondent-plus-ni-au-t%C3%A9l%C3%A9phone-ni-par-mail-Comment-obtenir-une-r%C3%A9ponse-de-leur-part-quelle-soit-positive-ou-n%C3%A9gative) |
| Un plombier qui veut « trouver plus de clients grâce à internet » et « être visible sur google » | [Quora](https://fr.quora.com/Je-suis-artisan-plombier-et-je-voudrais-trouver-plus-de-clients-gr%C3%A2ce-a-internet-Par-ou-commencer-pour-%C3%AAtre-visible-sur-google) |
| Excel qui suffit « jusqu'au moment où t'as 10 chantiers en parallèle » | [Quora](https://fr.quora.com/Vous-utilisez-quoi-pour-faire-vos-devis-dans-le-BTP-Excel-Word-ou-un-logiciel) |
| « Gain de temps » sur les devis, l'éloge le plus fréquent | [Capterra, Obat](https://www.capterra.fr/software/1036813/obat), [Trustpilot, Tolteck](https://fr.trustpilot.com/review/tolteck.com) |
| Travail perdu, lenteur sur les devis longs | [Trustpilot, Obat](https://fr.trustpilot.com/review/obat.fr), [Trustpilot, Tolteck](https://fr.trustpilot.com/review/tolteck.com) |
| Application mobile et mode hors connexion insuffisants sur chantier | [App Store, Batappli](https://apps.apple.com/fr/app/batappli-mobile/id571614303), [Trustpilot, Obat](https://fr.trustpilot.com/review/obat.fr) |
| Prix qui montent chaque année, promesses commerciales non tenues | [Trustpilot, Obat](https://fr.trustpilot.com/review/obat.fr), [Trustpilot, Axonaut](https://fr.trustpilot.com/review/axonaut.com) |
| Pas d'automatisation, pas de lien avec les autres outils | [Trustpilot, Obat](https://fr.trustpilot.com/review/obat.fr) |

Les comparatifs lus ([Obat](https://www.obat.fr/blog/logiciel-batiment/), [Costructor](https://costructor.co/blog/logiciel-btp/), [Vox Bati](https://www.vox-bati.com/blog/comparatif-logiciel-devis-artisan-batiment), [Tool Advisor](https://tool-advisor.fr/logiciel-facturation/comparatif/logiciel-devis-facture-batiment/), [Hack'celeration](https://hackceleration.com/fr/labs/meilleur/logiciel-devis-artisans), [Habitatpresto](https://www.habitatpresto.com/pro/conseils/administratif-fiscalite/choix-logiciel-devis-facture-batiment)) jugent tous sur la facture électronique, le mobile, le prix total, les acomptes et situations, la bibliothèque de prix et le support. **Aucun ne note la relance des devis, la réponse aux appels ou la visibilité sur Google.** Trois sur six sont écrits par un éditeur qui se classe premier.

### 1.6 Mesure : où en est-on ?

Vérifié dans le dépôt et en ligne le 21/11/2026 :

| Outil | État | Preuve |
|---|---|---|
| Google Search Console | **Non ouvert** | Aucune balise `google-site-verification` dans les pages (le champ `verification.google` de `content/data/site.json` est vide), aucun enregistrement TXT de Google dans les DNS de neobatys.com (OVH), aucun fichier de vérification dans `public/` |
| Bing Webmaster Tools | **Non ouvert** | Champ `verification.bing` vide, pas de `BingSiteAuth.xml`. IndexNow tourne après chaque déploiement (`.github/workflows/indexnow.yml`, dernier passage réussi le 20/11/2026), mais Bing ne montre aucune page du site |
| Statistiques de visites | Compteur de pages vues de l'admin, sans cookie (`app/api/vue/route.ts`) | Il compte les vues par page et par jour, mais ne dit pas d'où vient le visiteur (Google, lien, direct) ni ce qu'il a tapé |
| Google Business Profile | Non vérifié : pas de lien vers une fiche sur le site, recherche Google bloquée | `docs/fiche-google-et-reseaux.md` prépare la fiche |

**Pourquoi c'est la priorité n° 1.** Tout le reste de ce document repose sur des signaux indirects. Search Console donne les vraies recherches qui affichent le site, le nombre d'affichages et de clics par page, et les pages que Google refuse d'indexer. Sans lui, on ne saura pas si une page marche, ni laquelle écrire ensuite.

**Ce qu'il faut ouvrir, et qui** (pas à pas détaillé dans `docs/seo-actions-ilann.md`) :

1. Ilann ou Gabin, avec l'accès au compte OVH qui gère neobatys.com : [Google Search Console](https://search.google.com/search-console), propriété « Domaine » `neobatys.com`, copier l'enregistrement TXT donné par Google dans la zone DNS chez OVH, valider. Sans accès OVH : propriété « Préfixe d'URL » `https://www.neobatys.com/` et coller le code dans Pages CMS, champ « Codes de vérification » (le site l'affiche déjà, `app/layout.tsx`).
2. Envoyer le plan du site `https://www.neobatys.com/sitemap.xml`, puis demander l'indexation de l'accueil, `/intelligence-artificielle`, `/logiciel`, `/sites-internet` et `/tarifs`.
3. [Bing Webmaster Tools](https://www.bing.com/webmasters) : importer le site depuis Search Console (pas de seconde validation), envoyer le même plan du site.

## 2. Où on en est face aux concurrents

### 2.1 Qui sort en tête

Relevé du 21/11/2026, France, résultats naturels (hors annonces), dans l'ordre. NEOBATYS n'apparaît dans **aucun** des 10 premiers résultats.

| Recherche | Moteur | Premiers résultats |
|---|---|---|
| agent ia artisan | Google | artisan-ia.fr, free-work.com (fil sur Artibot), dunai.fr, juwa.co, kaelia-ai.com, vokai.fr (agents vocaux BTP), orchestraintelligence.fr, pulseoai.fr, azurvision.io |
| agent ia btp | Google | kalao-solution.fr, hyperstack.studio, nodext.fr, myiapartner.fr, iavenir-formation.fr, gibatiforma.fr, teamstarter.com, nobullshitconseil.com, batisia.ai |
| ia devis batiment | Google | renalto.fr, vulko.fr, vertuoza.com, batichiffrage.fr, groupe-t2f.eu, notim.fr, mediabat.com, orgavision.fr, costructor.co |
| relance devis automatique | Google | relanceplus.fr, koban.cloud, communauté Pennylane, triptik.agency, relance-devis.fr, systemeoptimal.com, skuria.fr, noxio.fr, elixmail.fr |
| comment relancer un devis client | Google | Sellsy, mondevisfacile.fr, intia.fr, easyfichiers.com, promee.fr, vertuoza.com, sells.fr, effy.fr, vosfactures.fr |
| logiciel devis artisan | Google | costructor.co, progbat.com, independant.io, capeb.fr, jlogiciels.fr, batiprix.com, arti-box.fr, tiime.fr |
| logiciel devis facture batiment | Google | costructor.co, progbat.com, batiprix.com, sage.com, capeb.fr, qonto.com, batichiffrage.fr |
| meilleur logiciel devis facture bâtiment | Google | costructor.co, batiprix.com, mediabat.com, sage.com, independant.io, batichiffrage.fr, keobat.fr, progbat.com |
| logiciel gestion entreprise batiment | Google | progbat.com, ffbatiment.fr, obat.fr, sage.com, francenum.gouv.fr, jlogiciels.fr, axonaut.com, grafe.fr, graneet.com |
| logiciel gestion pme batiment | Google | progbat.com, francenum.gouv.fr, ffbatiment.fr, sage.com, obat.fr, jlogiciels.fr, axonaut.com, ciel.com, graneet.com, extrabat.com |
| logiciel btp suivi chantier | Google | progbat.com, alobees.com, archireport.com, kizeo-forms.com, kraaft.com, orisha.com, skello.io, tool-advisor.fr, optimbtp.fr |
| logiciel facturation électronique artisan | Google | service-public.gouv.fr, abby.fr, tiime.fr, pennylane.com, comparatif-facture-electronique.fr, jlogiciels.fr, costructor.co, indy.fr |
| facturation électronique 2027 pour qui | Google | impots.gouv.fr, economie.gouv.fr, fiducial.fr, cegid.com, service-public.gouv.fr, experts-comptables.fr, compagnie-fiduciaire.com, edf-oa.fr, legifiscal.fr |
| facturation électronique luxembourg b2b | Bing | financialservices.lu, letzbusiness.lu (2 résultats seulement) |
| création site internet artisan | Bing | munus.fr, nva-digital.com, lewebartisan.fr, bockweb.fr |
| prix site internet artisan | Bing | artisanplus.fr, lafabriquedunet.fr, rj-design.fr, nexseo.fr, kacz-web.fr, sitigo.fr, devdream.fr, pleinchantier.fr, simplisite.fr |
| création site internet artisan metz | Bing | axtracom.com, digitacom.fr |
| creation site internet luxembourg | Bing | editus-business.lu, neweb-creations.com, onlycom.lu |
| comment demander un avis google a un client | Bing | localranker.fr, avison.fr, support.google.com, geolid.com, guest-suite.com, rankzilla.net, tapwin.fr, heypongo.com |
| répondeur ia artisan | Bing | artisanline.purpleweb.fr, alloreceptionniste.fr, trustlead.co, rappelpro.com, decroche.ai, callsens.fr, eliocall.com, tariacall.com |
| logiciel devis plombier | Bing | independant.io, tool-advisor.fr |
| neobatys | Bing | Aucun résultat lié à NEOBATYS |

Ce qui en ressort :

- **Agents IA** : pas d'éditeur installé, des agences et des blogs. Un site jeune peut y entrer s'il a une page claire et des exemples réels.
- **Relance des devis** : des outils de facturation généralistes (Sellsy, Koban, VosFactures) et des petits services de relance. Aucun acteur du bâtiment. C'est la meilleure ouverture.
- **Logiciel** : Costructor et Progbat partout, puis Sage, Batiprix, la CAPEB et la FFB. La CAPEB, la FFB et France Num sont des sites d'organismes : un lien ou une mention chez eux vaut plus qu'une page de plus chez nous.
- **Facture électronique** : l'État et les grands cabinets tiennent le haut. Le Luxembourg, lui, a très peu de résultats.
- **Sites internet** : des agences et des comparateurs. Les recherches locales (Metz, Luxembourg) sont tenues par des agences généralistes.

### 2.2 Audit technique du site en ligne

Parcours automatique des 47 adresses du plan du site le 21/11/2026, plus PageSpeed Insights (mobile, accueil).

| N° | Point | Constat | Suite |
|---|---|---|---|
| T1 | Plan du site, robots | `sitemap.xml` liste 47 pages, toutes en 200. `robots.txt` autorise tout sauf `/api/`. Les aperçus de maquettes sont en `noindex` | Rien à faire |
| T2 | Titres et descriptions | Uniques sur les 47 pages. Quatre titres dépassent un peu 60 caractères (trois pages par zone, Agents IA) : sans gravité | Rien à faire |
| T3 | Un seul titre principal par page | Oui, partout | Rien à faire |
| T4 | Adresse canonique | Présente partout, vers www.neobatys.com. `neobatys.com` redirige bien vers `www` | Rien à faire |
| T5 | **Copie du site sur neobatys.vercel.app** | L'adresse Vercel de production sert tout le site en 200, sans redirection. Le dépôt GitHub public y renvoie. La balise canonique limite les dégâts, mais deux adresses pour un même site diluent les signaux | **Premier lot** : redirection permanente vers www.neobatys.com |
| T6 | Fil d'Ariane de la page Agents IA | Affiche « Intelligence artificielle », alors que le menu et la décision 7 disent « Agents IA ». Le fil d'Ariane apparaît dans les résultats Google | **Premier lot** : « Agents IA » |
| T7 | Description de la page Agents IA | Ne contient pas « BTP », alors que « agent ia btp » est une recherche suggérée | **Premier lot** |
| T8 | Description de la page Sites internet | Ne dit pas le prix, alors que « prix site internet artisan » est suggéré et que le prix est affiché sur la page | **Premier lot** : « à partir de 990 € HT », maintenance signalée |
| T9 | Données structurées | Entreprise (`ProfessionalService`), offres et prix, `SoftwareApplication`, `Service`, `Article`, fil d'Ariane, FAQ. Pas de note ni d'avis déclarés : voulu tant qu'il n'y a pas de vrais avis | Rien à faire. Les FAQ ne s'affichent plus en résultats enrichis chez Google pour ce type de site depuis 2023, mais elles restent utiles aux assistants IA |
| T10 | Maillage interne | Le menu et le pied de page relient les pages clés depuis les 46 autres pages. Chaque page métier du logiciel renvoie vers la page site du même métier, et inversement. Les guides se renvoient entre eux | Rien à faire maintenant. À revoir quand les pages par agent existeront (relier chaque guide à son agent) |
| T11 | Vitesse | PageSpeed mobile : 100 en performances, accessibilité, bonnes pratiques et SEO. LCP 1,1 s, CLS 0. Pas encore de données de vrais visiteurs (trop peu de trafic) | Rien à faire |
| T12 | `llms.txt` | En ligne, 89 lignes, toutes les pages principales | Rien à faire |
| T13 | Indexation réelle | Inconnue chez Google (Search Console absent, requête `site:` bloquée par Google). Nulle chez Bing | Section 1.6, priorité n° 1 |

### 2.3 Présence hors du site

| Endroit | État le 21/11/2026 |
|---|---|
| Fiche Google Business | Non vérifié (Google bloqué). Aucun lien vers une fiche depuis le site |
| Capterra, GetApp | Non vérifié (pages refusées en lecture automatique) |
| Appvizer, PagesJaunes | Aucune fiche NEOBATYS |
| Réseaux (LinkedIn, Facebook, Instagram) | Champs vides dans `content/data/site.json` : aucun lien sur le site |
| Sites qui citent neobatys.com | Aucun trouvé |
| **Dépôt GitHub `hoffertgabin-cmyk/neobatys`** | **Public.** Son lien « site web » pointe vers `neobatys.vercel.app`, pas vers neobatys.com. C'est lui que les moteurs associent à la marque, avec les PR et des tickets internes (répartition du travail, points d'étape) lisibles par tous |

## 3. À qui on vend et contre qui

### 3.1 Les cibles, dans l'ordre

| Cible | Ce qu'elle cherche (section 1) | Promesse à lui faire | Contre qui |
|---|---|---|---|
| 1. **Entreprise du bâtiment de 2 à 20 salariés, avec un bureau débordé** | « agent ia btp », « relance devis automatique », « logiciel gestion pme batiment », « logiciel btp suivi chantier » | Les devis relancés, les appels et les demandes traités, sans embaucher, avec un outil déjà installé et réglé par nous | Agences IA sur devis (Tensoria, petites agences), standards téléphoniques IA (On Répond, Voice Pilot), Progbat, Graneet, Extrabat |
| 2. **Artisan seul ou avec 1 à 2 compagnons** | « relancer un devis », « logiciel devis facture … sans abonnement / gratuit », « prix site internet artisan », « comment demander un avis google » | Être trouvé, répondre vite, être payé, sans y passer ses soirées | Obat, Tolteck, Costructor, Abby (prix bas, essai seul), agences de sites à petit prix, Obat Studio |
| 3. **Entreprise plus grosse ou groupe** | « erp btp », « logiciel btp complet », « logiciel planning chantier » | À définir (questions 3.3) | Éditeurs d'ERP du bâtiment (Sage, Orisha, Graneet) |

Pourquoi cet ordre : la cible 1 est celle pour qui la promesse « on installe tout » vaut le plus, et dont les recherches (« agent ia btp », « logiciel gestion pme ») ont une première page sans géant. La cible 2 cherche surtout le gratuit et le moins cher : on la gagne par les guides gratuits, pas par la page de prix. La cible 3 est ouverte par la décision du 20/11/2026 (aucune limite de taille), mais rien n'indique encore que l'outil couvre ses besoins.

### 3.2 La différence face aux concurrents

Ce qui ressort des avis et des comparatifs, sans chiffre inventé :

1. **On fait le travail, on ne vend pas un outil à apprendre.** Les avis reprochent aux logiciels la prise en main, les bugs sur les devis longs et le support. NEOBATYS installe, règle et suit.
2. **Les relances et les réponses.** Aucun comparatif ne juge la relance des devis ni la réponse aux demandes. C'est notre terrain, et c'est ce que les artisans décrivent (« ils ne répondent plus »).
3. **Un seul interlocuteur pour le site, le logiciel et les agents.** Les autres vendent l'un des trois (Obat vend le logiciel, le devis vocal en option à 29 € HT par mois et un site à 599 € HT par an, en trois produits).
4. **France et Luxembourg.** Personne ne traite la facture électronique des deux pays.

### 3.3 Là où l'offre reste floue pour vendre : questions pour Ilann

Aucune réponse n'est supposée. Les questions déjà posées dans `docs/ORGANISATION-SITE.md` (section 4.4) ne sont pas répétées, sauf celles qui bloquent le référencement.

1. **Prix d'entrée d'un agent IA.** Google affiche la question « Quel est le prix d'un agent IA ? ». Aujourd'hui, les agents ne s'achètent que dans le Pack IA (5 990 € HT, ou 990 € HT par mois). Vend-on un agent seul, par exemple la relance des devis ou la réponse aux demandes, et à quel prix ? (question 6 de la section 4.4, toujours ouverte)
2. **Essai gratuit du logiciel.** La moitié des recherches « logiciel » contiennent « gratuit » ou « sans abonnement ». Peut-on essayer seul, combien de temps, sans carte ?
3. **Ce que fait chaque agent, concrètement.** Pour les trois premiers agents à mettre en avant (proposition : relance des devis, réponse aux demandes et appels, avis Google) : que reçoit le client, qui relit avant l'envoi, en combien de temps c'est installé, un exemple réel.
4. **Grandes entreprises.** Que propose-t-on à une entreprise de 50 salariés ou à un groupe : plusieurs sociétés, planning d'équipes, droits par utilisateur ? Sans réponse, on ne vise pas « erp btp ».
5. **Pays des premiers clients.** France (Moselle d'abord) ou Luxembourg ? Cela décide si la page facture électronique Luxembourg passe avant les pages par agent.
6. **Annuaires.** Le 12/11/2026, Ilann a écarté PagesJaunes et Editus. Les comparateurs de logiciels (Appvizer, G2, Capterra) sont-ils aussi écartés, ou acceptés ?

## 4. Plan des pages

Une page par intention, pas de doublon. « Existe » : la page est en ligne ; « à créer » : elle n'existe pas.

| Recherches visées | Page | État | Titre (sans « · NEOBATYS ») | Description |
|---|---|---|---|---|
| agent ia artisan, agent ia btp, agent ia batiment | `/intelligence-artificielle` | Existe | Agents IA pour artisans et entreprises du bâtiment | 12 agents IA pour artisans et entreprises du BTP : devis dictés, relances de devis et d'impayés, appels manqués, rendez-vous, avis Google, aides, documents. (premier lot) |
| relancer un devis, comment relancer un devis client, mail pour relancer un devis, relance devis automatique | `/logiciel/relancer-un-devis` | À créer (guide) | Relancer un devis : quand, comment, modèles | Quand relancer un devis de travaux, trois modèles de relance (mail, SMS, téléphone), et comment l'automatiser sans perdre le ton de l'artisan. |
| agent de relance (devis non signés) | `/intelligence-artificielle/relance-devis` | À créer après la question 3.3-3 | Agent IA de relance des devis pour le bâtiment | À écrire avec un exemple réel |
| répondeur ia, standard téléphonique ia (artisan) | `/intelligence-artificielle/reponse-appels` | À créer après la question 3.3-3 | Agent IA qui répond aux appels et aux demandes | À écrire avec un exemple réel |
| ia devis batiment, devis vocal ia, faire un devis avec chatgpt | `/intelligence-artificielle/devis-a-la-voix` | À créer après la question 3.3-3 | Devis à la voix avec un agent IA | À écrire avec un exemple réel |
| comment demander un avis google, mail demande avis google client | `/logiciel/demander-un-avis-google` | À créer (guide) | Demander un avis Google à un client : modèles | Quand et comment demander un avis Google après un chantier, modèles de message, ce qui est interdit (avis achetés, récompenses). |
| logiciel devis facture batiment, logiciel devis artisan, meilleur logiciel devis | `/logiciel` | Existe | Logiciel de gestion bâtiment : devis et factures | Inchangée |
| logiciel gestion pme batiment, logiciel gestion entreprise btp, logiciel btp suivi chantier | `/logiciel-gestion-entreprise-batiment` | À créer (déjà prévue, `docs/ORGANISATION-SITE.md` 5.3) | Logiciel de gestion d'entreprise du bâtiment | Pour le dirigeant : devis, factures, chantiers, relances par des agents IA, tableau de bord. |
| logiciel devis + métier (plombier, électricien, maçon…) | `/logiciel/[métier]` (8 pages) | Existe | Inchangés | Inchangées |
| facturation électronique artisan, 2027 pour qui, plateforme agréée | `/logiciel/facturation-electronique` | Existe | Inchangé | Inchangée |
| facturation électronique luxembourg (b2b, peppol, 2026) | `/logiciel/facturation-electronique-luxembourg` | À créer si la question 3.3-5 répond Luxembourg, ou dès que Search Console montre des affichages | Facture électronique au Luxembourg : B2B et Peppol | Ce qui est obligatoire au Luxembourg, depuis quand, Peppol, et le cas des entreprises qui facturent des deux côtés de la frontière. |
| modèle devis bâtiment, devis excel ou logiciel, calcul tva travaux, facture acompte, retenue de garantie, facture impayée | guides `/logiciel/...` | Existent | Inchangés | Inchangées |
| création site internet artisan, site internet + métier | `/sites-internet` et `/sites-internet/[métier]` (18 pages) | Existent | Inchangés | `/sites-internet` : Site internet pour artisans du bâtiment, à partir de 990 € HT : référencement local, galerie de chantiers, demande de devis. Prix et maintenance affichés. (premier lot) |
| prix site internet artisan, logiciel devis prix | `/tarifs` | Existe | Inchangé | Inchangée |
| creation site internet luxembourg, moselle | `/artisans/luxembourg`, `/artisans/moselle` | Existent | Inchangés | Ces pages visent « artisans + zone », pas « création site internet + zone », que tiennent des agences généralistes. Ne pas les réorienter avant de lire Search Console |
| comment trouver des clients artisan | `/digitaliser-son-entreprise` | Existe | Inchangé | À enrichir d'une partie « trouver des clients » quand le contenu sera écrit |

Pas de page « appels manqués artisan », « standard téléphonique artisan » ni « logiciel devis luxembourg » : aucune suggestion de Google ne montre cette demande.

## 5. Contenus à écrire

Par ordre d'utilité. Chaque guide suit le gabarit des guides existants (`content/data/software-guides.json` : sources officielles, FAQ, date, liens).

| Ordre | Contenu | Pourquoi d'abord | Dépend de |
|---|---|---|---|
| 1 | Guide « Relancer un devis » (modèles de mail, SMS, téléphone, délais) | Recherche la plus fournie, aucun acteur du bâtiment en tête, mène droit à l'agent de relance | Rien |
| 2 | Page agent « Relance des devis » | Achat ; complète le guide 1 | Question 3.3-1 et 3.3-3 (exemple réel) |
| 3 | Guide « Demander un avis Google » | Recherche fournie, mène à l'agent avis et à la fiche Google | Rien |
| 4 | Page agent « Réponse aux appels et aux demandes » | Concurrence chiffrée (49 € HT par mois) : il faut un prix | Questions 3.3-1 et 3.3-3 |
| 5 | Page « Logiciel de gestion d'entreprise du bâtiment » | Cible 1, première page sans géant hors Progbat | Question 3.3-4 pour la partie grandes entreprises |
| 6 | Guide « Devis non signé : travaux faits, acompte versé » | 9 variantes de litige ; sujet juridique, sources officielles obligatoires | Relecture juridique |
| 7 | Page « Devis à la voix » | Obat le vend en option, Google le suggère | Question 3.3-3 |
| 8 | Comparatif honnête « Logiciel de devis : Excel, logiciel ou agent IA » | Existe déjà en partie (`/logiciel/devis-excel-ou-logiciel`) : l'étendre plutôt qu'en créer un autre | Rien |
| 9 | Facture électronique au Luxembourg | Peu de résultats, nous seuls traitons les deux pays | Question 3.3-5 |

**Rythme réaliste : 2 contenus par mois.** Un guide demande une demi-journée de recherche de sources et d'écriture, puis une relecture. Plus vite, la relecture saute et les erreurs passent.

| Mois | Contenus | Écrit par | Relu par |
|---|---|---|---|
| Décembre 2026 | 1 (relancer un devis), 3 (avis Google) | Une session Claude, à partir des sources officielles | Ilann (le ton, l'exactitude métier), Gabin (mise en ligne) |
| Janvier 2027 | 2 (agent relance), 4 (agent appels) | Une session Claude, avec l'exemple réel fourni par Ilann | Ilann |
| Février 2027 | 5 (gestion d'entreprise), 6 (devis non signé) | Une session Claude | Ilann ; le 6 par un juriste si possible |

Ensuite, choisir les suivants d'après Search Console (les recherches qui affichent déjà le site sans clic).

## 6. Hors du site

| Action | Pourquoi | Qui | Effort |
|---|---|---|---|
| Google Search Console et Bing Webmaster Tools | Section 1.6 | Ilann ou Gabin | 30 min |
| **Décider du dépôt GitHub public** : le passer en privé, ou au moins changer son lien « site web » vers https://www.neobatys.com et fermer la lecture des tickets internes | Les moteurs associent la marque au dépôt, et les notes internes sont lisibles par tous | Gabin (propriétaire du dépôt), sur décision d'Ilann | 5 min |
| Fiche Google Business Profile | Indispensable pour « près de chez moi » et pour la confiance. Tout est prêt dans `docs/fiche-google-et-reseaux.md` | Ilann | 1 h, puis validation par Google |
| Pages LinkedIn et Facebook, puis renseigner leurs liens dans Pages CMS (`site.json`, `socials`) | Le site n'a aujourd'hui aucun lien sortant vers la marque ; les moteurs et les assistants IA s'en servent pour reconnaître l'entreprise (`sameAs` dans les données structurées, déjà prévu dans le code) | Ilann | 1 h |
| Comparateurs de logiciels : [Appvizer](https://www.appvizer.fr/partenaires/inscription) (gratuit, vérifié), [G2](https://sell.g2.com/create-free-profile) (gratuit, vérifié), Capterra (gratuité non vérifiée) | Les comparatifs qui sortent en tête renvoient vers ces fiches ; les avis y comptent | Ilann, sur décision 3.3-6 | 1 h chacun |
| Avis clients réels | Sans avis, pas d'étoiles ni de bloc d'avis sur le site. Jamais d'avis inventé ou acheté | Ilann, après chaque mise en place | Continu |
| Liens d'organismes : CAPEB Moselle, FFB, CMA, France Num, Chambre des Métiers du Luxembourg | La CAPEB, la FFB et France Num sortent en première page sur « logiciel gestion entreprise batiment ». Un atelier « facture électronique 2027 » ou une fiche d'activateur France Num vaut plus qu'une page de plus. Liste dans `docs/seo-logiciel.md` section 6 | Ilann et Gabin | Une prise de contact par mois |
| Lien « site réalisé par NEOBATYS » sur les sites des clients, avec leur accord | Liens réels, dans notre métier | Gabin | 5 min par site |
| Assistants IA (ChatGPT, Perplexity, Google AI) | Ils citent les pages indexées par Bing et Google, et les fiches de comparateurs. Rien à faire de plus tant que Bing ne connaît pas le site : d'abord la section 1.6 | | |

## 7. Mesure

| Chaque mois | Outil | À noter |
|---|---|---|
| Pages indexées sur 47 | Search Console, rapport « Pages » | Les pages refusées et la raison |
| Affichages et clics, par page et par recherche | Search Console, rapport « Performances » | Les 10 recherches qui affichent le site ; celles qui ont des affichages sans clic (titre à revoir) |
| Pages indexées et recherches chez Bing | Bing Webmaster Tools | Idem |
| Vues par page | Compteur de l'admin | Les pages qui montent |
| Demandes de démonstration et de devis, par page d'origine | Admin (formulaire de contact) | Combien viennent des guides et des pages agents |
| Position sur les 10 recherches de la section 8 | Search Console (position moyenne), pas de relevé à la main | Tendance sur 3 mois |
| Fiches et avis | Google Business Profile, comparateurs | Nombre d'avis réels |

Point de départ, le 21/11/2026 : aucune des 22 recherches testées n'affiche NEOBATYS dans les 10 premiers résultats.

## 8. Priorités sur 90 jours

| N° | Action | Effort | Effet attendu |
|---|---|---|---|
| 1 | Ouvrir Search Console et Bing Webmaster Tools, envoyer le plan du site (section 1.6) | 30 min | On sait enfin ce qui est indexé et ce que les gens tapent. Bing, et donc ChatGPT, peut commencer à citer le site |
| 2 | Décider du dépôt GitHub public (section 6) | 5 min | La marque renvoie vers neobatys.com, plus vers des notes internes |
| 3 | Premier lot sur le site (PR à part) : copie Vercel redirigée, fil d'Ariane « Agents IA », descriptions avec « BTP » et le prix | Fait, à fusionner | Un seul domaine indexé, des descriptions qui reprennent les mots cherchés |
| 4 | Fiche Google Business, pages LinkedIn et Facebook, liens dans Pages CMS | 2 h | La marque devient une entreprise reconnue par Google ; panneau à droite sur la recherche « neobatys » |
| 5 | Guide « Relancer un devis » | 1 jour avec relecture | Première page qui vise une recherche fournie sans acteur du bâtiment en tête |
| 6 | Réponses aux questions 3.3-1 et 3.3-3 (prix d'un agent seul, trois agents détaillés avec exemple) | Décision d'Ilann | Débloque les pages par agent, celles qui vendent |
| 7 | Guide « Demander un avis Google » | 1 jour | Deuxième page d'entrée ; mène à l'agent avis |
| 8 | Pages agents « Relance des devis » et « Réponse aux appels » | 2 jours | Pages d'achat sur le terrain le moins disputé |
| 9 | Fiches Appvizer et G2 (si 3.3-6 est oui), premiers avis réels | 2 h, puis continu | Présence dans les comparatifs que lisent les artisans |
| 10 | Bilan Search Console à 60 jours : réécrire les titres des pages qui ont des affichages sans clic, choisir les 3 contenus suivants | 2 h | La suite se décide sur des chiffres, plus sur des signaux |

## 9. Les 10 recherches les plus prometteuses

Classées par chance de sortir dans les 3 mois et par valeur commerciale. Volume non vérifié pour toutes.

| N° | Recherche | Page | Pourquoi |
|---|---|---|---|
| 1 | relancer un devis (et variantes : comment relancer un devis client, mail pour relancer un devis) | `/logiciel/relancer-un-devis`, à créer | Recherche la plus fournie, aucun acteur du bâtiment en tête |
| 2 | agent ia btp | `/intelligence-artificielle` | Première page faite d'agences et de blogs |
| 3 | agent ia artisan | `/intelligence-artificielle` | Idem ; c'est notre offre n° 1 |
| 4 | relance devis automatique | `/intelligence-artificielle/relance-devis`, à créer | Intention d'achat, concurrence généraliste |
| 5 | ia devis batiment / devis vocal ia | `/intelligence-artificielle/devis-a-la-voix`, à créer | Demande visible, Obat le vend en option |
| 6 | comment demander un avis google a un client | `/logiciel/demander-un-avis-google`, à créer | Demande fournie, mène à l'agent avis |
| 7 | logiciel gestion pme batiment | `/logiciel-gestion-entreprise-batiment`, à créer | Cible 1, peu de pages qui la visent exactement |
| 8 | facturation électronique luxembourg b2b | `/logiciel/facturation-electronique-luxembourg`, à créer | Très peu de résultats, nous seuls traitons les deux pays |
| 9 | logiciel devis + métier (plombier, maçon…) | `/logiciel/[métier]`, existent | Moins disputé que la recherche générique |
| 10 | création site internet + métier (plombier, couvreur…) | `/sites-internet/[métier]`, existent | Recherches suggérées, pages déjà prêtes |

## Sources

Suggestions et résultats : Google (google.fr, suggestqueries.google.com) et Bing (bing.com), relevés le 21/11/2026. Avis : Capterra, Trustpilot, Appvizer, App Store (liens en section 1.5). Concurrents : [Obat, devis vocal IA](https://www.obat.fr/devis-factures/devis-vocal-ia/), [Obat Studio](https://www.obat.fr/studio/), [On Répond](https://www.onrepond.fr), [Voice Pilot](https://voice-pilot.ai), [Simplébo, tarifs](https://www.simplebo.fr/tarifs), [Kacz Web](https://kacz-web.fr/article/cout-creation-site-web-artisan-2026), [Tensoria](https://tensoria.fr/ia-btp). Vitesse : [PageSpeed Insights](https://pagespeed.web.dev/), 21/11/2026. Domaine : WHOIS de neobatys.com (créé le 21/10/2026, OVH).
