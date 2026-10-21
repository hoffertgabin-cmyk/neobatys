import { z } from "zod";
import { trades, otherTrade } from "@/content/trades";

export const services = [
  { value: "site", label: "Création de site internet" },
  { value: "logiciel", label: "Logiciel de gestion (devis, factures)" },
  { value: "pack", label: "Pack Site + Logiciel" },
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
  // Champ piège anti-spam : doit rester vide
  company: z.string().max(0).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
