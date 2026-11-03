# Formules et agents IA

Proposition du 3 novembre 2026 pour placer les 12 agents de la page `/intelligence-artificielle` dans les formules. Les prix et le contenu des formules sont une décision d'Ilann et de Gabin : rien n'est publié avant leur accord (section 6).

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

Calcul : pour chaque appel, tokens × prix du modèle, multiplié par le volume du mois ; plus les minutes de relecture × 40 €/h.

| Agent | Modèle | IA et SMS ($/mois) | Relecture (min/mois) | Relecture (€) | **Total (€ HT/mois)** |
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

- **L'IA coûte peu, la relecture coûte cher.** Les 12 agents consomment environ 11 € d'IA et de SMS par mois ; la relecture, un peu plus de 3 heures, pèse plus de 90 % du coût. Le prix doit suivre le temps de l'équipe, pas les tokens.
- **Risque SMS** : les SMS des Appels manqués sont plafonnés à 300 par artisan et par mois (`APPELS_SMS_MONTHLY_CAP`), soit environ 24 $ au pire (`docs/APPELS-MANQUES.md`).
- **Plafond IA de l'admin** : 50 $ par mois par défaut, pour toute l'entreprise et non par artisan (`DEFAULT_MONTHLY_CAP_USD`, `companySettings.aiMonthlyCapUsd`). Au-delà, les agents s'arrêtent jusqu'au mois suivant. Avec 11,49 $ par artisan équipé des 12 agents, il est atteint au 5e client (décision 6).

## 3. Deux grilles possibles

### Grille A : agents inclus par palier, prix inchangés

| Formule | Prix | Agents inclus | Coût des agents (€ HT/mois, hypothèses ci-dessus) |
|---|---|---|---|
| Site Artisan | 990 € | aucun (pas de logiciel) | 0 |
| Pack Gestion / Essentiel | 2 990 € / 490 €/mois | **4 agents de gestion** : Relance de devis, Relances impayés, Rendez-vous et rappels, Documents et échéances | 27,78 |
| Pack IA / Pro | 5 990 € / 990 €/mois | les 4, plus **3 agents au choix parmi 6** : Réponse aux demandes, Appels manqués, Devis à la voix, Avis Google, Entretiens annuels, Dossiers d'aides | 101,22 au plus (si Devis à la voix, Réponse et Appels manqués) |
| Transformation / Premium | 9 900 € / 1 490 €/mois | **les 12**, dont Factures fournisseurs et Suivi de rentabilité | 136,16 |

Pourquoi ce découpage :

