/**
 * Textes de la page d'accueil.
 * Les icônes sont désignées par leur nom (voir components/ui/Icon.tsx).
 */

export const hero = {
  eyebrow: "Sites internet & logiciel de gestion pour artisans",
  // Chaque ligne apparaît l'une après l'autre ; la partie "highlight" est en orange
  titleLines: ["Votre métier, c'est le chantier.", "Le reste, on s'en occupe."],
  highlight: "on s'en occupe.",
  subtitle:
    "Un site qui vous amène des clients, un logiciel qui fait vos devis et vos factures en quelques clics. Moins de paperasse, plus de chantiers.",
  primaryCta: { label: "Créer mon site", href: "/sites-internet" },
  secondaryCta: { label: "Découvrir le logiciel", href: "/logiciel" },
  reassurance: ["Sans engagement", "Réponse sous 24 h", "Accompagnement humain"],
};

export const painPoints = {
  eyebrow: "On connaît vos galères",
  title: "Le chantier vous fatigue moins que la paperasse ?",
  subtitle:
    "Vous êtes artisan, pas secrétaire. Voici ce que nos clients vivaient avant, et ce qui a changé.",
  items: [
    {
      icon: "moon",
      problem: "Les devis faits le soir, après 10 heures de chantier",
      solution: "Devis prêt en 2 minutes depuis votre téléphone, avec vos tarifs déjà enregistrés.",
    },
    {
      icon: "receipt",
      problem: "Des factures impayées qu'on oublie de relancer",
      solution: "Relances automatiques et polies, envoyées au bon moment à votre place.",
    },
    {
      icon: "search",
      problem: "Invisible sur Google quand un client cherche un artisan près de chez lui",
      solution: "Un site optimisé pour votre ville et une fiche Google Business soignée.",
    },
    {
      icon: "folder",
      problem: "Des papiers partout et un expert-comptable qui réclame tout en fin d'année",
      solution: "Tout est classé au même endroit, export comptable en un clic.",
    },
  ],
};

export const process = {
  eyebrow: "Comment ça marche",
  title: "Quatre étapes, zéro prise de tête",
  subtitle: "On s'occupe de la technique. Vous gardez la main sur ce qui compte.",
  steps: [
    {
      icon: "phone",
      title: "Appel découverte",
      duration: "30 min",
      text: "On parle de votre métier, de vos clients et de vos besoins. Gratuit et sans engagement.",
    },
    {
      icon: "pencil",
      title: "Maquette",
      duration: "1 semaine",
      text: "Vous recevez une première version de votre site ou de votre logiciel configuré. On ajuste ensemble.",
    },
    {
      icon: "rocket",
      title: "Mise en ligne",
      duration: "2 à 3 semaines",
      text: "Votre site est en ligne, votre logiciel prêt à l'emploi avec vos tarifs et vos coordonnées.",
    },
    {
      icon: "handshake",
      title: "Accompagnement",
      duration: "Toute l'année",
      text: "Formation, mises à jour, questions : un interlocuteur unique qui répond vraiment.",
    },
  ],
};

export const finalCta = {
  title: "Parlons de votre projet",
  subtitle:
    "Un appel de 30 minutes suffit pour savoir ce qui vous ferait gagner le plus de temps. C'est gratuit, et vous n'êtes engagé à rien.",
  primaryCta: { label: "Demander un devis", href: "/contact" },
  secondaryCta: { label: "Appeler", href: "tel" },
};

export const sectionsCopy = {
  marquee: "Pensé pour les artisans du bâtiment",
  stats: {
    eyebrow: "En chiffres",
    title: "Du temps rendu aux artisans",
  },
  projects: {
    eyebrow: "Réalisations",
    title: "Des sites qui ressemblent à ceux qui les font vivre",
    subtitle: "Filtrez par métier pour voir des exemples proches de votre activité.",
  },
  testimonials: {
    eyebrow: "Témoignages",
    title: "Ils ont repris le contrôle de leur temps",
  },
  pricing: {
    eyebrow: "Tarifs",
    title: "Des prix clairs, sans surprise",
    subtitle: "Pas de frais cachés, pas d'engagement long. Vous savez ce que vous payez.",
  },
  faq: {
    eyebrow: "Questions fréquentes",
    title: "Vous vous posez sûrement ces questions",
  },
};
