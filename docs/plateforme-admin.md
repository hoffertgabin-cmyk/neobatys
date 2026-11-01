# Plateforme NEOBATYS : conception (phase 1)

Un seul logiciel, hébergé chez nous. Chaque artisan crée son compte et trouve tout de suite les modules standards ; on active les autres et on personnalise ensuite. Nous avons notre propre back-office pour suivre tous les clients.

Statut : proposition, rien n'est codé. Les décisions d'Ilann du 1er novembre 2026 sont intégrées (section 8) ; celles qui restent ouvertes sont listées à la fin. Le contenu de départ du futur dépôt `neobatys-app` est dans [`docs/plateforme/depart/`](plateforme/depart/README.md). La veille sur les concurrents est dans [`docs/veille/plateforme-admin.md`](veille/plateforme-admin.md). La maquette du tableau de bord client est [`docs/maquette-tableau-de-bord.html`](maquette-tableau-de-bord.html) (ouvrir dans un navigateur).

## 1. Ce qui existe aujourd'hui

### 1.1 Le site (ce dépôt)

| Élément | Ce qu'il fait | Ce qu'on en garde |
|---|---|---|
| `components/mockups/ConsoleMockup.tsx` | Console vitrine : 4 KPI, histogramme dégradé rose-lavande, assistants IA « actifs », fil d'événements. Couleurs dans `app/globals.css` (`nuit`, `sable`, `chantier`, `lavande`, `peche`, `rose`, `menthe`). | Le style cible du vrai tableau de bord. La maquette le reprend tel quel. |
| `lib/admin-leads.ts` | Après chaque formulaire de contact, envoie `POST ADMIN_LEADS_URL` (Bearer `ADMIN_LEADS_SECRET`) : `name, trade, phone, email, service, serviceLabel, message, consent, submittedAt`. Timeout 3 s, jamais d'erreur visible. Contrat cité : `docs/CONTRAT-SITE-CRM.md` du dépôt `neobatys-admin`. | Le contrat. La nouvelle plateforme doit accepter exactement ce JSON, pour que le site ne change pas le jour de la bascule. |
| `app/api/contact/route.ts` | Valide (zod), anti-robot, limite 5 envois / 10 min / IP, e-mail Resend, puis `after(() => sendLeadToAdmin(...))`. | Inchangé. |
| `app/api/vue/route.ts` | Relaie chaque page vue (hors robots) vers `new URL("/api/vues", ADMIN_LEADS_URL)`. L'admin garde un total par jour et par page. | Même contrat à reprendre (`POST /api/vues`, `{ path }`). |

Le site parle donc à l'admin par deux routes, `/api/leads` et `/api/vues`, avec un secret partagé. C'est tout ce qu'on sait de l'admin actuel : le dépôt `neobatys-admin` n'est pas visible depuis ce compte GitHub (`gh repo view hoffertgabin-cmyk/neobatys-admin` : introuvable).

Le site promet déjà, page Logiciel (`content/data/software.json`) : bibliothèque d'ouvrages, devis signé du doigt sur téléphone, facture d'acompte en un clic, relances automatiques avec lien de paiement, tableau de bord en temps réel, export comptable, factures électroniques par une plateforme agréée. La plateforme doit tenir ces promesses ou le site doit être corrigé.

### 1.2 Questions à poser à Gabin sur l'admin actuel

1. Quelle pile (framework, base, hébergeur, région) et où tourne `admin.neobatys.com` ? Qui a les accès (Vercel, base, DNS) ?
2. Quelles données y sont déjà : leads, vues, clients, devis, factures ? Combien de lignes, depuis quand ? Une facture a-t-elle déjà été émise depuis cet outil (numérotation légale à reprendre) ?
3. Le module devis / factures montré sur le site existe-t-il, et à quel point ? Des artisans l'utilisent-ils ?
4. Y a-t-il des comptes clients (artisans) ou seulement nous deux ?
5. Le contrat `docs/CONTRAT-SITE-CRM.md` : version à jour, et autres appelants que le site ?
6. Qu'est-ce qui lui semble solide et à garder, qu'est-ce qu'il referait ?
7. Accepte-t-il qu'on parte d'un nouveau dépôt commun, ou préfère-t-il faire évoluer le sien ?

### 1.3 Le CRM WhatsApp de LeasePro (`/Users/ilann_abd/Claude Code Leasepro`, lu sans modification)

**Pile.** Serveur Node (Express 4, CommonJS), SQLite (`better-sqlite3`), sessions `express-session` stockées en SQLite, interface React 18 + Vite 5 + React Router 6. Tourne sur le Mac d'Ilann (agent `launchd`), Dockerfile et Caddy prêts pour un serveur (`docs/deploiement.md`). Tunnel Cloudflare temporaire pour les webhooks Meta.

**WhatsApp.** Deux moteurs derrière un réglage `wa_provider` (`server/canaux/whatsapp-provider.js`) :
- `baileys` (actif) : `@whiskeysockets/baileys` 7.0.0-rc, protocole non officiel, avec garde-fous anti-suspension (délais aléatoires, 30 messages/h, 150/jour). Impossible à proposer à des clients : non conforme aux conditions de WhatsApp, risque de suspension du numéro de l'artisan, un processus par numéro qui doit rester connecté.
- `cloud` (prêt, non activé) : API officielle Meta, `server/canaux/whatsapp-cloud.js`, Graph `v21.0`, webhook signé, contrôle de la fenêtre de 24 h, modèles. Les identifiants sont des réglages uniques (`whatsapp_access_token`, `whatsapp_phone_number_id`, `whatsapp_waba_id`...) : un seul numéro par installation.
- Messenger et Instagram : `server/canaux/meta-messagerie.js`, même logique.
- `docs/passage-coexistence.md` décrit Coexistence (même numéro dans l'appli WhatsApp Business et dans l'API). C'est exactement ce qu'il faut à un artisan qui ne veut pas changer de numéro.

