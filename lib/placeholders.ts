/**
 * Valeurs encore à remplir dans content/data/*.json, ex. « [TÉLÉPHONE] ».
 * Ce qui est entre crochets est une note pour l'équipe : jamais affiché aux visiteurs.
 */
const NOTE = /\[[^\]]*\]/;
const NOTES = /\s*\[[^\]]*\]/g;

/** Vrai si la valeur est renseignée : ni vide, ni encore entre crochets. */
export function isFilled(value: string | null | undefined): value is string {
  return !!value && value.trim() !== "" && !NOTE.test(value);
}

/** Retire les notes entre crochets d'un texte (« … supprimées. [À ADAPTER] » → « … supprimées. »). */
export function stripNotes(text: string) {
  return text.replace(NOTES, "").trim();
}
