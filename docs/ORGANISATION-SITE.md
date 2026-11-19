# Organisation du site : menu, pages, cible et accroche

Étude du 19 novembre 2026, demandée par Ilann. Rien n'est modifié sur le site : ce document sert à décider. Les décisions prises et celles qui restent ouvertes sont listées juste en dessous.

Relevés faits sur `origin/main` (commit `475120e`) et sur www.neobatys.com le 19/11/2026. Quand une donnée n'a pas pu être vérifiée, c'est écrit « non vérifié ».

## Décisions prises

Par Ilann, le 19 novembre 2026. Les numéros sont ceux de la liste d'origine et ne changent pas.

| N° | Sujet | Décision |
|---|---|---|
| 1 | Organisation | « Menu = pages ». Le menu du haut et le pied de page n'ouvrent que des pages. Le défilement reste à l'intérieur d'une page |
| 2 | Offre mise en avant | Les agents IA en premier, le logiciel en deuxième, les sites internet en troisième |
| 3 | Cible écrite sur le site | « Artisans et entreprises du bâtiment » |
| 4 | Premier lot de la refonte | Nouveau menu et pied de page, avec deux pages créées : `/tarifs` et `/guides`. Réponse donnée dans la session d'étude |
| 5 | Adresse de la page IA | Elle garde `/intelligence-artificielle`, sans redirection |
| 6 | Bouton du menu | « Demander une démo ». Ce que cela demande de créer est en section 3.6 |
| 7 | Vocabulaire | « Agents IA » partout. Le mot « assistants » disparaît |
| 8 | Accueil | Raccourcie en résumé, avec des liens vers les pages |

## Décisions encore ouvertes

- **Les 12 questions de la section 4.4** sur la cible et l'offre. Pour la phrase à retenir et la taille d'entreprise visée, une proposition sera appliquée à titre provisoire dans le lot 3.
- **Les 3 réponses proposées en section 3.6** sur ce qu'est une démonstration chez NEOBATYS : appliquées sur le site, à valider par Ilann.

## Avancement

