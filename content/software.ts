/**
 * Page Logiciel : démo guidée, comparaison avant / après et mise en place.
 * Les textes sont dans data/software.json, modifiables depuis Pages CMS (voir EDITION.md).
 * Les montants et clients affichés dans la démo sont des EXEMPLES.
 * Les pages guides /logiciel/[guide] (par métier, facturation électronique) sont dans data/software-guides.json.
 */
import data from "./data/software.json";
import guidesData from "./data/software-guides.json";

export const softwareTour = data.softwareTour;

export const softwareWeek = data.softwareWeek;

export const softwareOnboarding = data.softwareOnboarding;

export const softwareGuidesSection = guidesData.section;

export const softwareGuides = guidesData.guides;

/** Libellés du calculateur de TVA, affiché sur les guides marqués `tool: "tva"`. */
export const tvaCalculator = guidesData.tvaCalculator;

/** Liens vers les guides, pour la grille <LinkCards>. */
export const softwareGuideLinks = softwareGuides.map((g) => ({
  slug: g.slug,
  href: `/logiciel/${g.slug}`,
  label: g.label,
  summary: g.summary,
}));
