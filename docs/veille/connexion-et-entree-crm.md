# Veille : connexion sans mot de passe et entrée des demandes dans le CRM

Pages consultées le 18 novembre 2026, à la clôture du chantier connexion (admin PR 136 : Google, Apple, Touch ID et Face ID ; site PR 76 : créneau de rappel dans le formulaire). Chaque source a été ouverte et lue ; dix sur douze ont été relues une seconde fois par un contrôle automatique du texte de la page. Les deux pages d'aide de Jobber refusent ce contrôle (erreur 403) : elles n'ont été lues qu'une fois. Ce qui n'a pas pu être vérifié est dit en fin de page. Rien n'est codé à partir de cette veille sans accord.

## Ce que font les autres

### Connexion des clients finaux

- **Jobber, « client hub » :** aucun mot de passe. Le client entre par un lien reçu par e-mail ou par texto. Si le dernier lien a plus de 14 jours, on lui demande son e-mail ou les quatre derniers chiffres de son téléphone. L'artisan peut renvoyer le lien depuis la fiche du client et poser un bouton d'accès sur son site. https://help.getjobber.com/en/articles/what-do-your-clients-see-in-client-hub/
- **Housecall Pro, portail client :** lien envoyé par e-mail, sans identifiant ni mot de passe, actif 7 jours. Cliqué après ce délai, un nouveau lien part tout seul. https://help.housecallpro.com/en/articles/8474580-customer-guide-to-the-portal
- **ServiceTitan, portail client (contre-exemple) :** invitation, e-mail de confirmation, puis création d'un mot de passe. Seul un e-mail déjà sur la fiche est accepté. https://help.servicetitan.com/residential-s-r/docs/customer-portal-overview

Chez ces trois éditeurs, aucune page trouvée sur une connexion Google, Apple ou par clé d'accès pour l'artisan lui-même : sur ce point, l'outil NEOBATYS est en avance sur eux.

### Clés d'accès (Touch ID, Face ID)

- **FIDO Alliance, Passkey Index 2026 (octobre 2026) :** 36 % des connexions réussies passent par une clé d'accès, contre 26 % en 2025 ; 93 % de réussite contre 78 % pour la double authentification classique ; 27 secondes gagnées en moyenne. L'enregistrement des clés progresse moins vite que leur usage. Chiffres déclarés par les participants ; seul le résumé a été lu. https://fidoalliance.org/passkey-index-2026/
- **Google (2 mai 2024) :** plus d'un milliard de connexions par clé d'accès sur plus de 400 millions de comptes en moins d'un an, annoncées 50 % plus rapides qu'un mot de passe. https://blog.google/technology/safety-security/google-passkeys-update-april-2024/
- **web.dev, remplissage automatique :** avec `autocomplete="username webauthn"` sur le champ de l'adresse, le navigateur propose la clé d'accès dès qu'on clique dans le champ, sans bouton à trouver. https://web.dev/articles/passkey-form-autofill
- **Chrome, création automatique d'une clé :** possible juste après une connexion réussie, mais seulement quand un mot de passe est enregistré et utilisé récemment. Ne s'applique donc pas à notre connexion par lien, Google ou Apple. https://developer.chrome.com/docs/identity/webauthn-conditional-create

### Connexion Google en un clic

- **Google One Tap :** l'invite ne s'affiche que si une session Google est ouverte dans le navigateur. Fermée par le visiteur, elle disparaît 2 heures, puis 1 jour, 1 semaine, 4 semaines. Sur mobile elle se referme seule après 90 secondes. https://developers.google.com/identity/gsi/web/guides/features

### Entrée des demandes et rendez-vous

