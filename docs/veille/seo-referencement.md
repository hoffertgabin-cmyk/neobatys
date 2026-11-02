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
