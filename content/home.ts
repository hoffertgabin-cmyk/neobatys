/**
 * Textes de la page d'accueil.
 * Les icônes sont désignées par leur nom (voir components/ui/Icon.tsx).
 */

export const hero = {
  eyebrow: "Sites internet, logiciel et IA pour artisans du bâtiment",
  // Chaque ligne apparaît l'une après l'autre ; la partie "highlight" est en orange
  titleLines: ["Plus de clients.", "Moins de coûts.", "L'IA s'occupe du reste."],
  highlight: "L'IA s'occupe du reste.",
  subtitle:
    "Un site qui vous amène des clients, un logiciel qui fait vos devis et vos factures, et des assistants IA qui répondent et relancent à votre place. On met tout en place pour vous.",
  primaryCta: { label: "Demander un devis", href: "/contact" },
  secondaryCta: { label: "Ce que l'IA peut faire", href: "/#ia" },
  reassurance: ["Sans engagement", "Réponse sous 24 h", "Accompagnement humain"],
  // TODO: ne garder que les modèles réellement utilisés dans vos solutions
  modelsLabel: "Les modèles d'IA de référence, branchés sur votre quotidien",
  models: ["Claude", "ChatGPT", "Mistral", "Gemini"],
};

export const painPoints = {
  eyebrow: "Avant / après",
  title: "Ce que vous faites encore à la main. Ce que NEOBATYS automatise.",
  withoutLabel: "Sans NEOBATYS",
  withLabel: "Avec NEOBATYS",
  items: [
    {
      problem: "Des appels manqués pendant le chantier, donc des clients perdus",
      solution: "Un assistant IA décroche, répond et vous transmet les demandes qualifiées",
    },
    {
      problem: "Les devis faits le soir, après 10 heures de chantier",
      solution: "Devis dicté à la voix ou prêt en 2 minutes depuis votre téléphone",
    },
    {
      problem: "Des factures impayées qu'on oublie de relancer",
      solution: "Relances automatiques et polies, envoyées au bon moment à votre place",
    },
    {
      problem: "Invisible sur Google quand un client cherche un artisan près de chez lui",
      solution: "Un site optimisé pour votre ville et des avis Google qui s'accumulent",
    },
    {
      problem: "Des abonnements et des outils qui s'empilent sans se parler",
      solution: "Site, devis, factures et IA réunis : un seul interlocuteur, moins de frais",
    },
  ],
  proofs: [
    { title: "Mesuré", text: "Temps gagné et demandes reçues suivis chaque mois" },
    { title: "Supervisé", text: "Vous validez ce qui part chez vos clients" },
  ],
};

/** Les leviers mis en avant dans la grille « Résultats ». Les visuels sont dans components/sections/Results.tsx. */
export const results = {
  eyebrow: "Résultats",
  title: "Ce que ça change pour votre entreprise.",
  subtitle:
    "On ne vend pas de la technologie pour la technologie : chaque outil mis en place doit vous rapporter des clients, du temps ou de l'argent.",
  cards: [
    {
      id: "clients",
      title: "Plus de clients",
      text: "Un site visible sur Google dans votre zone, des avis qui rassurent et aucune demande qui reste sans réponse.",
    },
    {
      id: "ia",
      title: "L'IA intégrée à votre quotidien",
      text: "Des assistants qui décrochent, préparent les devis et relancent, branchés sur vos outils. Vous gardez la main sur ce qui part.",
    },
    {
      id: "couts",
      title: "Moins de coûts",
      text: "Moins d'abonnements, moins de ressaisie, moins d'heures de bureau payées le soir.",
    },
    {
      id: "temps",
      title: "Du temps rendu",
      text: "Le devis se fait depuis le chantier, l'administratif ne déborde plus sur vos soirées.",
    },
    {
      id: "tresorerie",
      title: "Une trésorerie saine",
      text: "Les factures partent le jour même et les impayés sont relancés sans y penser.",
    },
  ],
};

export const ai = {
  eyebrow: "Intelligence artificielle",
  title: "L'IA mise en place dans votre entreprise, concrètement.",
  subtitle:
    "Pas de gadget : des assistants qui font gagner du temps et de l'argent, réglés sur votre métier. On installe, on forme, on suit.",
  useCases: [
    {
      icon: "phone",
      title: "Standard téléphonique IA",
      text: "Décroche quand vous êtes sur le chantier, répond aux questions, prend les rendez-vous et vous envoie un résumé.",
    },
    {
      icon: "mic",
      title: "Devis dictés à la voix",
      text: "Vous décrivez le chantier, l'IA prépare le devis avec vos tarifs. Vous vérifiez, vous envoyez.",
    },
    {
      icon: "message",
      title: "Réponse immédiate aux demandes",
      text: "Chaque demande du site, de Google ou des réseaux reçoit une réponse en quelques minutes, même le soir.",
    },
    {
      icon: "receipt",
      title: "Relances et suivi des paiements",
      text: "Les factures en retard sont relancées au bon moment, avec le bon ton.",
    },
    {
      icon: "scan",
      title: "Lecture des factures fournisseurs",
      text: "Vos factures d'achat sont lues, classées et prêtes pour le comptable.",
    },
    {
      icon: "star",
      title: "Avis Google et réputation",
      text: "Un message après chaque chantier pour récolter des avis et remonter sur Google.",
    },
    {
      icon: "chart",
      title: "Suivi de rentabilité",
      text: "Marge par chantier, devis signés, chiffre du mois : les bons chiffres sans tableur.",
    },
    {
      icon: "handshake",
      title: "Formation et accompagnement",
      text: "On installe, on vous forme et on ajuste. Un interlocuteur humain reste joignable.",
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
      text: "On parle de votre métier, de vos clients et de ce qui vous coûte du temps. Gratuit et sans engagement.",
    },
    {
      icon: "pencil",
      title: "Maquette",
      duration: "1 semaine",
      text: "Vous recevez une première version de votre site, de votre logiciel ou de votre assistant IA. On ajuste ensemble.",
    },
    {
      icon: "rocket",
      title: "Mise en place",
      duration: "2 à 3 semaines",
      text: "Tout est en ligne et branché : site, logiciel avec vos tarifs, assistants IA réglés sur votre métier.",
    },
    {
      icon: "handshake",
      title: "Accompagnement",
      duration: "Toute l'année",
      text: "Formation, mises à jour, résultats suivis chaque mois : un interlocuteur unique qui répond vraiment.",
    },
  ],
};

export const finalCta = {
  title: "Parlons de votre projet",
  subtitle:
    "Un appel de 30 minutes suffit pour savoir ce qui vous ferait gagner le plus de clients, de temps et d'argent. C'est gratuit, et vous n'êtes engagé à rien.",
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