- **Jobber, réservation en ligne :** c'est le formulaire de demande auquel on ajoute une question de réservation, soit une visite de diagnostic (la demande est créée et le créneau bloqué), soit une prestation réservée directement. Réglages : délai minimal avant le premier créneau, pas des créneaux, limite de trajet ou marge fixe entre deux rendez-vous. Partage par lien, code à intégrer au site et bouton sur la fiche Google. Réservé à certaines formules. https://help.getjobber.com/en/articles/online-booking/
- **Housecall Pro, réservation en ligne :** 24 h sur 24 depuis le site, Google (recherche et Maps) et les réseaux sociaux, avec les disponibilités réelles de l'équipe. Aucun chiffre d'effet propre à la réservation sur la page. https://www.housecallpro.com/features/online-booking/
- **Podium, réponse immédiate :** texto automatique après un appel manqué, avec « 58 % » de prospects sauvés selon l'éditeur. Ses articles avancent une conversion 8 fois supérieure quand on répond en moins de 5 minutes et près de 45 % des demandes hors horaires. Ce sont des arguments commerciaux, sans année et sans étude d'origine lisible. https://podium.com/product/automations et https://podium.com/article/speed-to-lead

## Pistes pour NEOBATYS

| N° | Piste | Ce que ça apporte | Effort | Source |
|---|---|---|---|---|
| 1 | Proposer « Ajouter cet appareil » juste après une connexion par lien, Google ou Apple, tant qu'aucune clé n'est enregistrée | L'enregistrement est le point faible des clés d'accès : aujourd'hui il faut aller le chercher dans Réglages | Petit : un bandeau dans l'outil, aucun changement de base | FIDO Alliance |
| 2 | Remplissage automatique de la clé d'accès sur le champ de l'adresse de la page de connexion | La clé se propose toute seule, sans chercher le bon bouton | Petit : un attribut et une option du plugin déjà installé | web.dev |
| 3 | Accusé de réception immédiat de la demande du site, qui rappelle le créneau de rappel choisi | Le visiteur sait tout de suite qu'il a été entendu et quand on le rappelle ; pas de texto, donc pas de nouveau prestataire | Petit à moyen. À trancher : la règle « aucun mail à un client sans validation » doit dire si un accusé de réception fixe, sans IA, en fait partie | Podium (chiffres non vérifiés) |
| 4 | Vraie réservation d'un créneau depuis le formulaire, sur le modèle « une question de plus dans la demande » | Moins d'allers-retours pour fixer l'appel découverte | Gros : adresse publique, agent Rendez-vous de l'outil ouvert à NEOBATYS, sans doute une migration. C'est le niveau 2 écarté le 18 novembre au profit du créneau de rappel | Jobber, Housecall Pro |
| 5 | Lien des clients finaux : durée de vie affichée et renvoi automatique d'un lien neuf quand l'ancien a expiré | Plus de client bloqué devant un lien mort, sans créer de compte | Moyen. Non vérifié : la durée de vie actuelle des liens signés de l'outil | Housecall Pro, Jobber |
| 6 | Bouton Google du formulaire du site : un bouton simple plutôt que l'invite One Tap | L'invite n'apparaît que pour une partie des visiteurs et disparaît longtemps dès qu'on la ferme ; le bouton est prévisible et ne charge le script Google qu'au clic | Aucun en plus : c'est un choix à noter pour la PR du bouton Google | Google |

## Top 3

1. **Piste 1**, le bandeau « Ajouter cet appareil ».
2. **Piste 2**, le remplissage automatique.
3. **Piste 3**, l'accusé de réception, après décision sur la règle de validation.

Les deux premières terminent ce qui vient d'être livré, pour un effort faible. La troisième est celle qui touche le plus directement les prospects.

## Cherché sans source fiable

- L'étude d'origine sur le délai de réponse (Harvard Business Review, mars 2011) : chiffres derrière un péage.
- Thumbtack et Workiz sur la réponse rapide et le texto après appel manqué : pages vides ou refusées.
- Un code par SMS pour connecter les clients finaux : aucune page officielle chez Jobber, Housecall Pro ou ServiceTitan.
- Un chiffre mesuré sur les formulaires courts ou en plusieurs étapes, et sur le chat du site.
- Scorpion, Angi, Shopify, Stripe : non couverts.
