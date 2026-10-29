/**
 * Chiffres clés affichés avec un compteur animé.
 * Les valeurs sont dans data/stats.json, modifiables depuis Pages CMS (voir EDITION.md).
 * Les chiffres marqués « Exemple » ne s'affichent que si « Afficher les contenus d'exemple » est coché.
 * TODO: remplacer TOUS ces chiffres par vos vraies données avant la mise en ligne :
 * ce sont des valeurs d'exemple, elles ne correspondent à aucun résultat réel.
 */
import data from "./data/stats.json";
import { visibleItems } from "./site";

export const stats = visibleItems(data.stats);
