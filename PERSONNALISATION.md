# Ce qu'il reste à personnaliser

Cherchez `TODO` et `[` dans le dossier `content/` pour retrouver chaque point.

## Informations de l'entreprise (`content/site.ts`)

- [ ] `[TÉLÉPHONE]` (affichage) et `phoneHref` au format `+33612345678` : tant qu'il n'est pas rempli, les boutons « Appeler » renvoient vers `/contact`
- [ ] `[EMAIL]`
- [ ] `[ZONE]` (ex. « Metz, Thionville et toute la Moselle »)
- [ ] `[SIRET]`
- [ ] `[ADRESSE]` et `[CODE POSTAL]`
- [ ] Horaires
- [ ] Liens Facebook / Instagram / LinkedIn (les icônes apparaissent dès qu'un lien est renseigné)
- [ ] URL définitive du site (`NEXT_PUBLIC_SITE_URL`)

## Contenus d'exemple à remplacer

- [ ] **Chiffres clés** (`content/stats.ts`) : les 4 valeurs sont fictives
- [ ] **Réalisations** (`content/projects.ts`) : 9 projets d'exemple (un par métier, chacun avec sa maquette et ses couleurs dans `theme`), à remplacer par de vrais clients (avec leur accord) et leurs captures d'écran
- [ ] **Témoignages** (`content/testimonials.ts`) : 4 avis d'exemple, à remplacer par de vrais avis (avec accord écrit)
- [ ] Passer `showPlaceholderBadges` à `false` une fois tout remplacé
- [ ] « Économisez jusqu'à 20 % » et « Le plus choisi » (`content/offers.ts`, `content/pricing.ts`) : à confirmer

## Tarifs (`content/pricing.ts`)

- [ ] Prix de création / mise en place et prix mensuels / annuels des 3 formules

## Logiciel

- [ ] Vérifier que les fonctionnalités annoncées correspondent à votre logiciel (signature électronique, import, export comptable…) dans `content/offers.ts`, `content/pages.ts` et `content/faq.ts`
- [ ] « Données hébergées en France [À VÉRIFIER] » dans `content/pages.ts`

## Pages légales (`content/legal.ts`)

- [ ] Forme juridique, capital, RCS/RNE, n° TVA (ou mention « TVA non applicable, art. 293 B du CGI »)
- [ ] Directeur de la publication
- [ ] Hébergeur (pré-rempli avec Vercel, à vérifier)
- [ ] Prestataire d'e-mails et durée de conservation dans la politique de confidentialité
- [ ] Date de mise à jour
- [ ] Faire relire ces textes (ce sont des modèles, pas un conseil juridique)

## Visuel

- [ ] Logo : un pictogramme provisoire est dessiné dans `components/layout/Logo.tsx` et `app/icon.svg`
- [ ] Photos de vos chantiers / de vous (facultatif, dans `public/images/`)

## Mise en ligne

- [ ] Assistant IA de la FAQ : clé `ANTHROPIC_API_KEY` à ajouter dans Vercel (voir README, section « Assistant IA de la FAQ »)
- [ ] Compte Resend + variables d'environnement pour recevoir les demandes par e-mail
- [ ] Nom de domaine branché sur Vercel
- [ ] Fiche Google Business pointant vers le site
