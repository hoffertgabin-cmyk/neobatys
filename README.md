# NEOBATYS · Site vitrine

Site vitrine de NEOBATYS (Metz) : création de sites internet, logiciel de gestion et mise en place de l'IA pour les artisans du bâtiment.

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS 4** (design tokens dans `app/globals.css`)
- **Motion** (ex-Framer Motion) pour les interactions, **Lenis** pour le défilement fluide
- **lucide-react** pour les icônes, **Geist** via `next/font`
- Formulaire **react-hook-form + zod**, envoi par route API avec **Resend** (optionnel)

## Lancer le projet

Prérequis : Node.js 20.9 ou plus récent.

```bash
npm install
cp .env.example .env.local   # puis complétez si besoin
npm run dev                  # http://localhost:3000
```

| Commande            | Rôle                         |
| ------------------- | ---------------------------- |
| `npm run dev`       | serveur de développement     |
| `npm run build`     | build de production          |
| `npm start`         | lance le build de production |
| `npm run lint`      | vérification ESLint          |
| `npm run typecheck` | vérification TypeScript      |
| `npm run format`    | mise en forme Prettier       |

## Modifier les contenus (sans toucher au code)

Tous les textes sont dans le dossier **`content/`** :

| Fichier                   | Contenu                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------- |
| `content/site.ts`         | nom, ville, **téléphone, e-mail, zone, SIRET**, adresse, horaires, réseaux sociaux |
| `content/home.ts`         | hero, avant/après, résultats, cas d'usage IA, étapes, CTA final, titres            |
| `content/offers.ts`       | offre Sites internet, offre Logiciel, Pack combiné                                 |
| `content/pricing.ts`      | les 3 formules et leurs prix (mensuel / annuel)                                    |
| `content/faq.ts`          | questions fréquentes (aussi utilisées pour le SEO)                                 |
| `content/trades.ts`       | métiers du bandeau défilant et de la liste du formulaire                           |
| `content/stats.ts`        | chiffres clés **(exemples à remplacer)**                                           |
| `content/projects.ts`     | réalisations **(exemples à remplacer)**                                            |
| `content/testimonials.ts` | témoignages **(exemples à remplacer)**                                             |
| `content/pages.ts`        | textes des pages `/sites-internet`, `/logiciel`, `/contact`                        |
| `content/legal.ts`        | mentions légales et politique de confidentialité                                   |
| `content/navigation.ts`   | liens du menu et du pied de page                                                   |

Les icônes se choisissent par leur nom (`"phone"`, `"zap"`…) : la liste est dans `components/ui/Icon.tsx`.

**Badges « Exemple »** : tant que `showPlaceholderBadges` vaut `true` dans `content/site.ts`, un badge s'affiche sur les chiffres, réalisations et témoignages d'exemple. Passez-le à `false` quand vos vraies données sont en place.

**Images de réalisations** : déposez vos captures dans `public/images/realisations/` et renseignez `image: "/images/realisations/mon-projet.jpg"` dans `content/projects.ts`. Elles sont optimisées automatiquement par `next/image`.

## Formulaire de contact

Le formulaire envoie les demandes à `app/api/contact/route.ts` (validation zod, champ anti-robots, limite de 5 envois / 10 min par IP).

- **Sans configuration** : les demandes sont seulement écrites dans les logs du serveur (mode placeholder).
- **Avec Resend** : créez un compte sur [resend.com](https://resend.com), vérifiez votre domaine, puis définissez :

```bash
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=vous@neobatys.fr          # plusieurs adresses séparées par des virgules
CONTACT_FROM_EMAIL="NEOBATYS <contact@neobatys.fr>"
```

Le lien `/contact?service=site|logiciel|pack` pré-sélectionne le service demandé.

## Cookies et RGPD

Le site ne dépose **aucun traceur** : seul le choix de l'utilisateur est mémorisé (stockage local, 6 mois). Le bandeau propose « Tout refuser » et « Tout accepter » au même niveau, et se rouvre via « Gérer les cookies » dans le pied de page.

Pour ajouter un outil de mesure d'audience plus tard, chargez-le uniquement si `readConsent() === "accepted"` (voir `lib/consent.ts`, événement `neobatys:consent`).

## SEO

- Titres, descriptions et Open Graph par page (`lib/seo.ts`), image de partage générée (`app/opengraph-image.tsx`)
- Données structurées JSON-LD : `ProfessionalService` (LocalBusiness), `Service`, `FAQPage`
- `sitemap.xml` et `robots.txt` générés depuis `NEXT_PUBLIC_SITE_URL`

## Déployer sur Vercel

1. Poussez le projet sur GitHub (ou GitLab / Bitbucket).
2. Sur [vercel.com/new](https://vercel.com/new), importez le dépôt : Next.js est détecté automatiquement.
3. Dans **Settings → Environment Variables**, ajoutez `NEXT_PUBLIC_SITE_URL`, et si besoin `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
4. Déployez, puis branchez votre nom de domaine dans **Settings → Domains**.

Chaque nouveau push sur la branche principale redéploie le site automatiquement.

## Structure

```text
app/            pages (accueil, sites-internet, logiciel, contact, pages légales), API, SEO
components/
  ui/           Button, Section, Card, SpotlightCard, Accordion, Marquee, Counter…
  motion/       Reveal/Stagger (CSS + IntersectionObserver), WordCascade, SmoothScroll
  layout/       Navbar, MobileMenu, Footer, CookieBanner, Logo
  mockups/      maquettes de site, tableau de bord et téléphone dessinées en code
  sections/     une section de page par fichier
  forms/        ContactForm
content/        tous les textes modifiables
lib/            utilitaires, SEO, schéma du formulaire, consentement
```

## Animations et accessibilité

- Seuls `transform` et `opacity` sont animés ; tout est coupé si l'appareil demande moins d'animations (`prefers-reduced-motion`).
- Les apparitions au défilement sont en CSS : sans JavaScript, tout le contenu reste visible.
- Contrastes WCAG AA vérifiés : les boutons orange ont un texte bleu nuit (le blanc sur `#F97316` ne fait que 2,8:1), et des nuances `chantier-dark`, `ardoise-dark` et `ardoise-light` servent aux petits textes.