**Données.** `server/infra/schema.sql` : `users` (rôles `admin | user`), `clients` (fiche vivante `profil_json`, étape, niveau d'intérêt, mode IA, reprise en main), `messages`, `settings` (clé-valeur, y compris les clés d'API), `corrections`, `questions`, `offers`, `journal_ia`, `api_usage`. Migrations numérotées dans `server/infra/db.js`. **Aucune notion de compte ou d'entreprise** : tout est mono-entreprise.

**IA.** Un seul point d'entrée, `server/ia/providers.js` (SDK OpenAI et Anthropic, sorties structurées, compteur de coût réel). Usages : brouillon de réponse, relecture par un « manager » sur un modèle plus fort (`server/ia/manager.js`), fiche client qui se complète seule (`server/clients/fiche.js`), note d'intérêt, apprentissage des corrections du gérant (`server/savoir/`), bilan de la semaine, transcription des vocaux (`server/ia/voix.js`). Suite d'évaluation (`scripts/eval.js`) : c'est la méthode à garder.

**Spécifique à LeasePro.** Le prompt de l'agent (`server/ia/agent-prompt.js`, 339 lignes) parle de LeasePro, de véhicules, du gérant ; les étapes de qualification (pays, particulier ou société, budget) et les offres sont celles du leasing ; plusieurs modules IA citent le vocabulaire du métier (`interest.js`, `bilan.js`, `relance-prompt.js`, `fiche.js`).

**Ce qui se réutilise.**

| Se reprend presque tel quel (à porter en TypeScript) | Se réécrit |
|---|---|
| Logique du canal Cloud : webhook signé, fenêtre de 24 h, envoi de modèles | Stockage : une ligne d'identifiants par artisan, chiffrée, au lieu de `settings` |
| Boucle brouillon, relecture, validation humaine, mode autonome éteint par défaut | Prompts : un gabarit « artisan du bâtiment » avec des variables (métier, zone, tarifs, ton) |
| Apprentissage par corrections, questions de l'IA au gérant | Toutes les tables : colonne `organization_id` partout, Postgres au lieu de SQLite |
| Fiche vivante, résumé en trois lignes, reprise en main quand le gérant écrit lui-même | Connexion du numéro : Embedded Signup de Meta au lieu de cinq identifiants collés à la main |
| Méthode : mesure avant changement, suite d'évaluation, journal de coût IA | Baileys : n'est pas repris |

Conclusion : on reprend le **savoir-faire et les algorithmes**, pas le code tel quel. Le CRM LeasePro reste l'outil de LeasePro ; le module WhatsApp de NEOBATYS est écrit pour plusieurs entreprises dès le départ, en s'appuyant dessus fichier par fichier.

## 2. Ce que fait la plateforme

### 2.1 Trois espaces, une seule application

| Espace | Pour qui | Adresse proposée |
|---|---|---|
| Espace artisan | Chaque client et ses salariés | `app.neobatys.com` |
| Back-office | Ilann et Gabin | `app.neobatys.com/interne`, réservé au rôle `staff` |
| API publique | Le site NEOBATYS et les sites que nous livrons aux artisans | `app.neobatys.com/api/...` |

Une seule base de code et une seule base de données : un artisan n'est qu'une **organisation** ; nous sommes une organisation de plus, avec le rôle `staff` qui voit toutes les autres. C'est le modèle de HighLevel (compte agence, sous-comptes clients), sans la complexité de la marque blanche dont nous n'avons pas besoin.

### 2.2 Les modules

Un module = un écran dans le menu, ses tables, ses tâches de fond, ses réglages, et un tableau de bord qui alimente l'accueil. Le catalogue est **dans le code** (une liste typée) ; ce qui est en base, c'est l'activation et les réglages de chaque artisan.

| Module | Ce qu'il fait | Compte gratuit / formules | Vient de |
|---|---|---|---|
| **Accueil** | KPI du mois, graphique sur l'année, demandes à traiter, assistants IA, « à faire aujourd'hui » (maquette) | Gratuit | `ConsoleMockup` |
| **Demandes** | Toutes les demandes entrantes au même endroit : formulaire du site de l'artisan, appel manqué, WhatsApp, Google. Statut, origine, relance. | Gratuit | Contrat `/api/leads` du site |
| **Devis et factures** | Bibliothèque d'ouvrages, devis, signature en ligne, acompte, facture, relance, export comptable. Facture électronique par une plateforme agréée partenaire. | Gratuit : quelques devis par mois ; complet dans les formules | Promesses de `content/data/software.json` |
| **Assistant réponse aux demandes** | Répond en quelques minutes à chaque demande (e-mail, WhatsApp), qualifie, propose une visite. Validation humaine par défaut. | Formules | LeasePro : brouillon, manager, corrections |
| **Devis à la voix** | L'artisan dicte sur le chantier, l'IA prépare le devis à partir de sa bibliothèque d'ouvrages. Toujours relu avant envoi. | Formules | LeasePro : `voix.js` |
| **Relances impayés** | Rappels polis et gradués (J+3, J+7, J+14 après l'échéance, comme Podium) avec lien de paiement, arrêt automatique au paiement. | Formules | Promesse du site |
| **Avis Google** | Demande d'avis après chaque chantier terminé, brouillon de réponse aux avis reçus. | Formules | Offre du site |
| **Conversations WhatsApp** | Boîte de réception WhatsApp (et Messenger, Instagram) de l'artisan, fiche client, brouillons IA. | Formules | LeasePro (canal Cloud) |
| **Statistiques** | Visites du site de l'artisan, demandes par source, taux de signature, délai de réponse. | Gratuit | Contrat `/api/vues` |
| **Achats, stock et outillage** | Catalogue d'articles relié aux devis (fichiers tarif de l'artisan, puis ses factures fournisseurs, puis API Rexel et Sonepar), besoins par chantier et bons de commande, outillage par QR, consommables au seuil mini, tendances de prix INSEE. Détail : [`docs/plateforme/module-achats-stock.md`](plateforme/module-achats-stock.md) | Formules, selon le métier | Demande d'Ilann du 1er novembre 2026 |
| **Site internet** | État du site livré, modifications demandées, nom de domaine. | Clients site | Offres sites |
| Standard téléphonique IA | Pas un module standard : sur devis uniquement. | Non | |

