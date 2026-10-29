/**
 * Formules tarifaires.
 * Les prix sont dans data/pricing.json, modifiables depuis Pages CMS (voir EDITION.md).
 * monthly = prix mensuel sans engagement ; yearly = prix mensuel équivalent en paiement annuel.
 */
import data from "./data/pricing.json";

export const pricing = data.pricing;
