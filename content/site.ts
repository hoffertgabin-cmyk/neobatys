/**
 * Informations générales de l'entreprise.
 * Remplacez les valeurs entre crochets par vos vraies informations.
 */
export const site = {
  name: "NEOBATYS",
  tagline: "Sites internet, logiciel de gestion et IA pour artisans du bâtiment",
  city: "Metz",
  region: "Grand Est",
  // TODO: remplacer par l'URL définitive (sert au SEO, au sitemap et aux balises Open Graph)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.neobatys.com",
  // TODO: remplacer les informations ci-dessous
  phone: "[TÉLÉPHONE]",
  // Format international pour les liens d'appel, ex. "+33612345678"
  phoneHref: "[TÉLÉPHONE]",
  email: "[EMAIL]",
  zone: "[ZONE]",
  siret: "[SIRET]",
  address: {
    street: "[ADRESSE]",
    postalCode: "[CODE POSTAL]",
    city: "Metz",
    country: "FR",
  },
  hours: "Du lundi au vendredi, 8h – 18h",
  // TODO: renseigner vos réseaux (laisser une chaîne vide pour masquer l'icône)
  socials: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },
  /**
   * Tant que témoignages, réalisations et chiffres sont des exemples,
   * un petit badge « Exemple » s'affiche dessus. Passez à false une fois
   * vos vraies données en place.
   */
  showPlaceholderBadges: true,
} as const;

/** Liens d'appel/mail : renvoient vers la page contact tant que les placeholders ne sont pas remplis. */
export const telHref = site.phoneHref.startsWith("[") ? "/contact" : `tel:${site.phoneHref}`;
export const mailHref = site.email.startsWith("[") ? "/contact" : `mailto:${site.email}`;
