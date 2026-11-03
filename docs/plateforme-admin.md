# Plateforme NEOBATYS : suite de l'admin de Gabin

La plateforme n'est plus un outil à part. Elle part de l'admin que Gabin a déjà en ligne (`hoffertgabin-cmyk/neobatys-admin`, dépôt privé, `admin.neobatys.com`), en reprend les règles, et y ajoute ce qui lui manque pour servir plusieurs artisans : leurs comptes, l'inscription libre, le module Achats et stock, le cadre juridique.

Statut : conception, rien n'est codé de notre côté. Recalé le 3 novembre 2026 sur l'admin lu à cette date (110 commits sur `main`, PR #39 et #40 ouvertes). Le plan de migration et les décisions de fond (multi-clients, base, connexion, reprises de DriftShop et LeasePro) sont dans [`fusion-outils.md`](fusion-outils.md), qui fait référence ; ce document décrit le produit qu'on bâtit dessus. Décisions en section 8. La veille sur les concurrents est dans [`docs/veille/plateforme-admin.md`](veille/plateforme-admin.md), la maquette de l'espace artisan dans [`docs/maquette-tableau-de-bord.html`](maquette-tableau-de-bord.html) (ouvrir dans un navigateur).

## 1. Ce qui existe : l'admin de Gabin

### 1.1 Pile et services

| Brique | Dans l'admin | Source |
|---|---|---|
| Application | Next.js 16.4.2, React 19.3.0, TypeScript, Tailwind 4, Zod 4 | `package.json` |
| Base | Postgres Neon, région Francfort, offre gratuite ; PGlite en local ; Drizzle ORM 0.45, migrations numérotées (0000 à 0018 sur `main`) | `docs/MISE-EN-LIGNE.md`, `db/` |
| Hébergement | Vercel, projet séparé du site, fonctions à Paris (`cdg1`), tâches planifiées : relève des mails, rappels du matin, relance de devis, appels, rendez-vous, avis, conservation RGPD | `docs/PLAN-V1.md`, `app/api/cron/` |
| Connexion | Auth.js 5 (bêta), lien de connexion par e-mail, réservé aux adresses de `ALLOWED_EMAILS` : les deux associés seulement | `auth.ts`, `AGENTS.md` |
| Mail | Boîte Zimbra `contact@neobatys.com` (OVH), IMAP et SMTP, copie dans « Envoyés » | `docs/CADRAGE.md` |
| IA | SDK Anthropic et OpenAI derrière un seul module (`lib/ai/`), journal d'usage et de coût sans le contenu des échanges (`ai_calls`) | `lib/ai/`, `db/schema.ts` |
| Téléphonie | Twilio derrière une interface, avec un faux fournisseur pour les tests | `lib/telephony/` |
| PDF | `@react-pdf/renderer` | `lib/quote-pdf.tsx` |

Le site parle déjà à l'admin : `lib/admin-leads.ts` envoie chaque demande à `POST /api/leads` et `app/api/vue/route.ts` chaque page vue à `POST /api/vues`, selon `docs/CONTRAT-SITE-CRM.md` du dépôt de l'admin. Rien à changer côté site.

### 1.2 Pour les associés

CRM (fiches, statuts, historique, attribution), demandes du site et saisies à la main, boîte mail partagée avec modèles, devis et factures de NEOBATYS (numérotation sans trou, TVA en autoliquidation, PDF), compta (relevés bancaires importés, compte courant d'associé, export), calendrier, projets clients, réseaux sociaux, pilotage, conservation RGPD (`/conservation`, effacement des prospects à 3 ans), journal d'audit. La compta de l'admin reste celle de NEOBATYS ; l'IA Compta de DriftShop reste un produit séparé, dont les règles passent dans l'agent Factures fournisseurs ([`fusion-outils.md`](fusion-outils.md), décision 5).

### 1.3 Les agents IA pour les artisans

Douze agents dans `lib/agents.ts`, chacun avec ses capacités :

| Famille | Agents |
|---|---|
| Trouver des clients | Réponse aux demandes, Appels manqués, Devis à la voix, Avis Google, Relance de devis, Entretiens annuels, Rendez-vous et rappels |
| Être payé et gérer | Relances impayés, Factures fournisseurs, Suivi de rentabilité, Dossiers d'aides, Documents et échéances |

En PR : Facturation client (#39 : acomptes, situations, avoirs, Factur-X, plateforme agréée derrière une interface) et Compte rendu et réception de chantier (#40).

Comment ils fonctionnent aujourd'hui : un agent est **installé pour un artisan** (`agent_deployments`, un artisan étant une fiche `contacts`), avec ce que l'agent sait de lui (`profile`). Ce sont les associés qui le pilotent depuis l'admin ; l'artisan ne se connecte pas. Il intervient seulement par des liens sans compte (dictée, signature, choix de rendez-vous, dépôt de pièces). C'est un service géré.

### 1.4 Ce qu'on garde comme règles de toute la plateforme

Ce que l'admin fait mieux que notre première conception, et qui s'applique à tout ce qu'on ajoute :

1. **Niveaux d'autonomie par capacité** : Observer, Recommander, Brouillon, Validation, Autonome. Une capacité « sensible » (tout ce qui part chez un client ou engage l'artisan) ne dépasse jamais Validation, sauf exception écrite dans le code (accusé de réception d'un appel manqué, rappel de la veille d'un rendez-vous). Pause générale de tous les agents (`agent_control`).
2. **Validation avant envoi** : aucun message ne part chez un client sans le clic d'une personne. Chaque action est journalisée avec sa raison et sa décision (`agent_actions`), avec une empreinte pour ne jamais traiter deux fois la même demande.
3. **Règles datées et sourcées** : ce qui vient de la loi ou d'un barème est dans le code, pas dans le texte envoyé à l'IA, avec l'URL de la source, l'édition lue et la date du relevé. Au-delà de 60 jours sans relecture, une mise en garde s'affiche ; au-delà de 120 jours, l'outil ne calcule plus de montant (`lib/aides-rules.ts`). Chaque agent concerné a sa page `/regles`.
4. **Banc d'essai rejouable** : `/agents/controle` rejoue une centaine de scénarios difficiles (`lib/agent-eval.ts` et les suites par agent), dont des consignes cachées dans une demande. La PR #39 ajoute 310 contrôles lancés en CI.
5. **Les montants viennent du code** : l'IA rédige, le code calcule. Prix tirés du catalogue de l'artisan, numéros sans trou, document émis figé en base, correction par avoir ou nouvelle version.
6. **Données sobres** : fichiers stockés à part des listes, journal d'IA sans contenu, empreinte seule pour les oppositions (arrêt des relances), secrets saisis par les associés dans Vercel, jamais par un agent.

### 1.5 Ce que l'admin ne fait pas encore

| Manque | Pourquoi ça compte |
|---|---|
| L'artisan n'a pas de compte | Il ne voit ni ses demandes, ni ses devis, ni ce que font ses agents ; tout passe par nous |
| Un client qui veut son espace a une **installation séparée** (PR #11, BEST TP : `INSTANCE_NAME`, `MODULE_DEVIS=off`, base à part) | Une installation par client ne tient pas au-delà de quelques clients : mises à jour, migrations et coûts multipliés |
| Les niveaux d'autonomie sont réglés **par agent, pour tous les artisans** (`agent_policies` n'a pas de colonne artisan) | Un artisan prudent et un artisan pressé ne peuvent pas avoir des réglages différents |
| Pas d'inscription libre, pas de consentements de prospection | Décision 5 d'Ilann (section 8) |
| Pas d'achats ni de stock | Décision 9, [`docs/plateforme/module-achats-stock.md`](plateforme/module-achats-stock.md) |
| Pas de WhatsApp | Canal Cloud porté depuis le CRM de LeasePro ([`fusion-outils.md`](fusion-outils.md), décision 6) |
| Pas d'abonnement payé en ligne | Stripe, en dernier |
| Plateforme agréée non branchée (interface prête dans la PR #39) | Émission obligatoire pour les TPE et PME au 1er septembre 2027 |

## 2. La suite : ce qu'on ajoute à l'admin

### 2.1 Un seul outil, deux sortes de comptes

| Qui | Où | Ce qu'il voit |
|---|---|---|
| Ilann et Gabin | `admin.neobatys.com`, comme aujourd'hui | Tout : CRM, compta, tous les artisans et leurs agents |
| Un artisan et ses salariés | Même application, espace artisan (adresse : décision ouverte, section 8.3) | Ses données seulement : demandes, devis, factures, agents et ce qu'ils ont préparé, réglages permis |

Pas de nouveau dépôt : le multi-clients se fait dans l'admin, par ligne, selon l'étape 2 de [`fusion-outils.md`](fusion-outils.md) : tables `organizations` et `members`, une organisation par artisan créée depuis sa fiche `contacts`, `organization_id` sur les tables des agents et du CRM des artisans, Row Level Security, une fonction d'accès qui prend l'organisation de la session, un test croisé à deux organisations en CI. NEOBATYS est une organisation `staff`. Ce document y ajoute « voir comme l'artisan » pour les associés, inscrit dans le journal d'audit.

L'installation séparée (BEST TP) reste possible pour un client qui exige sa propre base ; ce n'est plus le cas général.

### 2.2 Les modules sont les agents

Le catalogue de modules est celui de l'admin (`lib/agents.ts`) : activer un module pour un artisan, c'est installer l'agent pour lui (`agent_deployments`, statut À créer, En test, Actif, En pause). Ce que l'artisan peut faire dans son espace :

- voir ce que chaque agent a préparé et **valider lui-même** ce qui attend une validation, si on le lui permet ; sinon, un associé valide comme aujourd'hui ;
- régler les niveaux d'autonomie de ses agents dans les limites du code (une capacité sensible reste plafonnée à Validation) : il faut pour cela passer `agent_policies` d'un réglage par agent à un réglage par installation ;
- tenir son catalogue de prix, son profil (horaires, zone, ton, mentions) et ses documents.

Ce qui n'est pas un agent :

| Module | État |
|---|---|
| Accueil de l'artisan | À faire : chiffres du mois, demandes à traiter, actions en attente de ses agents (maquette) |
| Statistiques de son site | Les vues sont comptées pour le site NEOBATYS seulement ; à étendre aux sites que nous livrons, avec le même contrat `/api/vues` et une clé par site |
| Achats, stock et outillage | À faire, bâti sur le catalogue de prix, l'agent Factures fournisseurs et l'agent Rentabilité : [`docs/plateforme/module-achats-stock.md`](plateforme/module-achats-stock.md) |
| Conversations WhatsApp | À faire : étape 6 de [`fusion-outils.md`](fusion-outils.md), canal Cloud porté depuis LeasePro |
| Site internet | À faire : état du site livré, demandes de modification |

Règle : un module n'est ouvert à un artisan qu'avec son banc d'essai et la mesure qui dira dans un mois s'il sert.

### 2.3 Gabarits par métier

Un gabarit = les agents à installer, leurs niveaux, un profil type et un catalogue de prix de départ, appliqués à la création d'un artisan (plombier, électricien, couvreur...). Une demande vraiment spécifique devient un réglage de plus pour tous, ou un développement sur devis.

### 2.4 Inscription libre et notre CRM

L'inscription libre et gratuite reste décidée (décision 5) ; elle s'appuie sur les comptes artisans de la section 2.1 :

1. Inscription : e-mail (lien de connexion, comme l'admin), entreprise, métier, SIRET facultatif. Deux cases distinctes et non cochées, séparées des CGU (section 5.1), actives seulement après la confirmation de l'e-mail.
2. L'inscrit devient une fiche du CRM existant (source « inscription »), avec l'état de ses consentements : il n'y a pas de second CRM à créer.
3. Le gabarit de son métier s'applique ; le compte gratuit ouvre les modules de la formule gratuite (section 2.5).
4. Passage à une formule : signée avec nous, activée par un associé ; le paiement en ligne vient en dernier.

### 2.5 Qui a accès à quoi

| Profil | Ce qu'il y trouve | Pourquoi il revient | Ce que ça nous apporte |
|---|---|---|---|
| **Client site internet** (maintenance) | Les demandes de son formulaire, les visites de son site, ses avis Google, ses demandes de modification, ses factures NEOBATYS | Il voit ce que son site lui rapporte | La maintenance se justifie d'elle-même ; les agents non souscrits sont visibles, grisés avec « Activer » |
| **Client logiciel ou IA** (Essentiel, Pro, Premium ou pack) | Ses agents, réglés par nous, et ce qu'ils préparent | C'est son outil de travail | Le cœur du produit |
| **Inscrit gratuit** | Une page de demande de devis à son nom, les demandes reçues, quelques devis par mois, un audit gratuit de sa présence en ligne | Il reçoit des demandes grâce à nous | Un prospect qualifié dans notre CRM |

Ce qui ne sert pas à un profil est masqué, pas affiché vide.

## 3. Pile technique

On garde celle de l'admin (section 1.1). Ce qui change :

| Sujet | Décision proposée | Pourquoi |
|---|---|---|
| Base | Rester sur Neon (Francfort). Passer de l'offre gratuite à une offre payante avant les premières factures d'artisans, pour l'historique de restauration ; prix à l'usage, « environ 15 $/mois » selon Neon (https://neon.com/pricing, relevé le 1er novembre 2026) | Déjà en production, intégration Vercel, données en Union européenne. Neon n'a pas de région en France (https://neon.com/docs/introduction/regions) : si un client exige un hébergement en France, la question se rouvre pour lui seul |
| Fichiers | Sortir du `bytea` vers un stockage objet en Union européenne | Étape 3 de [`fusion-outils.md`](fusion-outils.md) : les photos de chantier (PR #40) alourdiraient la base |
| Connexion | Better Auth et son plugin `organization`, à la place d'Auth.js 5 (encore en bêta, 5.0.0-beta.32), au moment de créer les comptes artisans | [`fusion-outils.md`](fusion-outils.md), décision 4 ; version et doc du plugin à vérifier au moment de coder |
| Paiement des abonnements | Stripe Billing, en dernier | Inchangé |
| WhatsApp | API Cloud de Meta, canal porté depuis le CRM de LeasePro, identifiants chiffrés par organisation | [`fusion-outils.md`](fusion-outils.md), décision 6 et étape 6 |

Ce que la pile ne contient pas, volontairement : pas de second dépôt, pas de microservices, pas de file de messages dédiée tant que Postgres et les tâches planifiées de Vercel suffisent.

### 3.1 Plateforme agréée de facture électronique

Super PDP, recommandée par les deux conceptions : la nôtre (1er novembre) et `docs/AGENT-FACTURATION.md` de la PR #39, qui chiffre le coût et place la plateforme derrière une interface, avec une fausse plateforme pour les tests. Iopole en repli. L'agent Facturation est une solution compatible : NEOBATYS ne devient pas plateforme agréée. Calendrier : réception obligatoire pour toutes les entreprises depuis le 1er septembre 2026, émission pour les TPE et PME au 1er septembre 2027 (https://www.impots.gouv.fr/professionnel/je-decouvre-la-facturation-electronique). Le détail vit dans la doc de l'admin, plus ici.

## 4. Données

Le modèle est `db/schema.ts` de l'admin, plus les tables `organizations` et `members` de l'étape 2 de [`fusion-outils.md`](fusion-outils.md). Ce que ce document y ajoute, rattaché à l'organisation de l'artisan :

```
members               + rôle côté artisan (gerant | salarie)
agent_policies        + deployment_id : niveaux par installation au lieu de par agent
consents              user_id, finalité (prospection | publicite), valeur, version du texte, horodatage, IP, source
```

Plus les tables du module Achats et stock ([`docs/plateforme/module-achats-stock.md`](plateforme/module-achats-stock.md), section 3). Les tables `users`, `contacts`, `audit_log` et `ai_calls` existent déjà.

## 5. Sécurité et RGPD

Les règles de l'admin s'appliquent (`AGENTS.md` du dépôt de l'admin) : aucun mail à un client sans validation, conservation des prospects 3 ans appliquée par le code, secrets saisis par les associés. En plus, dès que les artisans ont un compte :

- **Rôles RGPD.** Pour notre CRM et les inscrits, nous sommes responsables de traitement. Pour les données des clients de chaque artisan, nous sommes sous-traitant (article 28) : contrat de sous-traitance annexé aux CGU. La PR #11 le signale déjà comme bloquant pour BEST TP.
- **Droit à l'effacement.** L'admin n'a pas de bouton pour supprimer une fiche (relevé dans la PR #11) : à ajouter avant d'ouvrir des comptes artisans.
- **Comptes.** Lien de connexion à durée courte, sessions révocables, limitation des tentatives ; double authentification pour les associés avec Better Auth.
- **Journal d'audit** de tout « voir comme l'artisan » et de tout export.
- **Sous-traitants ultérieurs** publiés : Vercel, Neon, Anthropic, OpenAI (fournisseur prévu dans `lib/ai/models.ts`), Twilio, OVH (mail), puis Meta, Stripe, la plateforme agréée.

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

Le plan de migration est celui de [`fusion-outils.md`](fusion-outils.md), section 4 (étapes 0 à 7 : rangement, PR #39 et #40, multi-clients, fichiers, factures fournisseurs, évaluations, WhatsApp, export comptable). Tout se fait dans le dépôt de l'admin, par PR, avec ses règles et son banc d'essai. Ce document y ajoute :

| Ajout | Se place | Fin quand |
|---|---|---|
| **Espace artisan** : accueil, demandes, agents et validations, catalogue de prix, profil, niveaux par installation, gabarits par métier, « voir comme » | Avec l'étape 2 (multi-clients) | Un artisan pilote valide lui-même les brouillons de ses agents pendant un mois. |
| **Inscription libre** : formulaire avec les deux consentements (section 5.1), confirmation de l'e-mail, fiche CRM « inscription », formule gratuite, export des consentements, CGU et politique publiées | Après l'étape 2, contrat de sous-traitance signé | Un inconnu s'inscrit et apparaît dans le CRM avec ses consentements. |
| **Facture électronique** : Super PDP branchée derrière l'interface de la PR #39, réception d'abord, puis émission | Après l'étape 1 | Un artisan pilote émet et reçoit par la plateforme agréée avant le 1er septembre 2027. |
| **Achats et stock** : étapes A à I de [`docs/plateforme/module-achats-stock.md`](plateforme/module-achats-stock.md) | Après les étapes 2 et 4 | Un artisan pilote commande le matériel d'un chantier depuis son devis signé. |
| **Paiement en ligne** : Stripe Billing, passage du gratuit à une formule sans nous parler | En dernier | Un artisan passe en formule payante seul. |

Les agents déjà construits continuent d'être livrés en service géré pendant toutes ces étapes : rien de ce qui est vendu aujourd'hui n'attend l'espace artisan.

## 7. Ce qu'on ne fait pas

- Pas de nouveau dépôt ni de seconde base pour la plateforme : on fait évoluer l'admin.
- Pas une installation par client en cas général (le cas BEST TP reste l'exception).
- Pas de marque blanche, pas d'application mobile native (interface web installable).
- Pas de facturation électronique transmise par nous : plateforme agréée.
- Pas de Baileys ni d'automate WhatsApp non officiel chez les clients.
- Pas de standard téléphonique IA en module standard.

## 8. Décisions

### 8.1 Prises par Ilann

| # | Date | Décision | Où |
|---|---|---|---|
| 1 | 3 novembre 2026 | Partir de l'admin de Gabin au lieu d'un outil à part ; en garder les agents, les règles datées et sourcées, le banc d'essai et la validation avant envoi. Remplace les décisions du 1er novembre sur le dépôt `neobatys-app` et le remplacement de l'admin de Gabin. Le contenu de départ de `neobatys-app` (`docs/plateforme/depart/`) est retiré d'ici ; il reste lisible dans l'historique git pour ce qui serait à reprendre dans l'admin | Tout ce document, et [`fusion-outils.md`](fusion-outils.md) |
| 2 | 1er novembre 2026 | Plateforme et modules inclus dans les formules ; au-delà, offres sur devis. Assistants IA et WhatsApp chiffrés avec chaque client ; le coût des messages WhatsApp est payé par l'artisan à Meta | Section 2.5 |
| 3 | 1er novembre 2026 | Inscription libre et gratuite pour tout le monde, les inscrits alimentent notre CRM ; prospection par e-mail sur case à cocher ; publicité ciblée et campagnes faites en interne quand c'est possible (Meta d'abord, Google plus tard) | Sections 2.4 et 5.1 |
| 4 | 1er novembre 2026 | Documents juridiques rédigés avec une IA | [`docs/juridique/plateforme/`](juridique/plateforme/README.md) |
| 5 | 1er novembre 2026 | Plateforme agréée : Super PDP, Iopole en repli | Section 3.1 |
| 6 | 1er novembre 2026 | Démarches Meta traitées à part | [`meta-whatsapp.md`](meta-whatsapp.md) |
| 7 | 2 novembre 2026 | Module Achats, stock et outillage : les huit recommandations retenues | [`docs/plateforme/module-achats-stock.md`](plateforme/module-achats-stock.md), section 5 |

### 8.2 Comptes et services

| Service | Ce qu'on sait | Ce qui manque |
|---|---|---|
| GitHub | `neobatys-admin` est un dépôt privé du compte de Gabin ; Ilann y a accès depuis le 3 novembre 2026. Le site est un dépôt public du même compte | Rien d'obligatoire. Une organisation au nom de l'entreprise (plan Team, 4 $ par utilisateur et par mois, https://github.com/pricing) ferait appartenir le code à l'entreprise : décision ouverte |
| Vercel | Équipe Pro de Gabin (`gab-7385`) pour le site ; l'admin a son propre projet | Vérifier que l'admin est dans la même équipe Pro (les tâches toutes les 5 minutes l'exigent) |
| Neon | Base `neobatys-admin`, Francfort, offre gratuite | Offre payante avant les premières factures d'artisans |
| Twilio | Branché dans le code des appels manqués | Compte au nom de l'entreprise, à confirmer avec Gabin |
| Super PDP | Aucun compte | Compte éditeur, après un rendez-vous, avant l'étape 3 |
| Stripe | Aucun | Compte au nom de TAG Delme SARL, à l'étape 6 seulement |
| Meta | Portefeuille « TAG Delme SARL », vérification, application Tech Provider : [`meta-whatsapp.md`](meta-whatsapp.md) | Les étapes 1 à 6 de sa section 3, par Ilann |

Règle commune : chaque compte est au nom de l'entreprise, avec les deux associés administrateurs et la double authentification.

### 8.3 Encore ouvertes

Les décisions de fond (base de l'outil, multi-clients par ligne ou installation par client, région de la base, connexion, DriftShop, LeasePro, ordre des PR, évaluations, répartition) sont celles de [`fusion-outils.md`](fusion-outils.md), section 7, numérotées 1 à 9. Restent propres à ce document :

| # | Décision | Recommandation |
|---|---|---|
| 1 | Adresse de l'espace artisan | `app.neobatys.com` pointé sur le même projet Vercel que `admin.neobatys.com` : les associés gardent leur adresse, les artisans n'ont pas « admin » dans la leur. |
| 2 | Qui valide les brouillons des agents d'un artisan | L'artisan lui-même quand il a un compte, un associé sinon ; niveaux réglés par installation. |
| 3 | Organisation GitHub de l'entreprise pour l'admin | Oui, à décider avec Gabin, puisque le dépôt est sur son compte (étape 0 de [`fusion-outils.md`](fusion-outils.md)). |
| 4 | Valider les projets juridiques de `docs/juridique/plateforme/` | Relecture par Ilann et Gabin ; un avocat seulement sur les points listés dans leur README. Le contrat de sous-traitance est signé avant le premier compte artisan. |
| 5 | Rendez-vous avec Super PDP | Avant de brancher la facture électronique, à deux avec Gabin ; y valider aussi la lecture des factures fournisseurs pour le module Achats. |
