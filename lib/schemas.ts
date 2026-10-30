import { z } from "zod";
import { trades, otherTrade } from "@/content/trades";

export const services = [
  { value: "site", label: "Création de site internet" },
  { value: "logiciel", label: "Logiciel de gestion (devis, factures)" },
  { value: "pack", label: "Pack Gestion (site + logiciel)" },
  { value: "ia", label: "Pack IA ou Transformation complète" },
  { value: "abonnement", label: "Offre par abonnement" },
  { value: "autre", label: "Je ne sais pas encore" },
] as const;

const tradeValues: string[] = [...trades, otherTrade];
const serviceValues: string[] = services.map((s) => s.value);

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom (2 caractères minimum).").max(100),
  trade: z.string().refine((v) => tradeValues.includes(v), "Choisissez votre métier."),
  phone: z
    .string()
    .trim()
    .regex(
      /^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/,
      "Numéro invalide, par exemple 06 12 34 56 78.",
    ),
  email: z.email("Adresse e-mail invalide."),
  service: z.string().refine((v) => serviceValues.includes(v), "Choisissez un service."),
  message: z.string().trim().max(2000, "2000 caractères maximum.").optional().or(z.literal("")),
  consent: z.literal(true, {
    error: "Votre accord est nécessaire pour vous recontacter.",
  }),
  // Champ piège anti-spam : accepté ici pour que la route réponde OK au robot sans rien envoyer
  company: z.string().max(200).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

/** Question posée à l'assistant IA de la FAQ. */
export const QUESTION_MAX = 500;

export const faqAssistantSchema = z.object({
  question: z
    .string()
    .trim()
    .min(5, "Posez votre question en quelques mots.")
    .max(QUESTION_MAX, `${QUESTION_MAX} caractères maximum.`),
  // Champ piège anti-spam (invisible pour un humain)
  company: z.string().max(200).optional(),
});
