# Formules et agents IA

Proposition du 3 novembre 2026, revue le même jour, pour placer les 12 agents de la page `/intelligence-artificielle` dans les formules. Les prix et le contenu des formules sont une décision d'Ilann et de Gabin : rien n'est publié avant leur accord (section 6).

**Modèle fixé par Ilann le 3 novembre 2026** : NEOBATYS ne facture pas les agents en eux-mêmes. Le client paie sa consommation d'IA sur son propre compte (sa clé API). NEOBATYS fournit la base : logiciel, mise en place, relecture et suivi. Certains agents sont compris dans chaque formule, les autres s'ajoutent à la demande.

## 1. Le constat

La grille en ligne (`content/data/pricing.json`) ne nomme que 5 agents :

- Pack IA (5 990 € HT) et abonnement Pro (990 € HT/mois) : 2 assistants au choix parmi 3, Devis à la voix, Réponse aux demandes, Avis Google ;
- Transformation complète (9 900 € HT) et Premium (1 490 € HT/mois) : « tous les assistants », dont Factures fournisseurs et Suivi de rentabilité.

Les 7 autres agents de la page IA ne sont rattachés à aucune formule : Appels manqués, Rendez-vous et rappels, Relance de devis, Relances impayés, Entretiens annuels, Dossiers d'aides, Documents et échéances. Pourtant la page Logiciel promet déjà des « relances automatiques » (`content/data/offers.json`, `softwareOffer`).

L'admin de Gabin (`hoffertgabin-cmyk/neobatys-admin`, commit `2f652d0` du 3 novembre 2026, `lib/agents.ts`) compte 14 agents : les 12 du site, plus Facturation client et Compte rendu et réception, absents du site (décision 9).

## 2. Coût mensuel par agent

### Sources des prix unitaires

| Poste | Prix | Source |
|---|---|---|
| Claude Opus 5.5 (devis, réponses, avis, documents) | 4 $ par million de tokens en entrée, 20 $ en sortie | `lib/ai/models.ts` de l'admin, relevé du 30/10/2026 |
| Claude Sonnet 5.5 (relances, entretiens, rentabilité) | 2 $ en entrée, 10 $ en sortie | idem |
| Lecture de photos et PDF (gpt-6.1-terra) | 1 $ en entrée, 5 $ en sortie | idem, relevé du 02/11/2026 |
| Dictée (gpt-transcribe) | 0,0045 $ par minute | idem |
| Appels manqués, tout compris (numéro Twilio, appels, 25 SMS, classement, transcription) | 3,85 $ par mois | `docs/APPELS-MANQUES.md` de l'admin, prix Twilio France d'octobre 2026 |
| Rendez-vous et rappels | 0 $ : aucun appel d'IA, envois par mail | `docs/AGENT-RENDEZ-VOUS.md` de l'admin |

Le modèle et le plafond de sortie (`maxTokens`) de chaque agent sont lus dans son fichier `lib/agent-*.ts`.

### Hypothèses

