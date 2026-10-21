/**
 * Réalisations.
 * TODO: remplacer ces EXEMPLES par vos vrais projets clients (avec leur accord).
 * Pour ajouter une capture d'écran : déposez l'image dans /public/images/realisations/
 * et renseignez `image: "/images/realisations/mon-projet.jpg"`.
 * Sans image, la maquette dessinée en code correspondant à `mockup` est affichée
 * (components/mockups/TradeSiteMockup.tsx), aux couleurs de `theme`.
 */
export type TradeTheme = {
  /** Couleur principale du métier (boutons, logo). */
  primary: string;
  /** Texte posé sur la couleur principale. */
  onPrimary: string;
  /** Fond sombre (bandeaux, hero). */
  dark: string;
  /** Fond clair teinté. */
  soft: string;
  /** Couleur d'appoint. */
  accent: string;
};

export type TradeMockup =
  | "plombier"
  | "electricien"
  | "macon"
  | "menuisier"
  | "couvreur"
  | "peintre"
  | "chauffagiste"
  | "carreleur"
  | "charpentier";

export type Project = {
  title: string;
  trade: string;
  city: string;
  description: string;
  tags: string[];
  image?: string;
  mockup: TradeMockup;
  /** Nom fictif affiché dans la maquette. */
  brand: string;
  /** Adresse fictive affichée dans la barre du navigateur. */
  domain: string;
  theme: TradeTheme;
  placeholder?: boolean;
};

export const projects: Project[] = [
  // TODO: remplacer par une vraie réalisation
  {
    title: "Projet exemple · Plomberie",
    trade: "Plombier",
    city: "[Ville]",
    description: "Site vitrine + formulaire de dépannage urgent.",
    tags: ["Site vitrine", "SEO local"],
    mockup: "plombier",
    brand: "Votre Plomberie",
    domain: "plomberie-votre-ville.fr",
    theme: {
      primary: "#0369a1",
      onPrimary: "#ffffff",
      dark: "#0b2942",
      soft: "#e8f4fc",
      accent: "#38bdf8",
    },
    placeholder: true,
  },
  // TODO: remplacer par une vraie réalisation
  {
    title: "Projet exemple · Électricité",
    trade: "Électricien",
    city: "[Ville]",
    description: "Site + logiciel de devis relié au formulaire.",
    tags: ["Pack complet"],
    mockup: "electricien",
    brand: "Votre Électricité",
    domain: "electricien-votre-ville.fr",
    theme: {
      primary: "#facc15",
      onPrimary: "#111827",
      dark: "#0f172a",
      soft: "#fefce8",
      accent: "#fde047",
    },
    placeholder: true,
  },
  // TODO: remplacer par une vraie réalisation
  {
    title: "Projet exemple · Maçonnerie",
    trade: "Maçon",
    city: "[Ville]",
    description: "Galerie avant / après de rénovations.",
    tags: ["Site vitrine", "Galerie"],
    mockup: "macon",
    brand: "Votre Maçonnerie",
    domain: "maconnerie-votre-ville.fr",
    theme: {
      primary: "#57534e",
      onPrimary: "#ffffff",
      dark: "#1c1917",
      soft: "#f5f3f0",
      accent: "#d4a373",
    },
    placeholder: true,
  },
  // TODO: remplacer par une vraie réalisation
  {
    title: "Projet exemple · Menuiserie",
    trade: "Menuisier",
    city: "[Ville]",
    description: "Catalogue de réalisations sur mesure.",
    tags: ["Site vitrine"],
    mockup: "menuisier",
    brand: "Votre Menuiserie",
    domain: "menuiserie-votre-ville.fr",
    theme: {
      primary: "#92400e",
      onPrimary: "#ffffff",
      dark: "#2b1708",
      soft: "#fbf5ec",
      accent: "#d6a064",
    },
    placeholder: true,
  },
  // TODO: remplacer par une vraie réalisation
  {
    title: "Projet exemple · Couverture",
    trade: "Couvreur",
    city: "[Ville]",
    description: "Logiciel de devis et relances automatiques.",
    tags: ["Logiciel"],
    mockup: "couvreur",
    brand: "Votre Couverture",
    domain: "app.couverture-votre-ville.fr",
    theme: {
      primary: "#334155",
      onPrimary: "#ffffff",
      dark: "#0f172a",
      soft: "#f1f5f9",
      accent: "#c2410c",
    },
    placeholder: true,
  },
  // TODO: remplacer par une vraie réalisation
  {
    title: "Projet exemple · Peinture",
    trade: "Peintre",
    city: "[Ville]",
    description: "Site one-page et fiche Google Business.",
    tags: ["Site vitrine", "Google Business"],
    mockup: "peintre",
    brand: "Votre Peinture",
    domain: "peinture-votre-ville.fr",
    theme: {
      primary: "#7c3aed",
      onPrimary: "#ffffff",
      dark: "#2e1065",
      soft: "#f6f3ff",
      accent: "#f472b6",
    },
    placeholder: true,
  },
  // TODO: remplacer par une vraie réalisation
  {
    title: "Projet exemple · Chauffage",
    trade: "Chauffagiste",
    city: "[Ville]",
    description: "Prise de rendez-vous d'entretien et rappels annuels.",
    tags: ["Site vitrine", "Rendez-vous en ligne"],
    mockup: "chauffagiste",
    brand: "Votre Chauffage",
    domain: "chauffage-votre-ville.fr",
    theme: {
      primary: "#dc2626",
      onPrimary: "#ffffff",
      dark: "#3b0a0a",
      soft: "#fef4f2",
      accent: "#fb923c",
    },
    placeholder: true,
  },
  // TODO: remplacer par une vraie réalisation
  {
    title: "Projet exemple · Carrelage",
    trade: "Carreleur",
    city: "[Ville]",
    description: "Site avec estimation de devis au m².",
    tags: ["Site vitrine", "Devis en ligne"],
    mockup: "carreleur",
    brand: "Votre Carrelage",
    domain: "carrelage-votre-ville.fr",
    theme: {
      primary: "#0f766e",
      onPrimary: "#ffffff",
      dark: "#042f2e",
      soft: "#effcf9",
      accent: "#5eead4",
    },
    placeholder: true,
  },
  // TODO: remplacer par une vraie réalisation
  {
    title: "Projet exemple · Charpente",
    trade: "Charpentier",
    city: "[Ville]",
    description: "Site, logiciel et assistant IA qui répond aux demandes.",
    tags: ["Pack complet", "IA"],
    mockup: "charpentier",
    brand: "Votre Charpente",
    domain: "charpente-votre-ville.fr",
    theme: {
      primary: "#166534",
      onPrimary: "#ffffff",
      dark: "#0a2615",
      soft: "#f1f8f2",
      accent: "#ca8a04",
    },
    placeholder: true,
  },
];
