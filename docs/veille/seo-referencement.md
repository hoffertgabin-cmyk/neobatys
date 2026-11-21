# Veille : référencement (1er novembre 2026)

Suite du chantier « référencer neobatys.com au maximum ». Les idées déjà relevées sont dans `docs/veille/seo-acquisition.md` ; ici, uniquement ce qui s'ajoute.

## Pistes

### 1. IndexNow : signaler les pages modifiées à Bing et aux moteurs partenaires

- **Source.** Protocole ouvert, une clé dans un fichier texte à la racine et un appel HTTP à chaque publication : https://www.indexnow.org/documentation
- **Pour NEOBATYS.** Les guides et pages métier sont modifiés depuis Pages CMS ; Bing les relirait sans attendre son passage. Google ne l'utilise pas.
- **Effort S** (fichier clé et appel après déploiement), **impact S**.

### 2. Parrainage entre artisans

- **Source.** Housecall Pro offre 200 $ au parrain et au filleul : https://www.housecallpro.com/refer/
- **Pour NEOBATYS.** Le bouche-à-oreille est le premier canal des artisans ; une page `/parrainage` rappelée après chaque mise en place. Récompense à fixer par les associés.
- **Effort S, impact M.**

### 3. Fiches locales hors Google

- **Source.** Bing reprend une fiche Google Business Profile (https://www.bing.com/forbusiness/) ; Apple Business gère la fiche Plans (https://business.apple.com/).
- **Pour NEOBATYS.** Mêmes données NAP partout, une heure de travail pour deux moteurs de plus.
- **Effort S, impact S.**

## Top 3

1. Parrainage (impact le plus fort, attend une décision commerciale).
2. Fiches Bing et Apple, dès que la fiche Google est validée.
3. IndexNow : en place depuis le 2 novembre 2026 (`scripts/indexnow.mjs`, `.github/workflows/indexnow.yml`).

## Ajout du 21 novembre 2026 : stratégie de référencement

Pistes relevées chez les éditeurs américains pour la stratégie (`docs/STRATEGIE-REFERENCEMENT.md`). Pages lues le 21/11/2026.

### 4. Outils gratuits par métier, en libre accès

- **Source.** ServiceTitan publie une page d'outils gratuits pour les métiers du bâtiment : https://www.servicetitan.com/tools
- **Pour NEOBATYS.** Le calculateur de TVA et le modèle de devis existent déjà. Ajouter un modèle de relance de devis et un modèle de demande d'avis Google, en tête des guides correspondants (contenus 1 et 3 de la stratégie).
- **Effort S, impact M.**

### 5. Pages de comparaison assumées

- **Source.** Housecall Pro regroupe ses comparaisons face aux concurrents sur une page : https://www.housecallpro.com/compare/
- **Pour NEOBATYS.** Les recherches « obat avis », « tolteck avis », « equivalent obat » existent. Une comparaison honnête « logiciel seul ou logiciel avec agents installés » capte ces recherches, à condition de ne rien dire de faux sur le concurrent (prix et fonctions relevés à date, sources citées).
- **Effort M, impact M.** Attendre d'avoir des clients à citer.

### 6. La demande d'avis présentée comme un produit

- **Source.** Podium vend la collecte d'avis comme un produit à part : https://www.podium.com/product/reviews
- **Pour NEOBATYS.** L'agent « avis Google » mérite sa page, reliée au guide « Demander un avis Google » (contenu 3 de la stratégie).
- **Effort S une fois l'exemple réel fourni, impact M.**

### Top 3 de cet ajout

1. Modèles gratuits de relance et de demande d'avis (piste 4), avec les deux premiers guides.
2. Page de l'agent avis (piste 6).
3. Comparaisons assumées (piste 5), plus tard.
