# Veille : plateformes de gestion pour artisans

Pages consultées le 1er novembre 2026. Prix en dollars US hors taxes quand la source est américaine. Ce qui n'a pas pu être vérifié est marqué comme tel. Sert la conception de [`docs/plateforme-admin.md`](../plateforme-admin.md).

## Ce que font les autres

### Jobber
- **Rôles** : Field crew, Senior field crew, Crew lead, Manager, case « Make Administrator », mode « Custom » section par section (voir, créer/modifier, supprimer). https://help.getjobber.com/es/articles/user-permissions/
- **Offres** : Core 49 $ (29 $ en annuel, 1 utilisateur), Connect 139 à 399 $, Grow 199 à 499 $, Plus 499 à 699 $ ; utilisateur en plus 29 $ ; options Marketing Suite 99 $, AI Receptionist 29 $, Pipeline 49 $. Essai 14 jours sans carte. https://www.getjobber.com/pricing/ (la page range aussi AI Receptionist et Marketing Suite dans Plus ; ambiguïté non levée)
- **Accueil** : guide de configuration évolutif, rendez-vous du jour, paiements à venir, montants à recevoir et top 3 des retards, CA projeté de la semaine comparé à la précédente, CA facturé du mois. https://help.getjobber.com/hc/en-us/articles/23846836592023-Home
- **IA** : « Receptionist » répond aux appels et SMS, crée des demandes, gère les rendez-vous ; 30 conversations pour 29 $, puis 0,79 $ l'unité ; alertes à 75 % et 100 % du quota. https://help.getjobber.com/en/articles/receptionistpowered-by-jobber-ai/

### Housecall Pro
- **Rôles** : Admin, Office Staff, Field Tech (mobile), permissions une par une. https://help.housecallpro.com/en/articles/1073431-employee-roles-permissions-explained
- **Offres** : Basic 59 / 79 $, Essentials 149 / 189 $, Max 299 / 329 $ (annuel / mensuel) ; options IA, site, voix sans prix affiché. Essai 14 jours sans carte, données conservées après l'essai. https://www.housecallpro.com/pricing/
- **Accueil** : devis, factures et jobs ouverts ; CA, jobs terminés, panier moyen, nouveaux jobs, comparés à l'année précédente ; journal d'activité. https://help.housecallpro.com/en/articles/6974306-homepage-overview-faq
- **IA** : « AI Team » : CSR AI (appels, payant), Analyst AI (rapports sur question), Coach AI, Marketing AI, Help AI. https://help.housecallpro.com/en/articles/9311875-ai-team-overview

### ServiceTitan
- **Rôles** : huit rôles préréglés modifiables (Admin, Dispatcher, Accounting, Technician...). https://help.servicetitan.com/docs/understanding-employee-and-technician-permission-roles
- **Offres** : Starter, Essentials, The Works, par technicien, sans prix public ni essai. https://www.servicetitan.com/pricing
- **IA** : Atlas, assistant conversationnel (recherche, aide technicien, capacité de planning). https://help.servicetitan.com/docs/atlas
- Tableau de bord : non vérifié.

### Podium
- Pas de prix public, démo. Option « AI Employee » sur tous les plans. https://www.podium.com/pricing/
- **IA** : Larry répond (appel, SMS, chat, e-mail), réserve, relance les impayés à J+3, J+7, J+14 ; Operator produit rapports et alertes sur devis ouverts. https://homeservices.podium.com/
- Structure de compte : non vérifiée.

### HighLevel (modèle agence)
- **Structure** : compte Agence et un sous-compte par client ; utilisateurs Agency ou Account, rôle Admin ou User, option « données assignées seulement ». https://help.gohighlevel.com/support/solutions/articles/155000002544-user-roles-permissions-and-assigned-data-subaccount
- **Se connecter en tant que** : réservé aux admins de l'agence. https://help.gohighlevel.com/support/solutions/articles/48001223053-login-as-user-agency-admin-only-
- **Offres** : Starter 97 $ (3 sous-comptes), Unlimited 297 $, Founder 497 $ (SaaS mode, refacturation avec marge). IA à l'usage, « AI Employee » 50 à 97 $ par sous-compte. https://www.gohighlevel.com/pricing
- **Snapshots** : copient la configuration (workflows, calendriers, champs, IA), jamais les contacts ni les conversations ; mises à jour poussées vers les sous-comptes liés. https://help.gohighlevel.com/support/solutions/articles/48000982511-what-are-snapshots-
- **SaaS Configurator** : l'agence définit ses offres (prix, fonctions, snapshot, essai) ; après paiement, le sous-compte se crée et le snapshot s'applique. https://help.gohighlevel.com/support/solutions/articles/155000008015-getting-started-with-the-saas-configurator
- **Refacturation et portefeuilles** prépayés par sous-compte. https://help.gohighlevel.com/support/solutions/articles/155000002095-rebilling-reselling-and-wallets-explained

