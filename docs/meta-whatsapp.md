# Démarches Meta pour WhatsApp dans la plateforme

Statut : pas-à-pas du 3 novembre 2026, aucun compte créé. Pages Meta relues entre le 1er et le 3 novembre 2026, date de mise à jour de chaque page indiquée.

Cible, d'après [`fusion-outils.md`](fusion-outils.md) (étape 6 et décision 6) : l'admin de Gabin (`hoffertgabin-cmyk/neobatys-admin`) devient la plateforme multi-clients. Chaque artisan est une organisation qui connecte **son propre numéro** WhatsApp par l'Embedded Signup de Meta. NEOBATYS est « Tech Provider » : notre application Meta envoie et reçoit pour le compte des artisans, avec un webhook signé, la fenêtre de 24 heures, les modèles et une boîte de réception unique (mail, SMS, WhatsApp). Le code vient du canal Cloud du CRM LeasePro, porté en TypeScript.

Les démarches Meta ne dépendent pas du code de l'étape 6 : on peut obtenir le statut Tech Provider avant d'écrire une ligne. Elles sont le chemin critique, donc elles se lancent maintenant.

## 1. Ce qu'il faut savoir avant de commencer

- **Un seul portefeuille business, « TAG Delme SARL ».** La vérification Meta porte sur la société, pas sur la marque. NEOBATYS et LeasePro appartiennent toutes deux à TAG Delme SARL : même portefeuille, une seule vérification. La Page Facebook et le compte Instagram NEOBATYS y sont rattachés ([`fiche-google-et-reseaux.md`](fiche-google-et-reseaux.md), section 2).
- **Les infos saisies doivent être identiques aux documents** : « TAG Delme SARL », 44 rue de l'Industrie, L-8069 Strassen, site en `https://`. Toute modification après coup relance la vérification.
- **Nom affiché.** Une marque est acceptée si son lien avec la dénomination sociale est visible publiquement, sinon on écrit « X de TAG Delme SARL ». Les mentions légales de neobatys.com disent déjà « NEOBATYS est un nom commercial de TAG Delme SARL ». Pour LeasePro, le même lien doit figurer sur son site. Chaque artisan a son propre nom affiché, sur son propre compte.
- **Qui paie les messages.** L'artisan, par sa carte, directement à Meta (décision 2 de [`plateforme-admin.md`](plateforme-admin.md), section 8.1). Pour un Tech Provider qui n'est pas Solution Partner, Meta exige que l'artisan ajoute un moyen de paiement avant d'envoyer. Grille EUR au 1er octobre 2026, vers un numéro français : marketing 0,0712 €, utilitaire et service 0,0248 €, 1 000 messages de service gratuits par mois et par numéro, utilitaire gratuit dans la fenêtre de 24 heures. Détail dans [`veille/plateforme-admin.md`](veille/plateforme-admin.md).

## 2. Les étapes et leur délai réel

