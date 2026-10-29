# Ce qu'il reste à personnaliser

Tout se modifie depuis Pages CMS (voir [EDITION.md](EDITION.md)), ou directement dans les fichiers `content/data/*.json`. Cherchez `[` pour retrouver chaque point.

## Informations de l'entreprise (`content/data/site.json`)

- [ ] `[TÉLÉPHONE]` (affichage) et `phoneHref` au format `+33612345678` : tant qu'il n'est pas rempli, le numéro et les boutons « Appeler » sont masqués
- [x] E-mail : `contact@neobatys.com` (boîte OVH)
- [ ] Adresse du siège au Luxembourg : `[ADRESSE DU SIÈGE]`, `[CODE POSTAL]`, `[VILLE]`
- [ ] Liens Facebook / Instagram / LinkedIn (les icônes apparaissent dès qu'un lien est renseigné)
- [ ] URL définitive du site (`NEXT_PUBLIC_SITE_URL`)

## Contenus d'exemple à remplacer

- [ ] **Chiffres clés** (`content/data/stats.json`) : les 4 valeurs sont fictives
- [ ] **Réalisations** (`content/data/projects.json`) : 9 projets d'exemple (un par métier, chacun avec sa maquette et ses couleurs dans `theme`), à remplacer par de vrais clients (avec leur accord) et leurs captures d'écran
- [ ] **Témoignages** (`content/data/testimonials.json`) : 4 avis d'exemple, à remplacer par de vrais avis (avec accord écrit)
- [ ] Pour chaque vrai contenu, décocher « Exemple » : il s'affiche aussitôt. La case « Afficher les contenus d'exemple » (`showSampleContent`) reste décochée sur le site en ligne
- [ ] « Économisez jusqu'à 20 % » et « Le plus choisi » (`content/data/offers.json`, `content/data/pricing.json`) : à confirmer

## Tarifs (`content/data/pricing.json`)

- [ ] Prix de création / mise en place et prix mensuels / annuels des 3 formules

## Logiciel

- [ ] Vérifier que les fonctionnalités annoncées correspondent à votre logiciel (signature électronique, import, export comptable…) dans `content/data/offers.json`, `content/data/pages.json` et `content/data/faq.json`
- [ ] « Données hébergées en France [À VÉRIFIER] » dans `content/data/pages.json`

## Pages légales (`content/data/legal.json`)

- [x] Société éditrice : TAG Delme SARL, SARL de droit luxembourgeois (NEOBATYS est son nom commercial)
- [ ] Capital social, n° RCS Luxembourg (B…), n° TVA (LU…)
- [ ] N° d'autorisation d'établissement (si applicable)
- [ ] Directeur de la publication
- [ ] Hébergeur (pré-rempli avec Vercel, à vérifier)
- [ ] Transferts hors UE (Vercel, Resend, Anthropic) et durée de conservation dans la politique de confidentialité
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