### Hatch
- Abonnement plus usage, engagement annuel, trois offres sans prix, pas d'essai, mise en place accompagnée. https://www.usehatchapp.com/pricing
- **IA** : Voice AI, Messaging AI, relance des devis, réactivation d'anciens leads ; tableau de bord rendez-vous, ventes, CA attribué, ROI. https://www.usehatchapp.com/
- Rôles détaillés : non vérifiés.

## Pistes pour NEOBATYS

| # | Piste | Apport | Effort | Source |
|---|---|---|---|---|
| 1 | Organisations, deux rôles côté artisan, rôle interne `staff`, « voir comme le client » tracé | Back-office qui voit tout sans mélanger les droits | Moyen | HighLevel (rôles, login as user) |
| 2 | Gabarits par métier appliqués à la création du compte, sans données clients | Compte utilisable en quelques minutes ; réutilise les guides métiers du site | Moyen | HighLevel, snapshots |
| 3 | Modules activables synchronisés avec l'abonnement Stripe | Activation sans intervention, options vendables | Faible à moyen | Jobber (options), HighLevel (SaaS Configurator), https://stripe.com/fr/billing/pricing |
| 4 | Volume IA et WhatsApp inclus, alertes à 75 % et 100 %, prix au-delà | Coûts maîtrisés, pas de mauvaise surprise | Moyen | Jobber Receptionist |
| 5 | Essai 14 jours sans carte, guide de configuration, données gardées après l'essai | Inscription sans friction | Faible | Jobber, Housecall Pro |
| 6 | Accueil limité à 5 ou 6 indicateurs (devis ouverts, impayés, CA de la semaine comparé, encaissements, nouvelles demandes) | Lisible en dix secondes | Faible | Jobber, Housecall Pro |
| 7 | Relances d'impayés à J+3, J+7, J+14 | Règle simple pour le module déjà vendu | Faible | Podium |
| 8 | WhatsApp par Embedded Signup en tant que Tech Provider, l'artisan paie Meta | Numéro de l'artisan conservé, rien à avancer | Fort | https://developers.facebook.com/docs/whatsapp/embedded-signup |

**Top 3 proposé** : 2 (gabarits par métier), 1 (organisations et rôle `staff`), 6 (accueil à six indicateurs). Ce sont les trois qui conditionnent le MVP ; les autres viennent aux étapes suivantes.

## Services et réglementation

- **WhatsApp Cloud API** : facturation par message livré ; France au 1er octobre 2026 : marketing 0,0712 €, utilitaire, authentification et service 0,0248 € ; service gratuit jusqu'à 1 000 messages par mois et par numéro ; les messages utilitaires dans la fenêtre de 24 h ne sont plus gratuits. https://developers.facebook.com/docs/whatsapp/pricing
- **Tech Provider** : vérification d'entreprise, examen de l'application (deux vidéos), accès avancé `whatsapp_business_messaging` et `whatsapp_business_management` ; 10 nouveaux clients par 7 jours, puis 200 après vérifications. https://developers.facebook.com/documentation/business-messaging/whatsapp/solution-providers/get-started-for-tech-providers
- **Supabase Pro** : 25 $/mois, 8 Go de disque, 100 Go de fichiers ; régions UE Paris, Francfort, Irlande, Stockholm. https://supabase.com/pricing, https://supabase.com/docs/guides/platform/regions
- **Neon** : calcul à l'heure, région UE Francfort seulement. https://neon.com/pricing, https://neon.com/docs/introduction/regions
- **Stripe** : cartes UE standard 1,5 % + 0,25 €, SEPA 0,35 €, Billing 0,7 % du récurrent. https://stripe.com/fr/pricing, https://stripe.com/fr/billing/pricing
- **Facture électronique** : réception obligatoire pour toutes les entreprises depuis le 1er septembre 2026 ; émission obligatoire pour TPE et PME au 1er septembre 2027 ; passage par une plateforme agréée. https://entreprendre.service-public.gouv.fr/actualites/A18953 ; liste des PA : https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees. Date du e-reporting : non vérifiée.
