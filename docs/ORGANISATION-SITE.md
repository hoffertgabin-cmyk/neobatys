# Organisation du site : menu, pages, cible et accroche

Étude du 19 novembre 2026, demandée par Ilann. Rien n'est modifié sur le site : ce document sert à décider. Les décisions à prendre sont en section 6.

Relevés faits sur `origin/main` (commit `475120e`) et sur www.neobatys.com le 19/11/2026. Quand une donnée n'a pas pu être vérifiée, c'est écrit « non vérifié ».

## En bref

- Le menu du haut a 6 entrées : 1 ouvre une page, 5 font défiler la page d'accueil. C'est la cause du problème signalé.
- Le site a 42 pages en ligne, mais le menu n'en montre qu'une. Les pages Sites internet et Logiciel existent et ne sont pas dans le menu.
- Recommandation : garder les pages (elles servent au référencement) et appliquer une règle simple, « le menu n'ouvre que des pages ».
- Le site parle aujourd'hui d'abord de sites internet à 990 €. Si la priorité est les agents IA, il faut le décider (section 4), car cela change l'accueil, le menu et les titres.

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
5. **L'IA en première ligne seulement chez ceux dont c'est le métier** (Avoca, Lindy). Chez les logiciels de gestion, c'est une ligne sous Produits. Mettre « Agents IA » en tête du menu place donc NEOBATYS dans la deuxième famille : c'est un choix de positionnement (décision 2).

### 2.3 Trois pistes à reprendre

Cette partie tient lieu de veille pour ce sujet (règle de `AGENTS.md`), pour garder un seul document.

1. **Une page par agent, nommée par sa tâche** (Avoca, Lindy). Apport : une page par recherche (« relance de devis », « appels manqués »), et un visiteur qui comprend tout de suite ce que fait l'agent. Effort : moyen, par lots de 3 pages. Reprise en section 5.3.
2. **Des pages par taille d'entreprise** (Obat : micro-entreprise, artisan seul, TPE et PME ; Axonaut : par cible). Apport : répond à la question « est-ce fait pour moi ? », aujourd'hui sans réponse sur le site. Effort : moyen, et seulement après les réponses de la section 4.4.
3. **Un bouton d'action unique qui dit ce qui se passe ensuite** (« Book a Demo », « Essai gratuit »). Apport : un engagement plus léger que « Demander un devis » pour un logiciel et des agents. Effort : petit. Reprise en décision 6.

## 3. Avis marketing : quelle organisation choisir

### 3.1 Les trois options

| Option | Pour | Contre |
|---|---|---|
| A. Tout en pages | Comportement prévisible. Une page par sujet, donc une page par recherche Google. Chaque page s'envoie par lien | Demande une page Tarifs en plus. L'accueil doit être raccourcie pour ne pas tout répéter |
| B. Tout sur une page qui défile | Simple à parcourir sur téléphone, une seule histoire | Une seule page pour toutes les recherches : Google ne peut pas la montrer à la fois pour « logiciel devis plombier » et « agent IA artisan ». Il faudrait supprimer 41 pages déjà en ligne |
| C. Hybride avec une règle | Garde les pages et garde une accueil qui raconte tout en résumé | Ne marche que si la règle est tenue |

### 3.2 Recommandation : option C, avec cette règle

**Le menu du haut et le pied de page n'ouvrent que des pages. Le défilement ne sert qu'à l'intérieur d'une page** (un bouton « Voir la démo » qui descend dans la page Logiciel, par exemple).

Pourquoi :

- **Référencement.** Google classe des pages, pas des blocs. Le site a déjà une page par sujet (logiciel, sites, IA, guides, métiers) : les retirer serait perdre ce travail. La campagne décrite dans `docs/seo-logiciel.md` repose dessus.
- **Conversion.** Un artisan qui clique « Tarifs » veut voir des prix tout de suite, sur une page qu'il peut retrouver et transmettre à son associé ou à son comptable.
- **Confiance.** Un menu qui réagit toujours pareil donne une impression de sérieux. C'est le point soulevé par Ilann.
- **Effort faible.** Les pages existent. Il manque une page Tarifs et une page qui liste les guides. Le reste est un changement de liens.

L'option B n'est défendable que pour un site d'une seule offre et d'une seule cible. NEOBATYS a trois offres et 18 métiers.

### 3.3 Menu cible

Cinq entrées, toutes des pages, plus un bouton. L'ordre suit la priorité donnée aux agents IA (à confirmer, décision 2).

| Ordre | Libellé | Destination | État |
|---|---|---|---|
| 1 | Agents IA | `/intelligence-artificielle` (ou `/agents-ia`, décision 5) | Existe |
| 2 | Logiciel | `/logiciel` | Existe |
| 3 | Sites internet | `/sites-internet` | Existe |
| 4 | Tarifs | `/tarifs` | À créer (la grille existe, il faut lui donner une page) |
| 5 | Guides | `/guides` | À créer (page qui liste les guides et outils gratuits déjà en ligne, sans changer leurs adresses) |
| Bouton | Être rappelé (ou Demander une démo, décision 6) | `/contact` | Existe |

