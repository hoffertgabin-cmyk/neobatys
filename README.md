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

Le plus simple : l'interface **Pages CMS** (https://app.pagescms.org), mode d'emploi dans [EDITION.md](EDITION.md). Plusieurs personnes peuvent l'utiliser en même temps.

Tous les textes sont dans le dossier **`content/data/`** (un fichier JSON par sujet, repris par le fichier `content/*.ts` du même nom) :

| Fichier                          | Contenu                                                                            |
| -------------------------------- | ---------------------------------------------------------------------------------- |
| `content/data/site.json`         | nom, ville, **téléphone, e-mail, zone, SIRET**, adresse, horaires, réseaux sociaux |
| `content/data/home.json`         | hero, avant/après, résultats, cas d'usage IA, étapes, CTA final, titres            |
| `content/data/offers.json`       | offre Sites internet, offre Logiciel, Pack combiné                                 |
| `content/data/pricing.json`      | les 3 formules et leurs prix (mensuel / annuel)                                    |
| `content/data/faq.json`          | questions fréquentes (aussi utilisées pour le SEO)                                 |
| `content/data/trades.json`       | métiers du bandeau défilant et de la liste du formulaire                           |
| `content/data/stats.json`        | chiffres clés **(exemples à remplacer)**                                           |
| `content/data/projects.json`     | réalisations **(exemples à remplacer)**                                            |
| `content/data/testimonials.json` | témoignages **(exemples à remplacer)**                                             |
| `content/data/pages.json`        | textes des pages `/sites-internet`, `/logiciel`, `/contact`                        |
| `content/data/legal.json`        | mentions légales et politique de confidentialité                                   |
| `content/data/navigation.json`   | liens du menu et du pied de page                                                   |

Les icônes se choisissent par leur nom (`"phone"`, `"zap"`…) : la liste est dans `components/ui/Icon.tsx`.

**Badges « Exemple »** : tant que `showPlaceholderBadges` vaut `true` dans `content/data/site.json` (case « Afficher les badges « Exemple » » dans Pages CMS), un badge s'affiche sur les chiffres, réalisations et témoignages d'exemple. Passez-le à `false` quand vos vraies données sont en place.

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

## Assistant IA de la FAQ

Sous les questions fréquentes, un champ permet au visiteur de poser sa propre question. La réponse est rédigée par Claude (Anthropic) via la route serveur `app/api/faq-assistant/route.ts` : **la clé API reste sur le serveur** et n'est jamais envoyée au navigateur.

- **Ce que sait l'assistant** : uniquement les textes du dossier `content/` (offres, tarifs, FAQ, zone, horaires). Modifiez ces fichiers, l'assistant suit. Les consignes sont dans `lib/faq-assistant.ts`.
- **Honnêteté** : il répond oui seulement si les contenus le disent, non s'ils disent le contraire, et « à confirmer avec nous » + lien contact dans tous les autres cas. Il ne promet ni prix sur mesure, ni délai, ni résultat, et ignore les valeurs entre crochets pas encore remplies.
- **Anti-abus** : 10 questions / 10 min par IP, 500 caractères maximum, champ piège anti-robots.
- **Sans configuration** : le champ reste visible mais renvoie vers la page contact.

Pour l'activer :

1. Créez un compte sur [console.anthropic.com](https://console.anthropic.com), ajoutez un moyen de paiement (facturation à l'usage) et fixez une limite de dépense mensuelle dans **Settings → Limits**.
2. Créez une clé dans **API Keys**.
3. Ajoutez-la dans Vercel (**Settings → Environment Variables**) sous le nom `ANTHROPIC_API_KEY`, puis redéployez. En local, mettez-la dans `.env.local`.
4. Facultatif : `FAQ_ASSISTANT_MODEL` pour changer de modèle (par défaut `claude-opus-5-5`).

## Déployer sur Vercel

1. Poussez le projet sur GitHub (ou GitLab / Bitbucket).
2. Sur [vercel.com/new](https://vercel.com/new), importez le dépôt : Next.js est détecté automatiquement.
3. Dans **Settings → Environment Variables**, ajoutez `NEXT_PUBLIC_SITE_URL`, et si besoin `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `ANTHROPIC_API_KEY`.
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
