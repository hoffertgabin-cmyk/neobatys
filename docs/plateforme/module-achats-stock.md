# Module Achats, stock et outillage

Conception, pas de code. Complète [`docs/plateforme-admin.md`](../plateforme-admin.md) (sections 2.2 et 6). Sources ouvertes le 1er novembre 2026 ; ce qui n'a pas pu être vérifié est marqué comme tel.

Demande d'Ilann :
1. Un devis relié aux fournisseurs : les articles et les prix viennent des catalogues, idéalement des prix négociés du compte pro de l'artisan.
2. Un stock moderne : ce que l'entreprise possède (matériel, outillage, consommables), ce qu'il faut pour les chantiers à venir, quand commander, les risques de rupture, l'évolution des prix.
3. Dans le tableau de bord du client, activable selon le métier, prévu dès la conception.

## 1. Ce qu'on a trouvé

### 1.1 Les prix des fournisseurs : pas de base unique, quatre sources réelles

Il n'existe pas de base publique des prix de Leroy Merlin ou Castorama exploitable par un logiciel : aucune API trouvée, et `developer.leroymerlin.fr` refuse l'accès (non vérifié au-delà). Copier les prix de leurs sites (scraping) est exclu. Surtout, ce ne sont pas les prix de l'artisan : son prix est le prix **net négocié** chez son négoce, qui ne se trouve que chez ce négoce.

| Source | Ce qu'elle donne | Accès | Source vérifiée |
|---|---|---|---|
| **Fichier tarif de l'artisan** (Excel ou CSV téléchargé depuis son compte pro) | Ses prix nets, toutes marques | Import dans notre logiciel, sans partenariat. C'est ce que fait Batappli (« compatible avec plus de 300 tarifs fournisseurs ») | https://www.batappli.fr/ |
| **Factures électroniques de ses fournisseurs** | Le prix réellement payé, ligne par ligne, et son évolution | Les factures entrantes arrivent par la plateforme agréée de l'artisan (réception obligatoire depuis le 1er septembre 2026). Obat lit déjà les factures fournisseurs reçues via Iopole | https://www.obat.fr/ |
| **API Rexel** (électricité) | Commandes, stocks, délais, devis, « conditions d'affaires » ; « Accédez à vos tarifs négociés » | Pack APIs Découverte « offert », Premium sur abonnement ; conditions d'usage par un éditeur pour plusieurs clients non lues | https://www.rexel.fr/frx/solutions/solutions_achats_connectees/api |
| **API Sonepar** (électricité, génie climatique) | Stocks, prix, documents, commandes, punch-out, EDI | Sur formulaire, pour « fournir nos éléments » à un autre logiciel | https://www.sonepar.fr/fr-fr/static/services-eprocurement |
| Point.P, Cedeo (Saint-Gobain) | Prix négociés et disponibilité en agence | Connexion existante chez Tolteck et Kalitics, donc un partenariat ; aucun canal public trouvé | https://www.kalitics.com/integrations |
| Gedimat, Chausson, Tout Faire, Würth France, Leroy Merlin Pro, Castorama et Brico Dépôt pro | Rien trouvé | Non vérifié | |

Formats du secteur :
- **FAB-DIS** (créé par IGNES et COEDIS, version 3.0, plus de 200 champs) circule du fabricant vers le distributeur avec le **tarif public** et des fiches riches (photos, logistique, classification ETIM). Les prix nets passent par un fichier à part, le CNR (« Conditions Négociées et Remisées »), avec des remises par famille ou par référence. Kit à 240 € HT par an ; l'accès d'un éditeur de logiciel d'artisans aux fichiers des fabricants n'est pas confirmé. https://fabdis.fr/fr/les-cnr/, https://fabdis.fr/fr/kit/
- **ETIM** : classification internationale des produits, version française d'ETIM 10.0 publiée. https://www.etim-france.fr/
- **EDI** : commande, avis d'expédition, facture (messages ORDERS, DESADV, INVOIC), proposé par Rexel et Sonepar.