1. **Un artisan seul, une activité moyenne par mois** : 30 demandes reçues, 20 appels manqués suivis d'une réponse, 15 devis dictés, 20 relances de devis, 10 relances d'impayés, 8 chantiers terminés (8 demandes d'avis, 8 réponses à des avis), 10 rendez-vous, 4 campagnes d'entretien, 10 commentaires de rentabilité, 40 factures fournisseurs, 4 dossiers d'aides de 2 pièces, 2 documents déposés. Aucun de ces volumes n'est mesuré : ce sont des ordres de grandeur à remplacer par les journaux de l'admin (table `aiCalls`) dès les premiers clients.
2. **Tokens** : 3 000 en entrée par appel de texte (consignes, profil de l'artisan, contenu), 4 000 pour une photo ou un PDF. En sortie, le plafond `maxTokens` de l'agent, c'est-à-dire le maximum possible : le coût d'IA est surestimé. Lecture d'un document : 1 500 tokens en sortie (pas de plafond dans le code).
3. **1 $ compté pour 1 €.** Le dollar vaut moins que l'euro (l'admin estime 3,85 $ à 3,30-3,70 €) : l'arrondi surestime le coût.
4. **Relecture humaine** : chaque envoi au client est validé par l'équipe (page IA, `lib/agents.ts`). 1 minute par message, 3 minutes par devis, 5 minutes par campagne d'entretien ou envoi au comptable, 2 minutes par message de dossier d'aides. **Temps compté à 40 € HT de l'heure** : hypothèse, ni salaire ni prix facturé, à remplacer par la valeur que les associés donnent à leur temps.
5. Hébergement, base de données, licence et modifications du site ne sont pas comptés ici : ils relèvent de la maintenance (section 5) et ne dépendent pas des agents.

### Résultat

Calcul : pour chaque appel, tokens × prix du modèle, multiplié par le volume du mois ; plus les minutes de relecture × 40 €/h. Avec le modèle retenu, la colonne IA et SMS est réglée par le client ; NEOBATYS ne supporte que la relecture.

| Agent | Modèle | IA et SMS, payés par le client ($/mois) | Relecture (min/mois) | Relecture, coût NEOBATYS (€) | Total (€ HT/mois) |
|---|---|---|---|---|---|
| Devis à la voix | Opus + dictée | 4,16 | 45 | 30,00 | **34,16** |
| Réponse aux demandes | Opus | 2,10 | 30 | 20,00 | **22,10** |
| Appels manqués | Twilio + Opus | 3,85 | 20 | 13,33 | **17,18** |
| Relance de devis | Sonnet | 0,28 | 20 | 13,33 | **13,61** |
| Entretiens annuels | Sonnet | 0,05 | 20 | 13,33 | **13,39** |
| Avis Google | Opus | 0,22 | 16 | 10,67 | **10,89** |
| Relances impayés | Sonnet | 0,14 | 10 | 6,67 | **6,81** |
| Rendez-vous et rappels | aucun | 0,00 | 10 | 6,67 | **6,67** |
| Dossiers d'aides | lecture | 0,09 | 8 | 5,33 | **5,43** |
| Factures fournisseurs | lecture | 0,46 | 5 | 3,33 | **3,79** |
| Suivi de rentabilité | Sonnet | 0,11 | 2 | 1,33 | **1,44** |
| Documents et échéances | lecture | 0,02 | 1 | 0,67 | **0,69** |
| **Les 12** | | **11,49** | **187** | **124,67** | **136,16** |

Ce qu'il faut en retenir :

- **Ce que paie le client** : environ 11 $ d'IA et de SMS par mois pour les 12 agents, 0,44 $ pour les 4 agents de gestion. C'est un argument : il paie l'IA au prix coûtant, sans marge de notre part.
- **Ce que paie NEOBATYS** : la relecture, un peu plus de 3 heures par mois pour les 12 agents, soit 124,67 € à 40 € de l'heure. C'est elle que les formules doivent couvrir.
- **SMS** : les SMS des Appels manqués sont plafonnés à 300 par artisan et par mois (`APPELS_SMS_MONTHLY_CAP`), soit environ 24 $ au pire (`docs/APPELS-MANQUES.md`). Qui paie le numéro et les SMS : décision 3.

### Prérequis dans l'admin

Aujourd'hui l'admin lit une seule clé par fournisseur dans ses variables d'environnement (`lib/ai/budget.ts`, `aiKey` : `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`), et un seul plafond de 50 $ par mois (`companySettings.aiMonthlyCapUsd`). Le plan de plateforme prévoit une seule application pour tous les artisans, une organisation par artisan (`docs/plateforme-admin.md`, section 2.1). Pour que chaque client paie sa propre consommation, il faut donc, avec l'étape multi-clients :

- une clé API par organisation, stockée chiffrée, utilisée à la place de la clé commune ;
- un plafond par organisation, que le client fixe ou accepte ;
- la même chose pour Twilio si le client paie ses SMS (décision 3).

Tant que ce n'est pas fait, la consommation passe par la clé de NEOBATYS (décision 6).

## 3. La grille

| Formule | Prix | Agents compris | Relecture à notre charge (€ HT/mois) | IA et SMS du client ($/mois) |
|---|---|---|---|---|
| Site Artisan | 990 € | aucun (pas de logiciel) | 0 | 0 |
| Pack Gestion / Essentiel | 2 990 € / 490 €/mois | **4 agents de gestion** : Relance de devis, Relances impayés, Rendez-vous et rappels, Documents et échéances | 27,34 | 0,44 |
| Pack IA / Pro | 5 990 € / 990 €/mois | les 4, plus **3 agents au choix parmi 6** : Réponse aux demandes, Appels manqués, Devis à la voix, Avis Google, Entretiens annuels, Dossiers d'aides | 90,67 au plus | 10,55 au plus |
| Transformation / Premium | 9 900 € / 1 490 €/mois | **les 12**, dont Factures fournisseurs et Suivi de rentabilité | 124,67 | 11,49 |

Les « au plus » valent pour le choix le plus lourd : Devis à la voix, Réponse aux demandes et Appels manqués.

**Les autres agents s'ajoutent à la demande**, sans prix d'agent : le client paie leur consommation d'IA sur son compte, NEOBATYS les met en place et relit leurs envois. Le temps de relecture d'un agent ajouté va de 0,67 € (Documents et échéances) à 30 € par mois (Devis à la voix). Au-delà de 2 ou 3 agents ajoutés, la formule au-dessus devient le bon conseil (décision 4).

Pourquoi ce découpage :

- les 4 agents de gestion tiennent la promesse « relances automatiques » déjà faite pour le logiciel, et demandent peu de relecture ;
- le choix passe de 2 parmi 3 à 3 parmi 6 : chaque métier y trouve son agent (Entretiens pour un chauffagiste, Dossiers d'aides pour un artisan RGE) ;
- Factures fournisseurs et Suivi de rentabilité restent la marque de la formule haute, comme aujourd'hui.

### Comparaison avec les prix américains

Prix relevés le 1er novembre 2026 sur les pages officielles (`docs/veille/offres-automatisation.md`). Le 3 novembre, la page de Jobber refuse la lecture automatique (erreur 403) : les prix Jobber n'ont pas pu être relus ce jour-là.

| Offre | Prix | Source |
|---|---|---|
| Jobber Receptionist (IA), option | 29 $/mois | [getjobber.com/pricing](https://www.getjobber.com/pricing/) |
| Jobber Marketing Suite (avis, campagnes), option | 99 $/mois | idem |
| Jobber Grow, 1 utilisateur, sans engagement | 199 $/mois | idem |
| ServiceM8 Office Agent Pro, option | 39 $/mois | [servicem8.com/pricing](https://www.servicem8.com/pricing) |
| Housecall Pro, palier 8 utilisateurs | 329 $/mois sans remise annuelle | [housecallpro.com/pricing](https://www.housecallpro.com/pricing/) |
| Workiz | 5 automatisations en Standard, 10 en Pro, prix non public | [workiz.com/pricing](https://www.workiz.com/pricing/) |

Lecture :

- **Les Américains vendent chaque option IA 29 à 39 $/mois**, consommation comprise. NEOBATYS ne vend pas l'agent : le client paie l'IA au prix coûtant (1 à 11 $ par mois selon nos hypothèses), et l'équipe relit chaque envoi. C'est un message simple : « l'IA vous coûte ce qu'elle coûte, pas plus ».
- **Un logiciel américain avec ses options IA et marketing** (Jobber Grow + Receptionist + Marketing Suite) revient à 327 $/mois sans engagement. Pro, à 990 €/mois, coûte trois fois plus, mais comprend le site, la mise en place, la relecture et l'accompagnement. Cet écart est à assumer dans le discours, pas à cacher.
- **Paliers selon le nombre d'automatisations** : c'est le modèle de Workiz (5 puis 10), proche de la grille (4, 7, puis 12 agents).

## 4. Marge

Prix moins relecture à notre charge. La consommation d'IA n'y entre plus, puisque le client la paie. Ni la mise en place, ni l'hébergement, ni les modifications du site ne sont déduits.

| Formule | Revenu mensuel | Relecture | Reste |
|---|---|---|---|
| Essentiel | 490 € | 27,34 € | 462,66 € |
| Pro | 990 € | 90,67 € au plus | 899,33 € |
| Premium | 1 490 € | 124,67 € | 1 365,33 € |
| Pack Gestion, maintenance | 200 € | 27,34 € | 172,66 € |
| Pack IA, maintenance | 200 € | 90,67 € au plus | 109,33 € |
| Transformation, maintenance après les 6 mois offerts | 200 € | 124,67 € | 75,33 € |

**Sensibilité au temps de relecture** : à 60 € de l'heure au lieu de 40, la relecture des 12 agents coûte 187 € par mois. La maintenance de la Transformation (200 €) ne laisserait que 13 €. Les 6 mois offerts de la Transformation représentent 748 € de relecture, pris sur les 9 900 €.

**Capacité de l'équipe** : un client Premium demande environ 3 heures de relecture par mois ; 20 clients Premium, environ 62 heures.

## 5. Cohérence avec la maintenance et les abonnements

- **Abonnement ou paiement en une fois sur 12 mois** : Essentiel 5 880 € contre Pack Gestion 5 390 € (2 990 + 12 × 200) ; Pro 11 880 € contre Pack IA 8 390 € ; Premium 17 880 € contre Transformation 11 100 € (9 900 + 6 × 200). L'abonnement coûte plus cher sur un an, en échange de zéro avance : c'est cohérent tant que l'écart reste lisible. La grille ne change rien à ces écarts.
- **La maintenance à 200 €** dit couvrir « les coûts de l'IA » (`pricing.json`, `note`). Avec le modèle retenu, le client paie l'IA lui-même : la note est réécrite dans cette PR : « les coûts de l'IA » devient « la relecture des envois des agents », et une phrase dit que la consommation d'IA est réglée sur le compte du client, au prix coûtant. La maintenance reste suffisante pour la relecture de toutes les formules, mais celle de la Transformation devient mince à 60 € de l'heure.
- **Audit d'octobre** (maintenance jugée trop chère) : sortir l'IA de la maintenance va dans son sens. Le temps passé en modifications du site, qui fixe le vrai coût de la maintenance, n'est pas mesuré : aucun nouveau prix n'est proposé ici.
- **Décision du 1er novembre** (`docs/plateforme-admin.md`, section 8.1, n° 2) : « Assistants IA et WhatsApp chiffrés avec chaque client ». Le modèle retenu la précise : on ne chiffre pas l'agent, on chiffre la consommation, payée par le client (décision 7).

## 6. Décisions

1. **Agents compris par formule : 4 en Pack Gestion et Essentiel, 7 en Pack IA et Pro (les 4 plus 3 au choix parmi 6), 12 en Transformation et Premium.** Recommandation : oui. La grille garde les prix, ferme le trou des 7 agents sans formule et se lit en une ligne par formule.
2. **Consommation d'IA payée par le client sur son propre compte.** Fixé par Ilann. Reste à dire au client, au devis, combien il paiera : recommandation, l'estimation de la section 2 (moins de 1 $ par mois en Essentiel, 10,55 $ au plus en Pro, 11,49 $ en Premium, SMS compris), remplacée par sa consommation réelle après 3 mois.
3. **Numéro et SMS des Appels manqués (3,85 $/mois, 24 $ au pire).** Recommandation : même règle que l'IA, payés par le client sur son compte Twilio ; c'est aussi de la consommation.
4. **Agents ajoutés hors formule.** Recommandation : sans prix d'agent, mise en place et relecture comprises ; au-delà de 2 ou 3 ajouts, proposer la formule au-dessus, car la relecture n'est plus couverte.
5. **Maintenance à 200 € HT.** Recommandation : prix inchangé, note réécrite (l'IA n'y est plus). Mesurer pendant 3 mois le temps de relecture et de modifications par client, puis trancher l'audit d'octobre avec des chiffres réels.
6. **Clé API et plafond par organisation dans l'admin.** Recommandation : à faire par Gabin avec l'étape multi-clients ; d'ici là, la consommation des premiers clients passe par la clé de NEOBATYS et se refacture au réel, et le plafond commun de 50 $ doit être relevé avant le 5e client équipé des 12 agents.
7. **Décision du 1er novembre « Assistants IA chiffrés avec chaque client ».** Recommandation : la remplacer par « agents compris selon la formule, consommation d'IA payée par le client ; devis seulement pour WhatsApp ou un usage hors norme ».
8. **Valeur de l'heure de relecture (40 € HT ici).** Recommandation : la fixer ensemble ; c'est le seul coût des agents qui reste à notre charge.
9. **Facturation client et Compte rendu et réception**, en service dans l'admin mais absents du site. Recommandation : présenter Facturation client comme une fonction du logiciel (socle), et Compte rendu et réception dans une PR à part après cette décision.

## 7. Ce que contient la PR

Prix inchangés :

- `content/data/pricing.json` : agents de chaque formule, en une fois et en abonnement ; note de la maintenance réécrite ;
- `content/data/offers.json` : les 4 agents de gestion dans le Pack Gestion ;
- `content/data/pages.json` (page IA) : section « Quels agents dans quelle formule » (agents compris, ajouts à la demande, consommation payée par le client), sous-titre des agents et une question de FAQ.
