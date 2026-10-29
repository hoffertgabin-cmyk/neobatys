# Modifier le site sans toucher au code

Tous les textes, prix, avis, réalisations et infos de l'entreprise se modifient
depuis **Pages CMS**, une interface en ligne gratuite reliée à ce dépôt GitHub.

## Se connecter

1. Aller sur **https://app.pagescms.org** et cliquer sur « Sign in with GitHub ».
2. La première fois seulement (propriétaire du dépôt) : installer l'application
   GitHub « Pages CMS » sur le dépôt `neobatys` quand l'écran le propose.
3. Choisir le dépôt `neobatys`, branche `main`.

Toute personne qui a accès au dépôt sur GitHub (collaborateur) peut se connecter
de la même façon. On peut aussi inviter quelqu'un sans compte GitHub, par e-mail,
depuis le menu « Collaborators » de Pages CMS.

## Modifier

- Le menu de gauche liste les rubriques : Infos de l'entreprise, Page d'accueil,
  Offres, Tarifs, Réalisations, Témoignages, Chiffres clés, FAQ, Menus, Mentions légales…
- On modifie le champ, puis on clique sur **Save**.
- Le site en ligne se met à jour tout seul en 1 à 2 minutes (Vercel republie à chaque enregistrement).

## À plusieurs en même temps

Chacun peut travailler de son côté au même moment. Chaque enregistrement est
sauvegardé dans l'historique GitHub, donc rien n'est perdu et tout peut être annulé.
Si deux personnes modifient **la même rubrique** en même temps, la seconde à
enregistrer est prévenue : il suffit de recharger la page et de refaire sa modification.

## Bon à savoir

- Les champs « Identifiant » ou « Ancre » sont verrouillés : ils servent au fonctionnement du site.
- Dans les pages légales, les mots entre accolades (`{entreprise}`, `{email}`…) sont
  remplacés automatiquement par les infos de l'entreprise.
- Les fichiers modifiés par Pages CMS sont dans `content/data/` ; la configuration
  de l'interface est dans `.pages.yml`.
