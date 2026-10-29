/**
 * Informations générales de l'entreprise.
 * Elles sont dans data/site.json, modifiables depuis Pages CMS (voir EDITION.md).
 * Une valeur vide ou entre crochets (« [TÉLÉPHONE] ») n'est pas affichée sur le site.
 */
import data from "./data/site.json";
import { isFilled } from "@/lib/placeholders";

export const site = {
  ...data.site,
  // TODO: remplacer par l'URL définitive (sert au SEO, au sitemap et aux balises Open Graph)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.neobatys.com",
};

/** Téléphone renseigné : sinon le numéro et les boutons « Appeler » sont masqués. */
export const hasPhone = isFilled(site.phone) && isFilled(site.phoneHref);

/** Adresse complète du siège, ou "" tant qu'un des champs est entre crochets. */
const { street, postalCode, city } = site.address;
export const fullAddress =
  isFilled(street) && isFilled(postalCode) && isFilled(city) ? `${street}, ${postalCode} ${city}` : "";

/** Liens d'appel/mail : renvoient vers la page contact tant que les placeholders ne sont pas remplis. */
export const telHref = hasPhone ? `tel:${site.phoneHref}` : "/contact";
export const mailHref = isFilled(site.email) ? `mailto:${site.email}` : "/contact";

/**
 * Contenus d'exemple (avis, chiffres, projets marqués « placeholder ») :
 * masqués tant que « Afficher les contenus d'exemple » est décoché dans Pages CMS.
 */
export function visibleItems<T extends { placeholder?: boolean }>(items: T[]): T[] {
  return site.showSampleContent ? items : items.filter((item) => !item.placeholder);
}
