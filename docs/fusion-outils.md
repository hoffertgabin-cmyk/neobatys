# Fusion des outils NEOBATYS : admin de Gabin, IA Compta DriftShop, CRM WhatsApp LeasePro

Statut : proposition du 3 novembre 2026, rien n'est codé. Les trois outils ont été lus sans modification. Aucun secret ni aucune donnée client n'est recopié ici. Les chemins de fichiers renvoient à chaque dépôt ; les numéros de ligne correspondent à l'état lu le 3 novembre (admin : commit `3b89fd7`).

Ce document complète [`plateforme-admin.md`](plateforme-admin.md), écrit avant que l'admin de Gabin soit lisible depuis le compte d'Ilann. Sa lecture change deux décisions du 1er novembre (section 6, décisions 1 et 2).

## Résumé à donner à Gabin

- **Ton admin devient la base de la plateforme.** Il est en ligne, il a 12 agents, une CI (typecheck, lint, tests, build), un cœur d'agent commun (niveaux d'autonomie, quota, anti-doublon, journal) et la même pile que celle qu'on avait prévue (Next.js 16, Drizzle, Postgres). Repartir d'un dépôt neuf `neobatys-app` ferait perdre ce travail : on ne le fait pas.
- **Ce qui lui manque pour vendre à plusieurs artisans : le multi-clients.** Aujourd'hui, un artisan est une ligne de `contacts` et chaque agent a son propre `deploymentId` ; les artisans n'ont pas de compte ; le filtrage est seulement dans le code, sans Row Level Security. Il faut ajouter une `organization` (l'artisan), des comptes et des rôles, `organization_id` sur les tables des agents, et un test qui vérifie qu'un artisan ne voit jamais les données d'un autre. La PR 11 (une copie de l'outil par client) part dans l'autre direction : on propose de ne pas la fusionner.
- **Ce qu'on reprend des outils d'Ilann, sans reprendre leur code tel quel :**
  - de l'IA Compta DriftShop (Python, 2 157 tests) : la double lecture par deux modèles de fournisseurs différents, la preuve que chaque montant figure bien sur la page, la clé de doublon par SIREN ou TVA, le répertoire des fournisseurs, la lecture du XML Factur-X des factures reçues. Ton agent `fournisseurs` lit une facture en un seul appel et n'a pas de répertoire de fournisseurs ;
  - du CRM LeasePro : le canal WhatsApp officiel (API Cloud de Meta, webhook signé, fenêtre de 24 heures, modèles), la relecture du brouillon par un « manager », l'apprentissage par corrections, et la méthode d'évaluation sur conversations réelles en plusieurs passes. Ton admin n'a pas de WhatsApp.
- **Tes PR 39 (Factur-X) et 40 (réception de chantier) passent en premier**, avant tout changement de schéma, en renumérotant la migration 0019 qu'elles se disputent.
- **DriftShop et LeasePro restent des outils séparés pour leurs clients.** Leurs données ne viennent jamais dans la base NEOBATYS.
- Effort estimé : 6 à 9 semaines de travail à deux avec Claude Code pour le multi-clients et les reprises, en parallèle des ventes (section 5).

## 1. Les trois outils en bref