| # | Étape | Qui | Délai d'après Meta | Source (mise à jour) |
|---|---|---|---|---|
| 1 | Portefeuille business « TAG Delme SARL », contrôle total pour Ilann et Gabin | Ilann | Immédiat | [Créer un portefeuille](https://www.facebook.com/business/help/1710077379203657) |
| 2 | Vérification d'entreprise dans le Centre de sécurité | Ilann | **Jusqu'à 14 jours ouvrables.** Si Meta demande un complément, une semaine pour répondre, sinon tout recommence | [Faire vérifier votre entreprise](https://www.facebook.com/business/help/2058515294227817) |
| 3 | Application Meta avec le cas d'usage WhatsApp, rattachée au portefeuille | Ilann | Immédiat ; l'accès standard est accordé d'office et suffit pour tester avec nos propres numéros | [Examen de l'application WhatsApp](https://developers.facebook.com/documentation/business-messaging/whatsapp/solution-providers/app-review) (16 juin 2026) |
| 4 | Parcours « Intégration du fournisseur de technologies » dans l'Espace App | Ilann | Se débloque quand l'étape 2 est validée | [Devenir fournisseur de technologies](https://developers.facebook.com/docs/whatsapp/solution-providers/get-started-for-tech-providers) (20 août 2026) |
| 5 | Examen de l'application (Contrôle app) : accès avancé à `whatsapp_business_messaging` et `whatsapp_business_management` | Ilann soumet, on prépare les vidéos | **Environ 24 heures en moyenne.** Une soumission laissée en brouillon n'est jamais examinée | [Examen de l'application WhatsApp](https://developers.facebook.com/documentation/business-messaging/whatsapp/solution-providers/app-review) (16 juin 2026) |
| 6 | Embedded Signup v4 dans la plateforme (Facebook Login for Business et SDK JavaScript) | Code, étape 6 de la fusion | Pas de délai Meta. Les versions 2 et 3 sont arrêtées depuis le 15 octobre 2026 | [Inscription intégrée](https://developers.facebook.com/docs/whatsapp/embedded-signup) (29 octobre 2026) |
| 7 | Premiers artisans | Les artisans, avec nous | **10 nouveaux artisans au plus par période de 7 jours** au départ | Même page |

Chemin critique, si rien n'est refusé : environ **3 semaines** (14 jours ouvrables de vérification, puis un jour d'examen de l'application). Les étapes 1 et 3 se font le même jour, et les vidéos de l'étape 5 se préparent pendant la vérification.

Ce que l'examen demande (étape 5) :
- une icône, une URL de politique de confidentialité et une catégorie pour l'application ;
- pour chaque autorisation, un texte qui explique l'usage et une vidéo :
  - envoi d'un message reçu dans WhatsApp ;
  - création d'un modèle de message.

Meta accepte un enregistrement d'écran de la requête cURL fournie par le tableau de bord (WhatsApp, API Setup) et du Gestionnaire WhatsApp. Pas besoin que la plateforme soit codée. Ne demander que les deux autorisations utiles : les demandes superflues sont souvent refusées.

**Coexistence** (l'artisan garde son numéro et son application WhatsApp Business) :
- l'artisan doit avoir l'application WhatsApp Business 2.24.17 ou plus récente ;
- nous devons être Tech Provider et utiliser l'Embedded Signup avec la journalisation de session ;
- le débit est fixé à 20 messages par seconde ;
- l'historique et les contacts peuvent être synchronisés si l'artisan l'accepte.

Source : [Intégrer les personnes utilisant l'application WhatsApp Business](https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users/) (29 octobre 2026).

**Nom affiché de l'artisan.** Il n'est pas examiné à l'inscription : l'artisan peut écrire tout de suite. L'examen vient quand son numéro devient éligible à des limites de messages plus élevées. Source : [À propos du nom affiché](https://www.facebook.com/business/help/338047025165344) et [règles du nom affiché](https://www.facebook.com/business/help/757569725593362).

## 3. Ce que seul Ilann peut faire, dans l'ordre

Ne rien payer, ne rien publier. Activer la double authentification sur le compte Facebook personnel qui sert d'accès : il reste invisible des clients.

1. **Vérifier s'il existe déjà un portefeuille TAG Delme SARL** (business.facebook.com, menu des portefeuilles). S'il en existe un au nom de NEOBATYS ou de LeasePro, ne pas en créer un second : corriger son nom légal **avant** de lancer la vérification.
2. **Sinon, créer le portefeuille** « TAG Delme SARL », avec une adresse e-mail en `@neobatys.com` : [créer un portefeuille business](https://www.facebook.com/business/help/1710077379203657).
3. **Ajouter Gabin avec le contrôle total**, pour avoir deux administrateurs.
4. **Préparer les documents**, au nom exact de TAG Delme SARL, non expirés, en français, données personnelles masquées :
   - un extrait récent du registre de commerce (RCS B301874, sur le site officiel des Luxembourg Business Registers) ;
   - le certificat de TVA LU37090845.

   Liste des documents acceptés : [importer des documents officiels](https://www.facebook.com/business/help/159334372093366).
5. **Lancer la vérification** : Meta Business Suite, Centre de sécurité, « Démarrer la vérification ». Saisir le nom, l'adresse, le téléphone et le site à l'identique du registre. Pour confirmer le lien avec l'entreprise, choisir la **vérification de domaine** sur `neobatys.com`. Gabin ajoute l'enregistrement DNS demandé là où se trouve la zone DNS du domaine (le domaine est chez OVH : vérifier d'abord si la zone est restée chez OVH ou a été déplacée vers Vercel). Guide : [faire vérifier votre entreprise](https://www.facebook.com/business/help/2058515294227817).
6. **Le même jour, créer l'application Meta** : [developers.facebook.com/apps](https://developers.facebook.com/apps), type Entreprise, cas d'usage WhatsApp, portefeuille TAG Delme SARL. Nom proposé : « NEOBATYS ». Ajouter Gabin comme administrateur de l'application.
7. **Dès la vérification validée**, ouvrir dans l'Espace App : Cas d'usage, WhatsApp, Personnaliser, Intégration du fournisseur de technologies. Choisir « Intégrer sans partenaire ».
8. **Soumettre l'examen de l'application** avec les deux vidéos et les deux textes préparés (section 4), puis cliquer sur Soumettre. Ne pas le laisser en brouillon.
9. **Une fois l'accès avancé obtenu**, créer dans le portefeuille un utilisateur système administrateur de l'application. Son jeton permanent va dans les variables Vercel de l'admin, jamais dans un commit ni dans un message.

Les étapes 1 à 6 prennent une heure environ, puis on attend Meta.

## 4. Ce qu'on prépare pendant l'attente

1. Les deux textes de l'examen, en anglais, un par autorisation : ce que la plateforme fait pour les artisans intégrés (boîte de réception, réponse aux demandes, relances par modèle) et comment elle gère leurs modèles.
2. Les deux vidéos : un message envoyé par cURL avec le numéro de test que Meta fournit dans l'application, reçu sur un téléphone, puis la création d'un modèle dans le Gestionnaire WhatsApp.
3. La politique de confidentialité indiquée à Meta : la page `/politique-de-confidentialite` du site, complétée d'un paragraphe sur WhatsApp et Meta (décision 6). Ce paragraphe passe par un petit chantier, dans `content/`.
4. Une icône 1024 x 1024 tirée du logo NEOBATYS.
5. Pour l'étape 6 de la fusion, dans le dépôt de l'admin :
   - le bouton Embedded Signup v4 et l'échange du code contre un jeton côté serveur ;
   - l'enregistrement du numéro et l'abonnement aux webhooks du compte de l'artisan ;
   - le portage de `server/canaux/whatsapp-cloud.js` et de la fenêtre de 24 heures depuis LeasePro.
6. Trois ou quatre modèles utilitaires par métier : confirmation de rendez-vous, envoi de devis, relance de devis, relance d'impayé.

## 5. Ce qui n'est pas vérifié

- Le délai d'approbation d'un modèle de message : ce document ne s'appuie sur aucune page Meta qui le donne.
- La liste exacte des pays ouverts à Coexistence : la page relue n'en donne pas. Selon un résumé de recherche, le journal des modifications WhatsApp citerait l'Union européenne et l'EEE, mais je ne l'ai pas ouvert.
- La région de prix des numéros luxembourgeois dans la grille Meta.
- L'existence actuelle d'un portefeuille TAG Delme SARL chez Meta : seul Ilann peut le voir.
- Si la mauvaise qualité d'un numéro (LeasePro ou NEOBATYS) peut toucher l'autre, puisqu'ils partagent un portefeuille.

## 6. Décisions

Les décisions WhatsApp encore ouvertes, reprises en tenant compte du plan de fusion. Déjà tranché :
- portefeuille unique TAG Delme SARL pour NEOBATYS et LeasePro (Ilann, 1er novembre 2026) ;
- messages payés par l'artisan à Meta ([`plateforme-admin.md`](plateforme-admin.md), section 8.1, décision 2).

| # | Décision | Recommandation |
|---|---|---|
| 1 | Tech Provider direct ou passer par un Solution Partner (BSP) | **Tech Provider direct.** Pas d'intermédiaire ni de marge sur les messages, et le code Cloud existe déjà dans LeasePro. Un BSP ne vaudrait que si on voulait refacturer les messages, ce qui est exclu. |
| 2 | Une application Meta pour la plateforme, distincte de celle de LeasePro | **Oui.** Application « NEOBATYS » dans le portefeuille TAG Delme SARL. LeasePro garde la sienne et ses jetons tant qu'il reste un outil séparé ; il passera par l'Embedded Signup de la plateforme le jour où il en devient une organisation (décision 6 de [`fusion-outils.md`](fusion-outils.md)). |
| 3 | Numéro des artisans : Coexistence ou nouveau numéro dédié | **Coexistence par défaut.** L'artisan garde son numéro, son application et, s'il l'accepte, son historique. Un numéro neuf seulement s'il le demande. |
| 4 | Où arrive le webhook | **Une seule route dans l'admin**, sur l'adresse de l'espace artisan (`app.neobatys.com`, décision 1 de la section 8.3 de [`plateforme-admin.md`](plateforme-admin.md)). Signature vérifiée avec la clé secrète de l'application ; l'organisation est retrouvée par l'identifiant du compte WhatsApp reçu. |
| 5 | Où stocker les jetons des artisans | **En base, chiffrés par organisation**, clé maîtresse dans Vercel ([`fusion-outils.md`](fusion-outils.md), risque « Secrets LeasePro »). Jamais dans une table de réglages en clair comme dans LeasePro. |
| 6 | Politique de confidentialité pour l'examen de l'application | **La page du site, complétée** d'un paragraphe sur WhatsApp et Meta, en sous-traitant ultérieur, avant de soumettre l'examen. Petit chantier séparé sur `content/`. |
| 7 | Numéro WhatsApp propre à NEOBATYS | **Pas tout de suite.** Le numéro de test de Meta suffit pour l'examen. Notre numéro viendra de la ligne mobile dédiée (décision 2 de [`fiche-google-et-reseaux.md`](fiche-google-et-reseaux.md)), connectée comme celle d'un artisan. |
| 8 | Quand lancer | **Maintenant**, étapes 1 à 6 de la section 3. Le statut Tech Provider n'attend pas le code, et l'étape 6 de la fusion ne doit pas attendre Meta. |
