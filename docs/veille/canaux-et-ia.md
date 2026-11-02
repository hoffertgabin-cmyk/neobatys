# Veille : être cité par les assistants IA et canaux de découverte chez les artisans

Relevé du 2 novembre 2026 pour NEOBATYS. Complète, sans le répéter, `docs/veille/seo-acquisition.md`, `docs/seo-logiciel.md` (section 6 netlinking : Capterra/GetApp/Appvizer, CAPEB, FFB, CMA, CdM, FDA, CCI déjà listés), `docs/seo-actions-ilann.md` (Search Console, Bing Webmaster, Bing Places, Apple, PagesJaunes, Editus) et `docs/reseaux-sociaux.md`.

Règle de lecture : chaque fait cite la page ouverte. « non officiel » = la seule source est un tiers. « bloqué » = la page a refusé l'accès à l'outil (403), rien n'a été contourné. Effort S/M/L et pertinence sont des estimations relatives, pas des mesures.

---

## A. Être cité par les assistants IA

### A1. Robots, index et réglages, éditeur par éditeur (documentation officielle)

| Assistant | Robot qui décide de la présence dans les réponses | Robots à ne pas confondre | Index interrogé | Source ouverte |
|---|---|---|---|---|
| ChatGPT (recherche) | **OAI-SearchBot** : un site qui le bloque n'apparaît pas dans les réponses de recherche (seulement en lien de navigation). Délai d'environ 24 h après un changement de robots.txt. Autoriser aussi les IP publiées (openai.com/searchbot.json). | **GPTBot** = entraînement des modèles, indépendant de la recherche. **ChatGPT-User** = visite déclenchée par un utilisateur, robots.txt « may not apply », ne sert pas à décider de l'apparition dans Search. OAI-AdsBot = contrôle des pages d'annonces. | Index propre alimenté par OAI-SearchBot, plus des « fournisseurs de recherche tiers » non nommés, à qui ChatGPT envoie des requêtes réécrites. | https://developers.openai.com/api/docs/bots ; aide ChatGPT search https://help.openai.com/en/articles/9237897-chatgpt-search **bloqué (403)**, contenu relevé via les extraits du moteur de recherche seulement |
| Google AI Overviews / AI Mode | **Googlebot** (le même que la recherche). « There are no additional requirements to appear in AI Overviews or AI Mode » : il faut être indexé et éligible à un extrait. | **Google-Extended** : contrôle l'usage pour entraîner Gemini et pour le « grounding » dans d'autres systèmes Google ; « does not impact a site's inclusion in Google Search », pas un signal de classement. | Index Google Search. AI Mode et AI Overviews lancent plusieurs recherches liées (« query fan-out »). | https://developers.google.com/search/docs/appearance/ai-features ; https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers |
| Gemini (appli) | Non documenté pour l'appli grand public dans les pages ouvertes. Côté API, l'ancrage passe par Google Search. | Google-Extended (voir ci-dessus). | Google Search (via grounding). | https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers ; la doc API https://ai.google.dev/gemini-api/docs/google-search redirige vers aistudio.google.com, non relue |
| Perplexity | **PerplexityBot** : « surface and link websites in search results », ne sert pas à entraîner des modèles ; autoriser pour apparaître. Délai jusqu'à 24 h. | **Perplexity-User** : visite à la demande d'un utilisateur, ignore en général robots.txt, cite la page. IP publiées (perplexitybot.json, perplexity-user.json). | Index propre. | https://docs.perplexity.ai/guides/bots |
| Claude | **Claude-SearchBot** : indexe pour la recherche ; le bloquer « may reduce your visibility ». | **ClaudeBot** = entraînement. **Claude-User** = visite à la demande d'un utilisateur. Respect de robots.txt et de Crawl-delay ; Anthropic déconseille de bloquer par IP. | Fournisseur de recherche : Brave Search figurerait dans la liste des sous-traitants d'Anthropic depuis mars 2025 (**non officiel** : TechCrunch https://techcrunch.com/2025/03/21/anthropic-appears-to-be-using-brave-to-power-web-searches-for-its-claude-chatbot/ ; la page https://trust.anthropic.com/subprocessors ne s'affiche pas sans JavaScript, non vérifié). | https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler |
| Copilot (Microsoft) | **Bingbot** (index Bing). Microsoft écrit que ses expériences de recherche IA, Copilot compris, sont « Powered by Bing's search index ». | | Index Bing. | https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers (K. Madhavan, Microsoft Bing, 8/10/2025) |

**État de neobatys.com (vérifié le 2/11/2026)** : `robots.txt` autorise tout sauf `/api/`. Une requête vers `/logiciel` avec les agents OAI-SearchBot, PerplexityBot, Claude-SearchBot et bingbot répond 200. Limite : test fait depuis notre IP, pas depuis les IP des robots ; si une protection anti-robots Vercel est activée un jour, la revérifier.

### A2. Statut réel de llms.txt

- C'est une **proposition** de Jeremy Howard (3/9/2024), « open for community input », pas un standard. La page note que des laboratoires publient un llms.txt pour leur propre documentation (publier n'est pas lire) et que Lighthouse l'audite. Elle n'affirme pas qu'un moteur ou assistant l'utilise. https://llmstxt.org/
- **Google** (officiel) : « You don't need to create new machine readable files, AI text files, or markup to appear in these features. » https://developers.google.com/search/docs/appearance/ai-features
- **John Mueller (Google)**, Bluesky, 17/6/2025 : « FWIW no AI system currently uses llms.txt. » (**non officiel**, propos rapporté) https://www.seroundtable.com/google-ai-llms-txt-39607.html
- OpenAI, Anthropic, Perplexity, Microsoft : aucune des pages ouvertes ci-dessus ne mentionne llms.txt comme moyen d'apparaître.
- Conclusion : aucun éditeur ne dit officiellement l'utiliser pour citer des sources. Coût quasi nul mais bénéfice non démontré : ne pas en faire une priorité.

