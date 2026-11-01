# Plateforme NEOBATYS : conception (phase 1)

Un seul logiciel, hébergé chez nous. Chaque artisan crée son compte et trouve tout de suite les modules standards ; on active les autres et on personnalise ensuite. Nous avons notre propre back-office pour suivre tous les clients.

Statut : proposition, rien n'est codé. Les décisions à prendre sont en fin de document. La veille sur les concurrents est dans [`docs/veille/plateforme-admin.md`](veille/plateforme-admin.md). La maquette du tableau de bord client est [`docs/maquette-tableau-de-bord.html`](maquette-tableau-de-bord.html) (ouvrir dans un navigateur).

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

| Module | Ce qu'il fait | Activé à la création | Vient de |
|---|---|---|---|
| **Accueil** | KPI du mois, graphique sur l'année, demandes à traiter, assistants IA, « à faire aujourd'hui » (maquette) | Oui | `ConsoleMockup` |
| **Demandes** | Toutes les demandes entrantes au même endroit : formulaire du site de l'artisan, appel manqué, WhatsApp, Google. Statut, origine, relance. | Oui | Contrat `/api/leads` du site |
| **Devis et factures** | Bibliothèque d'ouvrages, devis, signature en ligne, acompte, facture, relance, export comptable. Facture électronique par une plateforme agréée partenaire. | Oui | Promesses de `content/data/software.json` |
| **Assistant réponse aux demandes** | Répond en quelques minutes à chaque demande (e-mail, WhatsApp), qualifie, propose une visite. Validation humaine par défaut. | Essai | LeasePro : brouillon, manager, corrections |
| **Devis à la voix** | L'artisan dicte sur le chantier, l'IA prépare le devis à partir de sa bibliothèque d'ouvrages. Toujours relu avant envoi. | Essai | LeasePro : `voix.js` |
| **Relances impayés** | Rappels polis et gradués (J+3, J+7, J+14 après l'échéance, comme Podium) avec lien de paiement, arrêt automatique au paiement. | Avec Devis et factures | Promesse du site |
| **Avis Google** | Demande d'avis après chaque chantier terminé, brouillon de réponse aux avis reçus. | Sur option | Offre du site |
| **Conversations WhatsApp** | Boîte de réception WhatsApp (et Messenger, Instagram) de l'artisan, fiche client, brouillons IA. | Sur option | LeasePro (canal Cloud) |
| **Statistiques** | Visites du site de l'artisan, demandes par source, taux de signature, délai de réponse. | Oui | Contrat `/api/vues` |
| **Site internet** | État du site livré, modifications demandées, nom de domaine. | Si client site | Offres sites |
| Standard téléphonique IA | Pas un module standard : sur devis uniquement. | Non | |

Règle reprise de LeasePro : un module n'est livré qu'avec la mesure qui dira dans un mois s'il sert (connexions, actions faites dedans).

### 2.3 Personnalisation sans fork

Trois niveaux, du plus courant au plus rare, sans jamais copier le code pour un client :

1. **Réglages du module** (l'artisan ou nous) : logo, couleurs des documents, mentions, conditions de paiement, ton de l'IA, horaires, zone d'intervention, tarifs annonçables. Stockés en JSON validé par un schéma zod par module.
2. **Contenus par artisan** (nous) : prompt complémentaire, questions de qualification propres au métier, modèles de messages WhatsApp, bibliothèque d'ouvrages importée.
3. **Gabarits de départ par métier** (nous) : plombier, électricien, couvreur... Un gabarit = une liste de modules activés + leurs réglages + une bibliothèque d'ouvrages type. Appliqué à la création du compte. C'est l'équivalent des « snapshots » de HighLevel, et c'est ce qui rend « le client a déjà accès à la plupart des services » réaliste.

Une demande vraiment spécifique devient soit un réglage de plus pour tous, soit un développement sur devis hors plateforme.

### 2.4 Le parcours d'un nouvel artisan

1. Inscription sur `app.neobatys.com` (e-mail + mot de passe ou lien magique), nom de l'entreprise, métier, SIRET.
2. Le gabarit du métier s'applique : Accueil, Demandes, Devis et factures, Statistiques activés ; assistants IA en essai.
3. Assistant de démarrage en quatre étapes (le site promet un accompagnement humain, on garde les deux) : logo et mentions, import clients et prix (Excel), premier devis, connexion WhatsApp (facultative, Embedded Signup de Meta).
4. Nous voyons le nouveau compte dans le back-office, avec une alerte « à appeler sous 24 h ».
5. Abonnement : paiement par Stripe à la fin de l'essai, ou rattachement à une offre déjà signée (Essentiel, Pro, Premium, packs) que nous saisissons.

### 2.5 Notre back-office

| Écran | Contenu |
|---|---|
| Clients | Tous les artisans : offre, modules actifs, MRR, dernière connexion, demandes sur 30 jours, état WhatsApp, consommation IA. Tri et filtres. |
| Fiche client | Tout ce qui précède, plus l'historique, les notes internes, les modules à activer d'un clic, les réglages. Bouton « voir comme le client » (accès tracé dans le journal d'audit, visible du client). |
| Chiffres | MRR, nouveaux clients, résiliations, revenu par module, coût IA et WhatsApp par client comparé à son abonnement. |
| Alertes | Numéro WhatsApp déconnecté, paiement Stripe échoué, demande non traitée depuis 48 h, client inactif depuis 14 jours, coût IA au-dessus du seuil, erreur d'envoi de facture électronique. Chaque alerte part aussi par e-mail. |
| Nos prospects | Les leads du site NEOBATYS (ce que reçoit l'admin actuel). Nous sommes une organisation comme une autre, avec le module Demandes. |
| Outils IA internes | Résumé d'un compte avant un appel, préparation d'un gabarit pour un nouveau métier, analyse des corrections de tous les clients pour améliorer les prompts communs. |

## 3. Pile technique

La pile reprend celle du site autant que possible : un seul langage, une seule façon de déployer, un seul fournisseur de plus (la base).

Versions relevées sur le registre npm (`npm view <paquet> dist-tags.latest`) le 1er novembre 2026. Tarifs : voir la veille, sources citées.

| Brique | Choix | Version / offre | Pourquoi |
|---|---|---|---|
| Application | Next.js (App Router), TypeScript, Tailwind 4 | `next` 16.4.3 (le site est en 16.4.2) | Même pile que le site : mêmes composants (`ConsoleMockup`, couleurs), même CI, même hébergeur, mêmes réflexes pour Claude Code. Lire `node_modules/next/dist/docs/` avant de coder (règle d'`AGENTS.md`). |
| Base de données | Postgres chez Supabase, région Paris (`eu-west-3`) | Plan Pro, 25 $/mois (8 Go de disque, 100 Go de fichiers inclus) | Postgres avec Row Level Security, stockage de fichiers (PDF, photos, vocaux) et sauvegardes au même endroit, en France. Neon n'a que Francfort dans l'UE et pas de stockage de fichiers. Choisir explicitement Paris, pas l'option générique « Europe ». |
| Accès aux données | Drizzle ORM | `drizzle-orm` 0.45.4 | Schéma en TypeScript, SQL lisible, migrations versionnées, pas de génération de client ni de moteur à embarquer. Alternative : Prisma 7.10.1 (attention : le tag `latest` de Prisma pointe vers une pré-version 8.0.0-rc.29, il faudrait épingler). |
| Authentification | Better Auth | `better-auth` 1.7.15, plugins `organization`, `admin`, `two-factor`, `magic-link` (présents dans les exports du paquet) | Organisations, membres et rôles fournis, comptes stockés dans notre propre Postgres. Auth.js reste en bêta pour sa v5 (5.0.0-beta.32). Vérifier dans la doc du plugin `admin` la fonction « se connecter en tant que » avant de s'en servir. |
| Paiement des abonnements | Stripe Billing | `stripe` 23.1.0 ; 1,5 % + 0,25 € par carte UE standard, 0,35 € par prélèvement SEPA, Billing 0,7 % du récurrent | Abonnements, essai, relance des cartes refusées, portail client. Le même compte peut servir aux paiements des factures des artisans plus tard (Stripe Connect, à étudier à l'étape 2). |
| IA | API Anthropic | `@anthropic-ai/sdk` 1.3.0 | Fournisseur déjà utilisé par le CRM LeasePro (actif depuis le 18 octobre 2026) et par l'assistant FAQ du site. Un seul module d'appel, comme `server/ia/providers.js`, pour pouvoir changer de modèle en mesurant. |
| WhatsApp | API Cloud de Meta, NEOBATYS « Tech Provider », Embedded Signup | 0,0248 € par message de service ou utilitaire, 0,0712 € par message marketing (grille France au 1er octobre 2026), 1 000 messages de service gratuits par mois et par numéro | Officiel, le numéro reste celui de l'artisan (Coexistence), l'artisan paie Meta directement. Démarche longue : vérification d'entreprise, examen de l'application, 10 nouveaux clients par 7 jours au début. |
| E-mails | Resend | déjà utilisé par le site (`resend` ^6.34.1) | Rien de nouveau à apprendre. |
| Facture électronique | Plateforme agréée (PA) partenaire, par API | à choisir dans la liste officielle (impots.gouv.fr, mise à jour du 30 octobre 2026) | Réception obligatoire pour toutes les entreprises depuis le 1er septembre 2026, émission obligatoire pour les TPE et PME au 1er septembre 2027. On ne devient pas PA nous-mêmes. |
| Hébergement | Vercel, projet séparé du site, fonctions en région européenne proche de la base | offre Vercel actuelle du site | Même outil que le site, aperçu par PR, CI identique. Les tâches de fond (relances, synchronisations) passent par les tâches planifiées de Vercel ou une file Postgres ; à trancher à l'étape 1 en lisant la doc à jour. |

Ce que la pile ne contient pas, volontairement : pas de microservices, pas de Kubernetes, pas de second langage, pas de file de messages dédiée tant que Postgres suffit.

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
subscriptions      organization_id, offre, stripe_customer_id, statut, montant mensuel
```

Garde-fous contre la fuite d'un client à l'autre :
- Toute requête passe par une fonction qui prend l'organisation de la session ; aucune requête brute dans les écrans.
- En plus, politiques Row Level Security de Postgres sur les tables métier, pour qu'un oubli dans le code ne suffise pas à fuir.
- Un test automatique crée deux organisations et vérifie qu'aucune route ne renvoie les données de l'autre.

Numérotation des factures : séquence continue par organisation, sans trou, verrouillée en base ; une facture émise n'est jamais modifiée (avoir pour corriger).

## 5. Sécurité et RGPD

- **Rôles.** Pour chaque artisan, nous sommes sous-traitant (article 28 du RGPD) des données de ses clients : contrat de sous-traitance annexé aux conditions générales. Pour nos propres prospects, nous sommes responsables de traitement (déjà couvert par `politique-de-confidentialite`).
- **Hébergement en Union européenne** pour la base et les fichiers. Liste des sous-traitants ultérieurs publiée (hébergeur, base, Anthropic, Meta, Stripe, Resend) avec leurs contrats de traitement des données.
- **Secrets.** Jetons WhatsApp et clés chiffrés en base (clé maîtresse dans les variables Vercel), jamais affichés en clair après saisie. La leçon de LeasePro (clés d'API dans la table `settings`, copiées dans les sauvegardes) n'est pas reproduite.
- **Comptes.** Mots de passe hachés par la bibliothèque, double authentification obligatoire pour le rôle `staff`, sessions révocables, limitation des tentatives.
- **Journal d'audit** de tout accès `staff` à un compte client et de tout export.
- **Droits des personnes.** Export et suppression d'un contact à la demande de l'artisan ; suppression complète d'une organisation à la résiliation après la durée de conservation légale des factures (10 ans pour les pièces comptables, conservées à part).
- **IA.** Pas d'entraînement des modèles sur les données des clients (vérifier les conditions du fournisseur retenu), données minimales dans les prompts, journal des appels.
- **Sauvegardes** quotidiennes chiffrées hors de la base principale, restauration testée une fois par trimestre.

## 6. Plan en étapes

Hypothèse : deux associés, le site et la vente continuent en parallèle, Claude Code fait l'essentiel du code. Les durées sont des ordres de grandeur, à réviser après l'étape 1.

| Étape | Contenu | Fin quand |
|---|---|---|
| **0. Décider** | Décisions de la section 8, échange avec Gabin (section 1.2), création du dépôt et des comptes (base UE, Stripe) **avec l'accord d'Ilann**. | Dépôt créé, base vide en ligne. |
| **1. Socle et Demandes (MVP)** | Comptes et organisations, rôles, catalogue de modules et activation, back-office (liste des clients, fiche, « voir comme »), module Demandes, routes `/api/leads` et `/api/vues` compatibles avec le site, Accueil avec les vrais chiffres des demandes. | Le site NEOBATYS envoie ses leads à la nouvelle plateforme ; un artisan pilote reçoit les demandes de son site dans son espace. |
| **2. Devis et factures** | Bibliothèque d'ouvrages, devis PDF, signature en ligne, acompte et facture, paiement en ligne, relances impayés, export comptable. Plateforme agréée partenaire pour la facture électronique. | Un artisan pilote fait un mois de devis et factures sans autre outil. |
| **3. Assistants IA** | Réponse aux demandes (e-mail d'abord), devis à la voix, avis Google. Validation humaine par défaut, suite d'évaluation reprise de LeasePro. | Taux de brouillons envoyés sans correction mesuré chez deux artisans. |
| **4. WhatsApp** | Inscription comme fournisseur technique chez Meta, Embedded Signup, Coexistence, boîte de réception, brouillons IA. | Un artisan pilote répond à ses clients WhatsApp depuis la plateforme. |
| **5. Libre-service** | Inscription seule, essai, abonnement Stripe, gabarits par métier, MRR et alertes complètes. | Un artisan s'inscrit et paie sans nous parler. |

Le MVP (étape 1) est volontairement sans IA ni WhatsApp : il remplace l'admin actuel, met en place le multi-clients et donne un premier écran utile à un artisan. Ce qui est vendu aujourd'hui (devis, factures, IA) continue d'être livré comme aujourd'hui jusqu'à l'étape 2.

WhatsApp passe en dernier parce qu'il dépend de délais extérieurs (vérification d'entreprise Meta, examen de l'application) : la démarche administrative est à lancer dès l'étape 0, en parallèle.

## 7. Ce qu'on ne fait pas

- Pas de marque blanche (chaque artisan voit NEOBATYS) : rien ne la demande aujourd'hui.
- Pas d'application mobile native : interface web pensée pour le téléphone, installable.
- Pas de facturation électronique développée nous-mêmes : partenaire agréé.
- Pas de Baileys ni d'automate WhatsApp non officiel chez les clients.
- Pas de standard téléphonique IA en module standard.

## 8. Décisions à prendre par Ilann

| # | Décision | Options | Recommandation |
|---|---|---|---|
| 1 | Nouveau dépôt ou non | (a) nouveau dépôt `neobatys-app` dans le compte GitHub commun ; (b) dossier dans ce dépôt (monorepo avec le site) ; (c) faire évoluer `neobatys-admin` | (a). Le site reste simple et se déploie seul ; la plateforme a ses propres règles (données clients, migrations). Le contrat `/api/leads` relie les deux. |
| 2 | Admin de Gabin : reprise ou remplacement | (a) le remplacer par la nouvelle plateforme, en reprenant son contrat et ses données ; (b) le garder pour nos prospects et faire la plateforme à côté ; (c) partir de son code | Décider après ses réponses (section 1.2). Par défaut (a) : un seul outil, Gabin co-auteur du nouveau dépôt, migration de ses données à l'étape 1. Deux admins en parallèle, c'est le côté « éclaté » qu'on veut quitter. |
| 3 | Nom de domaine | `app.neobatys.com`, `espace.neobatys.com`, `admin.neobatys.com` réutilisé | `app.neobatys.com` pour tout le monde ; `admin.neobatys.com` redirige vers `/interne` après la bascule. |
| 4 | Prix des modules | Inclus dans Essentiel / Pro / Premium, ou abonnement plateforme + modules en option | Plateforme incluse dans toutes les offres (Accueil, Demandes, Devis et factures, Statistiques), assistants IA et WhatsApp selon l'offre, avec un volume inclus et des alertes à 75 % et 100 %. Le coût WhatsApp est payé par l'artisan à Meta. À caler avec le travail en cours sur les offres (`content/data/pricing.json`). |
| 5 | Inscription en libre-service | Dès le MVP, ou seulement à l'étape 5 | Étape 5. D'abord des comptes créés par nous pour trois artisans pilotes. |
| 6 | Base de données | Supabase Paris, Neon Francfort | Supabase Paris (raisons en section 3). |
| 7 | Plateforme agréée de facture électronique | à choisir dans la liste officielle | Choisir avant l'étape 2 : API documentée, prix par facture, accepte les éditeurs partenaires. |
| 8 | Démarches Meta | Lancer maintenant la vérification d'entreprise de TAG Delme SARL et le statut Tech Provider, ou attendre l'étape 4 | Lancer maintenant : c'est le délai le plus long et il ne coûte rien. |
| 9 | Comptes et services à créer | dépôt GitHub, projet Vercel, projet Supabase, compte Stripe, application Meta | Rien n'est créé sans l'accord d'Ilann. Liste à valider en une fois à l'étape 0. |
