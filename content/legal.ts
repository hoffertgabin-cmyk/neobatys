import { site } from "./site";

/**
 * Pages légales. Complétez les champs entre crochets.
 * TODO: faire relire ces textes (ils sont un modèle, pas un conseil juridique).
 */

export const legalInfo = {
  companyName: site.name,
  legalForm: "[FORME JURIDIQUE — ex. EI, EURL, SASU]",
  capital: "[CAPITAL SOCIAL — si société]",
  address: `${site.address.street}, ${site.address.postalCode} ${site.address.city}`,
  siret: site.siret,
  rcs: "[RCS / RNE — ex. RCS Metz 000 000 000]",
  vat: "[N° TVA INTRACOMMUNAUTAIRE — ou « TVA non applicable, art. 293 B du CGI »]",
  director: "[NOM DU DIRECTEUR DE LA PUBLICATION]",
  phone: site.phone,
  email: site.email,
  // TODO: vérifier les coordonnées de l'hébergeur choisi
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    website: "https://vercel.com",
  },
  lastUpdate: "[DATE DE MISE À JOUR]",
};

export type LegalSection = { title: string; paragraphs: string[] };

export const mentionsLegales: LegalSection[] = [
  {
    title: "Éditeur du site",
    paragraphs: [
      `${legalInfo.companyName}, ${legalInfo.legalForm}, au capital de ${legalInfo.capital}.`,
      `Siège : ${legalInfo.address}.`,
      `SIRET : ${legalInfo.siret} · ${legalInfo.rcs}.`,
      `TVA : ${legalInfo.vat}.`,
      `Téléphone : ${legalInfo.phone} · E-mail : ${legalInfo.email}.`,
    ],
  },
  {
    title: "Directeur de la publication",
    paragraphs: [`${legalInfo.director}.`],
  },
  {
    title: "Hébergement",
    paragraphs: [`${legalInfo.host.name}, ${legalInfo.host.address} (${legalInfo.host.website}).`],
  },
  {
    title: "Propriété intellectuelle",
    paragraphs: [
      `L'ensemble des contenus de ce site (textes, visuels, logo, mise en page) est la propriété de ${legalInfo.companyName}, sauf mention contraire. Toute reproduction sans autorisation écrite est interdite.`,
      "Les visuels de réalisations sont publiés avec l'accord des clients concernés.",
    ],
  },
  {
    title: "Responsabilité",
    paragraphs: [
      `${legalInfo.companyName} s'efforce de fournir des informations exactes et à jour, mais ne peut garantir l'absence d'erreurs. Les tarifs affichés sont indicatifs ; seul le devis signé fait foi.`,
    ],
  },
  {
    title: "Données personnelles et cookies",
    paragraphs: [
      "Le traitement de vos données personnelles est détaillé dans notre politique de confidentialité.",
    ],
  },
];

export const politiqueConfidentialite: LegalSection[] = [
  {
    title: "Responsable du traitement",
    paragraphs: [
      `${legalInfo.companyName}, ${legalInfo.address}, SIRET ${legalInfo.siret}. Contact : ${legalInfo.email}.`,
    ],
  },
  {
    title: "Données collectées",
    paragraphs: [
      "Via le formulaire de contact : nom, métier, téléphone, adresse e-mail, service souhaité et contenu de votre message.",
      "Aucune donnée n'est collectée à votre insu. Aucun outil de mesure d'audience ni cookie publicitaire n'est déposé sans votre consentement.",
    ],
  },
  {
    title: "Finalités et base légale",
    paragraphs: [
      "Répondre à votre demande de contact, de devis ou de démonstration (mesures précontractuelles, art. 6.1.b du RGPD).",
      "Mesure d'audience éventuelle, uniquement si vous l'acceptez (consentement, art. 6.1.a du RGPD).",
    ],
  },
  {
    title: "Destinataires",
    paragraphs: [
      `Vos données sont destinées uniquement à ${legalInfo.companyName}. Elles transitent par notre prestataire d'envoi d'e-mails [NOM DU PRESTATAIRE — ex. Resend] et notre hébergeur, qui agissent comme sous-traitants. Elles ne sont jamais vendues.`,
    ],
  },
  {
    title: "Durée de conservation",
    paragraphs: [
      "Les demandes de contact sont conservées 3 ans à compter du dernier échange, puis supprimées. [À ADAPTER]",
    ],
  },
  {
    title: "Vos droits",
    paragraphs: [
      `Vous pouvez accéder à vos données, les rectifier, les effacer, limiter ou vous opposer à leur traitement, et demander leur portabilité, en écrivant à ${legalInfo.email}.`,
      "Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).",
    ],
  },
  {
    title: "Cookies",
    paragraphs: [
      "Le site enregistre uniquement votre choix de consentement dans votre navigateur (stockage local, 6 mois). Il ne dépose aucun cookie de mesure d'audience ou publicitaire sans votre accord.",
      "Vous pouvez modifier votre choix à tout moment via le lien « Gérer les cookies » en bas de page.",
    ],
  },
];
