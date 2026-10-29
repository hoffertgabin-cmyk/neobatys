---
name: livrer
description: Livre le chantier en cours sous forme de pull request vérifiée. Utiliser quand le travail est fini et doit partir vers main.
---

# Livrer un chantier

1. `git fetch`. Si `origin/main` a avancé, fusionner `origin/main` dans la branche et régler les conflits.
2. `gh pr list` : si une PR ouverte touche les mêmes fichiers, s'arrêter et le signaler.
3. Vérifier en local, dans l'ordre, et corriger jusqu'à ce que tout passe :
   `npx next typegen && npm run typecheck && npm run lint && npm run build`
4. Relire le diff (`git diff origin/main`) : rien d'ancien laissé en place, pas de secret, pas de fichier hors sujet.
5. Commit en français, une phrase qui dit ce qui change pour le visiteur ou l'associé.
6. Push de la branche, puis `gh pr create` avec : ce qui change, les fichiers touchés, comment tester.
7. Attendre la CI (`gh pr checks <n> --watch`). Rouge : corriger et repousser. Verte : donner le lien de la PR et l'aperçu Vercel à l'utilisateur.
8. Ne pas fusionner sans l'accord de l'utilisateur.
