---
name: publier
description: Publier une modification du site NEOBATYS sans risque : récupérer les dernières modifications, créer une branche, vérifier (typecheck + build), commiter, ouvrir une pull request, contrôler l'aperçu Vercel, faire fusionner par l'utilisateur, puis vérifier le site en ligne. À utiliser dès qu'on veut « mettre en ligne », « publier », « pousser », « déployer », « envoyer sur GitHub » ou « ouvrir une PR ».
argument-hint: "[description courte du changement]"
---

# Publier une modification

Le site en ligne (`https://www.neobatys.com`) est redéployé automatiquement par Vercel **à chaque push sur `main`**. Toucher `main`, c'est modifier le site en direct. D'où ce circuit, à suivre dans l'ordre.

Expliquer chaque étape en français simple : l'utilisateur n'est pas développeur.

## Règles qui ne se discutent pas

- **Jamais de push direct sur `main`.** Toujours une branche puis une pull request (PR). C'est l'utilisateur qui fusionne.
- **Jamais de clé dans le code ni dans un commit** : `.env.local` ne se commite pas. Les clés (`RESEND_API_KEY`, `ANTHROPIC_API_KEY`…) vivent uniquement dans Vercel (Settings → Environment Variables) et, en local, dans `.env.local`. Une clé secrète ne prend jamais le préfixe `NEXT_PUBLIC_`.
- **`npm run typecheck` et `npm run build` doivent passer avant d'ouvrir la PR.**
- **Ne pas toucher à Vercel ni à OVH** (domaine, DNS) sans demande explicite de l'utilisateur.

## 1. Récupérer les dernières modifications

L'associé modifie les textes depuis Pages CMS (app.pagescms.org) : chaque enregistrement crée un commit sur `main`. Avant de travailler :

```bash
git checkout main
git pull
```

Si `git pull` signale un conflit, s'arrêter et expliquer la situation à l'utilisateur avant de continuer.

## 2. Créer une branche

Un nom court qui décrit le changement :

```bash
git checkout -b <sujet-du-changement>
```

Faire les modifications. Rappel : les textes se changent dans `content/` (ou `content/data/*.json` une fois Pages CMS en place, en mettant à jour `.pages.yml` si un champ est ajouté ou renommé), pas dans les composants.

## 3. Vérifier

```bash
npm run typecheck
npm run build
```

Conseillé aussi : `npm run lint`. Si une commande échoue, corriger avant d'aller plus loin et dire à l'utilisateur ce qui bloquait. Si Node.js n'est pas installé sur la machine, le dire clairement : on ne prétend pas avoir vérifié.

Contrôler ce qui part dans le commit :

```bash
git status
git diff --staged
```

Aucun fichier `.env*` (sauf `.env.example`), aucune clé, aucun fichier personnel.

## 4. Commiter et pousser la branche

```bash
git add <fichiers concernés>
git commit -m "<ce qui change, en français>"
git push -u origin <sujet-du-changement>
```

Message de commit : une phrase claire sur ce qui change pour le visiteur (« Contact : ajout du numéro de téléphone »).

Si le push échoue faute d'identifiants GitHub sur la machine, ne pas insister : le signaler à l'utilisateur.

## 5. Ouvrir la pull request

Avec `gh` s'il est installé :

```bash
gh pr create --base main --title "<titre>" --body "<ce qui change et comment le vérifier>"
```

Sinon, donner le lien à ouvrir :
`https://github.com/hoffertgabin-cmyk/neobatys/compare/main...<sujet-du-changement>`

Dans la description : ce qui change, les pages à regarder, ce qui n'a pas pu être vérifié.

## 6. Contrôler l'aperçu Vercel

Quelques minutes après l'ouverture de la PR, Vercel publie un **aperçu** (une adresse temporaire, affichée dans la PR). Sur cet aperçu :

- ouvrir chaque page modifiée, sur ordinateur et en largeur téléphone ;
- vérifier les textes, les liens, le formulaire de contact si concerné ;
- s'assurer que le déploiement Vercel est au vert dans la PR.

Montrer le résultat à l'utilisateur (captures ou lien) et noter ce qui ne va pas.

## 7. Fusion par l'utilisateur

C'est **l'utilisateur** qui clique sur « Merge pull request » dans GitHub, après avoir regardé l'aperçu. Ne pas fusionner à sa place, ne pas activer de fusion automatique sans qu'il l'ait demandé.

## 8. Vérifier le site en ligne

Après la fusion, Vercel redéploie `main` (quelques minutes). Ensuite :

- ouvrir `https://www.neobatys.com` et les pages modifiées ;
- recharger sans cache si l'ancienne version s'affiche encore ;
- si le changement touche le SEO, contrôler `https://www.neobatys.com/sitemap.xml` et le code source de la page (voir le skill `seo-local`).

Revenir sur `main` et le mettre à jour pour la suite :

```bash
git checkout main
git pull
```

## En cas de problème après la mise en ligne

Ne pas pousser de correctif en urgence sur `main`. Dans Vercel, l'utilisateur peut remettre le déploiement précédent en production (Deployments → déploiement précédent → « Instant Rollback »). Puis corriger sur une nouvelle branche en reprenant ce circuit.
