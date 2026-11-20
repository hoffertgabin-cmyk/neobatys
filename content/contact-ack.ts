import { hasPhone, site } from "@/content/site";

/**
 * Accusé de réception envoyé au visiteur juste après sa demande (décision d'Ilann du 18 novembre 2026 : un message
 * fixe, sans IA, peut partir sans validation). Le texte ne reprend rien de ce que le visiteur a saisi librement, ni son
 * nom ni son message : seulement le service et le créneau choisis dans nos listes. Le formulaire ne peut donc pas servir
 * à faire envoyer un texte quelconque à l'adresse d'un tiers.
 */
export function contactAck(serviceLabel: string, callbackLabel?: string, demo = false) {
  const callback = callbackLabel
    ? `, de préférence ${callbackLabel[0].toLowerCase()}${callbackLabel.slice(1)}`
    : "";
  return {
    subject: `Votre demande est bien arrivée chez ${site.name}`,
    text: [
      "Bonjour,",
      `Nous avons bien reçu votre demande (${serviceLabel}). Nous vous rappelons sous 24 h ouvrées${callback}${
        demo ? " pour fixer le créneau de l'audit et de la démonstration, en visio ou sur place" : ""
      }.`,
      `Pour ajouter une précision, répondez simplement à ce message${hasPhone ? ` ou appelez-nous au ${site.phone}` : ""}.`,
      "Si vous n'êtes pas à l'origine de cette demande, ignorez ce message : rien ne sera fait sans vous.",
      `L'équipe ${site.name}`,
    ].join("\n\n"),
  };
}
