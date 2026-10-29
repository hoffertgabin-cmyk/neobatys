/**
 * Témoignages.
 * Les avis sont dans data/testimonials.json, modifiables depuis Pages CMS (voir EDITION.md).
 * Les avis marqués « Exemple » ne s'affichent que si « Afficher les contenus d'exemple » est coché.
 * TODO: remplacer ces EXEMPLES par de vrais avis clients (avec leur accord écrit).
 */
import data from "./data/testimonials.json";
import { visibleItems } from "./site";

export const testimonials = visibleItems(data.testimonials);
