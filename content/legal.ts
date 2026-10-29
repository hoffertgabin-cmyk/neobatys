import data from "./data/legal.json";
import { fullAddress, hasPhone, site } from "./site";
import { isFilled, stripNotes } from "@/lib/placeholders";

/**
 * Pages légales. Les textes sont dans data/legal.json, modifiables depuis Pages CMS (voir EDITION.md).
 * Complétez les champs entre crochets : tant qu'une valeur est entre crochets, la phrase qui l'utilise
 * n'est pas affichée, et les notes entre crochets dans les textes ne sont jamais montrées aux visiteurs.
 * TODO: faire relire ces textes (ils sont un modèle, pas un conseil juridique).
 */

export const legalInfo = {
  ...data.legalInfo,
  tradeName: site.name,
  address: fullAddress && `${fullAddress}, Luxembourg`,
  phone: hasPhone ? site.phone : "",
  email: site.email,
};

export type LegalSection = { title: string; paragraphs: string[] };

/** Remplace les mots entre accolades ({entreprise}, {email}…) par les infos de l'entreprise. */
const values: Record<string, string> = {
  entreprise: legalInfo.companyName,
  nom_commercial: legalInfo.tradeName,
  forme_juridique: legalInfo.legalForm,
  capital: legalInfo.capital,
  adresse: legalInfo.address,
  rcs: legalInfo.rcs,
  tva: legalInfo.vat,
  autorisation: legalInfo.businessPermit,
  telephone: legalInfo.phone,
  email: legalInfo.email,
  directeur: legalInfo.director,
  hebergeur: legalInfo.host.name,
  hebergeur_adresse: legalInfo.host.address,
  hebergeur_site: legalInfo.host.website,
};

/** Une phrase qui utilise une valeur non renseignée est retirée, plutôt qu'affichée avec des crochets. */
const fillParagraph = (p: string) => {
  const keys = [...p.matchAll(/\{(\w+)\}/g)].map((m) => m[1]);
  if (keys.some((key) => key in values && !isFilled(values[key]))) return "";
  return stripNotes(p.replace(/\{(\w+)\}/g, (m, key) => values[key] ?? m));
};

const fill = (sections: LegalSection[]): LegalSection[] =>
  sections
    .map((section) => ({
      title: section.title,
      paragraphs: section.paragraphs.map(fillParagraph).filter(Boolean),
    }))
    .filter((section) => section.paragraphs.length > 0);

export const mentionsLegales = fill(data.mentionsLegales);

export const politiqueConfidentialite = fill(data.politiqueConfidentialite);