Bases de prix d'**ouvrages** (fourni-posé, temps de pose), pour démarrer un devis sans catalogue :
- **Batiprix** (Groupe Moniteur) : 23 corps d'état, mise à jour mensuelle, API REST pour les éditeurs partenaires avec intégration « gratuite » ; l'artisan paie 279 € par an, par lot et par utilisateur. https://www.batiprix.com/content/71-devenir-partenaire
- **BatiChiffrage** : 47 000 ouvrages pour les logiciels partenaires, 9 € HT par mois via Batappli. https://batichiffrage.fr/bibliotheque-de-prix-pour-logiciels-partenaires/
- Agrégateur **Tarifeo** : 800 fabricants et distributeurs, offre éditeurs, prix non publié. https://www.tarifeo.com/

### 1.2 Le stock chez les autres

| Logiciel | Stock par lieu ou camion | Réapprovisionnement | Particularité | Source |
|---|---|---|---|---|
| ServiceTitan | Oui (camions et entrepôts, un technicien par camion) | Points mini et maxi par article et par lieu, recommandations regroupées en bons de commande par fournisseur, lieu ou intervention | L'ancien mode ne suit pas le stock en temps réel : il rachète ce qui a été facturé (« Materials Used ») | https://help.servicetitan.com/how-to/procure-replenishment, https://help.servicetitan.com/how-to/inventory-replenishment |
| Housecall Pro | Non en natif | Renvoie à QuickBooks Online Plus | Rapport « Material Usage on Jobs » | https://help.housecallpro.com/en/articles/2154660-how-do-i-keep-track-of-inventory |
| Jobber | Pas d'inventaire natif trouvé (non confirmé) | Par intégrations | | https://www.getjobber.com/faq/ |
| Sortly | Oui | Alertes de stock bas, bons de commande (offre Ultra) | QR illimités dès 49 $ par mois | https://www.sortly.com/pricing/ |
| inFlow | Oui | Points de commande, bons de commande | À partir de 99 $ par mois en annuel | https://www.inflowinventory.com/software-pricing-inflow |
| Hilti ON!Track | Outillage et consommables | Alertes de stock bas, historique « qui a pris quoi » | Pas de prix public | https://www.hilti.com/content/resources/purchasing-and-logistics/local/refill |

