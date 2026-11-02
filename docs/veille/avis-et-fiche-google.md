# Veille : demandes d'avis et fiche Google

Pages ouvertes le 1er novembre 2026. Les fonctions sont décrites telles que les éditeurs les présentent sur leurs propres pages, sans test.

## Ce que font les autres

| Acteur | Ce que fait la fonction | Source |
|---|---|---|
| Podium | Invitations à laisser un avis envoyées automatiquement par SMS, réponses rédigées par l'IA (« automate textable review invites, and provide instant and personalized responses »). | https://www.podium.com/product/reviews |
| Podium | Prend position contre la sollicitation sélective des seuls clients satisfaits (« review gating »). | https://www.podium.com/article/review-gating |
| Birdeye | Demandes d'avis automatisées et suivi des retours reçus. | https://birdeye.com/reviews/ |
| Birdeye | « Birdeye does not allow review gating » (blog de l'éditeur). | https://birdeye.com/blog/google-birdeye-against-review-gating/ |
| Jobber | SMS et e-mail de demande d'avis Google envoyés automatiquement après une visite terminée, un chantier clos ou une facture payée, aux clients choisis par l'artisan (« preferred clients »). Disponible aux États-Unis, au Canada et au Royaume-Uni. Aucune mention des règles Google sur la sollicitation sélective. | https://help.getjobber.com/hc/en-us/articles/20621046897559-Reviews-Marketing-Tools |
| ServiceTitan | Demandes d'avis automatiques après le chantier, avis rattachés au technicien, au client et au chantier, alertes pour répondre. | https://www.servicetitan.com/features/pro/marketing/reputation |

## Pistes pour NEOBATYS

| Piste | Ce que ça apporte | Effort | Impact |
|---|---|---|---|
| 1. Demande d'avis à la facture payée, dans le logiciel | Un SMS ou un e-mail avec le lien d'avis de l'artisan, envoyé à **tous** ses clients une fois la facture réglée, validé par l'artisan. Les avis arrivent au meilleur moment, et l'envoi à tous respecte la règle Google contre la sollicitation sélective, un argument que Jobber n'affiche pas. | Moyen : modèle de message, réglage du lien d'avis par artisan, déclencheur « facture payée » | Fort : la popularité fait partie des critères du classement local cités par Google |
| 2. Brouillon de réponse aux avis par l'assistant IA | Comme Podium : l'IA propose une réponse à chaque avis, l'artisan valide. Répondre aux avis est une recommandation de Google. | Faible à moyen, si l'API de la fiche est accessible (non vérifié) | Moyen |
| 3. Rattacher l'avis au chantier | Comme ServiceTitan : savoir quel chantier a produit quel avis, pour relancer une seule fois et montrer le résultat à l'artisan. | Moyen | Moyen |
| 4. Fiche Google de l'artisan incluse dans le site | Création et réglage de la fiche (catégorie, zone, horaires, photos), avec le même pas-à-pas que [`../fiche-google-et-reseaux.md`](../fiche-google-et-reseaux.md). Elle est déjà annoncée dans l'offre site (`content/data/offers.json`). | Faible : du temps de mise en route, pas de code | Fort pour l'artisan |

## Top 3

1. Piste 1 : la demande d'avis à la facture payée, envoyée à tous les clients.
2. Piste 4 : la fiche Google de l'artisan livrée avec chaque site.
3. Piste 2 : le brouillon de réponse aux avis.

Rien n'est codé : à décider avec Ilann.