| | Admin de Gabin (`hoffertgabin-cmyk/neobatys-admin`) | IA Compta DriftShop (`~/TAGDelme/driftshop-factures/code`) | CRM LeasePro (`leasepro/leasepro-crm`) |
|---|---|---|---|
| Pour qui | NEOBATYS et, par déploiement d'agent, ses artisans clients | Un seul client : DriftShop | Une seule entreprise : LeasePro |
| Langage, framework | TypeScript, Next.js 16.4.2, React 19.3 | Python 3.12, FastAPI 0.142, pages Jinja2 | JavaScript (CommonJS), Express 4, React 18 + Vite 5 |
| Base | Postgres Neon, région Francfort (`docs/MISE-EN-LIGNE.md:19`) ; PGlite en local ; Drizzle 0.45.4, 19 migrations | SQLite en WAL, SQL brut, environ 45 tables (`factures/base.py:834`) | SQLite (`better-sqlite3`), `server/infra/schema.sql`, migrations dans `db.js` |
| Fichiers | `bytea` dans Postgres (`db/schema.ts:757`) | Volume chiffré `/donnees/pieces`, copie Drive | Disque `server/media/` |
| Connexion | next-auth 5.0.0-beta.32, lien par e-mail, liste `ALLOWED_EMAILS` (`auth.ts:9-45`) | Google OIDC, rôles relecteur, manager, administrateur | Identifiant et mot de passe, rôles `admin` et `user` |
| IA | Anthropic (`claude-opus-5-5`, `claude-sonnet-5-5`) et OpenAI (lecture `gpt-6.1-terra`, dictée), déclarés dans `lib/ai/models.ts:11-23`, plafond mensuel (`lib/ai/budget.ts:5`), coût par appel en table `aiCalls` | Anthropic `claude-opus-5-5` en lecture, `gemini-3.8-flash` en contre-lecture (`factures/web/app.py:47`), repli `claude-sonnet-5-5` | OpenAI (famille `gpt-5.x`, transcription `gpt-4o-mini-transcribe`) et Anthropic, un seul point d'entrée `server/ia/providers.js` |
| Où il tourne | Vercel (fonctions `cdg1`), en ligne sur `admin.neobatys.com`, 7 tâches planifiées (`vercel.json`) | Pilote sur le poste de TAG Delme ; cible : serveur de DriftShop en Docker Compose, versions 1.0.0-rc1 à 1.0.3 livrées | Mac d'Ilann (agent `launchd`), Docker et Caddy prêts (`docs/deploiement.md`) |
| Tests et contrôles | 10 scripts `scripts/test-*.ts` (`node:assert` sur PGlite), 8 en CI ; évaluations IA lancées à la main depuis `/agents/controle`, sur données synthétiques, hors CI | 2 157 fonctions `test_` dans 94 fichiers (pytest) ; pas de CI ni de dépôt distant, barrière locale `fusionner.sh` | 60 tests dans 16 fichiers (`node --test`) ; évaluations sur corpus réel (`scripts/eval*.js`, plusieurs passes, mesure du bruit) ; revue Claude en CI |
| Historique | 110 commits | 598 commits du 1er octobre au 2 novembre 2026, **aucun remote** | 255 commits |

## 2. Fonction par fonction

