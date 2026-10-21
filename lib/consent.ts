/** Consentement cookies stocké dans le navigateur uniquement. */
export type Consent = "accepted" | "refused";

export const CONSENT_KEY = "neobatys-consent";
export const CONSENT_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182; // ~6 mois (recommandation CNIL)
export const CONSENT_EVENT = "neobatys:consent";
export const OPEN_CONSENT_EVENT = "neobatys:open-consent";

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const { value, at } = JSON.parse(raw) as { value: Consent; at: number };
    if (Date.now() - at > CONSENT_MAX_AGE_MS) return null;
    return value;
  } catch {
    return null;
  }
}

export function writeConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ value, at: Date.now() }));
  } catch {
    // stockage indisponible (navigation privée) : le choix vaut pour la session
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function openConsentManager() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
