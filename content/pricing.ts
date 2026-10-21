/**
 * Formules tarifaires.
 * TODO: remplacer les prix par vos vrais tarifs (HT).
 * monthly = prix mensuel sans engagement ; yearly = prix mensuel équivalent en paiement annuel.
 */
export const pricing = {
  yearlyDiscountLabel: "2 mois offerts",
  note: "Prix indiqués hors taxes. Sans engagement sur les formules mensuelles.",
  plans: [
    {
      id: "site",
      name: "Site Artisan",
      description: "Pour être trouvé sur Google et recevoir des demandes de devis.",
      setup: "990 €", // TODO: prix réel de création
      setupLabel: "création, puis",
      monthly: 29, // TODO
      yearly: 24, // TODO
      unit: "€ / mois",
      unitSub: "hébergement, maintenance et mises à jour",
      features: [
        "Site 5 pages sur mesure",
        "Optimisé mobile et SEO local",
        "Formulaire de demande de devis",
        "Galerie de chantiers avant / après",
        "Fiche Google Business optimisée",
        "Nom de domaine et hébergement inclus",
      ],
      cta: { label: "Créer mon site", href: "/contact?service=site" },
      featured: false,
    },
    {
      id: "pack",
      name: "Pack Complet",
      description: "Site + logiciel reliés : le plus de temps gagné.",
      setup: "790 €", // TODO
      setupLabel: "mise en place, puis",
      monthly: 69, // TODO
      yearly: 57, // TODO
      unit: "€ / mois",
      unitSub: "site + logiciel + accompagnement",
      features: [
        "Tout le contenu de Site Artisan",
        "Tout le contenu de Logiciel Gestion",
        "Demandes du site reliées au logiciel",
        "Formation personnalisée incluse",
        "Interlocuteur unique et prioritaire",
      ],
      cta: { label: "Choisir le pack", href: "/contact?service=pack" },
      featured: true,
      badge: "Le plus choisi", // TODO: ajuster si besoin
    },
    {
      id: "logiciel",
      name: "Logiciel Gestion",
      description: "Pour faire devis et factures en quelques minutes.",
      setup: "0 €",
      setupLabel: "de frais d'installation",
      monthly: 39, // TODO
      yearly: 32, // TODO
      unit: "€ / mois",
      unitSub: "utilisateurs et documents illimités",
      features: [
        "Devis et factures illimités",
        "Transformation devis → facture",
        "Relances automatiques des impayés",
        "Tableau de bord du chiffre d'affaires",
        "Export pour l'expert-comptable",
        "Conforme facturation électronique",
      ],
      cta: { label: "Demander une démo", href: "/contact?service=logiciel" },
      featured: false,
    },
  ],
} as const;