| Fonction | Qui le fait | Le meilleur, et pourquoi (preuves) | Ce qu'il faut reprendre de l'autre |
|---|---|---|---|
| **Factures fournisseurs** | Gabin (agent `fournisseurs`) ; DriftShop (tout l'outil) | **DriftShop.** Deux lectures indépendantes par deux fournisseurs d'IA, comparées champ par champ (`lecture/contre_lecture.py:79-118`) ; un accord ne vaut jamais pour deux valeurs vides (`lecture/croisement.py:182-205`) ; contrôle anti-invention, chaque valeur doit être trouvée sur la page (`lecture/preuve.py`) ; OCR sur l'image rendue, jamais sur la couche texte d'un scan (`analyse/ocr.py:3-5`) ; analyse dans un conteneur sans réseau ni secret (`compose.yaml:59-62`) ; doublon par identité fiscale + numéro normalisé, réservé en base (`cles.py:14-60`) ; répertoire des fournisseurs (`liens.py`). Gabin : un seul appel de vision validé par zod, une relance si illisible (`lib/agent-fournisseurs.ts:47-61`), doublon par empreinte du fichier puis fournisseur + numéro ou date + TTC (`lib/fournisseurs-pure.ts:127-147`), nom de fournisseur libre, aucun test automatique. | Dans l'agent de Gabin : seconde lecture par un autre fournisseur et règle d'accord ; preuve sur la page ; clé de doublon fiscale ; table `suppliers` par organisation ; lecture du XML Factur-X avant toute IA (les factures reçues par la plateforme agréée sont structurées). Les cas de test DriftShop servent de cahier de recette, réécrits en TypeScript. De Gabin à garder : génération de fausses factures pour l'évaluation, protection contre l'injection de consignes (`lib/agent-fournisseurs.ts:43`), suppression des originaux à 90 jours. |
| **Compta et export** | Gabin (compta de NEOBATYS : relevés CSV, rapprochement, export CSV) ; DriftShop (envoi JSON à l'API de DriftShop et PDF dans Drive) | **Gabin** pour la compta de NEOBATYS (`lib/bank-csv.ts`, `app/(outil)/compta/export/route.ts:12-25`). Aucun des deux ne produit de FEC ni un format d'import de logiciel comptable : DriftShop exporte vers le système de son client (`api_driftshop.py:148-167`), qui ne sert à personne d'autre. | À écrire : export FEC par organisation, puis formats des logiciels des comptables des artisans pilotes. De DriftShop : rapprochement bancaire sans conserver les relevés (`releves.py:1-2`). |
| **Facturation client et Factur-X** | Gabin (factures de NEOBATYS sur `main` ; PR 39 pour les artisans) | **Gabin, PR 39** : acomptes, situations, soldes, avoirs, retenue de garantie, XML CII EN 16931 et PDF/A-3b, 310 contrôles, validation XSD, Schematron et veraPDF en CI (`banc-neon.yml`). Seule une fausse plateforme agréée est branchée (`lib/facturation-plateforme.ts`). | Brancher la plateforme agréée retenue (Super PDP recommandée dans `plateforme-admin.md` section 3.2). Numérotation par organisation, sans trou, verrouillée en base (section 4 de `plateforme-admin.md`). |
| **Relances** | Gabin (impayés `relance`, devis `relance-devis`, tâches du matin) ; LeasePro (relances WhatsApp des prospects chauds et tièdes) | **Gabin** pour le moteur : montant, numéro et date posés par le code, texte par l'IA (`lib/agent-relance.ts`), arrêts et prolongation pour les devis (`lib/agent-relance-devis.ts`). **LeasePro** pour le canal : une relance WhatsApp hors fenêtre de 24 heures doit passer par un modèle approuvé par Meta (`server/canaux/whatsapp-provider.js`, fenêtre de service), et l'IA se retire sept jours quand le gérant écrit lui-même. | Ajouter le canal WhatsApp aux deux agents de relance de Gabin, avec le contrôle de fenêtre et l'envoi de modèle. Reprendre de LeasePro le retrait de l'IA quand l'humain reprend la main et le réglage « toujours moi ». |
| **WhatsApp et messagerie** | Gabin (boîte OVH en IMAP toutes les 5 minutes, SMS Twilio ; WhatsApp n'est qu'un libellé, `lib/labels.ts:65`) ; LeasePro (WhatsApp, Messenger, Instagram) | **LeasePro**, seul à avoir WhatsApp : boîte de réception complète, vocaux transcrits, deux moteurs derrière un réglage. Le moteur actif, Baileys (`@whiskeysockets/baileys` 7.0.0-rc14), est non officiel et expose à la suspension du numéro (`whatsapp-provider.js:8-11`) : jamais chez un artisan. Le moteur `cloud` (API officielle, webhook signé) est prêt mais mono-numéro. | Porter en TypeScript `server/canaux/whatsapp-cloud.js` et la fenêtre de 24 heures, avec une ligne d'identifiants chiffrés par organisation et l'Embedded Signup de Meta (NEOBATYS « Tech Provider »). Garder la boîte mail et les SMS de Gabin ; une seule boîte de réception pour les trois canaux. |
| **Qualification des demandes** | Gabin (`/api/leads`, `/api/demandes`, agent `reponse`) ; LeasePro (note d'intérêt, fiche vivante) | **LeasePro pour la méthode, Gabin pour le branchement.** LeasePro : pré-filtre déterministe gratuit, puis le modèle doit citer les signaux qui justifient sa note (`server/ia/interest.js:1-17`), fiche en six champs qu'un champ corrigé à la main fige, brouillon relu par un « manager » sur un modèle plus fort (`server/ia/manager.js`), évaluation en plusieurs passes avec mesure du désaccord (`scripts/eval.js:393-469`). Gabin : réception des leads du site déjà en production (contrat `docs/CONTRAT-SITE-CRM.md`), urgence, historique client et apprentissage des corrections (`lib/agent-reponse.ts:60-151`). | Dans l'agent `reponse` : niveaux chaud, tiède, froid, hors cible avec signaux cités ; relecture manager en option ; fiche dont les champs corrigés sont figés. Remplacer le vocabulaire du leasing par un gabarit « artisan du bâtiment ». |
| **CRM** | Gabin (contacts avec opposition à la prospection, devis, factures, projets, calendrier avec flux ICS, compta) ; LeasePro (fiche client, étapes du parcours, rendez-vous) | **Gabin** : c'est le seul CRM complet, en ligne, avec numérotation légale et journal d'audit (`lib/audit.ts`). LeasePro est centré sur une boîte de conversations. | De LeasePro : la file « par priorité » (ce qui attend une décision, rendez-vous des 24 heures, réponses dues) pour l'accueil de l'artisan. |
| **Multi-clients** | Personne. Gabin : par déploiement d'agent, sans compte artisan, sans RLS (aucune politique dans `db/migrations`) ; la PR 11 copie l'outil par client (projet Vercel et base séparés). DriftShop et LeasePro : mono-entreprise par construction (constantes DriftShop en dur dans `lecture/assemblage.py:13`, aucune notion de compte dans le schéma LeasePro). | **La conception d'Ilann** (`plateforme-admin.md` section 4) : `organizations`, `members`, `organization_id` partout, RLS, test à deux organisations. C'est la spécification ; aucun code ne la porte encore. | L'appliquer au schéma de Gabin. Clé de passage : l'organisation se reconstruit depuis `contacts.id` de l'artisan (`agentDeployments` est unique sur agent + contact, `db/schema.ts:618-634`), pas depuis `deploymentId`. |
| **Agents** | Gabin : 12 sur `main` (réponse, appels, devis, avis, relance-devis, entretiens, rendez-vous, relance, fournisseurs, rentabilité, aides, documents), 14 avec les PR 39 et 40 | **Gabin** : registre typé (`lib/agents.ts:35`), cinq niveaux d'autonomie avec plafond « Validation » pour les capacités sensibles (`levelOf`, `:181-185`), réglables par les associés (`agentPolicies`) ; `prepareRun` vérifie pause, statut, profil, quota de 200 actions par heure, doublon du jour (`lib/agent-core.ts:21-46`) ; sortie validée par zod avec trois essais ; journal `agentActions`. | De DriftShop : machine à états avec verrou optimiste (`factures/etats.py:57`) pour les agents à plusieurs étapes, secrets jamais en variable d'environnement en production. De LeasePro : évaluations sur cas réels avant et après tout changement de prompt ou de modèle, rattrapage des brouillons manqués après une panne (`server/ia/pipeline.js:25-40`). Des trois : évaluations hors ligne (réponses d'IA enregistrées) dans la CI, les appels réels restant manuels. |

## 3. Cible recommandée

**Une base de code commune, celle de l'admin de Gabin, devenue multi-clients. DriftShop et LeasePro restent des installations séparées pour leurs clients, sans lien d'API avec la plateforme.**

Pourquoi l'admin de Gabin, vérifié et pas supposé :
- en ligne et utilisé (leads du site, tâches planifiées, boîte mail) ;
- même pile que la plateforme prévue dans `plateforme-admin.md` section 3 (Next.js, TypeScript, Drizzle, Postgres, Vercel) ;
- le cœur d'agent commun et le registre des 12 agents sont exactement ce qu'il faut pour des agents vendus aux artisans ;
- CI déjà en place, et la PR 39 apporte la partie la plus réglementée (Factur-X) avec ses validations officielles.

Ce qui ne le rend pas prêt tel quel : pas d'organisation ni de compte artisan, pas de RLS, next-auth en bêta limité à une liste d'adresses, fichiers en `bytea`, peu de tests sur les agents (aucun sur `fournisseurs`, `reponse`, `avis`, `relance`, `rentabilite`).

Pourquoi pas des modules séparés reliés par une API :
- DriftShop est en Python : en faire un service de la plateforme ajouterait un second langage, un second hébergement et un conteneur à faire tourner, alors que les factures des artisans arriveront de plus en plus en Factur-X structuré par la plateforme agréée (réception obligatoire depuis le 1er septembre 2026). Ce qui a de la valeur, ce sont quelques règles (accord des deux lectures, preuve, clé de doublon), qui se portent en quelques centaines de lignes.
- LeasePro repose sur SQLite et sur un processus qui reste connecté : sa partie utile, le canal Cloud, est un client HTTP sans état, simple à porter.
- Une API entre trois outils, c'est trois connexions, trois sauvegardes et trois jeux de secrets à tenir à deux associés.

Ce qui reste séparé, et pourquoi :
- **IA Compta DriftShop** : produit livré à un client, qui tourne chez lui, avec ses données chez lui. Il continue sa vie (versions 1.0.x). S'il faut un jour la même chose pour un autre client hors bâtiment, on refait une installation dédiée.
- **CRM LeasePro** : outil de LeasePro sur Baileys. Le jour où le module WhatsApp de la plateforme existe, LeasePro peut devenir une organisation de la plateforme et quitter Baileys ; pas avant.

## 4. Plan de migration par étapes

| Étape | Contenu | Fin quand |
|---|---|---|
| **0. Accord et rangement** | Lire ce document avec Gabin ; organisation GitHub de l'entreprise et transfert de `neobatys-admin` dedans (décision 3 de `plateforme-admin.md` 8.3) ; dépôt distant privé pour DriftShop, qui n'existe qu'en local ; fermer ou geler la PR 11. | Les deux associés administrateurs du dépôt, DriftShop sauvegardé sur un remote. |
| **1. Finir ce qui est ouvert** | Fusionner la PR 39, puis la 40 avec sa migration renumérotée ; PR 7 et 3 selon Gabin. | `main` contient la facturation Factur-X et la réception de chantier, CI verte. |
| **2. Multi-clients** | Tables `organizations` et `members` ; NEOBATYS est une organisation `staff` ; une organisation par artisan existant, créée depuis `contacts` ; `organization_id` sur toutes les tables des agents et du CRM des artisans, rempli par migration ; une fonction d'accès qui prend l'organisation de la session ; RLS sur les tables métier ; test à deux organisations sur toutes les routes ; comptes artisans (décision 4) ; jetons d'agent par organisation au lieu de la dérivation de `AUTH_SECRET`. | Un artisan pilote se connecte et ne voit que ses données ; le test croisé passe en CI. |
| **3. Fichiers et données** | Sortir les fichiers du `bytea` vers un stockage objet en Union européenne ; décider la région de la base (décision 3) ; sauvegardes testées. | Base allégée, restauration essayée une fois. |
| **4. Factures fournisseurs, version DriftShop** | Dans l'agent `fournisseurs` : lecture du XML Factur-X d'abord, seconde lecture par un autre fournisseur, règle d'accord, preuve sur la page, clé de doublon fiscale, table `suppliers` ; tests portés depuis les cas DriftShop ; évaluation sur les fausses factures existantes. | Taux d'accord et de pièces envoyées en relecture mesurés sur le jeu d'évaluation, en CI. |
| **5. Évaluations** | Méthode LeasePro dans la plateforme : jeux de cas par agent, plusieurs passes, mesure du désaccord, résultat versionné ; version hors ligne en CI. | Chaque changement de prompt ou de modèle montre son score avant et après dans la PR. |
| **6. WhatsApp** | Statut Tech Provider (démarches Meta dans [`meta-whatsapp.md`](meta-whatsapp.md)), Embedded Signup, identifiants chiffrés par organisation, webhook signé, fenêtre de 24 heures et modèles, boîte de réception unique (mail, SMS, WhatsApp), brouillons avec relecture manager ; canal branché sur `reponse`, `relance` et `relance-devis`. | Un artisan pilote répond à ses clients WhatsApp depuis la plateforme. |
| **7. Export comptable** | FEC par organisation, puis formats demandés par les comptables des pilotes. | Le comptable d'un pilote importe un mois sans ressaisie. |

Les étapes 4, 5 et 7 ne dépendent pas de l'étape 6 et peuvent avancer en parallèle, sur des fichiers distincts, une fois l'étape 2 fusionnée.

## 5. Effort

Estimation en semaines de travail effectif avec Claude Code, à affiner après l'étape 1.

| Étape | Effort | Qui (proposition) |
|---|---|---|
| 0. Accord et rangement | 1 à 2 jours | Les deux |
| 1. PR 39 et 40 | 2 à 3 jours | Gabin |
| 2. Multi-clients | 2 à 3 semaines | Gabin (il connaît le schéma), revue d'Ilann |
| 3. Fichiers et données | 3 à 5 jours | Gabin |
| 4. Factures fournisseurs | 1 à 1,5 semaine | Ilann (il connaît DriftShop) |
| 5. Évaluations | 1 semaine | Ilann |
| 6. WhatsApp | 1,5 à 2 semaines de code, plus les délais de Meta (vérification d'entreprise, examen de l'application) | Ilann |
| 7. Export FEC | 3 à 5 jours | Gabin |

Total : environ 6 à 9 semaines à deux, hors délais de Meta et de la plateforme agréée.

## 6. Risques

| Risque | Ce qui peut arriver | Parade |
|---|---|---|
| **Données clients DriftShop** | Factures, fournisseurs et montants de DriftShop copiés dans la base NEOBATYS ou dans un jeu de tests | Rien ne sort de l'installation DriftShop. On porte les règles et on réécrit les cas de test avec des données inventées. Le dossier `donnees/` et la base SQLite restent hors git (c'est déjà le cas, `.gitignore:3-5`). |
| **Perte de DriftShop** | 598 commits sans dépôt distant : une panne ou une erreur sur le poste efface l'historique | Dépôt privé sur l'organisation GitHub à l'étape 0, en excluant les données. |
| **Données clients LeasePro** | Conversations, numéros de téléphone et corpus d'évaluation réels (`corpus/`) réutilisés pour la plateforme | La base et le corpus de LeasePro ne servent qu'à LeasePro. Les évaluations de la plateforme partent de cas inventés, puis de cas d'artisans pilotes avec leur accord écrit (contrat de sous-traitance). |
| **Secrets LeasePro** | Les clés d'API et les identifiants WhatsApp sont dans la table `settings`, donc dans chaque sauvegarde de la base | Ne jamais copier cette base hors de LeasePro ; dans la plateforme, identifiants chiffrés par organisation avec une clé maîtresse dans Vercel (`plateforme-admin.md` section 5). |
| **Secrets de l'admin** | Les jetons des artisans sont dérivés de `AUTH_SECRET` (`lib/agent-core.ts:17`) : changer ce secret coupe tous les artisans d'un coup, et un secret fuité les ouvre tous | Jetons tirés au hasard par organisation, stockés hachés, révocables un par un (étape 2). |
| **Fuite entre artisans** | Un `where` oublié dans le code montre les données d'un artisan à un autre : aucun garde-fou en base aujourd'hui | RLS plus test croisé à deux organisations dans la CI (étape 2). |
| **RGPD, rôles** | NEOBATYS est sous-traitant des données des clients des artisans dès qu'ils ont un compte | Contrat de sous-traitance (`docs/juridique/plateforme/contrat-sous-traitance.md`) signé avant le premier compte artisan ; liste des sous-traitants ultérieurs à jour (Neon ou autre, Vercel, Anthropic, OpenAI, Google si Gemini, Meta, Twilio, OVH). |
| **RGPD, effacement** | L'effacement des prospects de l'admin n'agit que si `RGPD_EFFACEMENT=actif` (`lib/retention.ts:17`) et ne couvre que les agents commerciaux | Vérifier ce réglage en production ; étendre la conservation à toutes les tables par organisation à l'étape 2. |
| **WhatsApp non officiel** | Baileys utilisé chez un artisan : suspension de son numéro | Interdit chez les clients (`plateforme-admin.md` section 7). Seule l'API Cloud est portée. |
| **Dépendance en bêta** | next-auth 5 est toujours en bêta (5.0.0-beta.32) | Décision 4. |
| **Migration du schéma en production** | L'ajout de `organization_id` sur une base en ligne casse un agent ou une tâche planifiée | Migration en deux temps (colonne remplie, puis contrainte), répétée sur une copie de la base, tâches planifiées en pause pendant la bascule. |
| **Deux versions qui avancent** | Ilann continue la plateforme dans un dépôt neuf pendant que Gabin fait évoluer son admin | Décision 1 : un seul dépôt. `docs/plateforme/depart/` sert de contenu d'appoint (règles, CI), pas de nouveau dépôt. |

## 7. Décisions

1. **Base de la plateforme : faire évoluer `neobatys-admin` au lieu de créer `neobatys-app`.** Cela remplace les décisions 1 et 2 du 1er novembre (`plateforme-admin.md` 8.1). Recommandation : oui ; le contenu de `docs/plateforme/depart/` est repris dans le dépôt de Gabin là où il apporte quelque chose.
2. **Multi-clients par ligne (`organization_id` et RLS) ou une installation par client (PR 11).** Recommandation : par ligne ; ne pas fusionner la PR 11, ou la garder seulement le temps de servir BEST TP avant la fin de l'étape 2.
3. **Région de la base : rester sur Neon à Francfort ou passer chez Supabase à Paris (recommandation du 1er novembre).** Recommandation : rester sur Neon pour l'instant (Union européenne, déjà en ligne, aucune migration de données), passer en offre payante avec sauvegardes, et ne déménager à Paris que si un client l'exige ; fichiers dans un stockage objet en Union européenne.
4. **Connexion : garder next-auth 5 en bêta ou passer à Better Auth avec son plugin `organization`.** Recommandation : Better Auth à l'étape 2, puisqu'il faut de toute façon créer les comptes artisans, les organisations et les rôles ; vérifier la version et la doc du plugin au moment de coder.
5. **IA Compta DriftShop : rester un produit séparé et porter ses règles dans l'agent `fournisseurs`.** Recommandation : oui, sans service Python dans la plateforme ; dépôt distant privé dès l'étape 0.
6. **CRM LeasePro : rester l'outil de LeasePro et porter le canal WhatsApp Cloud dans la plateforme.** Recommandation : oui ; LeasePro devient une organisation de la plateforme seulement quand le module WhatsApp y tourne chez un pilote.
7. **Ordre : PR 39 et 40 avant le multi-clients.** Recommandation : oui, la 39 d'abord, puis la 40 avec sa migration renumérotée.
8. **Évaluations des agents dans la CI.** Recommandation : version hors ligne en CI (réponses enregistrées), appels réels à la main avant chaque changement de modèle, résultat joint à la PR.
9. **Répartition.** Recommandation : Gabin porte le cœur (multi-clients, fichiers, export FEC, PR ouvertes) ; Ilann porte les reprises (factures fournisseurs, évaluations, WhatsApp). Une seule session écrit sur `main` à la fois, les autres en worktree sur des fichiers distincts.