- les 4 agents de gestion tiennent la promesse « relances automatiques » déjà faite pour le logiciel, et coûtent surtout de la relecture courte ;
- le choix passe de 2 parmi 3 à 3 parmi 6 : chaque métier y trouve son agent (Entretiens pour un chauffagiste, Dossiers d'aides pour un artisan RGE) ;
- Factures fournisseurs et Suivi de rentabilité restent la marque de la formule haute, comme aujourd'hui.

### Grille B : socle et agents à la carte

| Élément | Prix proposé | Coût (€ HT/mois) | Marge par agent |
|---|---|---|---|
| Socle : les 4 agents de gestion, dans toute formule avec logiciel | inclus | 27,78 | — |
| Agent qui écrit à vos clients : Réponse aux demandes, Appels manqués, Devis à la voix, Avis Google, Entretiens annuels | 49 € HT/mois chacun | 10,89 à 34,16 | 14,84 (Devis à la voix) à 38,11 (Avis Google) |
| Outil interne : Factures fournisseurs, Suivi de rentabilité, Dossiers d'aides | 19 € HT/mois chacun | 1,44 à 5,43 | 13,57 à 17,56 |
| Pro et Pack IA | inchangés, 3 agents à 49 € inclus | | |
| Premium et Transformation | inchangés, les 12 inclus | | |

La grille B vend un agent de plus sans changer de formule, et rend la maintenance indépendante des agents, ce qui ouvrirait la voie à une maintenance moins chère (audit client d'octobre, cité par la session pilote ; le document n'est pas dans le dépôt). En revanche elle multiplie les lignes à expliquer et à facturer.

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

- **Les options IA américaines coûtent 29 à 39 $/mois**, mais l'artisan les règle et les surveille lui-même. Chez NEOBATYS, l'équipe relit chaque envoi : c'est ce qui justifie 49 € par agent en grille B, et c'est aussi ce qui coûte.
- **Un logiciel américain avec ses options IA et marketing** (Jobber Grow + Receptionist + Marketing Suite) revient à 327 $/mois sans engagement. Pro, à 990 €/mois, coûte trois fois plus, mais comprend le site, la mise en place, la relecture et l'accompagnement. Cet écart est à assumer dans le discours, pas à cacher.
- **Paliers selon le nombre d'automatisations** : c'est le modèle de Workiz (5 puis 10), proche de la grille A (4, 7, puis 12 agents).

## 4. Marge

Marge sur les agents seulement : prix moins coût des agents. Elle ne déduit ni la mise en place, ni l'hébergement, ni les modifications du site.

| Formule | Revenu mensuel | Coût des agents, grille A | Reste |
|---|---|---|---|
| Essentiel | 490 € | 27,78 € | 462,22 € |
| Pro | 990 € | 101,22 € au plus | 888,78 € |
| Premium | 1 490 € | 136,16 € | 1 353,84 € |
| Pack Gestion, maintenance | 200 € | 27,78 € | 172,22 € |
| Pack IA, maintenance | 200 € | 101,22 € au plus | 98,78 € |
| Transformation, maintenance après les 6 mois offerts | 200 € | 136,16 € | 63,84 € |

Aujourd'hui, le Pack IA à 2 agents parmi 3 coûte au plus 56,26 € par mois (Devis à la voix et Réponse) : la grille A réduit le reste de la maintenance du Pack IA de 144 € à 99 € au pire.

**Sensibilité au temps de relecture** : à 60 € de l'heure au lieu de 40, les 12 agents coûtent 198,49 € par mois. La maintenance de la Transformation (200 €) ne couvrirait plus que les agents. Les 6 mois offerts de la Transformation représentent 817 € de coût d'agents, pris sur les 9 900 €.

**Capacité de l'équipe** : un client Premium demande environ 3 heures de relecture par mois ; 20 clients Premium, environ 62 heures.

## 5. Cohérence avec la maintenance et les abonnements

- **Abonnement ou paiement en une fois sur 12 mois** : Essentiel 5 880 € contre Pack Gestion 5 390 € (2 990 + 12 × 200) ; Pro 11 880 € contre Pack IA 8 390 € ; Premium 17 880 € contre Transformation 11 100 € (9 900 + 6 × 200). L'abonnement coûte plus cher sur un an, en échange de zéro avance : c'est cohérent tant que l'écart reste lisible. La grille A ne change rien à ces écarts.
- **La maintenance à 200 €** couvre « les coûts de l'IA » (`pricing.json`, `note`). En grille A, elle reste suffisante pour toutes les formules, mais la marge de la Transformation devient mince (63,84 €) et disparaît si le temps de relecture vaut 60 € de l'heure.
- **Audit d'octobre** (maintenance jugée trop chère) : la grille A ne le règle pas ; la grille B le permettrait en sortant les agents de la maintenance. Le temps passé en modifications du site, qui fixe le vrai coût de la maintenance, n'est pas mesuré : aucun nouveau prix de maintenance n'est proposé ici.
- **Décision du 1er novembre** (`docs/plateforme-admin.md`, section 8.1, n° 2) : « Assistants IA et WhatsApp chiffrés avec chaque client ». Elle contredit une grille publique qui inclut les agents : à trancher (décision 7).

## 6. Décisions

1. **Grille A ou grille B.** Recommandation : **A**. Elle garde les prix, ferme le trou des 7 agents sans formule et se lit en une ligne par formule. La grille B reste la suite naturelle si des clients demandent un seul agent de plus, ou si la maintenance doit baisser.
2. **Les 4 agents de gestion (Relance de devis, Relances impayés, Rendez-vous et rappels, Documents et échéances) inclus dans le Pack Gestion et l'abonnement Essentiel.** Recommandation : oui. Le site promet déjà des relances automatiques, et leur coût (27,78 €/mois) tient dans la maintenance et dans Essentiel.
3. **Pack IA et Pro : 3 agents au choix parmi 6, au lieu de 2 parmi 3.** Recommandation : oui. Coût au pire 101,22 €/mois, pour 990 € en abonnement ou 200 € de maintenance.
4. **Transformation et Premium : les 12 agents.** Recommandation : oui, c'est ce que dit déjà « tous les assistants ».
5. **Maintenance à 200 € HT.** Recommandation : inchangée dans cette PR. Mesurer pendant 3 mois le temps de relecture et de modifications par client, puis trancher l'audit d'octobre avec des chiffres réels.
6. **Plafond IA de l'admin (50 $/mois pour toute l'entreprise).** Recommandation : le relever avant le 5e client équipé des 12 agents ; 15 $ par artisan équipé laisse une marge sur les 11,49 $ estimés. Réglage de Gabin, dans l'admin.
7. **Décision du 1er novembre « Assistants IA chiffrés avec chaque client ».** Recommandation : la remplacer par la grille publique ; ne garder le devis que pour un usage hors norme (volume très supérieur aux hypothèses, WhatsApp).
8. **Valeur de l'heure de relecture (40 € HT ici).** Recommandation : la fixer ensemble ; c'est elle qui fait varier la marge, pas le prix de l'IA.
9. **Facturation client et Compte rendu et réception**, en service dans l'admin mais absents du site. Recommandation : présenter Facturation client comme une fonction du logiciel (socle), et Compte rendu et réception dans une PR à part après cette décision.

## 7. Ce que contient la PR

Grille A, sans changer aucun prix :

- `content/data/pricing.json` : agents de chaque formule, en une fois et en abonnement ;
- `content/data/offers.json` : les 4 agents de gestion dans le Pack Gestion ;
- `content/data/pages.json` (page IA) : section « Quels agents dans quelle formule », sous-titre des agents et une question de FAQ.