| Lot | Contenu | État |
|---|---|---|
| 1 | Menu et pied de page en pages seulement, pages `/tarifs` et `/guides`, bouton « Demander une démo », grille des prix à un seul endroit | Fait (PR #82) |
| 2 | Parcours de démonstration (section 3.6) | Fait dans la PR du lot 2 : points 1 à 3 de la section 3.6. Les points 4 et 5 restent à faire |
| 3 | Accueil raccourcie, titres, vocabulaire « agents IA », cible | À faire |

## En bref

- Le menu du haut a 6 entrées : 1 ouvre une page, 5 font défiler la page d'accueil. C'est la cause du problème signalé.
- Le site a 42 pages en ligne, mais le menu n'en montre qu'une. Les pages Sites internet et Logiciel existent et ne sont pas dans le menu.
- Les pages sont gardées (elles servent au référencement) et le menu n'ouvre plus que des pages.
- Le site parle aujourd'hui d'abord de sites internet à 990 €. Les agents IA passent en premier : cela change le menu, l'accueil et les titres.
- Le bouton « Demander une démo » mène à la page Contact dans sa version « démonstration » (section 3.6).

## 1. Ce qui existe aujourd'hui

### 1.1 Menu du haut

Source : `content/data/navigation.json` (`mainNav`), affiché par `components/layout/Navbar.tsx` et `MobileMenu.tsx`.

| Ordre | Libellé | Destination | Type | Remarque |
|---|---|---|---|---|
| Logo | NEOBATYS | `/` | Page | |
| 1 | Services | `/#services` | Défilement | Arrive sur le bloc « Offre 1 · Sites internet » seulement, pas sur l'ensemble des services |
| 2 | IA | `/intelligence-artificielle` | Page | Seule entrée qui ouvre une page. L'accueil a pourtant aussi un bloc IA (`#ia`) |
| 3 | Logiciel | `/#logiciel` | Défilement | La page `/logiciel` existe et n'est pas utilisée ici |
| 4 | Exemples de sites | `/#realisations` | Défilement | Le même bloc existe sur `/sites-internet#realisations` |
| 5 | Tarifs | `/#tarifs` | Défilement | Pas de page Tarifs. La grille est affichée sur 3 pages |
| 6 | FAQ | `/#faq` | Défilement | Chaque page a sa propre FAQ, le menu ne mène qu'à celle de l'accueil |
| Bouton | Demander un devis | `/contact` | Page | |

### 1.2 Pied de page

Source : `content/data/navigation.json` (`footerNav`).

| Colonne | Libellé | Destination | Type |
|---|---|---|---|
| Nos offres | Sites internet | `/sites-internet` | Page |
| Nos offres | Logiciel de gestion | `/logiciel` | Page |
| Nos offres | Facturation électronique | `/logiciel/facturation-electronique` | Page |
| Nos offres | Modèle de devis gratuit | `/logiciel/modele-devis` | Page |
| Nos offres | Calculateur de TVA | `/logiciel/calculateur-tva` | Page |
| Nos offres | Intelligence artificielle | `/intelligence-artificielle` | Page |
| Nos offres | Pack Gestion | `/#pack` | Défilement |
| Nos offres | Tarifs | `/#tarifs` | Défilement |
| NEOBATYS | Résultats | `/#resultats` | Défilement |
| NEOBATYS | Comment ça marche | `/#processus` | Défilement |
| NEOBATYS | Digitaliser son entreprise | `/digitaliser-son-entreprise` | Page |
| NEOBATYS | Exemples de sites | `/#realisations` | Défilement |
| NEOBATYS | FAQ | `/#faq` | Défilement |
| NEOBATYS | Contact | `/contact` | Page |
| Bas de page | Mentions légales, Politique de confidentialité, Conditions générales de vente | 3 pages | Page |

### 1.3 Pages en ligne

42 adresses dans le plan du site (`app/sitemap.ts`), toutes répondent correctement.

| Famille | Adresse | Nombre | Dans le menu du haut |
|---|---|---|---|
| Accueil | `/` | 1 | Logo |
| Sites internet | `/sites-internet` | 1 | Non |
| Sites par métier | `/sites-internet/<métier>` (plombier, électricien, maçon...) | 18 | Non |
| Logiciel | `/logiciel` | 1 | Non (le menu défile sur l'accueil) |
| Logiciel par métier | `/logiciel/<métier>` | 8 | Non |
| Guides | `/logiciel/<guide>` (facturation électronique, mentions du devis, modèle de devis, calculateur de TVA, acompte, retenue de garantie, impayés, Excel ou logiciel) | 8 | Non |
| Agents IA | `/intelligence-artificielle` | 1 | Oui |
| Aides | `/digitaliser-son-entreprise` | 1 | Non |
| Contact | `/contact` | 1 | Bouton |
| Pages légales | mentions, confidentialité, conditions de vente | 3 | Non |

Hors plan du site : `/apercu-maquette/<maquette>` (aperçu technique des maquettes, volontairement caché de Google) et trois adresses de service (`/api/...`).

### 1.4 Incohérences relevées

1. **Le menu mélange deux comportements.** 1 page et 5 défilements sur la même ligne. Depuis une page intérieure, un clic sur « Logiciel » ou « Tarifs » ramène à l'accueil puis fait défiler : le visiteur change de page sans l'avoir demandé.
2. **Le même mot mène à deux endroits.** « Logiciel » en haut défile sur l'accueil ; « Logiciel de gestion » en bas ouvre la page. Pareil pour « Exemples de sites ».
3. **« Services » ne tient pas sa promesse.** Le lien arrive sur le bloc des sites internet. Le logiciel, le pack et l'IA sont plus bas.
4. **Les deux pages les plus travaillées sont absentes du menu.** `/sites-internet` et `/logiciel` ne sont accessibles que par des boutons dans la page ou par le pied de page.
5. **Le bloc IA de l'accueil ne mène pas à la page IA.** Relevé des liens du contenu (hors menu et pied de page) : la page `/intelligence-artificielle` ne reçoit qu'un seul lien, depuis `/digitaliser-son-entreprise`. L'accueil n'y renvoie pas.
6. **Une page presque orpheline.** `/digitaliser-son-entreprise` ne reçoit aucun lien depuis le contenu des autres pages. Elle n'existe que dans le pied de page.
7. **La grille de tarifs est affichée trois fois** (accueil, `/logiciel`, `/intelligence-artificielle`) et n'a pas d'adresse à elle. On ne peut pas envoyer « la page des tarifs » à un prospect, et Google n'a pas de page à montrer à quelqu'un qui cherche un prix.
8. **Blocs en double.** « Réalisations » et « Comment ça marche » existent sur l'accueil et sur `/sites-internet`, avec le même nom d'ancre.
9. **Deux mots pour la même chose.** L'accueil et la FAQ disent « assistants IA », la page IA dit « agents IA ». Les formules disent « agents ».
10. **Un seul bouton pour tout.** « Demander un devis » partout, alors que le logiciel se vend par une démo et l'IA par un échange. La description de la page Contact ne cite que le site et le logiciel, pas l'IA.
11. **L'accueil est très longue** : 15 blocs à la suite. Elle fait le travail de quatre pages qui existent déjà.
12. **Pas de téléphone affiché** : le numéro est encore à renseigner (`content/data/site.json`), les boutons « Appeler » renvoient donc vers le formulaire.

Points liés, à ne pas oublier pendant la refonte :

- La PR #75, ouverte, ajoute des pages par zone (`/artisans/<zone>`) et modifie la page IA et le plan du site. La refonte du menu doit partir de `main` après sa fusion, ou être coordonnée avec elle.
- `docs/acquisition-canaux.md` parle de 9 pages par métier ; il y en a 18 en ligne. À corriger dans le chantier de refonte.

## 2. Comment font les autres

Relevé du 19/11/2026 sur la page d'accueil de 9 éditeurs : 4 logiciels français pour le bâtiment ou les PME, 3 logiciels américains pour artisans, 2 éditeurs d'agents IA. Seul le code de la page d'accueil a été lu : un menu construit après chargement ou un menu propre au téléphone a pu échapper au relevé, et les pages intérieures n'ont pas été ouvertes.

### 2.1 Relevé par site

| Site | Menu du haut | Pages ou défilement | Bouton principal | Place de l'IA |
|---|---|---|---|---|
| [Obat](https://www.obat.fr/) (France, bâtiment) | E-facturation, Produits, Tarifs, Ressources, tous en menus déroulants (ordre à l'écran non vérifié) | Pages seulement. 10 pages par métier, 3 pages par taille d'entreprise (micro-entreprise, artisan seul, TPE et PME), page Tarifs, blog | « Démarrer mon essai gratuit », avec « Se connecter » à côté | Une ligne sous Produits : « Devis vocaux par IA » |
| [Tolteck](https://www.tolteck.com/) (France, bâtiment) | Fonctionnalités, Tarifs, Témoignages, Facturation électronique, Aide : 5 liens directs | Pages seulement, aucun défilement | « M'inscrire », avec « Connexion » | Aucune mention dans le menu |
| [Batappli](https://www.batappli.fr/) (France, bâtiment) | Fonctionnalités, Tarifs, Blog, Découvrir (déroulant), Facture électronique, téléphone | Pages seulement dans le menu. Des liens de défilement existent plus bas dans la page | « Connexion » et le téléphone dans le menu. « Essayer gratuitement » et « Démo gratuite » dans la page (présence dans l'en-tête non vérifiée) | Première ligne du déroulant Découvrir (« Faire un devis avec l'IA ») et un bandeau au-dessus du menu |
| [Axonaut](https://axonaut.com/) (France, PME) | Pour qui ?, Fonctionnalités, Tarifs, Avis clients, Ressources, Plus | Pages seulement. Une page par cible (dont Artisan), une page par fonction (une vingtaine), page Tarifs, blog | « Essai gratuit », avec « Connexion » | Aucune entrée IA |
| [Jobber](https://www.getjobber.com/) (États-Unis, artisans) | Non récupéré (le site bloque la lecture automatique) | Une page Tarifs séparée existe (lien relevé dans la page) | « Start Free Trial » et « Find Your Plan » dans le haut de page | Non vérifié |
| [Housecall Pro](https://www.housecallpro.com/) (États-Unis, artisans) | Solutions, Industries, Pricing, Resources | Pages seulement. 16 pages par métier, pages par fonction rangées par objectif (gagner des clients, gérer les chantiers, être payé, piloter), page Tarifs | « Start free trial », avec « Login » et un téléphone | Sous Solutions : « AI Team », « Customer Service Rep AI », « Call Answering » |
| [ServiceTitan](https://www.servicetitan.com/) (États-Unis, artisans) | Commercial, Residential, Max, Products, Resources | Pages seulement. Entrée par type de client d'abord, puis métiers et fonctions. Tarifs en bas de page seulement | « Get Demo », avec « Sign In » et un téléphone | Pas d'entrée de premier niveau, mais le mot IA est dans le titre de la page d'accueil (« AI software for commercial and residential trades ») |
| [Avoca](https://www.avoca.ai/) (États-Unis, agents IA pour artisans) | Products, Industries, Customers, Resources | Pages seulement. Une page par agent, 12 pages par métier. Pas de Tarifs dans le menu | « Book a Demo », avec « Login » | Tout le menu Products est fait d'agents nommés par leur tâche (accueil téléphonique, relance rapide des demandes, campagnes d'appels) |
| [Lindy](https://www.lindy.ai/) (États-Unis, agents IA) | « Hire Lindy for », Integrations, Pricing, Security, Enterprise, Resources | Pages seulement. Une page par rôle (18), page Tarifs, blog | « Try for free », avec « Log in » | Première entrée du menu : les agents sont présentés comme des postes à pourvoir (comptabilité, accueil téléphonique, support client) |

### 2.2 Ce qui revient partout

1. **Aucun des 8 menus lus ne mélange pages et défilement.** Tous sont des sites en pages séparées. Le défaut signalé par Ilann ne se retrouve chez personne.
2. **La même ossature** : Produit ou Fonctionnalités, Métiers ou Cibles, Tarifs, Ressources. Tolteck et Batappli en ont une version courte, en liens directs, proche de ce que NEOBATYS peut tenir aujourd'hui.
3. **Une page Tarifs dans le menu** chez Obat, Tolteck, Batappli, Axonaut, Housecall Pro et Lindy. Avoca et ServiceTitan, qui vendent par démonstration, ne l'y mettent pas.
4. **Un seul bouton d'action**, toujours le même : essai gratuit ou inscription pour ceux qu'on peut essayer seul, démonstration pour ceux qui installent (ServiceTitan, Avoca). Personne n'écrit « Demander un devis ».
5. **L'IA en première ligne seulement chez ceux dont c'est le métier** (Avoca, Lindy). Chez les logiciels de gestion, c'est une ligne sous Produits. Mettre « Agents IA » en tête du menu place donc NEOBATYS dans la famille des éditeurs d'agents : c'est le positionnement retenu (décision 2).

### 2.3 Trois pistes à reprendre

Cette partie tient lieu de veille pour ce sujet (règle de `AGENTS.md`), pour garder un seul document.

1. **Une page par agent, nommée par sa tâche** (Avoca, Lindy). Apport : une page par recherche (« relance de devis », « appels manqués »), et un visiteur qui comprend tout de suite ce que fait l'agent. Effort : moyen, par lots de 3 pages. Reprise en section 5.3.
2. **Des pages par taille d'entreprise** (Obat : micro-entreprise, artisan seul, TPE et PME ; Axonaut : par cible). Apport : répond à la question « est-ce fait pour moi ? », aujourd'hui sans réponse sur le site. Effort : moyen, et seulement après les réponses de la section 4.4.
3. **Un bouton d'action unique qui dit ce qui se passe ensuite** (« Book a Demo », « Essai gratuit »). Apport : un engagement plus léger que « Demander un devis » pour un logiciel et des agents. Effort : petit. Reprise en décision 6.

### 2.4 Pages Tarifs et pages de ressources chez les autres

Relevé du 19/11/2026, fait avant de créer `/tarifs` et `/guides`. Seuls les titres des pages ont été lus.

| Page | Ce qu'on y trouve |
|---|---|
| [Obat, tarifs](https://www.obat.fr/tarifs/) | Titre « Des prix adaptés pour tous », grille, comparaison des offres, « Questions fréquentes sur les prix » |
| [Tolteck, tarifs](https://www.tolteck.com/fr-fr/tarifs/) | Titre « Toutes les fonctionnalités. Une seule offre. », ce qui est inclus |
| [Batappli, tarifs](https://www.batappli.fr/tarifs) | Une formule par bloc, « Comparez les versions », questions fréquentes sur les tarifs |
| [Axonaut, prix](https://axonaut.com/content/prix) | Titre « Nos tarifs, tout compris, et sans engagement », liste des fonctions |
| [Housecall Pro, pricing](https://www.housecallpro.com/pricing) | Un questionnaire (métier, taille de l'équipe, objectifs) avant la grille, puis ce qui est compris dans toutes les formules |
| [Lindy, pricing](https://www.lindy.ai/pricing) | Grille, « ce qui est inclus », explication de l'unité de facturation, FAQ |
| [Obat, ressources](https://www.obat.fr/ressources/) | Rangement par besoin : outils de calcul, outils du quotidien, modèles de documents à télécharger |
| [Batappli, boîte à outils](https://www.batappli.fr/boite-a-outils) | Une page « boîte à outils des artisans » qui liste tous les outils |
| [Housecall Pro, resources](https://www.housecallpro.com/resources/) | Un blog rangé par métier |

Retenu pour NEOBATYS :

- **Tarifs** : une page avec un titre simple, la grille entière, puis trois questions sur les prix (engagement, maintenance, coûts d'IA), comme Obat, Batappli et Lindy. La grille n'est plus répétée ailleurs : l'accueil, la page Logiciel et la page Agents IA montrent les prix de départ et renvoient vers `/tarifs`. Écarté : le questionnaire de Housecall Pro (trop lourd pour 7 formules) et le tableau comparatif (à revoir quand les formules seront stables).
- **Guides** : un rangement par besoin, comme Obat : outils à utiliser tout de suite, guides sur les règles, guides par métier. Écarté : le blog daté de Housecall Pro, qui demande de publier souvent.

## 3. L'organisation retenue

### 3.1 La règle

**Le menu du haut et le pied de page n'ouvrent que des pages. Le défilement ne sert qu'à l'intérieur d'une page** (un bouton « Voir la démo » qui descend dans la page Logiciel, par exemple).

L'accueil reste une page qui résume tout, et chaque sujet garde sa page. Deux autres organisations ont été écartées : la page unique qui défile, qui aurait demandé de supprimer 41 pages déjà en ligne, et le site sans accueil qui résume.

### 3.2 Pourquoi

- **Référencement.** Google classe des pages, pas des blocs. Le site a déjà une page par sujet (logiciel, sites, IA, guides, métiers). La campagne décrite dans `docs/seo-logiciel.md` repose dessus.
- **Conversion.** Un artisan qui clique « Tarifs » veut voir des prix tout de suite, sur une page qu'il peut retrouver et transmettre à son associé ou à son comptable.
- **Confiance.** Un menu qui réagit toujours pareil donne une impression de sérieux. C'est le point soulevé par Ilann.
- **Usage.** Aucun des 8 menus lus chez les autres éditeurs ne mélange pages et défilement (section 2.2).
- **Effort faible.** Les pages existent. Il manque une page Tarifs et une page qui liste les guides. Le reste est un changement de liens.

### 3.3 Menu cible

Cinq entrées, toutes des pages, plus un bouton. L'ordre suit la priorité donnée aux agents IA (décision 2).

| Ordre | Libellé | Destination | État |
|---|---|---|---|
| 1 | Agents IA | `/intelligence-artificielle` | Existe |
| 2 | Logiciel | `/logiciel` | Existe |
| 3 | Sites internet | `/sites-internet` | Existe |
| 4 | Tarifs | `/tarifs` | À créer (la grille existe, il faut lui donner une page) |
| 5 | Guides | `/guides` | À créer (page qui liste les guides et outils gratuits déjà en ligne, sans changer leurs adresses) |
| Bouton | Demander une démo | `/contact?service=demo` | Fait |

« FAQ » et « Services » sortent du menu : chaque page garde sa FAQ en bas, et « Services » est remplacé par les trois entrées qui disent ce qu'on vend.

Pied de page cible, tout en pages :

- **Nos offres** : Agents IA, Logiciel de gestion, Sites internet, Tarifs.
- **Guides et outils** : Facturation électronique, Modèle de devis gratuit, Calculateur de TVA, Aides au numérique (`/digitaliser-son-entreprise`), Tous les guides.
- **Contact** : le bouton du menu repris en lien, l'adresse mail et le téléphone, puis les pages légales en bas.

Les liens « Résultats », « Comment ça marche », « Pack Gestion » et « FAQ » du pied de page disparaissent : ce sont des blocs, pas des pages.

### 3.4 Arborescence cible

```
/                                Accueil : résumé, chaque bloc finit par un lien vers sa page
/intelligence-artificielle       Agents IA (page principale)
    /<agent>                     Une page par agent, par étapes (section 5.3)
/logiciel                        Logiciel de gestion
    /<métier>                    8 pages, inchangées
    /<guide>                     8 guides, adresses inchangées
/sites-internet                  Sites internet
    /<métier>                    18 pages, inchangées
/tarifs                          Nouvelle page
/guides                          Nouvelle page : liste des guides et outils gratuits
/digitaliser-son-entreprise      Inchangée, reliée depuis l'accueil et la page Guides
/contact
/mentions-legales, /politique-de-confidentialite, /conditions-generales-de-vente
```

Aucune adresse existante ne change, donc aucune redirection à prévoir.

### 3.5 L'accueil

Elle reste une page qui défile, mais plus courte : une accroche, les trois offres en un bloc chacune avec un lien « En savoir plus » vers la page, un aperçu des prix avec un lien vers `/tarifs`, la preuve (exemples, avis quand il y en aura), le contact. Les blocs détaillés (tour du logiciel, grille complète, FAQ longue) vivent sur leur page.

### 3.6 Le bouton « Demander une démo » : ce qui existe et ce qu'il faut créer

Ce qui existait avant le lot 2, vérifié dans le code :

| Élément | État |
|---|---|
| Un aperçu du logiciel à parcourir seul | Existe : bloc « démo » de la page Logiciel (`/logiciel#demo`), ouvert par le bouton « Voir le logiciel en action » |
| Une promesse de démonstration | Existe, pour le logiciel seulement : « on vous montre le logiciel en 20 minutes, en visio ou sur place, avec vos propres exemples de devis » (FAQ de la page Logiciel) |
| Une page ou un formulaire pour demander une démonstration | N'existe pas. Le bouton mènerait à `/contact`, dont le titre est « Contact et demande de devis », l'accroche « Parlons de votre projet » et la réponse « On vous rappelle sous 24 h ouvrées » |
| Un choix « démonstration » dans le formulaire | N'existe pas. Les choix sont : site internet, logiciel, Pack Gestion, Pack IA ou Transformation complète, abonnement, « je ne sais pas encore » (`lib/schemas.ts`) |
| Une démonstration des agents IA | N'existe pas : ni aperçu, ni vidéo, ni promesse écrite. C'est pourtant l'offre qui passe en premier |
| Une prise de rendez-vous avec choix d'un créneau | N'existe pas. Le formulaire demande seulement une plage de rappel (matin, midi...) |

Sans changement, le visiteur qui clique « Demander une démo » arrivait sur une page qui lui parlait de devis et de rappel. Ce qu'il fallait créer, dans l'ordre (les points 1 à 3 sont faits, voir plus bas) :

1. **Un choix « Démonstration » dans le formulaire de contact**, sélectionné d'avance quand on arrive par le bouton (`/contact?service=demo`, sur le modèle des liens `?service=logiciel` qui existent). Effort : petit. À vérifier avec Gabin : que l'admin accepte cette nouvelle valeur à l'arrivée de la demande (non vérifié, l'admin est dans un autre dépôt).
2. **Des textes de la page Contact qui changent quand on vient pour une démonstration** : titre, accroche, message de confirmation et accusé de réception envoyé par mail (`content/contact-ack.ts`) disent ce qui va se passer (qui rappelle, sous quel délai, durée de la démonstration). Effort : petit.
3. **Le titre et la description de la page Contact** réécrits (section 5.2). Effort : petit.
4. **Quelque chose à montrer pour les agents IA** : au minimum, sur la page Agents IA, un exemple réel par agent (ce que l'agent a préparé, ce que le client valide), sur le modèle de l'aperçu du logiciel. Effort : moyen. Sans cela, la démonstration des agents n'existe qu'en rendez-vous.
5. **Plus tard, si le volume le justifie** : un calendrier pour choisir soi-même son créneau. Effort : moyen, et un outil de plus à tenir. Non recommandé pour l'instant.

#### Comment les autres font (relevé du 19/11/2026)

| Éditeur | Parcours de démonstration |
|---|---|
| [Batappli](https://www.batappli.fr/demander-une-demo) | Une page « Demandez une démo » avec un formulaire (nom, société, mail, téléphone, code postal, message) et un délai annoncé : « Un expert en chiffrage vous contactera sous 48h » |
| [ServiceTitan](https://www.servicetitan.com/demo) | Un formulaire qui qualifie la demande (métier, nombre de techniciens, taille du bureau) avant le rendez-vous |
| [Avoca](https://www.avoca.ai/demo) | Une prise de rendez-vous en ligne, avec la durée annoncée : « See in 30 minutes » |
| Obat, Tolteck, Axonaut, Housecall Pro, Lindy | Pas de demande de démonstration en avant : le bouton principal ouvre un essai gratuit ou une inscription (section 2.1). Axonaut propose aussi une démonstration en vidéo |

Non vérifié : ce qui se passe après l'envoi de chaque formulaire, et l'existence d'une page de démonstration chez Obat et Housecall Pro (les adresses essayées n'existent pas).

Retenu pour NEOBATYS : le formulaire avec un délai et une durée annoncés, comme Batappli et Avoca. C'est la seule forme qui tient avec ce qui existe aujourd'hui : pas d'essai en libre accès comme Obat ou Lindy (l'outil ne s'ouvre pas sans installation), pas de calendrier en ligne (un outil de plus à tenir pour quelques demandes). Les champs du formulaire actuel (métier, créneau de rappel) qualifient déjà la demande, comme chez ServiceTitan.

#### Réponses proposées aux trois questions, à valider par Ilann

Elles sont appliquées sur le site à titre provisoire.

1. **Ce qu'est une démonstration** : 20 minutes, en visio ou sur place, gratuite et sans engagement, faite par l'un des deux associés. C'est ce que la FAQ de la page Logiciel promettait déjà.
2. **Ce qu'on montre des agents IA** : l'outil en fonctionnement sur une entreprise d'exemple. Le dépôt de l'admin contient un jeu de démonstration prévu pour cela (une entreprise de plomberie inventée, avec ses agents en test : `lib/demo-en-ligne.ts`). À confirmer par Gabin : qu'il est chargé sur une adresse qu'on peut montrer. Le site dit seulement « le logiciel et les agents IA », sans promettre plus.
3. **Le délai de rappel** : 24 h ouvrées, pour fixer le créneau. C'est le délai déjà annoncé partout sur le site ; Batappli annonce 48 h.

#### Ce qui a été fait dans le lot 2

- Le bouton du menu mène à `/contact?service=demo` ; le choix « Démonstration du logiciel et des agents IA » est présélectionné.
- Arrivé par ce lien, le visiteur lit un titre, une accroche, des étapes et un message de confirmation qui parlent de la démonstration ; l'accusé de réception par mail aussi.
- Le titre et la description de la page pour Google : « Demander une démo ou un devis ».
- Côté admin, vérifié en lecture (`app/api/leads/route.ts`, commit `c6e50f7`) : le champ `service` est un texte libre de 300 caractères au plus, rangé tel quel, et c'est le libellé qui est affiché. La valeur `demo` est acceptée sans changement. Seul le contrat écrit (`docs/CONTRAT-SITE-CRM.md` du dépôt de l'admin) ne la cite pas dans ses exemples : à ajouter par Gabin, sans urgence.

Le reste du parcours :

- Un bouton fixe dans le menu, le même partout.
- Sur chaque page d'offre, un bouton adapté qui préremplit le formulaire (cela existe déjà : `/contact?service=logiciel`, `?service=ia`, `?service=site`).
- Afficher un numéro de téléphone dès qu'il existe : c'est le premier réflexe d'un artisan, et le kit de prospection en fait une condition avant tout envoi (`docs/commercial/kit-prospection.md`, règle 6).

## 4. À qui on vend

### 4.1 Ce que le site et les documents disent aujourd'hui

| Sujet | Ce qui est écrit | Source |
|---|---|---|
| Métier | Artisans du bâtiment. 18 métiers ont une page (plombier, électricien, maçon, menuisier, couvreur, peintre, chauffagiste, carreleur, charpentier, plâtrier-plaquiste, serrurier-métallier, paysagiste, terrassier, isolation, étancheur, constructeur de maisons, façadiste...) | `content/data/trade-sites.json`, site en ligne |
| Taille | Sociétés de 1 à 10 salariés | `docs/commercial/kit-prospection.md`, `docs/reseaux-sociaux.md` |
| Trois cibles de prospection | 1. Artisan installé depuis 3 ans ou plus, sans site ou avec un site ancien. 2. Entreprise créée depuis moins d'un an. 3. Entreprise RGE | `docs/commercial/kit-prospection.md` |
| Pays | « Société luxembourgeoise, nous travaillons au Luxembourg, en France et partout en Europe » (décision d'Ilann du 15/11/2026) | `content/data/site.json` |
| Terrain réel | Artisans autour de Metz, en Moselle et au Luxembourg | `docs/reseaux-sociaux.md` |
| Problème mis en avant | « Vos clients vous cherchent sur leur téléphone, et vous faites encore vos devis le soir » | `docs/commercial/kit-prospection.md` |
| Promesse de l'accueil | « Plus de clients. Vos devis en 2 minutes. On installe tout pour vous. » | `content/data/home.json` |

### 4.2 Ce que chaque offre promet

| Offre | Prix affiché | Promesse | À qui elle parle |
|---|---|---|---|
| Site Artisan | À partir de 990 € HT | Être trouvé sur Google et recevoir des demandes de devis, site en ligne sous 7 jours | Artisan sans site ou avec un site ancien |
| Pack Gestion / Essentiel | 2 990 € HT ou 490 € HT par mois | Site et logiciel reliés : trouver des clients et être payé à temps | Artisan qui fait ses devis le soir |
| Pack IA / Pro | 5 990 € HT ou 990 € HT par mois | Le pack, plus trois agents IA au choix | Entreprise qui perd du temps au bureau |
| Transformation complète / Premium | 9 900 € HT ou 1 490 € HT par mois | Toute l'entreprise équipée, les 12 agents | Non précisé |

Les offres en une fois ajoutent 200 € HT par mois de maintenance. Les abonnements engagent sur 12 mois. Les coûts d'IA sont payés par le client en plus (`content/data/pricing.json`).

### 4.3 Ce qui reste flou

1. **Ce qu'on vend en premier.** Tranché (décision 2) : les agents IA. Le site, lui, se présente encore comme une agence qui fait des sites internet, avec un logiciel et, « si vous le voulez », de l'IA. L'accueil est à réécrire en conséquence.
2. **Trois métiers à la fois.** Agence web, éditeur de logiciel, installateur d'IA. Le visiteur ne sait pas lequel est le cœur.
3. **Artisan ou entreprise.** Tranché (décision 3) : « artisans et entreprises du bâtiment ». Tout le site dit encore « artisan » seulement. Les mots « gestion de société » et « gestion d'entreprise » parlent à un dirigeant de PME : reste à dire jusqu'à quelle taille on vise (question 2).
4. **Le pays.** La société est luxembourgeoise et annonce « partout en Europe », mais les guides traitent les règles françaises (taux de TVA du bâtiment, facturation électronique de 2026 et 2027, décennale, RGE). Le Luxembourg apparaît surtout sur la page des aides.
5. **La taille visée par les formules hautes.** La prospection vise 1 à 10 salariés. Une formule à 9 900 € ou 1 490 € par mois s'adresse-t-elle aux mêmes ?
6. **L'IA sans le reste.** Les agents ne se vendent qu'avec le site et le logiciel (le Pack IA contient le Pack Gestion). Une entreprise qui a déjà son site et son logiciel de devis ne trouve pas d'offre pour elle.
7. **Les preuves.** Pas encore de client à citer : avis, chiffres et réalisations d'exemple sont masqués. Le site montre des maquettes.
8. **L'essai du logiciel.** Le site promet une « démo gratuite ». `docs/plateforme-admin.md` prévoit une inscription libre et gratuite. Le visiteur ne sait pas s'il peut essayer seul.

### 4.4 Questions pour Ilann

Aucune réponse n'est supposée ici. Les questions 1 et 3 ont reçu une première réponse avec les décisions 2 et 3 ; ce qui reste à préciser est indiqué.

1. Si un visiteur ne retient qu'une phrase, laquelle ? La décision 2 donne le sens (« ils installent des agents IA qui font le travail de bureau ») ; reste à valider la phrase exacte.
2. Le client type, c'est qui précisément : quel métier, combien de salariés, quel chiffre d'affaires, depuis combien de temps installé ?
3. La décision 3 fixe « artisans et entreprises du bâtiment ». Reste à dire jusqu'à quelle taille d'entreprise on s'adresse (10, 20, 50 salariés ?).
4. Dans quel pays veut-on les dix prochains clients : France (Moselle d'abord), Luxembourg, les deux ? Si le Luxembourg compte, faut-il des contenus aux règles luxembourgeoises ?
5. Quel est le premier problème que le client veut régler quand il nous appelle : trouver des clients, faire ses devis plus vite, être payé, ne plus rater d'appels, autre ?
6. Vend-on les agents IA seuls, à une entreprise qui a déjà un site et un logiciel (Obat, Batappli ou autre) ? Si oui, à quel prix d'entrée ?
7. Par « développement », faut-il comprendre « développer son entreprise » (trouver plus de clients) ou « développement sur mesure » (on programme un outil pour le client) ?
8. Par « optimisation », faut-il comprendre « gagner du temps au bureau », « réduire les coûts », ou « améliorer la rentabilité des chantiers » ?
9. Qui prend la décision chez le client : le gérant seul, son conjoint ou sa secrétaire qui tient le bureau, son comptable ?
10. Quelle est l'offre d'appel : le site à 990 €, l'abonnement Essentiel à 490 € par mois, un audit gratuit, un essai du logiciel ?
11. Qu'a-t-on le droit de montrer comme preuve aujourd'hui (un chantier pilote anonymisé, une vidéo du logiciel, des chiffres mesurés chez nous) ?
12. À quelle formule doit ressembler le client idéal dans un an : beaucoup de petits abonnements, ou peu de clients en formule haute ?

## 5. Accroche pour Google

### 5.1 Ce qui a été vérifié, et ce qui ne l'a pas été

Aucun volume de recherche n'a été vérifié : le site n'a pas encore de données Search Console exploitables et aucun outil de mots-clés payant n'a été utilisé. Le seul relevé fait est celui des suggestions de Google (ce que Google propose quand on tape le début d'une recherche), le 19/11/2026, en français. Une suggestion prouve que la recherche existe, pas qu'elle est fréquente.

| Mots visés | Ce que Google suggère | Lecture |
|---|---|---|
| agent ia artisan | « agent ia artisan », « agent ia pour artisan » | La recherche existe, avec notre cible dedans |
| agent ia btp, agent ia batiment | « agent ia btp », « agent ia batiment », « agent ia construction » | La recherche existe |
| agent ia entreprise | « agent ia pour entreprise », « agent ia gestion entreprise », « formation agent ia entreprise » | Existe, mais large : tous secteurs |
| logiciel gestion entreprise batiment | « logiciel gestion entreprise batiment », « logiciel gestion pme batiment », « logiciel gestion entreprise construction » | Existe, intention d'achat claire |
| gestion d'entreprise batiment | Surtout « formation gestion d'entreprise batiment », « cours... », « ... pdf » | Les gens cherchent une formation, pas un outil. À viser seulement avec le mot « logiciel » |
| gestion de société | « société gestion de patrimoine », « société gestion de portefeuille » | Autre sujet (finance). À ne pas viser tel quel |
| optimisation entreprise | « optimisation fiscale entreprise », « optimisation énergétique », « optimisation trésorerie » | Autre sujet. À ne pas viser tel quel |
| développer son entreprise batiment | « developper son entreprise batiment », puis surtout « créer son entreprise batiment » | Existe, mais proche de la création d'entreprise |
| automatisation entreprise batiment | Aucune suggestion | Pas de demande visible sous cette forme |

Conséquence : les mots « agent IA » et « logiciel de gestion » accolés à « bâtiment », « artisan » ou « PME » sont les plus sûrs. « Gestion de société » et « optimisation » seuls mènent ailleurs : il faut les utiliser dans les phrases, pas comme sujet de page.

Pour avoir de vrais chiffres : Google Search Console une fois le site indexé (`docs/seo-actions-ilann.md`), et l'outil de planification de mots-clés de Google Ads (gratuit avec un compte).

### 5.2 Titres actuels et propositions, page par page

Les titres se terminent par « · NEOBATYS », ajouté automatiquement. Les propositions gardent des titres courts (autour de 60 caractères, règle d'usage et non limite officielle).

| Page | Aujourd'hui | Proposition |
|---|---|---|
| Accueil, titre | NEOBATYS · Sites internet, logiciel et IA pour artisans du bâtiment | NEOBATYS · Agents IA et logiciel de gestion pour le bâtiment |
| Accueil, description | Sites internet, logiciel de devis et factures et assistants IA pour les artisans du bâtiment. Plus de clients, moins de coûts, moins de paperasse. | Des agents IA qui préparent vos devis, vos relances et vos réponses aux clients, un logiciel de gestion et un site internet. Pour les artisans et les entreprises du bâtiment, installé par nous. |
| Accueil, titre de page | Plus de clients. Vos devis en 2 minutes. On installe tout pour vous. | Vos devis, vos relances et vos appels préparés par des agents IA. Vous validez. On installe tout. |
| Agents IA, titre | Agents IA pour artisans du bâtiment | Agents IA pour artisans et entreprises du bâtiment |
| Agents IA, description | 12 agents IA pour artisans : devis dictés, relances de devis et d'impayés, rendez-vous, appels manqués, avis Google, entretiens, aides, documents. | Inchangée (elle nomme déjà les agents) |
| Agents IA, titre de page | Des agents IA qui préparent le travail de bureau à votre place | Inchangé |
| Logiciel, titre | Logiciel de devis et factures pour artisans | Logiciel de gestion bâtiment : devis et factures |
| Logiciel, description | Logiciel de gestion simple pour artisans : devis en 2 minutes, factures, relances automatiques, export comptable, facturation électronique. Démo gratuite. | Logiciel de gestion pour artisans et entreprises du bâtiment : devis en 2 minutes, factures, relances faites par des agents IA, export comptable, facturation électronique. Démo gratuite. |
| Logiciel, titre de page | Vos devis en 2 minutes, vos factures payées à temps | Inchangé |
| Sites internet (page et 18 métiers) | Création de site internet artisan du bâtiment, puis « ... pour plombier », etc. | Inchangés : ils collent déjà à la recherche visée |
| Logiciel par métier (8 pages) et guides (8 pages) | « Logiciel de devis et factures pour plombier », « Mentions obligatoires d'un devis de travaux », etc. | Inchangés |
| Digitaliser son entreprise, titre | Digitaliser son entreprise artisanale : aides | Inchangé |
| Contact, titre | Contact et demande de devis | Demander une démo ou un devis |
| Contact, description | Demandez un devis pour votre site internet ou une démo du logiciel de gestion. Réponse sous 24 h, sans engagement. | Demandez une démo des agents IA et du logiciel, ou un devis pour votre site internet. Réponse sous 24 h, sans engagement. |
| Phrase de marque (pied de page, données pour Google) | Sites internet, logiciel de gestion et IA pour artisans du bâtiment | Agents IA, logiciel de gestion et sites internet pour les artisans et entreprises du bâtiment |

Ces textes suivent les décisions 2, 3 et 6. Ils sont à relire par Ilann avant mise en ligne.

Ils emploient « agents IA » partout (décision 7).

### 5.3 Pages à créer

| Priorité | Page | Recherche visée | Titre proposé | Contenu | Effort |
|---|---|---|---|---|---|
| 1 (premier lot, décision 4) | `/tarifs` | Prix, tarif | Tarifs : agents IA, logiciel et site internet | La grille actuelle, ce qui est compris, la FAQ sur les prix | Petit (le bloc existe) |
| 1 (premier lot, décision 4) | `/guides` | Aucune en propre : page de navigation | Guides et outils gratuits pour les entreprises du bâtiment | Liste des 8 guides, du modèle de devis et du calculateur | Petit |
| 2 | Une page par agent, sous la page Agents IA (12 pages, par lots) | « relance de devis automatique », « répondre aux appels manqués artisan », « devis à la voix », etc. (suggestions non relevées une par une : à vérifier avant d'écrire chaque page) | Agent IA de relance de devis pour artisans, etc. | Ce que fait l'agent, un exemple réel, ce que le client valide, ce que ça coûte, dans quelle formule | Moyen. Commencer par 3 agents |
| 2 | `/logiciel-gestion-entreprise-batiment` | « logiciel gestion entreprise batiment », « logiciel gestion pme batiment » | Logiciel de gestion d'entreprise du bâtiment avec agents IA | Vue d'ensemble pour un dirigeant : devis, factures, suivi des chantiers, relances, tableau de bord | Moyen. La cible « entreprises du bâtiment » est confirmée (décision 3) |
| 3 | Page « développer son entreprise » ou « développement sur mesure » | Dépend de la question 7 | À écrire après la réponse | | Moyen |
| 3 | Page « gagner du temps au bureau » | Dépend de la question 8. Pas de demande visible pour « automatisation entreprise batiment » | À écrire après la réponse | | Moyen |

Règle à tenir : une page par recherche. Avant de créer une page, vérifier qu'aucune page existante ne vise déjà la même recherche (par exemple, `/logiciel` vise « logiciel devis factures artisan » et ne doit pas être doublée).

## 6. La suite

Les trois lots et leur état sont dans le tableau « Avancement » en tête de document. Chacun a sa branche et sa PR. Les pages par agent (section 5.3) viennent après le lot 3, par groupes de 3.
