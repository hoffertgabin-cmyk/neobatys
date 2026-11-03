# Documents juridiques de la plateforme

> Projet rédigé avec une IA le 1er novembre 2026, à faire valider avant publication.

| Fichier | Contenu |
|---|---|
| `cgu.md` | Conditions générales d'utilisation et de vente (compte gratuit et formules payantes) |
| `politique-de-confidentialite.md` | Politique de confidentialité de la plateforme, NEOBATYS responsable de traitement |
| `contrat-sous-traitance.md` | Accord de traitement des données (article 28 du RGPD), annexé aux CGU, avec la liste des sous-traitants ultérieurs et les mesures de sécurité |

Aucun de ces textes n'est un avis juridique. Ils sont à faire relire par un avocat (droit luxembourgeois et français) avant l'ouverture de la plateforme.

## Loi applicable et juridiction : option proposée, à valider

Choix retenu dans les projets : **droit luxembourgeois, tribunaux de Luxembourg-Ville**, après une tentative amiable de trente jours.

Pourquoi :
- l'éditeur, TAG Delme SARL, est établi au Luxembourg : un seul droit pour tous les clients, quel que soit leur pays, et pas de contentieux à l'étranger pour l'éditeur ;
- les clients sont exclusivement des professionnels : entre professionnels de l'Union européenne, le choix de la loi et du tribunal est en principe libre, sans les protections réservées aux consommateurs ;
- cohérence avec l'autorité de contrôle chef de file (CNPD, établissement au Luxembourg).

Limites à faire examiner par l'avocat :
- le fondement (règlements européens dits Rome I sur la loi applicable et Bruxelles I bis sur la compétence) n'a pas pu être relu : EUR-Lex n'a renvoyé aucun contenu lors de la vérification ;
- pour les clients français, certaines règles impératives françaises pourraient s'appliquer malgré le choix du droit luxembourgeois (notamment les règles sur le déséquilibre significatif entre professionnels et leurs juridictions spécialisées), et les très petites entreprises françaises peuvent bénéficier de certaines protections du droit de la consommation dans des cas précis : non vérifié, à confirmer ;
- alternative à considérer : droit français et tribunaux français pour les clients établis en France, si la majorité des clients y est établie (plus lisible pour eux, plus de travail pour l'éditeur).

## Trous à compléter (`[À COMPLÉTER : ...]`)

Identité et contacts :
- numéro d'autorisation d'établissement (s'il y a lieu) et numéro de téléphone de TAG Delme SARL ;
- adresse définitive de l'espace artisan (`app.neobatys.com` proposée, décision ouverte 2 de `docs/plateforme-admin.md`) et URL de la grille tarifaire ;
- adresse e-mail dédiée aux données personnelles, et désignation ou non d'un délégué à la protection des données ;
- numéros de version et dates d'entrée en vigueur des trois textes.

Commercial :
- périodicité de facturation (mensuelle, annuelle) et durée d'engagement des formules ;
- canaux et horaires du support ;
- formats d'export proposés.

Prestataires (annexe 1 du contrat de sous-traitance, section 4 de la politique) :
- entité contractante, localisation des données et garantie de transfert (cadre de protection des données UE-États-Unis ou clauses contractuelles types) pour **chaque** prestataire : Vercel, Neon, Anthropic, OpenAI, Twilio, OVH, Meta, Stripe, Super PDP ;
- hébergeur de la messagerie de NEOBATYS ;
- fréquence de synchronisation des audiences Meta ;
- liste, nom et durée des cookies de la plateforme ;
- liens vers les conditions WhatsApp Business de Meta et l'accord de responsabilité conjointe de Meta pour les audiences personnalisées.

## Points à valider (`[À VALIDER]`)

Durées et délais : préavis de modification des prix et des CGU (30 jours proposés), délai de régularisation d'un impayé (15 jours), fermeture des comptes gratuits inactifs (24 mois), délai d'export en fin de contrat (30 jours), suppression des sauvegardes (90 jours), conservation des journaux techniques (12 mois), archive du support (5 ans), délai d'information sur un nouveau sous-traitant (30 jours), transmission d'une demande de droit (5 jours ouvrés), préavis d'audit (30 jours), confidentialité après la fin du contrat (5 ans).

Fond :
1. **Plafond de responsabilité** : 12 mois de redevances, et 100 € pour un compte gratuit ; articulation avec le contrat de sous-traitance et l'article 82 du RGPD.
2. **Pas de remboursement au prorata** en cas de résiliation d'un abonnement en cours de période.
3. **TVA** des clients établis en France (autoliquidation) et pénalités de retard applicables selon le droit choisi.
4. **Conservation des factures de l'artisan pendant 10 ans par NEOBATYS** pour son compte après la fin du contrat : choix fait pour répondre à la demande « factures conservées 10 ans ». À confirmer : coût, base légale exacte (le texte fixant 10 ans en France et au Luxembourg n'a pas été relu, Légifrance ayant refusé l'accès), articulation avec l'archivage déjà assuré par la plateforme agréée.
5. **Qualification de Meta (WhatsApp)** et de la plateforme agréée : sous-traitant ultérieur de NEOBATYS, ou prestataire direct de l'artisan qui accepte leurs conditions. Les projets les listent comme sous-traitants ultérieurs par prudence, avec une réserve.
6. **Publicité ciblée Meta** : responsabilité conjointe avec Meta pour la transmission de la liste (lignes directrices 8/2020 du Comité européen), à documenter. La section 5.1 de `docs/plateforme-admin.md` mentionne « Meta et Google » dans le texte de la case 3 du formulaire, alors que la demande ne vise que Meta : aligner le formulaire et la politique.
7. **IA** : vérifier que les conditions du prestataire d'IA excluent l'entraînement sur les données transmises et connaître la durée de conservation des requêtes chez lui, avant de garder cet engagement dans les CGU et le contrat de sous-traitance.
8. **Prospection** : le choix du consentement (plutôt que l'intérêt légitime admis par la CNIL entre professionnels) est conservé, car beaucoup d'artisans sont des personnes physiques (entreprise individuelle), couvertes par l'exigence de consentement en France et au Luxembourg.
9. **Autorité de contrôle** : CNPD comme autorité de NEOBATYS, avec le droit des personnes de saisir la CNIL ; à confirmer au regard de l'établissement principal de TAG Delme SARL.
10. **Plateforme agréée** : nom du partenaire (Super PDP), forme du mandat de l'artisan, et facturation éventuelle directe par la plateforme agréée.

## Sources consultées

Ouvertes le 1er novembre 2026 (détail en fin de chaque document) : pages du RGPD sur cnil.fr (chapitres II, III, IV, V et VIII), CNIL sur la prospection par courrier électronique, questions-réponses et publication des référentiels de gestion commerciale, cookies et traceurs, plainte ; loi luxembourgeoise du 30 mai 2005 sur Legilux ; lignes directrices 8/2020 du Comité européen de la protection des données.

Non ouvertes ou illisibles : article L34-5 du CPCE sur Légifrance (accès refusé, texte connu par la page CNIL qui y renvoie) ; RGPD, Rome I et Bruxelles I bis sur EUR-Lex (contenu vide) ; conditions des audiences personnalisées de Meta (page non lisible sans navigateur) ; texte du référentiel CNIL au format PDF (téléchargé mais non lu, ses durées sont reprises de la page de questions-réponses de la CNIL).
