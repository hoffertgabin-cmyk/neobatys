# Contenu de départ du dépôt `neobatys-app`

Fichiers à copier tels quels à la racine du nouveau dépôt, le jour de sa création (étape 0 de [`docs/plateforme-admin.md`](../../plateforme-admin.md)) :

| Fichier ici | Destination dans `neobatys-app` |
|---|---|
| `README.app.md` | `README.md` |
| `AGENTS.app.md` | `AGENTS.md` |
| `CLAUDE.app.md` | `CLAUDE.md` |
| `ci.yml` | `.github/workflows/ci.yml` |

Ensuite, dans cet ordre : `npx create-next-app@16.4.3` dans un dossier vide (TypeScript, ESLint, Tailwind, App Router), ajouter le script `"test"` au `package.json`, copier ces fichiers par-dessus, premier commit, puis protection de la branche `main` (CI obligatoire, pas de push direct). Le bloc que `next dev` ajoute en tête d'`AGENTS.md` se garde, comme sur le site.

Les fichiers de règles portent le suffixe `.app.md` pour que les sessions Claude Code du site ne les chargent pas comme règles de ce dépôt-ci. Une fois le dépôt créé, ce dossier se supprime du dépôt du site (remplacer, c'est retirer).
