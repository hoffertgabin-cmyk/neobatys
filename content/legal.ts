import data from "./data/legal.json";
import { site } from "./site";

/**
 * Pages légales. Les textes sont dans data/legal.json, modifiables depuis Pages CMS (voir EDITION.md).
 * Complétez les champs entre crochets.
 * TODO: faire relire ces textes (ils sont un modèle, pas un conseil juridique).
 */

export const legalInfo = {
  ...data.legalInfo,
  tradeName: site.name,
  address: `${site.address.street}, ${site.address.postalCode} ${site.address.city}, Luxembourg`,
  phone: site.phone,
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

const fill = (sections: LegalSection[]): LegalSection[] =>
  sections.map((section) => ({
    title: section.title,
    paragraphs: section.paragraphs.map((p) =>
      p.replace(/\{(\w+)\}/g, (m, key) => values[key] ?? m),
    ),
  }));

export const mentionsLegales = fill(data.mentionsLegales);

export const politiqueConfidentialite = fill(data.politiqueConfidentialite);
