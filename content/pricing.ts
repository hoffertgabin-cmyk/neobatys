/**
 * Offres tarifaires.
 * Les prix sont dans data/pricing.json, modifiables depuis Pages CMS (voir EDITION.md).
 * price = prix unique HT ; maintenance = abonnement commun à toutes les offres.
 */
import data from "./data/pricing.json";

export const pricing = data.pricing;