Règle reprise de LeasePro : un module n'est livré qu'avec la mesure qui dira dans un mois s'il sert (connexions, actions faites dedans).

### 2.3 Personnalisation sans fork

Trois niveaux, du plus courant au plus rare, sans jamais copier le code pour un client :

1. **Réglages du module** (l'artisan ou nous) : logo, couleurs des documents, mentions, conditions de paiement, ton de l'IA, horaires, zone d'intervention, tarifs annonçables. Stockés en JSON validé par un schéma zod par module.
2. **Contenus par artisan** (nous) : prompt complémentaire, questions de qualification propres au métier, modèles de messages WhatsApp, bibliothèque d'ouvrages importée.
3. **Gabarits de départ par métier** (nous) : plombier, électricien, couvreur... Un gabarit = une liste de modules activés + leurs réglages + une bibliothèque d'ouvrages type. Appliqué à la création du compte. C'est l'équivalent des « snapshots » de HighLevel, et c'est ce qui rend « le client a déjà accès à la plupart des services » réaliste.

Une demande vraiment spécifique devient soit un réglage de plus pour tous, soit un développement sur devis hors plateforme.

### 2.4 Le parcours d'un nouvel inscrit

L'inscription est libre et gratuite pour tout le monde dès le MVP (décision 5) : chaque compte gratuit est aussi un prospect de NEOBATYS.

1. Inscription sur `app.neobatys.com` : e-mail et mot de passe (ou lien magique), nom de l'entreprise, métier, SIRET facultatif. Deux cases distinctes et non cochées, séparées de l'acceptation des CGU : recevoir nos offres par e-mail, et publicité personnalisée à partir de l'e-mail (voir section 5.1). Confirmation de l'adresse par e-mail avant toute prospection.
2. Le gabarit du métier s'applique et le compte gratuit ouvre les modules de la formule gratuite (décision ouverte n° 1 en fin de document).
3. Assistant de démarrage en quatre étapes (le site promet un accompagnement humain, on garde les deux) : logo et mentions, import clients et prix (Excel), premier devis, connexion WhatsApp (facultative, Embedded Signup de Meta).
4. L'inscrit apparaît dans notre CRM interne (back-office, « Nos prospects ») avec son métier, son origine et l'état de ses consentements ; une alerte « à appeler sous 24 h » est créée.
5. Passage à une formule (Essentiel, Pro, Premium ou pack) : signée avec nous, puis activée depuis le back-office. Le paiement en ligne par Stripe vient à l'étape 5.

### 2.5 Notre back-office

| Écran | Contenu |
|---|---|
| Clients | Tous les artisans : offre, modules actifs, MRR, dernière connexion, demandes sur 30 jours, état WhatsApp, consommation IA. Tri et filtres. |
| Fiche client | Tout ce qui précède, plus l'historique, les notes internes, les modules à activer d'un clic, les réglages. Bouton « voir comme le client » (accès tracé dans le journal d'audit, visible du client). |
| Chiffres | MRR, nouveaux clients, résiliations, revenu par module, coût IA et WhatsApp par client comparé à son abonnement. |
| Alertes | Numéro WhatsApp déconnecté, paiement Stripe échoué, demande non traitée depuis 48 h, client inactif depuis 14 jours, coût IA au-dessus du seuil, erreur d'envoi de facture électronique. Chaque alerte part aussi par e-mail. |
| Nos prospects | Les leads du site NEOBATYS (ce que reçoit l'admin actuel, données reprises) et tous les inscrits gratuits, avec l'état de leurs consentements. Segments pour les e-mails et les audiences publicitaires, limités aux personnes qui ont consenti. Nous sommes une organisation comme une autre, avec le module Demandes. |
| Outils IA internes | Résumé d'un compte avant un appel, préparation d'un gabarit pour un nouveau métier, analyse des corrections de tous les clients pour améliorer les prompts communs. |

### 2.6 Qui a accès à quoi

Un seul identifiant pour tout le monde, un seul espace : ce qui change d'un profil à l'autre, ce sont les modules ouverts. L'espace s'appelle pour le client « Espace client NEOBATYS », pas « plateforme ».

| Profil | Ce qu'il y trouve | Pourquoi il revient | Ce que ça nous apporte |
|---|---|---|---|
| **Client site internet** (on a fait son site, il paie la maintenance) | Les demandes envoyées par le formulaire de son site, rangées et suivies (pas seulement un e-mail perdu) ; les visites de son site et d'où elles viennent ; ses avis Google ; ses demandes de modification du site (un bouton, suivi de l'avancement) ; ses factures NEOBATYS | Il voit ce que son site lui rapporte chaque mois | La maintenance à 200 € HT par mois se justifie d'elle-même, donc moins de résiliations ; les modules non souscrits (devis, assistants IA) sont visibles, grisés avec « Activer » |
| **Client logiciel ou IA** (formule Essentiel, Pro, Premium ou pack) | Tous les modules de sa formule, réglés par nous | C'est son outil de travail quotidien | Le cœur du produit |
| **Inscrit gratuit** (pas encore client) | Un outil utile seul : une page de demande de devis à son nom à partager sur Google et Facebook, les demandes reçues, quelques devis par mois, et un **audit gratuit de sa présence en ligne** (fiche Google, avis, site) avec des conseils | Il reçoit des demandes grâce à nous | Un prospect qualifié dans notre CRM, qui voit ce qu'on sait faire ; l'audit débouche naturellement sur nos offres (site, formules, audits approfondis sur devis) |

Règle : tout ce qu'un client site ou logiciel voit dans son espace doit lui servir sans qu'on l'explique ; ce qui ne lui sert pas est masqué, pas affiché vide.

## 3. Pile technique

La pile reprend celle du site autant que possible : un seul langage, une seule façon de déployer, un seul fournisseur de plus (la base).

Versions relevées sur le registre npm (`npm view <paquet> dist-tags.latest`) le 1er novembre 2026. Tarifs : voir la veille, sources citées.

| Brique | Choix | Version / offre | Pourquoi |
|---|---|---|---|
| Application | Next.js (App Router), TypeScript, Tailwind 4 | `next` 16.4.3 (le site est en 16.4.2) | Même pile que le site : mêmes composants (`ConsoleMockup`, couleurs), même CI, même hébergeur, mêmes réflexes pour Claude Code. Lire `node_modules/next/dist/docs/` avant de coder (règle d'`AGENTS.md`). |
| Base de données | Postgres chez Supabase, région Paris (`eu-west-3`) | Plan Pro, 25 $/mois (8 Go de disque, 100 Go de fichiers, sauvegarde quotidienne gardée 7 jours) ; restauration à la seconde (PITR) en option, à partir de 100 $/mois, à prendre dès les premières vraies factures | Postgres avec Row Level Security, stockage de fichiers (PDF, photos, vocaux) et sauvegardes au même endroit, en France, sans adresse IP à gérer depuis Vercel. Comparatif avec OVHcloud et Neon en section 3.1. Choisir explicitement Paris, pas l'option générique « Europe » (qui peut placer le projet à Londres ou Zurich). |
| Accès aux données | Drizzle ORM | `drizzle-orm` 0.45.4 | Schéma en TypeScript, SQL lisible, migrations versionnées, pas de génération de client ni de moteur à embarquer. Alternative : Prisma 7.10.1 (attention : le tag `latest` de Prisma pointe vers une pré-version 8.0.0-rc.29, il faudrait épingler). |
| Authentification | Better Auth | `better-auth` 1.7.15, plugins `organization`, `admin`, `two-factor`, `magic-link` (présents dans les exports du paquet) | Organisations, membres et rôles fournis, comptes stockés dans notre propre Postgres. Auth.js reste en bêta pour sa v5 (5.0.0-beta.32). Vérifier dans la doc du plugin `admin` la fonction « se connecter en tant que » avant de s'en servir. |
| Paiement des abonnements | Stripe Billing | `stripe` 23.1.0 ; 1,5 % + 0,25 € par carte UE standard, 0,35 € par prélèvement SEPA, Billing 0,7 % du récurrent | Abonnements, essai, relance des cartes refusées, portail client. Le même compte peut servir aux paiements des factures des artisans plus tard (Stripe Connect, à étudier à l'étape 2). |
| IA | API Anthropic | `@anthropic-ai/sdk` 1.3.0 | Fournisseur déjà utilisé par le CRM LeasePro (actif depuis le 18 octobre 2026) et par l'assistant FAQ du site. Un seul module d'appel, comme `server/ia/providers.js`, pour pouvoir changer de modèle en mesurant. |
| WhatsApp | API Cloud de Meta, NEOBATYS « Tech Provider », Embedded Signup | 0,0248 € par message de service ou utilitaire, 0,0712 € par message marketing (grille France au 1er octobre 2026), 1 000 messages de service gratuits par mois et par numéro | Officiel, le numéro reste celui de l'artisan (Coexistence), l'artisan paie Meta directement. Démarche longue : vérification d'entreprise, examen de l'application, 10 nouveaux clients par 7 jours au début. |
| E-mails | Resend | déjà utilisé par le site (`resend` ^6.34.1) | Rien de nouveau à apprendre. |
| Facture électronique | Super PDP, plateforme agréée, par API en « marque grise » | 0,01 € HT par facture par API jusqu'à 10 000 par mois (tarif public) | Réception obligatoire pour toutes les entreprises depuis le 1er septembre 2026, émission obligatoire pour les TPE et PME au 1er septembre 2027. Notre logiciel sera une « solution compatible » raccordée à une PA ; on ne devient pas PA nous-mêmes. Choix détaillé en section 3.2. |
| Hébergement | Vercel, projet séparé du site, fonctions en région européenne proche de la base | offre Vercel actuelle du site | Même outil que le site, aperçu par PR, CI identique. Les tâches de fond (relances, synchronisations) passent par les tâches planifiées de Vercel ou une file Postgres ; à trancher à l'étape 1 en lisant la doc à jour. |

Ce que la pile ne contient pas, volontairement : pas de microservices, pas de Kubernetes, pas de second langage, pas de file de messages dédiée tant que Postgres suffit.

### 3.1 Base de données : Supabase, OVHcloud ou Neon

Relevé le 1er novembre 2026.

| Critère | Supabase Pro, Paris | OVHcloud Public Cloud Databases for PostgreSQL | Neon Launch |
|---|---|---|---|
| Où sont les données | Paris (AWS `eu-west-3`) ; Auth et fichiers dans la même région | France : Gravelines, Strasbourg, Roubaix, Paris (3 zones). **Pas de région au Luxembourg** | Francfort ou Londres (AWS), pas de France |
| Société | Américaine, sur AWS (Cloud Act : non vérifié sur une page Supabase) | OVH Groupe SA, française (Roubaix) | Américaine, sur AWS |
| Prix de départ réaliste | 25 $/mois, puis PITR à partir de 100 $/mois | Essential DB1-4 (1 nœud) environ 54 € HT/mois, sauvegardes gardées 2 jours ; Business DB1-4 (2 nœuds, 14 jours de sauvegardes) environ 139 € HT/mois | À l'usage, 0,106 $ par heure de calcul, « environ 15 $/mois » selon Neon |
| Sauvegardes | Quotidiennes, 7 jours ; PITR en option | Quotidiennes, PITR, copie dans une autre région (Paris vers Gravelines) | Historique de restauration jusqu'à 7 jours |
| Fichiers (PDF, photos) | Inclus (100 Go) | Object Storage S3 à part, sans frais de sortie | Object Storage inclus |
| Authentification | Incluse (on garde Better Auth quand même, pour les organisations) | Aucune : tout dans notre code | Better Auth géré proposé |
| Connexion depuis Vercel | Rien à régler | Liste d'adresses IP autorisées obligatoire ; les IP sortantes de Vercel ne sont pas fixes : il faut les Static IPs de Vercel (plans Pro et Enterprise, prix non vérifié) ou ouvrir la base à tout Internet (déconseillé par OVH) | Intégration Vercel officielle |
| Qualification SecNumCloud | Non | Pas pour cette offre (seulement Bare Metal Pod, Private Cloud SecNumCloud, SNC Cloud Platform) | Non |
| Travail d'exploitation pour nous | Faible | Moyen à fort (IP, auth, fichiers, deux services) | Faible |

**Recommandation : Supabase Pro à Paris.** Données en France, un seul service pour la base, les fichiers et les sauvegardes, rien à régler côté réseau, environ 25 $ par mois au départ. OVHcloud ne vaut le coût (au moins 139 € par mois pour une base de production à deux nœuds, plus les Static IPs de Vercel et l'authentification à écrire) que si « hébergé par une société française » devient un argument de vente exigé par des clients. Neon n'héberge pas en France.

Ce qui se réutilise si Ilann a déjà quelque chose chez OVH :
- hébergement web mutualisé avec base MySQL : non (MySQL, pas Postgres) ;
- VPS : techniquement oui, mais sauvegardes, mises à jour et sécurité seraient à notre charge, déconseillé ;
- Object Storage (compatible S3) : oui, pour les PDF et photos si on veut les garder chez un hébergeur français ;
- Web Cloud Databases en PostgreSQL : possible, mais même problème d'IP Vercel non fixes.

**Question à poser à Ilann :** « Dans ton espace client OVHcloud, rubrique Produits et services (ou sur une facture OVH récente), qu'est-ce que tu as exactement : un hébergement web (Perso, Pro...), une base Web Cloud Databases, un VPS, un projet Public Cloud, de l'Object Storage ? Sur quel compte (perso ou TAG Delme), dans quel datacenter, et pour quel usage aujourd'hui ? »

Sources : https://supabase.com/pricing, https://supabase.com/docs/guides/platform/regions, https://supabase.com/docs/guides/platform/backups, https://www.ovhcloud.com/fr/public-cloud/prices/, https://www.ovhcloud.com/fr/public-cloud/regions-availability/, https://docs.ovhcloud.com/fr/guides/public-cloud/databases/postgresql-capabilities.md, https://docs.ovhcloud.com/fr/guides/public-cloud/databases/backups.md, https://docs.ovhcloud.com/fr/guides/public-cloud/databases/postgresql-prepare-for-incoming-connections.md, https://www.ovhcloud.com/fr/compliance/secnumcloud/, https://vercel.com/kb/guide/how-to-allowlist-deployment-ip-address, https://vercel.com/docs/networking/static-ips, https://neon.com/pricing, https://neon.com/docs/introduction/regions.

### 3.2 Plateforme agréée de facture électronique

Notre module Devis et factures sera une **solution compatible** (ex-« opérateur de dématérialisation ») : il produit des factures conformes mais ne transmet rien lui-même ; il doit être raccordé à une plateforme agréée (PA) (présentation des labels par la DGFiP : https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fe_presentation-des-labels.pdf).

Liste officielle téléchargée le 1er novembre 2026 (page mise à jour le 30 octobre 2026, https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees) : 156 plateformes ont un numéro d'immatriculation, dans un fichier intitulé « liste_pa_attente_rapport_audit » (immatriculation délivrée, rapport d'audit encore attendu d'après le nom du fichier) ; un second fichier liste celles qui attendent encore les tests d'interopérabilité.

| Plateforme | Immatriculée le | API | Prix affiché | Offre pour éditeurs |
|---|---|---|---|---|
| **Super PDP** | 22/12/2025 | Oui, référence publique (https://www.superpdp.tech/documentation) | Compte gratuit jusqu'à 1 000 factures/mois ; API 0,01 € HT par facture jusqu'à 10 000/mois ; vérification d'identité 2 € (https://www.superpdp.tech/tarifs) | « Marque grise » au tarif de gros, revendable ; marque blanche sur demande. Factur-X, CII, UBL, JSON ; émission et réception |
| Iopole | 11/12/2025 | Oui, avec bac à sable (https://docs.ppd.iopole.fr) | Sur devis | Ciblée éditeurs : marque blanche en option, inscription du client et mandat de réception intégrés |
| B2Brouter | 12/12/2025 | Oui (https://developer.b2brouter.net/docs/) | Non lisible | Marque blanche et grise, programme startups |
| Pennylane | 11/12/2025 | Oui (https://pennylane.readme.io) | Non vérifié | L'API agit sur le compte Pennylane du client : chaque artisan devrait être client Pennylane (déduction, non confirmée par Pennylane) |

**Recommandation : Super PDP.** Seule des candidates à publier un prix par facture (1 centime), une offre pensée pour les éditeurs qui intègrent par API, les quatre formats, l'émission et la réception. **Solution de repli : Iopole** (bac à sable, parcours d'inscription du client intégré), sur devis. Avant de signer : rendez-vous avec Super PDP pour vérifier sa solidité (taille, engagement de service écrit), le contrat éditeur et la doc API, que nous n'avons pas pu lire en entier (page affichée par JavaScript).

Calendrier (https://www.impots.gouv.fr/professionnel/je-decouvre-la-facturation-electronique) : réception obligatoire pour toutes les entreprises depuis le 1er septembre 2026, émission pour les TPE et PME au 1er septembre 2027. Le e-reporting des paiements concerne les prestations où la TVA est due à l'encaissement ; les travaux du BTP en autoliquidation en sont exclus. Date de début du e-reporting pour les PME : non vérifiée sur une page officielle.

## 4. Données et multi-clients

Une seule base Postgres, une colonne `organization_id` sur chaque table métier.

```
organizations      id, nom, siret, métier, gabarit, statut, créé_le
members            organization_id, user_id, rôle (owner | admin | membre)
users / sessions   gérés par la bibliothèque d'authentification
organization_modules  organization_id, module, actif, essai_jusqu_au, réglages (jsonb)
contacts           organization_id, nom, téléphone, e-mail, adresse, origine
leads              organization_id, contact_id, source, travaux, statut, reçu_le
conversations      organization_id, contact_id, canal, mode_ia, en_main_depuis
messages           organization_id, conversation_id, sens, contenu, statut d'envoi
channels           organization_id, type (whatsapp...), identifiants chiffrés, état
quotes / invoices  organization_id, numéro (séquence par organisation), lignes, totaux, statut
payments           organization_id, invoice_id, montant, moyen, reçu_le
reviews            organization_id, source, note, texte, réponse
ai_runs            organization_id, module, modèle, jetons, coût, brouillon, verdict
audit_log          organization_id, acteur, action, cible, horodatage
consents           user_id, finalité (prospection | publicité), valeur, version du texte, horodatage, IP, source
subscriptions      organization_id, offre, stripe_customer_id, statut, montant mensuel
```

Garde-fous contre la fuite d'un client à l'autre :
- Toute requête passe par une fonction qui prend l'organisation de la session ; aucune requête brute dans les écrans.
- En plus, politiques Row Level Security de Postgres sur les tables métier, pour qu'un oubli dans le code ne suffise pas à fuir.
- Un test automatique crée deux organisations et vérifie qu'aucune route ne renvoie les données de l'autre.

Numérotation des factures : séquence continue par organisation, sans trou, verrouillée en base ; une facture émise n'est jamais modifiée (avoir pour corriger).

## 5. Sécurité et RGPD

- **Rôles.** Pour notre CRM (inscrits gratuits, leads du site), nous sommes responsables de traitement : section 5.1. Pour chaque artisan, nous sommes sous-traitant (article 28 du RGPD) des données de ses clients : contrat de sous-traitance annexé aux conditions générales. Pour nos propres prospects, nous sommes responsables de traitement (déjà couvert par `politique-de-confidentialite`).
- **Hébergement en Union européenne** pour la base et les fichiers. Liste des sous-traitants ultérieurs publiée (hébergeur, base, Anthropic, Meta, Stripe, Resend) avec leurs contrats de traitement des données.
- **Secrets.** Jetons WhatsApp et clés chiffrés en base (clé maîtresse dans les variables Vercel), jamais affichés en clair après saisie. La leçon de LeasePro (clés d'API dans la table `settings`, copiées dans les sauvegardes) n'est pas reproduite.
- **Comptes.** Mots de passe hachés par la bibliothèque, double authentification obligatoire pour le rôle `staff`, sessions révocables, limitation des tentatives.
- **Journal d'audit** de tout accès `staff` à un compte client et de tout export.
- **Droits des personnes.** Export et suppression d'un contact à la demande de l'artisan ; suppression complète d'une organisation à la résiliation après la durée de conservation légale des factures (10 ans pour les pièces comptables, conservées à part).
- **IA.** Pas d'entraînement des modèles sur les données des clients (vérifier les conditions du fournisseur retenu), données minimales dans les prompts, journal des appels.
- **Sauvegardes** quotidiennes chiffrées hors de la base principale, restauration testée une fois par trimestre.

### 5.1 Inscription libre, prospection et publicité : le cadre

Ce n'est pas un avis juridique. Les CGU, la politique de confidentialité et le contrat de sous-traitance sont rédigés en projet avec une IA dans [`docs/juridique/plateforme/`](juridique/plateforme/README.md), à valider avant l'ouverture des inscriptions. Sources ouvertes le 1er novembre 2026.

**Les règles qui s'appliquent**

| Sujet | Règle | Source |
|---|---|---|
| Prospection par e-mail en France | Consentement préalable pour une personne physique (article L34-5 du CPCE), sauf client existant pour des produits analogues. Entre professionnels, la CNIL admet l'intérêt légitime si le message est en rapport avec la profession, que la personne a été informée et peut s'opposer simplement. Les artisans en entreprise individuelle sont des personnes physiques : le consentement est l'option sûre. | https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042155961, https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique |
| Compte gratuit = relation client ? | Pour la CNIL, « la simple création d'un compte ne suffit pas » ; un compte gratuit peut l'être dans certains cas (CJUE, 13 novembre 2025, Inteligo Media, C-654/23). Pas acquis pour nous. Légifrance signale une décision QPC n° 2026-1210 du 25 juin 2026 sur l'article L34-5, dont la portée exacte n'a pas été vérifiée. | https://www.cnil.fr/fr/communication-electronique-quelles-regles |
| Luxembourg | Loi du 30 mai 2005, article 11 : consentement préalable, exception client analogue ; l'opt-in vise l'abonné personne physique (§5), donc aussi les entrepreneurs individuels. | https://data.legilux.public.lu/file/eli-etat-leg-loi-2005-05-30-n4-jo-fr-html.html |
| Forme du consentement | Case distincte, non cochée, facultative ; l'acceptation des CGU ne vaut pas consentement ; refuser ne prive de rien (RGPD, article 7). | https://www.cnil.fr/fr/les-bases-legales/consentement |
| Preuve et retrait | Pouvoir démontrer le consentement (date, heure, compte, texte et version du formulaire, état des cases, source) ; retrait aussi simple que le don : lien dans chaque e-mail et réglage dans le compte. | RGPD, article 7, https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre2 |
| Durée | Prospects : 3 ans après la collecte ou le dernier contact venant d'eux ; liste d'opposition gardée au moins 3 ans. | https://www.cnil.fr/fr/questions-reponses-sur-les-referentiels-relatifs-la-gestion-des-activites-commerciales-et-des |
| Double opt-in | Aucune page de la CNIL ou de la CNPD trouvée qui l'impose. Recommandé quand même : l'e-mail de confirmation du compte, nécessaire de toute façon, active aussi les consentements, ce qui prouve que le titulaire de l'adresse a consenti. | Recherche sur cnil.fr et cnpd.public.lu, sans résultat |
| Publicité ciblée (Meta Custom Audiences, Google Customer Match) | Comité européen (lignes directrices 8/2020) : responsabilité conjointe avec la plateforme dès la transmission de la liste, intérêt légitime seulement dans des cas étroits. Google exige le consentement pour les utilisateurs de l'EEE (`ad_user_data` et `ad_personalization` à GRANTED) et réserve Customer Match aux comptes avec 90 jours d'historique et plus de 50 000 $ dépensés. Meta exige que l'annonceur ait une base légale et retire de l'audience toute personne qui s'oppose. | https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-82020-targeting-social-media-users_en, https://support.google.com/google-ads/answer/14310715, https://support.google.com/adspolicy/answer/6299717, https://www.facebook.com/legal/terms/customaudience |
| E-mails transactionnels | Confirmation, facture, mot de passe : pas de consentement, mais aucun contenu promotionnel dedans. | https://www.cnil.fr/fr/communication-electronique-quelles-regles |
| Pixels de suivi dans les e-mails | Mesurer les ouvertures pour optimiser les campagnes demande un consentement (recommandation CNIL du 12 mars 2026). | https://www.cnil.fr/sites/default/files/2026-04/recommandation-pixels_de_suivi.pdf |
| Cookies de la plateforme | Exemptés : authentification, sécurité, préférences d'interface. Pixels Meta ou Google : consentement. | https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi |

**Le formulaire d'inscription**

1. Case obligatoire : « J'accepte les conditions générales d'utilisation » (lien). En dessous, sans case : « Vos données sont traitées par TAG Delme SARL (NEOBATYS) pour gérer votre compte. Politique de confidentialité. »
2. Case facultative, non cochée : « Je souhaite recevoir par e-mail les nouveautés et offres NEOBATYS utiles à mon activité. Désinscription en un clic. »
3. Case facultative, non cochée : « J'accepte que mon adresse e-mail, chiffrée, soit transmise à Meta pour me montrer des publicités NEOBATYS. » Google sera ajouté le jour où on l'utilise, avec une nouvelle version du texte et un nouveau consentement.
4. Les cases 2 et 3 ne prennent effet qu'après le clic dans l'e-mail de confirmation ; chaque changement est journalisé (table `consents` : compte, finalité, valeur, version du texte, horodatage, adresse IP, source) ; centre de préférences dans le compte ; retrait d'une audience publicitaire au plus tard à la synchronisation suivante.

Pas de mesure d'ouverture des e-mails au départ : elle demanderait une quatrième case pour un gain faible.

**Documents à rédiger avant l'ouverture**

- Conditions générales d'utilisation (et de vente pour les formules payantes), mentions légales de la plateforme.
- Politique de confidentialité de la plateforme : une ligne par finalité (compte, facturation, prospection, publicité ciblée), base légale, destinataires (dont Meta et Google), transferts hors UE, durées, droits, autorité de contrôle.
- Contrat de sous-traitance (article 28 du RGPD) annexé aux CGU, avec la liste des sous-traitants ultérieurs (https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre4).
- Registre des traitements, en double : comme responsable (notre CRM, prospection, publicité) et comme sous-traitant (données des clients des artisans).
- Registre des consentements, liste d'opposition, procédure de purge des prospects à 3 ans.

## 6. Plan en étapes

Hypothèse : deux associés, le site et la vente continuent en parallèle, Claude Code fait l'essentiel du code. L'inscription libre passe dans le MVP (décision 5), le paiement en ligne reste à la fin.

| Étape | Contenu | Fin quand |
|---|---|---|
| **0. Préparer** | Décisions encore ouvertes (fin du document), réponses de Gabin (section 1.2), organisation GitHub et équipe Vercel communes, création de `neobatys-app` avec [`docs/plateforme/depart/`](plateforme/depart/README.md), base de données, textes juridiques (section 5.1). **Rien n'est créé sans l'accord d'Ilann.** | Dépôt créé, CI verte sur une page vide, base en ligne, CGU et politique de confidentialité relues. |
| **1. MVP : comptes, prospects, demandes** | Inscription libre avec consentements séparés et confirmation de l'e-mail, organisations et rôles, catalogue de modules et activation, back-office (clients, fiche, « voir comme », Nos prospects), module Demandes, routes `/api/leads` et `/api/vues` compatibles avec le site, reprise des données de l'admin de Gabin, Accueil avec les vrais chiffres, export des consentements. | Le site envoie ses leads à la plateforme, `admin.neobatys.com` redirige, l'admin de Gabin est arrêté ; un inconnu peut s'inscrire et apparaît dans Nos prospects. |
| **2. Devis et factures** | Bibliothèque d'ouvrages, devis PDF, signature en ligne, acompte et facture, relances impayés (J+3, J+7, J+14), export comptable, raccordement à la plateforme agréée retenue (réception d'abord, émission avant le 1er septembre 2027). | Un artisan pilote fait un mois de devis et factures sans autre outil. |
| **2 bis. Achats et stock** | Besoins par chantier et bons de commande, outillage par QR, consommables au seuil mini, tendances INSEE ; lecture des factures fournisseurs dès le raccordement à la plateforme agréée. Le catalogue d'articles importé est déjà livré avec l'étape 2. | Un artisan pilote commande le matériel d'un chantier depuis son devis signé. |
| **3. Assistants IA** | Réponse aux demandes (e-mail d'abord), devis à la voix, avis Google. Validation humaine par défaut, suite d'évaluation reprise de LeasePro. | Taux de brouillons envoyés sans correction mesuré chez deux artisans. |
| **4. WhatsApp** | Statut Tech Provider (démarches menées à part dès maintenant), Embedded Signup, Coexistence, boîte de réception, brouillons IA. | Un artisan pilote répond à ses clients WhatsApp depuis la plateforme. |
| **5. Paiement en ligne** | Stripe Billing : passage du gratuit à une formule sans nous parler, factures d'abonnement, MRR et alertes de paiement automatiques. | Un artisan passe en formule payante seul. |

Le MVP n'a ni IA ni WhatsApp : il remplace l'admin actuel, met en place le multi-clients, ouvre l'inscription et commence à remplir notre CRM. Ce qui est vendu aujourd'hui (devis, factures, IA) continue d'être livré comme aujourd'hui jusqu'à l'étape 2.

## 7. Ce qu'on ne fait pas

- Pas de marque blanche (chaque artisan voit NEOBATYS) : rien ne la demande aujourd'hui.
- Pas d'application mobile native : interface web pensée pour le téléphone, installable.
- Pas de facturation électronique développée nous-mêmes : partenaire agréé.
- Pas de Baileys ni d'automate WhatsApp non officiel chez les clients.
- Pas de standard téléphonique IA en module standard.

## 8. Décisions

### 8.1 Prises par Ilann le 1er novembre 2026

| # | Décision | Ce que ça change dans ce document |
|---|---|---|
| 1 | Nouveau dépôt `neobatys-app` | Contenu de départ prêt dans [`docs/plateforme/depart/`](plateforme/depart/README.md) ; dépôt pas encore créé (compte : voir 8.2) |
| 2 | L'admin de Gabin est remplacé, son contrat `/api/leads` et ses données sont repris | Étape 1 du plan : reprise des données et arrêt de l'ancien admin |
| 3 | `app.neobatys.com`, `admin.neobatys.com` redirige | Section 2.1 |
| 4 | Plateforme et modules **inclus** dans les formules ; au-delà, offres sur devis (audits, options, services supplémentaires) | Pas de prix par module. Les assistants IA et WhatsApp se règlent avec chaque client : on lui propose l'automatisation et la mise en place d'un nouveau canal d'acquisition, chiffrées sur devis ; pas de volume standard fixé à l'avance. Le coût des messages WhatsApp est payé par l'artisan à Meta |
| 5 | Inscription libre et gratuite pour tout le monde dès le MVP ; les inscrits alimentent notre CRM | Sections 2.4, 2.5, 2.6, 5.1 et plan réordonné (section 6) |
| 5 bis | Prospection par e-mail : case à cocher (consentement), la solution la plus sûre | Section 5.1, formulaire |
| 5 ter | Publicité ciblée et campagnes développées en interne quand c'est possible | Notre back-office envoie les e-mails (Resend) et synchronise lui-même les inscrits qui ont consenti vers les audiences Meta par l'API Marketing de Meta, sans outil marketing tiers ; Google plus tard (Customer Match fermé sous 50 000 $ de dépenses) |
| 5 quater | Documents juridiques rédigés avec une IA | Projets dans [`docs/juridique/plateforme/`](juridique/plateforme/README.md) |
| 6 | Base de données | Comparatif en section 3.1, recommandation Supabase Paris, question sur OVH à poser |
| 7 | Plateforme agréée | Super PDP recommandée, Iopole en repli (section 3.2) |
| 8 | Démarches Meta | Traitées à part |

### 8.2 Comptes et services : ce qui existe, ce qui manque

| Service | Ce qu'on sait | Ce qui manque | Recommandation |
|---|---|---|---|
| GitHub | Deux comptes personnels : `leasepro` (Ilann) et `hoffertgabin-cmyk` (Gabin). Le site est un dépôt **public** du compte de Gabin, aucune organisation | Rien pour le site ; une solution payante pour `neobatys-app`, qui sera **privé** | Le fonctionnement actuel suffit pour le site : sur un dépôt public, la protection des branches est gratuite (seul Gabin peut la régler). Pour un dépôt privé, il faut payer dans tous les cas : soit GitHub Pro sur le compte de Gabin (4 $ par mois, Gabin seul administrateur, le code lui appartient), soit une organisation de l'entreprise en plan Team (4 $ par utilisateur, 8 $ pour deux, les deux associés administrateurs, le code appartient à l'entreprise). Recommandation : l'organisation, pour 4 $ de plus par mois. Sources : https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches, https://github.com/pricing |
| Vercel | Gabin a le plan Pro (20 $ par mois) sur `gab-7385`, qui héberge le site | Rien d'obligatoire | Ajouter `neobatys-app` comme second projet de la même équipe Pro. Inviter Ilann comme membre seulement s'il doit voir les tableaux de bord Vercel : un siège de développeur supplémentaire est payant, montant à lire dans Settings, Billing (https://vercel.com/pricing) |
| Supabase | Inconnu ; une trace de Supabase existe côté LeasePro | Une organisation au nom de l'entreprise avec un projet à Paris | Organisation Supabase de l'entreprise, plan Pro, les deux associés membres |
| Stripe | Inconnu | Compte au nom de TAG Delme SARL (vérification d'identité de la société) | Nécessaire seulement à l'étape 5 ; pas urgent |
| Meta | Traité à part | | |
| Super PDP | Aucun | Compte éditeur | Après un rendez-vous, avant l'étape 2 |
| Resend | Utilisé par le site | Domaine d'envoi pour `app.neobatys.com` | Ajouter le domaine au compte existant le moment venu |

Règle commune : chaque compte est au nom de l'entreprise, avec les deux associés administrateurs et la double authentification, et une adresse e-mail de l'entreprise comme propriétaire (pas une adresse personnelle).

### 8.3 Encore ouvertes

| # | Décision | Recommandation |
|---|---|---|
| 1 | Valider les trois profils de la section 2.6 et le contenu du compte gratuit | Client site : demandes, visites, avis, modifications du site, factures. Inscrit gratuit : page de demande de devis, quelques devis par mois, audit gratuit de présence en ligne. |
| 2 | Base de données | Supabase Pro à Paris, sauf si l'inventaire OVH (section 3.1) montre quelque chose de réutilisable ; en attente de l'accès OVH. |
| 3 | Organisation GitHub de l'entreprise ou compte de Gabin pour `neobatys-app` | Organisation en plan Team (8 $ par mois pour deux). |
| 4 | Valider les projets juridiques de `docs/juridique/plateforme/` | Relecture par Ilann et Gabin ; un avocat seulement sur les points listés dans leur README si le doute persiste. |
| 5 | Rendez-vous avec Super PDP | Avant l'étape 2. |
| 6 | Réponses de Gabin aux sept questions de la section 1.2 | Avant l'étape 1. |
| 7 | Module Achats, stock et outillage | Huit décisions propres au module, section 5 de [`docs/plateforme/module-achats-stock.md`](plateforme/module-achats-stock.md) ; la principale : partir des prix nets de l'artisan (ses fichiers tarif et ses factures), pas des sites de Leroy Merlin ou Castorama. |
