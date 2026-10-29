/**
 * Informations générales de l'entreprise.
 * Elles sont dans data/site.json, modifiables depuis Pages CMS (voir EDITION.md).
 * Remplacez les valeurs entre crochets par vos vraies informations.
 */
import data from "./data/site.json";

export const site = {
  ...data.site,
  // TODO: remplacer par l'URL définitive (sert au SEO, au sitemap et aux balises Open Graph)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.neobatys.com",
};

/** Liens d'appel/mail : renvoient vers la page contact tant que les placeholders ne sont pas remplis. */
export const telHref = site.phoneHref.startsWith("[") ? "/contact" : `tel:${site.phoneHref}`;
export const mailHref = site.email.startsWith("[") ? "/contact" : `mailto:${site.email}`;
