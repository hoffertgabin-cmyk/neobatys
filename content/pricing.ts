/**
 * Offres tarifaires.
 * Les prix sont dans data/pricing.json, modifiables depuis Pages CMS (voir EDITION.md).
 * plans = offres en une fois (price HT, puis maintenance) ; subscriptions = abonnements mensuels.
 */
import data from "./data/pricing.json";

export const pricing = data.pricing;
