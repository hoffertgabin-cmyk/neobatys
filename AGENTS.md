<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Règles du projet NEOBATYS

Deux associés (Ilann et Gabin) travaillent sur ce repo, chacun avec ses sessions Claude Code. `main` est en ligne : chaque commit sur `main` est déployé par Vercel sur neobatys.vercel.app.

## Avant de commencer

- `git fetch` puis `gh pr list` : lire les PR ouvertes et leurs fichiers (`gh pr view <n> --json files`).
- Ne pas modifier un fichier qu'une PR ouverte modifie. En cas de chevauchement, le dire à l'utilisateur avant d'écrire.
- Partir de `origin/main` à jour, sur une branche neuve.

## Un chantier = une branche = une PR

- Une PR traite un seul sujet. Petite, fusionnée vite (moins de 2 jours) pour éviter les conflits.
- Jamais de push direct sur `main`.
- Fusion seulement si la CI (`.github/workflows/ci.yml` : typecheck, lint, build) est verte : `gh pr checks <n>`.
- Pour livrer : skill `/livrer`.

## Code

- Les textes vont dans `content/`, pas dans les composants.
- Remplacer, c'est retirer : l'ancien code, style, route ou dépendance disparaît dans le même commit. Vérifier par grep qu'il n'a plus d'appelant.
- La doc (README, PERSONNALISATION.md, ce fichier) qui devient fausse est corrigée dans la même PR.
- Ne pas deviner une API, une version ou un flag : vérifier dans `node_modules` ou la doc.
- Pas de clé, de mot de passe ou de `.env` dans un commit. Les secrets vont dans les variables Vercel.
