/**
 * Pages « artisans au Luxembourg, en Moselle, en France » (/artisans/[zone]).
 * Les textes sont dans data/zones.json, modifiables depuis Pages CMS (voir EDITION.md).
 * Chaque page a son propre contenu (aides, règles du pays, déplacement) : pas de page au texte copié.
 */
import data from "./data/zones.json";

export const zonesSection = data.section;

export const zonesRelated = { heading: data.related, links: data.relatedLinks };

export const zones = data.zones;

/** Liens vers les pages par zone, pour la grille <LinkCards>. */
export const zoneLinks = zones.map((z) => ({
  slug: z.slug,
  href: `/artisans/${z.slug}`,
  label: z.label,
  summary: z.summary,
}));
