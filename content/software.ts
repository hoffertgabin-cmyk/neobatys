/**
 * Page Logiciel : démo guidée, comparaison avant / après et mise en place.
 * Les montants et clients affichés dans la démo sont des EXEMPLES.
 */

export const softwareTour = {
  eyebrow: "Démo interactive",
  title: "Suivez un chantier, du devis au paiement",
  subtitle:
    "Six étapes, celles de tous vos chantiers. Cliquez dans l'écran comme si c'était le vôtre : rien n'est envoyé, ce sont des données d'exemple.",
  example: "Exemple : carrelage d'une cuisine de 20 m²",
  steps: [
    {
      id: "devis",
      label: "Le devis",
      title: "Vous faites le devis sur place",
      you: "Vous choisissez vos ouvrages dans votre bibliothèque et ajustez les quantités, depuis le chantier.",
      software: "Prix, TVA, totaux et mentions obligatoires se remplissent tout seuls.",
      gain: "2 minutes au lieu d'une soirée",
    },
    {
      id: "signature",
      label: "La signature",
      title: "Le client signe en ligne",
      you: "Vous envoyez le devis par e-mail ou SMS, en un clic.",
      software:
        "Le client l'ouvre sur son téléphone et signe du doigt. Vous êtes prévenu dans la seconde.",
      gain: "Signé le jour même, sans repasser",
    },
    {
      id: "facture",
      label: "La facture",
      title: "Le devis devient une facture",
      you: "Vous cliquez sur « Facturer » et choisissez l'acompte.",
      software:
        "La facture reprend le devis, avec un numéro qui se suit et toutes les mentions légales. Rien à retaper.",
      gain: "1 clic au lieu de tout recopier",
    },
    {
      id: "relances",
      label: "Les relances",
      title: "Les relances partent toutes seules",
      you: "Rien. Vous êtes sur votre chantier.",
      software:
        "Si la facture n'est pas réglée, un rappel poli part au bon moment, avec le lien pour payer.",
      gain: "Plus d'appels gênants pour réclamer",
    },
    {
      id: "paiement",
      label: "Le paiement",
      title: "Vous voyez ce qui rentre",
      you: "Vous ouvrez le tableau de bord, sur l'ordinateur ou le téléphone.",
      software:
        "Le paiement est pointé, le chiffre d'affaires et les impayés sont à jour en temps réel.",
      gain: "Vous savez où vous en êtes, sans tableur",
    },
    {
      id: "compta",
      label: "Le comptable",
      title: "Le comptable reçoit tout",
      you: "En fin de mois, un clic sur « Exporter ».",
      software:
        "Factures et paiements partent au format attendu par votre comptable. Les factures électroniques passent par une plateforme agréée.",
      gain: "Fini le carton de papiers",
    },
  ],
};

export const softwareWeek = {
  eyebrow: "Concrètement",
  title: "Votre semaine, sans et avec le logiciel",
  subtitle: "Ce qui change pour un artisan qui fait une dizaine de devis par semaine.",
  note: "Temps indicatifs, à titre d'exemple : ils varient selon votre activité.",
  without: {
    title: "Sans logiciel",
    items: [
      { task: "Taper les devis le soir sur Word ou Excel", time: "3 h" },
      { task: "Recopier chaque devis en facture", time: "1 h 30" },
      { task: "Appeler les clients qui n'ont pas payé", time: "1 h" },
      { task: "Trier les papiers pour le comptable", time: "1 h 30" },
    ],
    total: "7 h",
  },
  with: {
    title: "Avec le logiciel",
    items: [
      { task: "Devis faits sur place, depuis le téléphone", time: "30 min" },
      { task: "Facture créée depuis le devis", time: "10 min" },
      { task: "Relances envoyées automatiquement", time: "0 min" },
      { task: "Export envoyé au comptable", time: "5 min" },
    ],
    total: "45 min",
  },
};

export const softwareOnboarding = {
  eyebrow: "Mise en place",
  title: "Opérationnel en quelques jours",
  subtitle: "Vous n'avez rien à installer ni à paramétrer seul : on s'en occupe avec vous.",
  steps: [
    {
      title: "Démo de 20 minutes",
      text: "En visio ou chez vous, avec un de vos vrais devis.",
    },
    {
      title: "On importe vos données",
      text: "Vos clients, vos prix et votre logo, depuis Excel ou votre ancien logiciel.",
    },
    {
      title: "Prise en main",
      text: "Une heure ensemble pour faire votre premier devis et votre première facture.",
    },
    {
      title: "Vous facturez",
      text: "Et on reste joignable si vous avez une question.",
    },
  ],
};
