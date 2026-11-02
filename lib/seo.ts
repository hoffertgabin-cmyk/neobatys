import type { Metadata } from "next";
import { site } from "@/content/site";
import { isFilled } from "@/lib/placeholders";

type PageSeo = {
  title: string;
  description: string;
  path: string;
};

// Un openGraph défini par une page remplace celui du layout : l'image doit être redonnée ici
const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} · ${site.tagline}`,
};

/** Métadonnées d'une page : titre, description, canonical et Open Graph. */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  const url = new URL(path, site.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "fr_FR",
      type: "website",
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}

/** Échappe le JSON-LD pour l'injecter sans risque dans une balise script. */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Valeur encore à remplacer dans content/data/site.json, ex. « [TÉLÉPHONE] » : omise. */
const filled = (v: string) => (isFilled(v) ? v : undefined);

export function localBusinessJsonLd() {
  const socials = Object.values(site.socials).filter(isFilled);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#entreprise`,
    name: site.name,
    description: site.tagline,
    url: site.url,
    // Les champs non renseignés sont omis (JSON.stringify ignore undefined)
    telephone: filled(site.phone),
    email: filled(site.email),
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/apple-icon`,
    address: {
      "@type": "PostalAddress",
      streetAddress: filled(site.address.street),
      postalCode: filled(site.address.postalCode),
      addressLocality: filled(site.address.city),
      addressCountry: site.address.country,
    },
    priceRange: "€€",
    // Profils officiels sur les réseaux, omis tant qu'aucun n'est renseigné
    sameAs: socials.length > 0 ? socials : undefined,
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: new URL(path, site.url).toString(),
    serviceType: name,
    provider: { "@id": `${site.url}/#entreprise` },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Artisans du bâtiment",
    },
  };
}

/** Logiciel de devis et factures. Pas d'offre ni de note : aucun prix seul ni avis client publié. */
export function softwareApplicationJsonLd(description: string, features: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${site.url}/logiciel#logiciel`,
    name: `Logiciel de devis et factures ${site.name}`,
    description,
    url: new URL("/logiciel", site.url).toString(),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "fr",
    featureList: features,
    provider: { "@id": `${site.url}/#entreprise` },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Artisans du bâtiment",
    },
  };
}

/** Nom du site dans les résultats Google : données WebSite sur la page d'accueil. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#site`,
    name: site.name,
    url: site.url,
    inLanguage: "fr",
    publisher: { "@id": `${site.url}/#entreprise` },
  };
}

const months = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

/** « 2 novembre 2026 » ou « 1er novembre 2026 » vers « 2026-11-02 » ; undefined si la date n'est pas reconnue. */
export function frenchDateToIso(date: string) {
  const m = date.trim().match(/^(\d{1,2})(?:er)? (\S+) (\d{4})$/);
  const month = m ? months.indexOf(m[2].toLowerCase()) + 1 : 0;
  if (!m || month === 0) return undefined;
  return `${m[3]}-${String(month).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}

/** Guide éditorial : titre, date de mise à jour, éditeur. */
export function articleJsonLd({
  headline,
  description,
  path,
  updated,
}: {
  headline: string;
  description: string;
  path: string;
  updated: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: new URL(path, site.url).toString(),
    inLanguage: "fr",
    dateModified: frenchDateToIso(updated),
    image: `${site.url}/opengraph-image`,
    author: { "@id": `${site.url}/#entreprise` },
    publisher: { "@id": `${site.url}/#entreprise` },
  };
}

/** Fil d'Ariane : [{ name, path }] de l'accueil à la page courante. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