Pour une petite entreprise du bâtiment, Obat (source intéressée) conseille : un seuil mini et un seuil de réassort pour les articles courants, l'affectation de chaque outil à un chantier ou une personne, et l'achat à partir du planning (https://www.obat.fr/blog/gestion-stock-btp/). La FFB rapporte que 7 entreprises du bâtiment sur 10 ont déjà subi un vol de matériel (baromètre Coyote 2026, https://www.ffbatiment.fr/actualites-batiment/actualite/vols-sur-chantiers-comm-presse-2026) : l'inventaire nominatif de l'outillage a une vraie valeur.

Aucune étude CAPEB ou FFB trouvée sur la part des petites entreprises qui tiennent un inventaire précis.

### 1.3 Évolution des prix et ruptures

- **Index BT de l'INSEE** (BT01 à BT54, base 2010) : mensuels, publiés environ 6 semaines après le mois (octobre 2024 paru le 13 décembre 2024). Exemples d'identifiants : BT01 = 001710986, BT47 électricité = 001710979, BT50 rénovation-entretien = 001710982. https://www.insee.fr/fr/statistiques/8309793, https://www.insee.fr/fr/plan-du-site/famille-bdm/103173847
- **Indices de prix de production de l'industrie** : mensuels, environ un mois de décalage. Identifiants des séries acier, cuivre, bois à chercher dans la base de l'INSEE (non trouvés). https://www.insee.fr/fr/statistiques/9058452
- **Accès** : API de la base de données macroéconomiques (format SDMX) via https://portail-api.insee.fr/ (clé et quotas non vérifiés) ; Licence Ouverte 2.0, réutilisation commerciale autorisée en citant « Source : Insee » et la date. https://insee.fr/fr/information/2008466
- **Hausses tarifaires** : en avril 2026, 70 % des artisans interrogés par la CAPEB avaient reçu des courriers de hausse applicables dès le 1er avril. La CAPEB conseille des devis à durée de validité courte avec clause de révision sur les index BT. https://www.capeb.fr/actualites/hausse-du-carburants-et-des-materiaux, https://www.capeb.fr/service/faire-face-a-l-augmentation-des-prix-des-materiaux
- Une hausse générale au 1er janvier chez les fournisseurs : aucune source trouvée.

Ce que le module peut dire honnêtement : la tendance de chaque famille de matériaux sur 3, 6 et 12 mois (index INSEE), l'évolution des prix réellement payés par l'artisan (ses factures), et « une hausse est annoncée chez tel fournisseur à telle date » quand l'artisan la saisit. Il ne prétend pas prédire le meilleur moment pour acheter : les indices sont nationaux, publiés en retard, et ne reflètent ni les remises ni le négoce.

## 2. Ce que fait le module

Trois parties, activables séparément selon le métier.

### 2.1 Catalogue d'articles relié aux devis (inclus dans Devis et factures)

- L'artisan importe le fichier tarif de chacun de ses fournisseurs (Excel ou CSV) : on reconnaît les colonnes (référence, libellé, unité, prix, famille, remise), on garde la correspondance par fournisseur pour les imports suivants.
- Remises par famille ou par référence, cascadées, calquées sur la structure CNR de FAB-DIS : un seul modèle, quelle que soit la source.
- Dans le devis, l'artisan cherche un article (« plaque BA13 », « cuivre 14 ») et voit le prix net de chacun de ses fournisseurs, avec la date du tarif. Un ouvrage de sa bibliothèque contient des articles : si le prix d'un article change, l'ouvrage le signale.
- Les factures fournisseurs reçues par la plateforme agréée mettent à jour le dernier prix payé, sans saisie.
- Plus tard : API Rexel puis Sonepar ; base d'ouvrages Batiprix en option payée par l'artisan.

### 2.2 Besoins et achats par chantier

- Un devis signé crée un chantier ; ses lignes donnent la liste du matériel nécessaire, avec la date de début.
- **Besoin net** = quantités des chantiers qui démarrent dans les N prochaines semaines, moins le stock disponible, moins ce qui est déjà commandé.
- La liste d'achat est regroupée par fournisseur (le moins cher ou le fournisseur habituel), puis envoyée en bon de commande PDF par e-mail. Plus tard, commande directe par API chez Rexel ou Sonepar.
- Comparaison prévu (devis) et réel (factures fournisseurs rattachées au chantier) : la marge réelle du chantier.

### 2.3 Stock et outillage

- **Lieux** : dépôt, chaque camionnette, chaque chantier.
- **Outillage nominatif** : une étiquette QR par outil ; un scan au téléphone dit qui l'a, sur quel chantier, depuis quand, son état et sa prochaine vérification. Alerte quand un outil n'est pas revenu à la fin d'un chantier.
- **Consommables à forte rotation** (vis, chevilles, raccords, câble...) : seuil mini par lieu ; **point de commande** = consommation moyenne x délai du fournisseur + stock de sécurité, appris des sorties enregistrées. Alerte de rupture si les chantiers à venir font passer le stock sous le seuil.
- Pas d'inventaire comptable valorisé au départ : ce n'est pas ce qu'attend une entreprise de 1 à 20 personnes.

### 2.4 Dans le tableau de bord

Cartes de l'Accueil, visibles seulement si le module est actif : « À commander cette semaine » (par fournisseur), « Ruptures à venir », « Outils sortis », « Prix en hausse » (familles dont l'index ou le dernier prix payé a monté de plus de X % sur 3 mois).

Activation par défaut selon le gabarit du métier (décision 7) : catalogue et achats par chantier pour tous ; consommables pour plombier, électricien, chauffagiste ; outillage pour tous ceux qui ont des salariés.

## 3. Modèle de données

Ajouts au modèle de la section 4 de `docs/plateforme-admin.md`, tous avec `organization_id` :

```
suppliers            id, nom, type (négoce, grande surface, fabricant), connexion (fichier | api | facture), identifiants chiffrés
price_lists          id, supplier_id, importé_le, source (fichier, facture, api), correspondance des colonnes
articles             id, supplier_id, référence, libellé, unité, famille, code ETIM (facultatif), prix_net, remise, index_insee (ex. BT47)
price_history        article_id, prix, date, source (tarif | facture | api)
works                ouvrages de la bibliothèque (déjà prévus) ; work_items : work_id, article_id, quantité
quote_lines          ... + article_id ou work_id (facultatif)
jobs                 chantier créé depuis un devis signé : quote_id, adresse, début, fin, statut
locations            id, type (dépôt | véhicule | chantier), nom, job_id (si chantier)
stock_items          article_id, location_id, quantité, seuil_mini, seuil_réassort
stock_movements      article_id, de_location_id, vers_location_id, quantité, motif (achat | sortie chantier | transfert | inventaire | perte), job_id, user_id, date
tools                id, libellé, numéro de série, qr_code, location_id, affecté_à (user_id), job_id, état, prochaine_vérification
material_needs       job_id, article_id, quantité_prévue, quantité_couverte (calculé)
purchase_orders      id, supplier_id, statut, envoyé_le, job_id (facultatif) ; purchase_order_lines
supplier_invoices    id, supplier_id, reçue_le (via la plateforme agréée), job_id ; lignes rapprochées des articles
price_indices        code (BT01...), mois, valeur, publié_le  (commun à tous les clients, source INSEE)
```

