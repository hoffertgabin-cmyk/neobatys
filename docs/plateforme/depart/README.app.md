# NEOBATYS, la plateforme

Logiciel en ligne des artisans clients de NEOBATYS (nom commercial de TAG Delme SARL) : demandes, devis et factures, assistants IA, avis Google, WhatsApp, statistiques. Chaque artisan a son compte ; NEOBATYS a son back-office sur la même application.

- En ligne : https://app.neobatys.com (`admin.neobatys.com` redirige vers `/interne`)
- Site vitrine, dépôt séparé : `neobatys` (www.neobatys.com). Il envoie ses demandes de contact à `POST /api/leads` et ses pages vues à `POST /api/vues`.
- Conception, choix et plan : `docs/plateforme-admin.md` du dépôt du site, recopié ici dans `docs/conception.md` au premier commit.

## Pile

Next.js (App Router, TypeScript, Tailwind), Postgres, Drizzle ORM, Better Auth (organisations, rôles, double authentification), Stripe Billing, API Anthropic, API WhatsApp Cloud de Meta, Resend. Hébergé sur Vercel. Versions exactes : `package.json`.

## Démarrer en local

```bash
cp .env.example .env.local   # remplir avec les valeurs de développement, jamais celles de production
npm install
npm run dev
```

## Vérifier avant une PR

```bash
npm run typecheck && npm run lint && npm test && npm run build
```

Les règles de travail sont dans `AGENTS.md`.
