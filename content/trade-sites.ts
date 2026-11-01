/**
 * Pages « site internet pour <métier> » (/sites-internet/[metier]).
 * Les textes sont dans data/trade-sites.json, modifiables depuis Pages CMS.
 * `mockup` désigne la maquette dessinée en code du métier (components/mockups/trade/).
 */
import data from "./data/trade-sites.json";
import type { TradeMockup } from "./projects";

export const tradeSitesSection = data.section;

export const tradeSites = data.trades.map((t) => ({ ...t, mockup: t.mockup as TradeMockup }));

/** Liens vers les pages métier, pour la grille <LinkCards>. */
export const tradeSiteLinks = tradeSites.map((t) => ({
  slug: t.slug,
  href: `/sites-internet/${t.slug}`,
  label: t.label,
  summary: t.summary,
}));
