# Fiche Google et comptes réseaux NEOBATYS

Tout ce qu'il faut pour créer la fiche Google Business Profile, le compte Instagram, la page Facebook et la page LinkedIn de NEOBATYS, à copier-coller. Ilann crée et valide chaque compte lui-même : rien ici n'a été créé, aucune connexion n'a été faite.

- Stratégie, ton, calendrier : [`reseaux-sociaux.md`](reseaux-sociaux.md). Posts rédigés : [`posts/`](posts/).
- Visuels prêts : [`visuels/`](visuels/).
- NEOBATYS est un nom commercial de TAG Delme SARL (`content/data/legal.json`). Le nom du gérant n'apparaît sur aucun compte, aucune bio, aucun visuel.

Consignes officielles lues le 1er novembre 2026. Les points qu'on n'a pas pu vérifier sont marqués « non vérifié » : se fier à ce que l'interface affiche au moment de la saisie.

## 1. Fiche Google Business Profile

### Éligibilité : à confirmer avant de créer la fiche

Google réserve la fiche aux entreprises en contact direct avec leurs clients : « Si vous accueillez les clients dans vos locaux ou proposez des services sur site, vous pouvez créer une fiche d'établissement » ([consignes de représentation](https://support.google.com/business/answer/3038177?hl=fr)). La même page interdit la fiche pour un bureau « virtuel », « sauf si du personnel y travaille pendant les horaires d'ouverture ».

NEOBATYS est éligible si l'équipe rencontre les artisans chez eux ou sur chantier (démo, prise de photos, mise en route). Si tout se fait à distance, ne pas créer de fiche : le risque est la suspension. Voir la décision 1.

### Nom

```
NEOBATYS
```

