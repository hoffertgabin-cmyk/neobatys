# Règles du projet NEOBATYS, la plateforme

Deux associés (Ilann et Gabin) travaillent sur ce dépôt, chacun avec ses sessions Claude Code. `main` est en ligne : chaque commit sur `main` est déployé par Vercel sur app.neobatys.com. Ce dépôt contient les données de nos clients et de leurs clients : la prudence passe avant la vitesse.

## Avant de commencer

- `git fetch` puis `gh pr list` : lire les PR ouvertes et leurs fichiers (`gh pr view <n> --json files`).
- Ne pas modifier un fichier qu'une PR ouverte modifie. En cas de chevauchement, le dire avant d'écrire.
- Partir de `origin/main` à jour, sur une branche neuve.

## Un chantier = une branche = une PR

- Une PR traite un seul sujet. Petite, fusionnée vite (moins de 2 jours).
- Jamais de push direct sur `main`.
- Fusion seulement si la CI (`.github/workflows/ci.yml` : typecheck, lint, tests, build) est verte : `gh pr checks <n>`.
- Une migration de base est dans sa propre PR, relue par l'autre associé avant fusion.

## Avant de clore un chantier

- Chercher des pistes d'amélioration du sujet traité chez les sociétés qui servent les artisans (Jobber, Housecall Pro, ServiceTitan, Podium, HighLevel...).
- Chaque piste cite sa source (URL vérifiée), dit ce qu'elle apporterait et son effort. Rien d'inventé.
- Les écrire dans `docs/veille/<sujet>.md` et proposer un top 3. Ne rien coder de plus sans accord.

## Données et multi-clients

- Toute table métier a une colonne `organization_id`. Aucune requête ne la lit sans filtrer par l'organisation de la session ; les requêtes passent par les fonctions de `lib/db/`, jamais en SQL brut dans une page.
- Row Level Security activée sur les tables métier, en plus du filtre applicatif.
- Le test d'isolation (deux organisations, aucune route ne renvoie les données de l'autre) doit rester vert ; toute nouvelle route y est ajoutée.
- Le schéma change uniquement par une migration Drizzle versionnée. Jamais de modification à la main en production.
- Une facture émise ne se modifie pas : avoir pour corriger. Numérotation continue par organisation.
- Tout accès d'un membre NEOBATYS (`staff`) à un compte client passe par « voir comme le client » et s'écrit dans `audit_log`.

## Sécurité et RGPD

- Pas de clé, de mot de passe ou de `.env` dans un commit. Les secrets vont dans les variables Vercel.
- Les jetons des clients (WhatsApp, plateforme de facturation) sont chiffrés en base et jamais renvoyés en clair à l'écran.
- Pas de données personnelles dans les logs (ni e-mail, ni téléphone, ni contenu de message).
- Le consentement à la prospection est distinct de l'inscription et horodaté ; son retrait est un clic. Un e-mail transactionnel ne contient pas de prospection.
- Ne jamais afficher le nom du gérant de TAG Delme SARL.

## Code

- Les textes affichés vont dans `content/`, pas dans les composants.
- Remplacer, c'est retirer : l'ancien code, style, route ou dépendance disparaît dans le même commit. Vérifier par grep qu'il n'a plus d'appelant.
- Un module = un dossier `modules/<nom>/` (écrans, requêtes, réglages validés par zod, carte de l'accueil) et une entrée dans le catalogue `modules/catalogue.ts`.
- Tout appel à un modèle d'IA passe par `lib/ia/` (un seul point d'entrée, coût journalisé par organisation).
- Ne pas deviner une API, une version ou un flag : vérifier dans `node_modules` ou la doc. Pour Next.js, lire `node_modules/next/dist/docs/`.
- La doc (README, ce fichier, `docs/`) qui devient fausse est corrigée dans la même PR.
- Français, pas d'emoji, pas de tiret cadratin dans les textes.