## 4. MVP, coûts et partenariats

| Étape | Contenu | Coût externe | Dépend de |
|---|---|---|---|
| **A** (avec l'étape 2 du plan, Devis et factures) | Import des fichiers tarif, remises par famille, recherche d'article dans le devis, ouvrages reliés aux articles | Aucun | Rien |
| **B** | Chantier depuis le devis signé, besoins nets, liste d'achat par fournisseur, bon de commande PDF par e-mail | Aucun | A |
| **C** | Outillage par QR (étiquettes à imprimer), lieux, mouvements simples | Étiquettes | Rien |
| **D** | Factures fournisseurs reçues : dernier prix payé, prévu et réel par chantier | Inclus dans la plateforme agréée retenue (à confirmer avec Super PDP) | Raccordement à la plateforme agréée |
| **E** | Consommables au seuil mini, point de commande, alertes de rupture | Aucun | B, C |
| **F** | Index INSEE et cartes « Prix en hausse » | Gratuit (Licence Ouverte), clé d'API à créer | Rien |
| **G** | API Rexel (Découverte, offerte), puis Sonepar | Rexel Découverte gratuit ; Premium et Sonepar sur devis | Accord de Rexel ou Sonepar |
| **H** | Base d'ouvrages Batiprix en option | Intégration gratuite ; 279 € par an et par lot payés par l'artisan | Partenariat Batiprix |
| **I** | Point.P et Cedeo | Inconnu | Partenariat Saint-Gobain, plus facile avec des utilisateurs déjà installés |

FAB-DIS n'est pas prévu : il apporte des fiches produits, pas les prix de l'artisan.

Place dans le plan général : A avec l'étape 2 ; B, C, E et F forment une étape « Achats et stock » juste après ; D suit le raccordement à la plateforme agréée ; G, H et I dépendent des réponses des partenaires et peuvent avancer en parallèle.

## 5. Décisions prises par Ilann le 2 novembre 2026

| # | Décision | Suite à donner |
|---|---|---|
| 1 | Les prix viennent des prix nets de l'artisan (ses fichiers tarif, puis ses factures fournisseurs), pas des sites de Leroy Merlin ou Castorama | Étape A : import des fichiers tarif |
| 2 | Les factures fournisseurs reçues par la plateforme agréée tiennent les prix à jour | Point à l'ordre du jour du rendez-vous Super PDP : réception pour le compte de l'artisan, accès aux lignes de facture (étape D) |
| 3 | Accès à l'API Rexel (offre Découverte) | Demande faite au moment de l'étape B, après confirmation qu'un éditeur peut s'en servir pour plusieurs artisans |
| 4 | Base d'ouvrages : Batiprix en option payée par l'artisan, aucune incluse par défaut | Étape H, après accord de Batiprix |
| 5 | Stock limité à l'outillage nominatif par QR, aux consommables au seuil mini et aux achats par chantier ; pas d'inventaire comptable valorisé | Sections 2.2 et 2.3 |
| 6 | « Meilleur moment pour acheter » : tendances INSEE, prix payés et hausses annoncées seulement, rien de prédictif | Étape F |
| 7 | Activation par métier : catalogue et achats pour tous ; consommables pour plombier, électricien, chauffagiste ; outillage dès qu'il y a des salariés | Gabarits de métier (section 2.4) |
| 8 | Partenariat Saint-Gobain (Point.P, Cedeo) plus tard, avec des artisans utilisateurs à montrer | Étape I |

Aucune de ces suites ne crée de compte ni ne contacte un partenaire sans un nouvel accord d'Ilann.