Le nom affiché correspond au nom réel, sans rien d'autre : « Vous ne devez pas inclure d'informations superflues dans le nom de votre établissement. » Google refuse expressément les mentions de services, les infos géographiques et les formes juridiques comme « SARL » ([3038177](https://support.google.com/business/answer/3038177?hl=fr)). Donc ni « NEOBATYS Site internet artisan Metz » ni « NEOBATYS TAG Delme SARL ».

### Catégories

Google demande de choisir « le moins de catégories possible pour décrire votre activité principale » ([3038177](https://support.google.com/business/answer/3038177?hl=fr)). Les libellés ci-dessous existent en français. Ils ont été lus sur la liste tierce [Pleper](https://pleper.com/index.php?do=tools&sdo=gmb_categories&go=1&lang=fr&country=72), pas chez Google. Taper le libellé dans le champ et retenir la proposition exacte.

| Rôle | Catégorie | Pourquoi |
|---|---|---|
| Principale | **Concepteur de sites Web** | C'est ce que cherche un artisan qui veut un site, et la porte d'entrée des packs |
| Secondaire | Entreprise de logiciels | Le logiciel de devis et factures |
| Secondaire (facultative) | Service de marketing Internet | Référencement local et fiche Google des artisans |

« Éditeur de logiciels » et « Agence de marketing internet » n'existent pas comme catégories. Ne pas ajouter de catégorie qui ne décrit pas l'activité principale.

### Description (741 caractères sur 750)

Les consignes pour ce champ ([3039617](https://support.google.com/business/answer/3039617?hl=fr) et [3038177](https://support.google.com/business/answer/3038177?hl=fr)) :
- 750 caractères au plus ;
- aucun lien ni code HTML ;
- ni prix ni promotion.

Le mot « gratuite » est donc retiré de la description.

```
NEOBATYS équipe les artisans et les petites entreprises du bâtiment de trois outils qui fonctionnent ensemble. Un site internet pensé pour être trouvé sur Google dans votre secteur et recevoir des demandes de devis. Un logiciel de devis et de factures utilisable depuis le chantier : devis sur place, signature en ligne, facture en un clic, relances automatiques, export comptable, prêt pour la facturation électronique. Des assistants IA réglés sur votre métier, qui répondent aux demandes, préparent les devis dictés à la voix et relancent les impayés : vous validez tout ce qui part. Nous venons vous rencontrer sur rendez-vous autour de Metz, en Moselle et au Luxembourg, avec un seul interlocuteur du premier échange à la mise en route.
```

### Services

Les descriptions sont courtes. La limite de caractères par service n'a pas été vérifiée : se fier au compteur. Les prix sont ceux de `content/data/pricing.json`, en HT. Ne les renseigner que si l'interface propose un champ prix.

| Service | Description courte | Prix (facultatif) |
|---|---|---|
| Création de site internet pour artisan | Site professionnel à votre nom, pensé pour votre métier et votre ville : mobile, galerie avant / après, formulaire de devis, référencement local. | À partir de 990 € HT |
| Logiciel de devis et factures | Devis sur place, signature en ligne, facture en un clic, relances automatiques, export comptable. | Voir le site |
| Facturation électronique | Logiciel prêt pour la facturation électronique obligatoire en France (réception depuis le 1er septembre 2026, émission par les PME au 1er septembre 2027). | |
| Relance des impayés | Relances automatiques des factures en retard, que vous validez avant envoi. | |
| Assistant IA de réponse aux demandes | Répond aux demandes de devis reçues par le site et les réseaux, sous votre contrôle. | |
| Devis dictés à la voix | Vous dictez le chantier, l'assistant prépare le devis à relire. | |
| Fiche Google et avis clients | Mise en place de la fiche Google de l'artisan et demandes d'avis à ses vrais clients après chaque chantier. | |

Toujours dire « à partir de » à côté du prix : les packs vont jusqu'à 9 900 € HT et la maintenance coûte 200 € HT par mois.

### Adresse et zone desservie

- **Adresse.** Celle de `content/data/site.json`, 44, rue de l'Industrie, L-8069 Strassen, Luxembourg. Elle sert à valider la fiche. Si personne n'y reçoit de clients, la masquer : « Si vous n'accueillez pas de clients dans votre établissement, supprimez votre adresse de votre fiche d'établissement » ([9157481](https://support.google.com/business/answer/9157481?hl=fr)). Sur la [page 3038177](https://support.google.com/business/answer/3038177?hl=fr), la règle est la même pour les établissements de services de proximité, et elle y est obligatoire.
- **Zone desservie.** C'est celle du site et des bios : `Metz`, `Moselle`, `Luxembourg`. Ajouter `Thionville` si les rendez-vous s'y font. Google limite à 20 zones et demande de « limiter la zone globale desservie de votre fiche à deux heures de trajet » ([3038177](https://support.google.com/business/answer/3038177?hl=fr), [9157481](https://support.google.com/business/answer/9157481?hl=fr)). Strassen-Metz est dans cette limite.

### Horaires recommandés

```
Lundi à vendredi : 8:00 - 18:00
Samedi, dimanche : fermé
```

Ce sont les heures où quelqu'un décroche vraiment ou répond dans l'heure. Les artisans appellent tôt, d'où 8 h. Google demande que l'établissement soit joignable aux horaires indiqués. Ajouter les jours fériés en horaires exceptionnels.

### Téléphone, site et lien suivi

- **Téléphone.** `content/data/site.json` contient encore `[TÉLÉPHONE]`. Il faut un vrai numéro pour la fiche et souvent pour la validation (décision 2). Un serveur vocal ne reçoit pas le code de validation ([7107242](https://support.google.com/business/answer/7107242?hl=fr)).
- **Site web**, à coller dans le champ « Site Web » :

```
https://www.neobatys.com/?utm_source=google&utm_medium=organic&utm_campaign=fiche-google
```

Google ne dit rien des paramètres UTM dans son aide (non vérifié). Ils n'empêchent rien. Aujourd'hui, le compteur de vues de l'admin (`components/seo/PageViewPing.tsx`) n'enregistre que le chemin, donc le `utm_source` n'est pas mesuré : la source de vérité reste l'onglet Performances de la fiche, qui compte les clics vers le site. Voir la décision 6.

### Photos et visuels à fournir

Formats Google : JPG ou PNG, de 10 Ko à 5 Mo, 720 px recommandé, 250 px minimum ([6103862](https://support.google.com/business/answer/6103862?hl=fr)). Google n'indique pas de dimension propre au logo ni à la couverture. Il précise que la couverture n'est pas toujours affichée en premier.

| Emplacement | Fichier | Remarque |
|---|---|---|
| Logo | [`visuels/photo-profil-1080.png`](visuels/photo-profil-1080.png) | Pictogramme seul, carré |
| Couverture | [`visuels/couverture-google-1920x1080.png`](visuels/couverture-google-1920x1080.png) | 16:9, slogan et zone |
| Photo « produit » | [`visuels/capture-console.png`](visuels/capture-console.png) | Console de démonstration, **données fictives** : pas de chiffre réel à revendiquer |
| Photos « travaux » | [`visuels/maquette-plombier.png`](visuels/maquette-plombier.png), [`maquette-macon`](visuels/maquette-macon.png), [`maquette-menuisier`](visuels/maquette-menuisier.png), [`maquette-couvreur`](visuels/maquette-couvreur.png), [`maquette-peintre`](visuels/maquette-peintre.png), [`maquette-chauffagiste`](visuels/maquette-chauffagiste.png), [`maquette-carreleur`](visuels/maquette-carreleur.png), [`maquette-charpentier`](visuels/maquette-charpentier.png) | Maquettes d'exemple, mention « MAQUETTE » visible en haut à droite |

Préparation des captures :
- **Source.** Elles ont été prises sur www.neobatys.com le 1er novembre 2026.
- **Notes fictives masquées.** Les maquettes du site affichent des notes Google fictives (« 4,9/5 · 132 avis Google »). Elles ont été masquées sur les captures, car une fausse note n'a pas sa place sur une fiche Google.
- **Maquette électricien écartée.** Elle n'est pas fournie, parce qu'elle montre la photo d'une personne.

À ajouter plus tard, quand ce sera vrai : photos de l'équipe en rendez-vous chez un artisan, avec son accord écrit, sans le gérant.

### Validation

Les méthodes possibles sont la vidéo enregistrée, le téléphone ou le SMS, l'e-mail, l'appel vidéo en direct et le courrier ([7107242](https://support.google.com/business/answer/7107242?hl=fr)). Google n'en propose que certaines selon la fiche, et il recommande la vidéo quand elle est proposée. Pour la vidéo, suivre à la lettre les consignes affichées dans l'interface. Montrer la réalité, sans mise en scène, en général :
- le lieu ;
- les outils de travail ;
- une preuve que vous gérez l'entreprise.

### Les 5 premiers posts Google

Il existe trois types de posts : Actualité, Offre et Événement ([7342169](https://support.google.com/business/answer/7342169?hl=fr)). Un post sans période définie est archivé après 6 mois. Google peut supprimer un post contenant des coordonnées non validées ([7213077](https://support.google.com/business/answer/7213077?hl=fr)) : pas de numéro de téléphone dans le texte, on passe par le bouton. Limite de longueur non vérifiée : les textes ci-dessous sont courts.

Chaque post fournit :
- le type « Actualité » ;
- un bouton « En savoir plus » vers la page indiquée ;
- une image tirée de [`visuels/`](visuels/).

| N° | Quand | Image | Bouton |
|---|---|---|---|
| G1 | Le jour de la validation | `couverture-google-1920x1080.png` | `https://www.neobatys.com/contact` |
| G2 | Semaine 1 (avec le post 02) | `capture-console.png` | `https://www.neobatys.com/logiciel` |
| G3 | Semaine 2 (avec le post 03) | `maquette-plombier.png` | `https://www.neobatys.com/sites-internet` |
| G4 | Semaine 3 (avec le post 05) | `capture-console.png` | `https://www.neobatys.com/logiciel` |
| G5 | Semaine 4 (avec le post 08) | `photo-profil-1080.png` | `https://www.neobatys.com/contact` |

G1 :
```
NEOBATYS ouvre sa fiche Google. Nous équipons les artisans du bâtiment autour de Metz, en Moselle et au Luxembourg : un site internet pour être trouvé, un logiciel de devis et factures, et des assistants IA que vous gardez sous contrôle. Prenez rendez-vous pour une démo de 20 minutes sur vos propres exemples.
```

G2 :
```
Facture électronique : depuis le 1er septembre 2026, toutes les entreprises françaises doivent pouvoir recevoir des factures électroniques. L'émission devient obligatoire pour les PME et micro-entreprises au 1er septembre 2027. Notre logiciel de devis et factures est prêt. Le détail et les dates officielles sont sur notre page logiciel.
```

G3 :
```
À quoi pourrait ressembler le site de votre entreprise ? Nous avons préparé des maquettes d'exemple par métier : plombier, maçon, menuisier, couvreur, peintre, chauffagiste, carreleur, charpentier. Ce ne sont pas des sites de clients, ce sont des modèles pour vous projeter.
```

G4 :
```
Relancer un impayé sans fâcher le client : un rappel courtois avant l'échéance, puis des relances espacées et datées. Entre professionnels, une indemnité forfaitaire de 40 € pour frais de recouvrement est due en cas de retard. Notre logiciel prépare ces relances, vous les validez avant envoi.
```

G5 :
```
Votre fiche Google est souvent la première chose qu'un client voit de vous. Catégorie juste, zone desservie, horaires, photos de vrais chantiers et réponses aux avis : ce sont les bases que nous mettons en place avec chaque site NEOBATYS.
```

Sources des chiffres cités :
- **G2** : [impots.gouv.fr](https://www.impots.gouv.fr), déjà citée dans [`reseaux-sociaux.md`](reseaux-sociaux.md).
- **G4** : DGCCRF et décret 2012-1115, même tableau de sources.

### Avis : demander les vrais, jamais en acheter

**Lien d'avis.**
1. Sur la fiche, ouvrir Voir les avis, puis Recevoir plus d'avis, puis Copier ([16816815](https://support.google.com/business/answer/16816815?hl=fr)).
2. Coller le lien obtenu dans le gestionnaire de mots de passe partagé et dans l'admin, sans le mettre dans un commit public tant qu'il n'est pas utilisé.

Le QR code se génère depuis un ordinateur.

**Qui solliciter.** Chaque client réel, une fois la prestation livrée (site en ligne, logiciel mis en route), une seule fois, par e-mail ou SMS, avec le lien. Message type :

```
Bonjour [Prénom], votre [site / logiciel] est en place. Si vous avez deux minutes, votre avis sur notre travail nous aide beaucoup, qu'il soit positif ou non : [lien d'avis]. Merci, l'équipe NEOBATYS.
```

**Ce que Google interdit** ([règles sur le contenu interdit](https://support.google.com/contributionpolicy/answer/7400114?hl=fr), [3474122](https://support.google.com/business/answer/3474122?hl=fr)) :
- les avis contre contrepartie. Google cite le fait de « proposer des avantages (comme un paiement, des remises, des produits et/ou services gratuits) en échange de la publication d'un avis » : pas de mois offert, pas de réduction ;
- la sollicitation sélective : il ne faut pas « déconseiller ou interdire de publier des avis négatifs, ou solliciter des avis positifs de façon sélective ». On demande à tous les clients, pas seulement aux contents ;
- les avis rédigés par l'équipe, la famille ou un associé, ainsi que la pression sur place et le texte imposé au client.

**Ce que dit le droit français** ([Code de la consommation, art. L121-4](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044563107), en vigueur depuis le 28 mai 2022) :
- **Pratiques trompeuses (27° et 28°).** Sont trompeuses en toutes circonstances le fait de diffuser ou faire diffuser de faux avis, et celui d'affirmer que des avis viennent de vrais clients sans avoir pris de mesures pour le vérifier.
- **Sanction ([art. L132-2](https://www.legifrance.gouv.fr/codes/id/LEGISCTA000032227360)).** Jusqu'à 2 ans d'emprisonnement et 300 000 € d'amende, portés à 5 ans et 750 000 € quand l'infraction passe par un service en ligne.
- **Afficher des avis sur le site.** Dans ce cas, le [décret 2017-1436](https://www.legifrance.gouv.fr/jorf/id/JORFARTI000035720943) impose de dire s'ils sont contrôlés, d'indiquer leur date, et de dire s'il y a eu une contrepartie.

Ce qui en découle pour NEOBATYS :
- le site n'affiche ni note ni avis NEOBATYS tant qu'il n'y en a pas de réels : pas d'`aggregateRating` dans `lib/seo.ts`, et les témoignages sont masqués. En revanche, les maquettes d'exemple affichent des notes fictives d'artisans imaginaires (décision 4) ;
- on répond à chaque avis, y compris les négatifs, sans jamais citer d'information personnelle du client.

La fiche pratique DGCCRF sur les avis en ligne n'a pas pu être ouverte (erreur 403) : non vérifié.

## 2. Instagram, page Facebook, page LinkedIn

### Noms d'utilisateur à réserver

La disponibilité ne se vérifie qu'en créant le compte. Essayer dans l'ordre :

| Réseau | 1er choix | 2e | 3e | Règle vérifiée |
|---|---|---|---|---|
| Instagram | `neobatys` | `neobatys.btp` | `neobatys_artisans` | Non vérifié (longueur et caractères permis absents de l'aide lue) |
| Page Facebook | `neobatys` | `neobatys.btp` | `neobatysartisans` | Au moins 5 caractères, lettres, chiffres et points ([aide Facebook](https://www.facebook.com/help/105399436216001)) |
| LinkedIn (URL publique de la page) | `linkedin.com/company/neobatys` | `neobatys-btp` | `neobatys-artisans` | Non vérifié |

Garder le même nom partout si possible. Les deux autres variantes ne servent que si le premier est pris.

### Bios et descriptions

Revérifier le compteur de caractères affiché par chaque réseau au moment de la saisie.

#### Instagram (bio, 150 caractères maximum)

La limite de 150 caractères est vérifiée dans l'[aide Instagram](https://help.instagram.com/728994388226960/).

Nom affiché : `NEOBATYS | Sites et logiciel pour artisans`
Catégorie : Logiciel (ou Service informatique, selon ce que propose l'appli)

```
Sites internet, devis, factures et IA pour artisans du bâtiment.
Metz, Moselle et Luxembourg.
Démo gratuite ↓
```

Lien : `https://www.neobatys.com/contact`

#### Facebook (intro de la page)

Nom de la page : `NEOBATYS`
Catégorie : Logiciel, puis Service de conception de sites web

Intro (courte) :

```
Sites internet, logiciel de devis et factures et assistants IA pour les artisans du bâtiment. Metz, Moselle, Luxembourg.
```

Section « À propos » (longue) :

```
NEOBATYS aide les artisans du bâtiment à trouver des clients et à passer moins de temps sur la paperasse.

- Sites internet pour artisans, à partir de 990 € HT
- Logiciel de devis et factures, prêt pour la facturation électronique
- Assistants IA : réponse aux demandes de devis, devis dictés à la voix, relances des impayés, demandes d'avis Google

Nous travaillons autour de Metz, en Moselle et au Luxembourg. Démo gratuite de 20 minutes sur www.neobatys.com/contact
```

Site web : `https://www.neobatys.com`, e-mail : `contact@neobatys.com`, bouton d'action : « Envoyer un message » ou « Réserver » vers `/contact`.

#### LinkedIn (page entreprise)

Nom : `NEOBATYS`
Slogan (120 caractères maximum) :

```
Sites internet, logiciel de devis et factures et IA pour les artisans du bâtiment
```

Secteur : Développement de logiciels. Taille : 2 à 10 salariés. Type : Société privée.
Site web : `https://www.neobatys.com`
Siège : 44, rue de l'Industrie, L-8069 Strassen, Luxembourg.

Présentation (2 000 caractères maximum) :

```
NEOBATYS équipe les artisans et les petites entreprises du bâtiment avec trois outils qui se parlent :

1. Un site internet pensé pour être trouvé sur Google par les clients du secteur et recevoir des demandes de devis (à partir de 990 € HT).
2. Un logiciel de devis et de factures : devis sur place, signature en ligne, transformation en facture, relances automatiques, export comptable, prêt pour la facturation électronique obligatoire en France.
3. Des assistants IA réglés sur le métier : réponse rapide aux demandes de devis, devis dictés à la voix, relances des impayés, demandes d'avis Google. L'artisan valide tout ce qui part chez ses clients.

Nous travaillons autour de Metz, en Moselle et au Luxembourg, avec un interlocuteur humain joignable. Nous échangeons volontiers avec les experts-comptables, négoces, fédérations et réseaux d'entrepreneurs du BTP.

NEOBATYS est un nom commercial de TAG Delme SARL.
```

Spécialisations ou mots-clés de la page, selon ce que propose LinkedIn : `artisans du bâtiment`, `logiciel devis factures`, `site internet artisan`.

Les limites de 120 et 2 000 caractères viennent des cours LinkedIn Learning officiels :
- [slogan](https://www.linkedin.com/learning/growing-your-business-with-linkedin-pages-22873022/creating-your-tagline) ;
- [présentation](https://www.linkedin.com/learning/growing-your-business-with-linkedin-pages-22873022/about-overview-and-company-description).

### Photo de profil et bannières

| Réseau | Photo de profil | Bannière | Dimensions officielles |
|---|---|---|---|
| Instagram | [`visuels/photo-profil-1080.png`](visuels/photo-profil-1080.png) (recadrée en cercle, le pictogramme reste entier) | Pas de bannière | Taille de la photo de profil non vérifiée dans l'aide |
| Page Facebook | Même fichier | [`visuels/couverture-facebook-1702x630.png`](visuels/couverture-facebook-1702x630.png) (851 x 315 en double densité, contenu centré pour le recadrage mobile) | Profil affiché en 176 x 176 sur ordinateur et 196 x 196 sur smartphone. Couverture de 400 x 150 minimum, chargement optimal en 851 x 315 ([aide Facebook](https://www.facebook.com/help/125379114252045)) |
| Page LinkedIn | Même fichier | [`visuels/banniere-linkedin-1512x256.png`](visuels/banniere-linkedin-1512x256.png) (texte à droite, le logo couvre le bas gauche) | Logo de 400 x 400 recommandé, couverture de 1512 x 256, PNG ou JPEG de 3 Mo maximum ([aide LinkedIn](https://www.linkedin.com/help/linkedin/answer/a563309)) |

Les visuels ont été générés à partir du pictogramme de `components/layout/Logo.tsx`, sans photo de personne. Pour les refaire, reprendre le pictogramme et les couleurs de `app/globals.css` (`--color-nuit`, `--color-chantier`).

### Les 9 premiers posts à programmer

Les textes, visuels et hashtags sont dans [`posts/`](posts/).

**Outils de programmation**

- Instagram et Facebook se programment ensemble dans Meta Business Suite ([aide Meta](https://www.facebook.com/business/help/609176706604372)). On peut programmer jusqu'à 30 jours à l'avance sans abonnement ([aide Meta](https://www.meta.com/help/subscriptions/1931535524918664/)).
- LinkedIn programme nativement d'une heure à trois mois à l'avance ([aide LinkedIn](https://www.linkedin.com/help/linkedin/answer/a1419179)).

| N° | Date | Meta (IG + FB) | LinkedIn | Fichier |
|---|---|---|---|---|
| 01 | Mar. 10 nov. | Carrousel | Document PDF | [01 Présentation](posts/01-presentation.md) |
| 02 | Jeu. 12 nov. | Carrousel | Document PDF | [02 Facture électronique](posts/02-facturation-electronique.md) |
| 03 | Ven. 13 nov. | Reel | Non | [03 Un site par métier, ép. 1](posts/03-maquette-plombier.md) |
| 04 | Mar. 17 nov. | Reel | Vidéo native | [04 Devis à la voix](posts/04-demo-devis-voix.md) |
| 05 | Jeu. 19 nov. | Carrousel | Oui | [05 Relancer un impayé](posts/05-conseil-relances.md) |
| 06 | Ven. 20 nov. | Reel | Non | [06 Un site par métier, ép. 2](posts/06-maquette-electricien.md) |
| 07 | Mar. 24 nov. | Carrousel + sondage en story | Oui | [07 Avant / après](posts/07-avant-apres-journee.md) |
| 08 | Jeu. 26 nov. | Carrousel | Oui | [08 Fiche Google](posts/08-conseil-fiche-google.md) |
| 09 | Ven. 27 nov. | Reel | Non | [09 Relances automatiques](posts/09-demo-relances.md) |

Ordre conseillé :
1. Publier 01 à 03 avant d'inviter des abonnés, pour qu'un profil visité ne soit pas vide.
2. Programmer 04 à 09 d'un coup : tous tombent dans la fenêtre de 30 jours.
3. Cocher « Publié le » dans chaque fichier.

Le post 06 filme la maquette électricien, qui montre la photo d'une personne (banque d'images, pas un client). Voir la décision 5.

### Rattachement au portefeuille Meta de TAG Delme SARL

Le portefeuille business Meta de TAG Delme SARL, préparé dans [`meta-whatsapp.md`](meta-whatsapp.md), porte aussi WhatsApp. La règle est d'avoir un seul portefeuille, au nom de TAG Delme SARL, et pas de second portefeuille « NEOBATYS ». Il réunit :
- la Page Facebook NEOBATYS ;
- le compte Instagram NEOBATYS ;
- le numéro WhatsApp.

Pour ajouter une Page, il faut le contrôle total du portefeuille, et la Page ne doit appartenir à aucun autre business ([ajouter une Page](https://www.facebook.com/business/help/720478807965744), [ajouter un compte Instagram](https://www.facebook.com/business/help/620548115562686)). Si le portefeuille n'existe pas encore au moment de créer la Page, le créer une seule fois, au nom de TAG Delme SARL, selon la démarche de cette session ([créer un portefeuille business](https://www.facebook.com/business/help/1710077379203657)).

## 3. Pas-à-pas d'Ilann

Une ligne par action, dans l'ordre. Activer la double authentification sur chaque compte dès sa création.

### Google

1. Confirmer l'éligibilité, le numéro de téléphone, les horaires et l'adresse masquée (décisions 1 à 3).
2. Créer la fiche avec le compte Google de l'entreprise : [créer une fiche d'établissement](https://support.google.com/business/answer/10514137?hl=fr).
3. Saisir le nom `NEOBATYS`, la catégorie principale, l'adresse de validation, puis choisir « je me déplace chez mes clients » et saisir la zone desservie : [établissements de zone](https://support.google.com/business/answer/9157481?hl=fr).
4. Lancer la validation avec la méthode proposée : [valider sa fiche](https://support.google.com/business/answer/7107242?hl=fr).
5. Une fois la fiche validée, compléter la description, les services, les horaires, le site avec UTM, le logo, la couverture et les photos (section 1).
6. Publier le post G1, puis copier le lien d'avis : [obtenir le lien d'avis](https://support.google.com/business/answer/16816815?hl=fr).
7. Ajouter Gabin comme gestionnaire de la fiche.

### Meta

8. Vérifier, selon [`meta-whatsapp.md`](meta-whatsapp.md) section 3, que le portefeuille TAG Delme SARL existe et que vous en avez le contrôle total.
9. Créer la Page Facebook `NEOBATYS` depuis votre profil personnel, qui reste invisible des visiteurs : [créer une Page](https://www.facebook.com/business/help/473994396650734).
10. Remplir la page :
    - catégorie, intro, À propos, site, e-mail, zone ;
    - photo de profil, couverture, bouton d'action.
11. Rattacher la Page au portefeuille TAG Delme SARL : [ajouter une Page](https://www.facebook.com/business/help/720478807965744).
12. Créer le compte Instagram `neobatys` depuis l'appli, puis passer en compte professionnel (Paramètres, Type de compte et outils) en catégorie Logiciel.
13. Remplir le nom, la bio, le lien vers `/contact` et la photo de profil.
14. Rattacher Instagram au portefeuille et le relier à la Page : [ajouter un compte Instagram](https://www.facebook.com/business/help/620548115562686).
15. Ajouter Gabin au portefeuille avec un accès à la Page et au compte Instagram.
16. Ne pas ajouter de moyen de paiement tant qu'aucune publicité n'est décidée.
17. Créer 3 stories à la une : « Sites », « Logiciel », « IA ».

### LinkedIn

18. Depuis votre profil personnel, créer la page entreprise : [créer une Page](https://www.linkedin.com/help/linkedin/answer/a543852). LinkedIn peut demander une adresse au domaine `neobatys.com`. Ne pas afficher NEOBATYS comme expérience sur le profil du gérant.
19. Remplir la page :
    - logo, bannière, slogan, présentation ;
    - site, secteur, taille, siège.
20. Ajouter Gabin comme super administrateur.

### Publication et site

21. Publier les posts 01 à 03, puis programmer 04 à 09 (Meta Business Suite et LinkedIn).
22. Envoyer les quatre URL (fiche Google, Facebook, Instagram, LinkedIn) en session Claude Code.
23. Partager le lien du site une fois sur chaque réseau et contrôler l'aperçu : [débogueur de partage Meta](https://developers.facebook.com/tools/debug/), [Post Inspector LinkedIn](https://www.linkedin.com/post-inspector/).

**Mettre les URL sur le site.** Une fois les URL connues, il suffit de les renseigner dans `content/data/site.json`, dans `socials` (`facebook`, `instagram`, `linkedin`), ou dans Pages CMS. Elles apparaissent alors :
- dans le pied de page ;
- dans les données structurées de l'entreprise (`sameAs`).

Tant qu'un champ est vide, rien ne s'affiche (`isFilled`, `lib/placeholders.ts`). Le lien de la fiche Google n'a pas de champ prévu : voir la décision 7.

## 4. Décisions ouvertes

1. **Éligibilité à la fiche Google.** L'équipe rencontre-t-elle les artisans en personne (démo, mise en route, photos de chantier) ? Recommandation : oui, et l'écrire dans l'offre. Sinon, ne pas créer la fiche, plutôt que risquer une suspension.
2. **Numéro de téléphone.** `site.json` contient encore `[TÉLÉPHONE]`. Recommandation : une ligne mobile dédiée à NEOBATYS, sans serveur vocal, renseignée à la fois sur la fiche et dans `site.json`.
3. **Adresse et horaires.** L'adresse de Strassen est-elle un bureau où quelqu'un travaille, ou une domiciliation ? Recommandation : adresse masquée, zone Metz, Moselle, Luxembourg (et Thionville), du lundi au vendredi de 8 h à 18 h. Si c'est une domiciliation sans personnel, Google interdit la fiche « bureau virtuel » : en parler avant de valider.
4. **Notes fictives dans les maquettes du site.** Les maquettes affichent des notes et des nombres d'avis Google inventés pour des artisans imaginaires (« 4,9/5 · 132 avis Google »). Elles sont étiquetées « MAQUETTE », mais l'article L121-4 vise les faux avis, et l'argument « pas de faux avis » de NEOBATYS en pâtit. Recommandation : remplacer ces notes par un emplacement neutre (« vos avis Google ici ») dans un chantier séparé, sur `content/data/projects.json` et les composants `components/mockups/trade/`.
5. **Post 06 (électricien).** La maquette filmée montre la photo d'une personne, tirée d'une banque d'images. Recommandation : faire le Reel sans s'arrêter sur la photo, ou changer l'image de la maquette dans le même chantier que la décision 4.
6. **Mesurer la provenance.** `PageViewPing` n'enregistre que le chemin, donc l'UTM de la fiche n'est pas compté. Recommandation : petit chantier pour enregistrer aussi `utm_source` dans `/api/vue`, sans cookie et sans donnée personnelle. D'ici là, utiliser les statistiques de la fiche.
7. **Lien de la fiche Google sur le site.** `site.json` n'a pas de champ prévu pour ce lien. Recommandation : ajouter l'URL de la fiche (format court `g.page` ou celui que Google fournit) à `sameAs` une fois la fiche validée. C'est un changement d'une ligne, à faire quand l'URL existe.
8. **Portefeuille Meta.** Recommandation : un seul portefeuille, celui de TAG Delme SARL, décrit dans [`meta-whatsapp.md`](meta-whatsapp.md). Pas de portefeuille « NEOBATYS » séparé.

Pistes d'amélioration (avis automatiques chez Podium, Birdeye et Jobber) : [`veille/avis-et-fiche-google.md`](veille/avis-et-fiche-google.md).
