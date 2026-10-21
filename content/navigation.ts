export const mainNav = [
  { label: "Services", href: "/#services" },
  { label: "Logiciel", href: "/#logiciel" },
  { label: "Réalisations", href: "/#realisations" },
  { label: "Tarifs", href: "/#tarifs" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const footerNav = {
  offres: [
    { label: "Sites internet", href: "/sites-internet" },
    { label: "Logiciel de gestion", href: "/logiciel" },
    { label: "Pack Site + Logiciel", href: "/#pack" },
    { label: "Tarifs", href: "/#tarifs" },
  ],
  entreprise: [
    { label: "Comment ça marche", href: "/#processus" },
    { label: "Réalisations", href: "/#realisations" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    {
      label: "Politique de confidentialité",
      href: "/politique-de-confidentialite",
    },
  ],
} as const;
