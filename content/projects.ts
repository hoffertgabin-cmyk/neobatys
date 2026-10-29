import data from "./data/projects.json";

/**
 * Réalisations.
 * Les projets sont dans data/projects.json, modifiables depuis Pages CMS (voir EDITION.md).
 * TODO: remplacer ces EXEMPLES par vos vrais projets clients (avec leur accord).
 * Pour ajouter une capture d'écran : champ « Capture d'écran » dans Pages CMS, ou déposez l'image dans /public/images/realisations/
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
  /** Petits textes colorés sur fond clair, si la couleur principale y est peu lisible. */
  ink?: string;
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
  /** Nom d'entreprise fictif affiché dans la maquette. */
  brand: string;
  /** Adresse fictive affichée dans la barre du navigateur. */
  domain: string;
  theme: TradeTheme;
  placeholder?: boolean;
};

/** Un champ image laissé vide dans Pages CMS peut être enregistré comme "" ou null. */
export const projects: Project[] = data.projects.map((project) => ({
  ...(project as Omit<Project, "image">),
  image: (project as { image?: string | null }).image || undefined,
}));