### A3. Ce qui fait qu'une source est citée, selon ces documentations

Google (pages AI features et billet du 21/5/2025 https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search) :
- Les bases du SEO suffisent ; pas d'optimisation spéciale ni de schema dédié.
- Contenu « unique, non-commodity », utile aux questions longues et aux questions de suivi.
- Googlebot non bloqué, pages en HTTP 200, contenu important en texte, liens internes.
- Données structurées identiques au texte visible.
- Images et vidéos de qualité en appui (recherche par photo).
- **Fiche d'établissement (Business Profile) à jour** : citée explicitement.
- Les restrictions d'extrait (nosnippet, max-snippet) limitent l'usage dans les fonctions IA.

Microsoft (billet du 8/10/2025 cité plus haut) :
- Titres, descriptions et H1 cohérents ; H2/H3 précis comme « chapitres ».
- Questions-réponses, listes, tableaux ; réponses courtes compréhensibles hors contexte.
- Schema en JSON-LD (produit, avis, FAQ, événement).
- À éviter : murs de texte, réponses cachées dans des onglets ou accordéons, infos clés seulement en PDF ou en image, affirmations vagues (« next-gen »). Les bases (exploration, métadonnées, liens internes, liens entrants) restent essentielles.
- Mesure : Bing Webmaster Tools propose un rapport « AI Performance » (citations, requêtes d'ancrage) en préversion publique depuis février 2026 (**non officiel** : https://searchengineland.com/bing-webmaster-tools-ai-performance-report-468751 ; l'annonce Bing n'a pas été retrouvée).

OpenAI : apparaître = autoriser OAI-SearchBot ; « no way to guarantee top placement » (aide **bloquée**, extrait du moteur de recherche).

Mentions tierces, avis, fiches :
- Aucune des documentations IA ouvertes ne cite « mentions sur des sites tiers » comme critère de citation. Ce qu'on lit sur ce sujet vient de blogs marketing : **non officiel**, non retenu.
- Pour le local Google, la notoriété dépend du « nombre de sites Web qui renvoient vers votre établissement » et du « nombre d'avis » : https://support.google.com/business/answer/7091?hl=fr. Comme les AI Overviews s'appuient sur l'index et sur Business Profile, c'est le lien officiel le plus direct entre avis/liens et visibilité IA.
- Wikidata : il faut un lien vers un article Wikimedia, ou une entité décrite par des « serious and publicly available references », ou un besoin structurel. https://www.wikidata.org/wiki/Wikidata:Notability. NEOBATYS ne remplit aucun critère aujourd'hui : **ne pas créer d'élément**, il serait supprimé. Wikipédia encore moins.

---

## B. Canaux où les artisans découvrent une agence web ou un logiciel de devis

Rappel : Capterra, GetApp, Appvizer, CAPEB, FFB, CMA, CdM, FDA, CCI sont déjà dans `docs/seo-logiciel.md` §6. On ajoute ici les conditions vérifiées et les canaux nouveaux.

### B1. Comparateurs de logiciels

| Canal | URL vérifiée | Pour y figurer | Être bien vu | Coût publié | Effort | Pertinence |
|---|---|---|---|---|---|---|
| **G2** (et désormais Capterra, GetApp, Software Advice) | https://sell.g2.com/create-free-profile ; procédure https://documentation.g2.com/help/docs/finding-or-listing-a-product-on-g2 | Formulaire g2.com/products/new, vérification par l'équipe G2, puis revendication du profil (1 à 3 jours ouvrés). Refusés : produits B2C, alpha ou bêta. | Avis de vrais clients. | Profil gratuit (« You can claim your profile for free ») ; offres payantes non chiffrées sur les pages lues. | S | Forte : G2 a signé le 29/1/2026 l'accord de rachat de Capterra, Software Advice et GetApp à Gartner et annonce intégrer leurs données https://company.g2.com/news/g2-acquires-capterra-software-advice-getapp. Une seule démarche pourrait donc couvrir plusieurs annuaires (à confirmer). |
| **Capterra / GetApp** | https://www.capterra.fr/vendors **bloqué (403)** ; page vendeur Gartner introuvable (DNS) | Fiche gratuite de base, visibilité payante au clic (**non officiel**, faute d'avoir pu ouvrir la page éditeur). Description du service au clic : https://www.capterra.com/legal/ppc-service-description_fr/ (non ouverte). | Avis. | non publié sur les pages lues | S | Forte, mais passer par G2 d'abord vu le rachat. |
| **Appvizer** | https://www.appvizer.fr/ ; https://www.appvizer.fr/a-propos/transparence ; catégorie https://www.appvizer.fr/finance-comptabilite/facturation | Compte éditeur via https://i.app.appvizer.fr/connexion ; réservé aux éditeurs SaaS professionnels (CGU, **non officiel** car relu via extrait de recherche). | Score = moyenne pondérée des avis collectés sur le web (nombre et note). | Référencement gratuit ; revenus Appvizer : bannières, mentions payantes, paiement par clic de l'éditeur. | S | Moyenne : média français, pas de catégorie BTP dédiée (seulement « Devis et Facturation »). |

### B2. Organismes publics et professionnels (nouveautés par rapport à seo-logiciel.md)

| Canal | URL vérifiée | Ce qu'il faut faire | Coût | Effort | Pertinence |
|---|---|---|---|---|---|
| **SME Packages Digital (Luxembourg)** | https://guichet.public.lu/fr/entreprises/financement-aides/regime-sme-packages/soutien-pme/sme-packages-digital.html | L'État rembourse **70 % des coûts éligibles** pour un projet de 3 000 à 25 000 € HTVA : site internet, réseaux sociaux, logiciels sectoriels, facturation électronique via un ERP. L'artisan choisit lui-même le prestataire ; aucune condition sur le lieu ou l'agrément du prestataire n'est écrite. Les entreprises artisanales passent d'abord par le service eHandwierk de la Chambre des Métiers (pré-analyse obligatoire), demande à déposer **avant** les travaux. | aide pour le client | M | **Très forte** pour les clients luxembourgeois : argument de vente direct (« votre site et votre logiciel financés à 70 % »). Se faire connaître d'eHandwierk. |
| **Chambre des Métiers : DigiCheck et agenda** | https://www.cdm.lu/ ; https://services.cdm.lu/digicheck ; https://www.cdm.lu/agenda | DigiCheck = autodiagnostic numérique gratuit pour artisans ; agenda avec sessions (cybersécurité le 27/11/2026). Proposer une intervention sur la facture électronique. | non publié | M | Forte (Luxembourg). |
| **Fédération des Artisans : sponsoring** | https://fda.lu/fda/devenir-sponsor/ ; agenda https://fda.lu/agenda/ | Page « Devenir sponsor » ; six sponsors affichés en accueil. Afterworks et tables rondes réguliers (cyber-risque avec Foyer le 26/11/2026). | non publié | M | Moyenne à forte ; demander le tarif avant d'engager. |
| **Club Partenaires BTP 57 (Fédération BTP Moselle)** | https://www.ffbatiment.fr/organisation-ffb/federations-departementales-chambres-syndicales/moselle | Club fondé en 2015, 16 membres (assureur, banquier, fournisseurs, « technology providers »...), présent aux événements de la fédération. Conditions d'entrée non publiées. | non publié | M | Forte (Moselle) : accès direct aux chefs d'entreprise ; la fédération revendique environ 1 200 entreprises. |
| **CAPEB Moselle** | aucune page départementale trouvée (https://www.capeb.fr/moselle et /moselle/annoncer en 404) | La CAPEB 54 organise un « Café des partenaires » (https://www.capeb.fr/actualites/cafe-des-partenaires-a-la-capeb-54) ; d'autres CAPEB vendent de la publicité dans leur revue (ex. Loire : https://www.capeb.fr/loire/annoncer, plus de 800 entreprises lectrices selon la page). Pour la Moselle, passer par le contact direct déjà prévu. | non publié | M | Forte, déjà au plan. |
| **CMA Alsace-Moselle-Grand Est** | https://www.cma-alsace-moselle-grandest.fr/ | Offre « Numérique » d'accompagnement des artisans et formations courtes (réseaux sociaux, marketing digital). Aucun programme partenaire ni liste de prestataires publié. | | M | Moyenne : proposer d'intervenir dans une formation. |
| **France Num : Activateurs** | https://www.francenum.gouv.fr/experts-du-numerique/experts-du-numerique-rejoignez-le-reseau-des-activateurs-france-num (page vide sans JavaScript) ; liste officielle https://www.data.gouv.fr/datasets/activateurs-france-num (DGE, mise à jour 14/10/2026) | Réseau d'acteurs qui accompagnent les TPE/PME françaises dans le numérique : adhésion à une charte, inscription sur l'extranet, validation par la DGE, puis fiche publique (**non officiel** pour le détail des étapes, page non lisible par l'outil). **À vérifier** : une société luxembourgeoise est-elle admise ? | gratuit selon les reprises, non vérifié | S | Forte si NEOBATYS est éligible : annuaire public de l'État visé par les TPE. |
| **Logo « solution compatible » (facturation électronique, France)** | https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees | L'administration a créé un logo « solution compatible » pour les logiciels qui travaillent avec une plateforme agréée ; une charte d'utilisation en PDF est publiée sur la page. Procédure d'obtention et liste publique non décrites. | | S | Forte pour la crédibilité du logiciel en 2027 ; lire la charte avant tout usage. |
| **Experts-comptables** | aucun programme partenaire officiel trouvé | Démarche relationnelle (cabinets de Metz et du Luxembourg qui conseillent des artisans). Rien de publié à citer. | | M | Probablement forte, mais **non vérifié**. |

### B3. Salons

| Salon | URL vérifiée | Dates publiées | Pertinence |
|---|---|---|---|
| Batimat | https://www.batimat.com/ | Prochaine édition **2 au 5 octobre 2028**, Paris Porte de Versailles. Rien en 2026-2027. | Faible avant 2028 (coût et distance). |
| Artibat | https://www.artibat.com/ (artibat.fr est un nom de domaine à vendre) | **20 au 22 octobre 2027**, Parc Expo Rennes, organisé par la CAPEB Pays de la Loire. Exposer : https://www.artibat.com/exposer. Le site annonce « plus de 1 100 exposants et 45 000 visiteurs professionnels » (chiffres déclarés, et le pied de page donne 1 000 et 40 000). | Faible : Bretagne et Pays de la Loire, hors zone. |
| Foire internationale de Metz | https://www.metz-expo.com/ (fim-metz.com n'existe pas) | Édition 2026 du 25/9 au 5/10/2026 (**non officiel** : https://www.festivalenfrance.com/festival/foire-internationale-de-metz). 2027 non publiée. L'agenda Metz Expo de novembre 2026 ne liste aucun salon BTP ou habitat. | Moyenne : public de particuliers, mais les artisans exposants sont des prospects à visiter. |
| Luxexpo The Box (Luxembourg) | https://www.thebox.lu/fr/agenda (luxexpo.lu a un certificat invalide) | Agenda actuel jusqu'au 6/12/2026 : aucun salon habitat ou construction. | À revérifier au printemps 2027. |

### B4. Publicité Google

| Canal | URL vérifiée | Constat | Pertinence |
|---|---|---|---|
| Annonces Local Services (Google) | https://support.google.com/localservices/answer/6224841?hl=fr | **Disponibles en France** pour une liste de métiers : électriciens, plombiers, couvreurs, menuisiers, chauffage et climatisation, entreprise générale, homme à tout faire, revêtements de sol, clôtures, etc. Paiement uniquement pour les leads reçus (prix non publié). Badge « Validé par Google » après vérifications. Aucune catégorie « agence web » ou « logiciel ». | Nulle comme canal d'acquisition pour NEOBATYS ; **utile comme service** pour nos clients plombiers ou électriciens (aide à la mise en place, avec le site et la fiche). |
| Google Ads classique | | Possible, coût au clic non publié. Non étudié ici. | À tester plus tard avec un petit budget sur « logiciel devis artisan ». |

### B5. Presse professionnelle

| Média | URL | Constat | Pertinence |
|---|---|---|---|
| Le Moniteur | https://www.lemoniteur.fr/ | **bloqué (403)** : offres annonceurs non vérifiées. | Grandes entreprises surtout, à confirmer. |
| Batiactu | https://www.batiactu.com/ | **bloqué (403)**. | À confirmer à la main. |
| Batiweb | https://www.batiweb.com/ | Publie des « publi-rédactionnels » (rubrique visible dans les adresses d'articles, ex. https://www.batiweb.com/actualites/publi-redactionnels/artibat-2027-confiance-professionnels-49288). Tarifs non relus. | Moyenne. |
| Revues CAPEB | https://www.capeb.fr/loire/annoncer | Exemple de régie locale : revue départementale, site capeb.fr et lebatimentartisanal.com. | Moyenne, local. |
| « Artisans Mag » | | Aucun site officiel trouvé sous ce nom : ne pas le citer. | |

### B6. Places de marché de chantiers

| Plateforme | URL vérifiée | Constat | Pertinence |
|---|---|---|---|
| Habitatpresto | https://www.habitatpresto.com/pro | Inscription gratuite des pros, demandes de particuliers par zone et métier, active depuis 2005 selon la page. **Annonce un logiciel de devis et factures « bientôt »** avec préinscription. Tarifs sur une page non relue. | Concurrent potentiel du logiciel, et lieu où se trouvent les artisans. À surveiller. |

Travaux.com, StarOfService, Quotatis : non ouverts dans cette recherche, ne pas les citer sans vérification.

### B7. Podcasts, YouTube, groupes

| Canal | URL vérifiée | Constat | Pertinence |
|---|---|---|---|
| BTP Techno Lab | https://podcast.ausha.co/btp-techno-lab | IA et outils pour le BTP, environ deux épisodes par mois, dernier épisode le 7/10/2026. Pas d'invités extérieurs listés : proposer un cas pratique (facture électronique d'un artisan). | Forte, effort S. |
| 6 H du BAT' | https://podcast.ausha.co/6-h-du-bat-le-podcast-qui-reveille-le-btp | 131 épisodes, invités du secteur (président de la FFB, artisans), sponsor Kraaft (appli de chantier). Contact via Instagram @6h_du_bat ou LinkedIn. | Moyenne : audience nationale, invités plus gros que nous. |
| 3 minutes qui construisent (SMABTP) | https://podcast.ausha.co/3-minutes-qui-construisent/bande-annonce-3-minutes-qui-construisent | Série d'un assureur, pas ouverte aux invités a priori. | Faible. |
| YouTube | | Google cite les vidéos parmi les contenus qui soutiennent les réponses IA (billet du 21/5/2025). Une démo de 2 minutes du logiciel est réutilisable partout. | Moyenne, effort M. |
| Groupes Facebook et LinkedIn d'artisans | | Non vérifiés : leur existence et leurs règles ne se lisent pas sans compte. Ne rien publier de promotionnel sans lire le règlement du groupe. | Inconnue. |

---

## Top 10 (impact / effort pour deux associés)

| # | Action | Pourquoi | Effort |
|---|---|---|---|
| 1 | Laisser OAI-SearchBot, Claude-SearchBot, PerplexityBot, Bingbot et Googlebot autorisés (c'est le cas) et ne jamais activer de blocage anti-robots sans liste d'exceptions | Condition officielle pour être cité par ChatGPT, Claude, Perplexity, Copilot, Google | S |
| 2 | Bing Webmaster Tools (déjà prévu) puis suivre le rapport AI Performance | Copilot repose sur l'index Bing ; seul tableau de citations IA disponible | S |
| 3 | Profil G2 gratuit, puis vérifier s'il alimente Capterra et GetApp ; fiche Appvizer | Un seul formulaire pour plusieurs comparateurs depuis le rachat | S |
| 4 | Page « SME Packages Digital » pour les artisans luxembourgeois et contact eHandwierk (CdM) | 70 % du site ou du logiciel remboursé : argument de vente immédiat | M |
| 5 | Demander l'inscription Activateur France Num (vérifier l'éligibilité d'une société luxembourgeoise) | Annuaire officiel de l'État consulté par les TPE françaises | S |
| 6 | Restructurer les guides en blocs question-réponse, tableaux, réponses courtes, sans contenu clé caché en accordéon | Recommandé noir sur blanc par Microsoft ; cohérent avec Google | S |
| 7 | Lire la charte du logo « solution compatible » et l'obtenir si le logiciel y a droit | Crédibilité officielle avant l'échéance de septembre 2027 | S |
| 8 | Proposer un épisode à BTP Techno Lab | Public BTP intéressé par les outils, coût nul | S |
| 9 | Contacter le Club Partenaires BTP 57 et la FDA (sponsoring), demander les tarifs | Accès direct aux chefs d'entreprise de Moselle et du Luxembourg | M |
| 10 | Proposer les annonces Local Services comme service aux clients plombiers, électriciens, couvreurs | Disponibles en France pour ces métiers ; complète l'offre site + fiche | M |

Écartés : llms.txt (aucun usage officiel déclaré), Wikidata/Wikipédia (critères non remplis), Batimat (2028), Artibat (hors zone), Annonces Local Services pour NEOBATYS elle-même (pas de catégorie).

## Points non vérifiés

- Aide ChatGPT search, Capterra vendeurs, Le Moniteur, Batiactu : **bloqués (403)**.
- Fournisseur de recherche de Claude (Brave) : seulement des sources tierces.
- Rapport AI Performance de Bing : annonce officielle non retrouvée.
- France Num : page non lisible par l'outil, éligibilité d'une société hors de France inconnue.
- Tarifs : G2 payant, Capterra au clic, FDA sponsor, Club Partenaires BTP 57, Habitatpresto.
