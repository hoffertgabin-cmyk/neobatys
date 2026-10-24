# Audit du site NEOBATYS (antivibe, mode senior)

Audit du 24/10/2026 sur tout le dépôt, plus un passage dans un navigateur sur les 6 pages et la 404, en 1440 px et 390 px.

## Architecture

- Next.js 16 (App Router, Cache Components), toutes les pages sont statiques sauf `/api/contact`.
- Le contenu est séparé du code dans `content/` ; les composants de `components/sections` ne font que l'afficher.
- Le formulaire de contact est validé deux fois avec le même schéma Zod (`lib/schemas.ts`), côté navigateur et côté serveur, puis envoyé par e-mail avec Resend.

## Ce qui fonctionne

- Lint, typecheck et build passent sans erreur ni avertissement.
- Aucun débordement horizontal, aucune erreur JavaScript, aucun lien interne cassé, toutes les ancres existent.
- Bonne base d'accessibilité : lien d'évitement, un seul h1 par page, pas de saut de niveau de titre, erreurs de formulaire reliées aux champs, menu mobile qui se ferme avec Échap.
- Le bandeau cookies respecte la CNIL (Refuser aussi visible qu'Accepter, rien n'est chargé sans accord).
- L'e-mail envoyé échappe le HTML saisi par le visiteur, et le JSON-LD échappe `<`.

## Défauts corrigés

1. **Demandes perdues sans prévenir** : sans `RESEND_API_KEY` et `CONTACT_TO_EMAIL`, l'API répondait « Merci, votre demande est bien partie » alors que rien n'était envoyé. En production (`VERCEL_ENV=production`), elle renvoie maintenant une erreur 503 et le visiteur voit le message d'échec qui l'invite à appeler. Rien ne change en local ni sur les aperçus.
2. **Anti-abus** : la table des IP du limiteur ne se vidait jamais. Les IP inactives sont maintenant purgées.
3. **Partage sur les réseaux** : les pages autres que l'accueil n'avaient pas d'image Open Graph ni Twitter, parce que leur `openGraph` remplaçait celui du layout. L'image est maintenant ajoutée dans `pageMetadata`.
4. **SEO** : l'accueil n'avait pas d'URL canonique. Elle est ajoutée.
5. **SEO** : les données structurées (JSON-LD) publiaient « [TÉLÉPHONE] », « [EMAIL] », « [ADRESSE] » et « [ZONE] ». Les champs pas encore renseignés sont maintenant omis, et ils réapparaîtront dès qu'ils seront remplis dans `content/site.ts`.
6. **404** : la page d'erreur gardait le titre de l'accueil. Elle s'appelle maintenant « Page introuvable ».
7. **HTML invalide** : le dégradé du logo utilisait le même `id` deux fois (menu et pied de page). Chaque logo a maintenant un id unique.

## Points à trancher (non corrigés)

- **Tarifs incohérents** : le Pack Complet coûte 69 €/mois, plus que Site (29 €) et Logiciel (39 €) pris séparément (68 €), en annuel aussi (57 € contre 56 €). La page annonce pourtant un « tarif préférentiel » et « jusqu'à 20 % » d'économie, alors que sur la première année l'économie réelle est d'environ 10 %.
- **Informations à remplir** : téléphone, e-mail, SIRET, adresse, zone et directeur de publication sont encore entre crochets (voir `PERSONNALISATION.md`). Les mentions légales sont obligatoires avant la mise en ligne.
- **Resend en production** : vérifier que `RESEND_API_KEY` et `CONTACT_TO_EMAIL` sont bien définies dans Vercel, sinon le formulaire affichera une erreur.
- **Limiteur en mémoire** : sur Vercel, chaque instance a sa propre mémoire, donc la limite de 5 envois est approximative. C'est suffisant contre un spam basique ; pour aller plus loin, il faudrait un stockage partagé (Upstash, par exemple).
