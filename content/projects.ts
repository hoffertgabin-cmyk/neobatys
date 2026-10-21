/**
 * Réalisations.
 * TODO: remplacer ces EXEMPLES par vos vrais projets clients (avec leur accord).
 * Pour ajouter une capture d'écran : déposez l'image dans /public/images/realisations/
 * et renseignez `image: "/images/realisations/mon-projet.jpg"`.
 * Sans image, un aperçu dessiné en code est affiché.
 */
export type Project = {
  title: string;
  trade: string;
  city: string;
  description: string;
  tags: string[];
  image?: string;
  accent: string;
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
    accent: "#38bdf8",
    placeholder: true,
  },
  // TODO: remplacer par une vraie réalisation
  {
    title: "Projet exemple · Électricité",
    trade: "Électricien",
    city: "[Ville]",
    description: "Site + logiciel de devis relié au formulaire.",
    tags: ["Pack complet"],
    accent: "#facc15",
    placeholder: true,
  },
  // TODO: remplacer par une vraie réalisation
  {
    title: "Projet exemple · Maçonnerie",
    trade: "Maçon",
    city: "[Ville]",
    description: "Galerie avant / après de rénovations.",
    tags: ["Site vitrine", "Galerie"],
    accent: "#a8a29e",
    placeholder: true,
  },
  // TODO: remplacer par une vraie réalisation
  {
    title: "Projet exemple · Menuiserie",
    trade: "Menuisier",
    city: "[Ville]",
    description: "Catalogue de réalisations sur mesure.",
    tags: ["Site vitrine"],
    accent: "#d97706",
    placeholder: true,
  },
  // TODO: remplacer par une vraie réalisation
  {
    title: "Projet exemple · Couverture",
    trade: "Couvreur",
    city: "[Ville]",
    description: "Logiciel de devis et relances automatiques.",
    tags: ["Logiciel"],
    accent: "#ef4444",
    placeholder: true,
  },
  // TODO: remplacer par une vraie réalisation
  {
    title: "Projet exemple · Peinture",
    trade: "Peintre",
    city: "[Ville]",
    description: "Site one-page et fiche Google Business.",
    tags: ["Site vitrine", "Google Business"],
    accent: "#a78bfa",
    placeholder: true,
  },
];