« FAQ » et « Services » sortent du menu : chaque page garde sa FAQ en bas, et « Services » est remplacé par les trois entrées qui disent ce qu'on vend.

Pied de page cible, tout en pages :

- **Nos offres** : Agents IA, Logiciel de gestion, Sites internet, Tarifs.
- **Guides et outils** : Facturation électronique, Modèle de devis gratuit, Calculateur de TVA, Aides au numérique (`/digitaliser-son-entreprise`), Tous les guides.
- **NEOBATYS** : Contact, puis les pages légales.

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

Aucune adresse existante ne change, donc aucune redirection à prévoir, sauf si la page IA est renommée (décision 5).

### 3.5 L'accueil

Elle reste une page qui défile, mais plus courte : une accroche, les trois offres en un bloc chacune avec un lien « En savoir plus » vers la page, un aperçu des prix avec un lien vers `/tarifs`, la preuve (exemples, avis quand il y en aura), le contact. Les blocs détaillés (tour du logiciel, grille complète, FAQ longue) vivent sur leur page.

### 3.6 Parcours vers la prise de contact

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

1. **Ce qu'on vend en premier.** Le site présente NEOBATYS comme une agence qui fait des sites internet, avec un logiciel et, « si vous le voulez », de l'IA. La demande d'Ilann est de pousser les agents IA et la gestion d'entreprise. Ce sont deux positionnements différents : il faut en choisir un pour l'accueil.
2. **Trois métiers à la fois.** Agence web, éditeur de logiciel, installateur d'IA. Le visiteur ne sait pas lequel est le cœur.
3. **Artisan ou entreprise.** Tout le site dit « artisan ». Les mots visés par Ilann (« gestion de société », « gestion d'entreprise ») parlent à un dirigeant de PME, pas forcément du bâtiment.
4. **Le pays.** La société est luxembourgeoise et annonce « partout en Europe », mais les guides traitent les règles françaises (taux de TVA du bâtiment, facturation électronique de 2026 et 2027, décennale, RGE). Le Luxembourg apparaît surtout sur la page des aides.
5. **La taille visée par les formules hautes.** La prospection vise 1 à 10 salariés. Une formule à 9 900 € ou 1 490 € par mois s'adresse-t-elle aux mêmes ?
6. **L'IA sans le reste.** Les agents ne se vendent qu'avec le site et le logiciel (le Pack IA contient le Pack Gestion). Une entreprise qui a déjà son site et son logiciel de devis ne trouve pas d'offre pour elle.
7. **Les preuves.** Pas encore de client à citer : avis, chiffres et réalisations d'exemple sont masqués. Le site montre des maquettes.
8. **L'essai du logiciel.** Le site promet une « démo gratuite ». `docs/plateforme-admin.md` prévoit une inscription libre et gratuite. Le visiteur ne sait pas s'il peut essayer seul.

### 4.4 Questions pour Ilann

Aucune réponse n'est supposée ici.

1. Si un visiteur ne retient qu'une phrase, laquelle : « ils font des sites pour artisans », « ils ont un logiciel de devis et factures », ou « ils installent des agents IA qui font le travail de bureau » ?
2. Le client type, c'est qui précisément : quel métier, combien de salariés, quel chiffre d'affaires, depuis combien de temps installé ?
3. Garde-t-on « artisans du bâtiment » partout, ou passe-t-on à « entreprises du bâtiment » pour parler aussi aux PME de 10 à 50 salariés ? Vise-t-on des entreprises hors bâtiment ?
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
| Accueil, description | Sites internet, logiciel de devis et factures et assistants IA pour les artisans du bâtiment. Plus de clients, moins de coûts, moins de paperasse. | Des agents IA qui préparent vos devis, vos relances et vos réponses aux clients, un logiciel de gestion et un site internet. Pour les entreprises du bâtiment, installé par nous. |
| Accueil, titre de page | Plus de clients. Vos devis en 2 minutes. On installe tout pour vous. | Vos devis, vos relances et vos appels préparés par des agents IA. Vous validez. On installe tout. |
| Agents IA, titre | Agents IA pour artisans du bâtiment | Agents IA pour artisans et entreprises du bâtiment |
| Agents IA, description | 12 agents IA pour artisans : devis dictés, relances de devis et d'impayés, rendez-vous, appels manqués, avis Google, entretiens, aides, documents. | Inchangée (elle nomme déjà les agents) |
| Agents IA, titre de page | Des agents IA qui préparent le travail de bureau à votre place | Inchangé |
| Logiciel, titre | Logiciel de devis et factures pour artisans | Logiciel de gestion bâtiment : devis et factures |
| Logiciel, description | Logiciel de gestion simple pour artisans : devis en 2 minutes, factures, relances automatiques, export comptable, facturation électronique. Démo gratuite. | Logiciel de gestion pour entreprises du bâtiment : devis en 2 minutes, factures, relances faites par des agents IA, export comptable, facturation électronique. Démo gratuite. |
| Logiciel, titre de page | Vos devis en 2 minutes, vos factures payées à temps | Inchangé |
| Sites internet (page et 18 métiers) | Création de site internet artisan du bâtiment, puis « ... pour plombier », etc. | Inchangés : ils collent déjà à la recherche visée |
| Logiciel par métier (8 pages) et guides (8 pages) | « Logiciel de devis et factures pour plombier », « Mentions obligatoires d'un devis de travaux », etc. | Inchangés |
| Digitaliser son entreprise, titre | Digitaliser son entreprise artisanale : aides | Inchangé |
| Contact, titre | Contact et demande de devis | Contact : démo, devis ou rappel |
| Contact, description | Demandez un devis pour votre site internet ou une démo du logiciel de gestion. Réponse sous 24 h, sans engagement. | Demandez une démo des agents IA et du logiciel, ou un devis pour votre site internet. Réponse sous 24 h, sans engagement. |
| Phrase de marque (pied de page, données pour Google) | Sites internet, logiciel de gestion et IA pour artisans du bâtiment | Agents IA, logiciel de gestion et sites internet pour les entreprises du bâtiment |

Ces textes dépendent des réponses de la section 4.4 (artisans ou entreprises, ordre des offres). Ils sont à relire par Ilann avant mise en ligne.

Partout, un seul mot : « agents IA » (remplace « assistants IA » sur l'accueil et dans la FAQ).

### 5.3 Pages à créer

| Priorité | Page | Recherche visée | Titre proposé | Contenu | Effort |
|---|---|---|---|---|---|
| 1 | `/tarifs` | Prix, tarif | Tarifs : agents IA, logiciel et site internet | La grille actuelle, ce qui est compris, la FAQ sur les prix | Petit (le bloc existe) |
| 1 | `/guides` | Aucune en propre : page de navigation | Guides et outils gratuits pour les entreprises du bâtiment | Liste des 8 guides, du modèle de devis et du calculateur | Petit |
| 2 | Une page par agent, sous la page Agents IA (12 pages, par lots) | « relance de devis automatique », « répondre aux appels manqués artisan », « devis à la voix », etc. (suggestions non relevées une par une : à vérifier avant d'écrire chaque page) | Agent IA de relance de devis pour artisans, etc. | Ce que fait l'agent, un exemple réel, ce que le client valide, ce que ça coûte, dans quelle formule | Moyen. Commencer par 3 agents |
| 2 | `/logiciel-gestion-entreprise-batiment` | « logiciel gestion entreprise batiment », « logiciel gestion pme batiment » | Logiciel de gestion d'entreprise du bâtiment avec agents IA | Vue d'ensemble pour un dirigeant : devis, factures, suivi des chantiers, relances, tableau de bord | Moyen. Seulement si la cible « PME » est confirmée (question 3) |
| 3 | Page « développer son entreprise » ou « développement sur mesure » | Dépend de la question 7 | À écrire après la réponse | | Moyen |
| 3 | Page « gagner du temps au bureau » | Dépend de la question 8. Pas de demande visible pour « automatisation entreprise batiment » | À écrire après la réponse | | Moyen |

Règle à tenir : une page par recherche. Avant de créer une page, vérifier qu'aucune page existante ne vise déjà la même recherche (par exemple, `/logiciel` vise « logiciel devis factures artisan » et ne doit pas être doublée).

## 6. Décisions à prendre avant la refonte

Recommandation en premier à chaque fois.

1. **Organisation.** Recommandé : hybride, « le menu et le pied de page n'ouvrent que des pages ». Autres choix : tout en pages sans accueil longue, ou page unique.
2. **Offre mise en avant.** Recommandé : les agents IA en premier (menu, accueil, titres), le logiciel en deuxième, les sites en troisième. Autre choix : garder le site internet comme porte d'entrée et l'IA en complément, comme aujourd'hui. Dépend des questions 1 et 10 de la section 4.4.
3. **Cible écrite sur le site.** Recommandé : « artisans et entreprises du bâtiment » (on garde les artisans, on ouvre aux PME du bâtiment). Autres choix : « artisans » seulement, ou « entreprises » tous secteurs.
4. **Nouvelles pages du premier lot.** Recommandé : `/tarifs` et `/guides` avec le nouveau menu, puis 3 pages d'agents. Autre choix : le menu seul d'abord.
5. **Adresse de la page IA.** Recommandé : garder `/intelligence-artificielle` (aucune redirection, aucun risque). Autre choix : la renommer `/agents-ia` avec une redirection, pour avoir le mot dans l'adresse.
6. **Bouton du menu.** Recommandé : « Demander une démo » si les agents IA et le logiciel passent en premier. Autres choix : « Demander un devis » (actuel), « Être rappelé ».
7. **Vocabulaire.** Recommandé : « agents IA » partout. Autre choix : « assistants IA » partout.
8. **Accueil.** Recommandé : la raccourcir (résumé et liens vers les pages). Autre choix : la laisser longue et ne changer que le menu.
9. **Réponses aux 12 questions de la section 4.4**, au moins les questions 1 à 7, avant d'écrire les nouveaux textes.

Une fois ces choix faits, la refonte tient en trois chantiers séparés : le menu et le pied de page avec `/tarifs` et `/guides` ; l'accueil et les titres ; les pages d'agents.
