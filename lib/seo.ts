import type { Metadata } from "next";
import { site } from "@/content/site";
import { legalInfo } from "@/content/legal";
import { pricing } from "@/content/pricing";
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

type Place = { "@type": string; name: string };

// Société luxembourgeoise : Luxembourg, France, puis toute l'Europe (phrase dans content/data/site.json)
const areaServedAll: Place[] = [
  { "@type": "Country", name: "Luxembourg" },
  { "@type": "Country", name: "France" },
  { "@type": "Continent", name: "Europe" },
];

/** « 2 990 € » vers 2990 ; undefined si aucun chiffre. */
function euros(price: string) {
  const digits = price.replace(/[^0-9]/g, "");
  return digits ? Number(digits) : undefined;
}

type Plan = { id: string; name: string; description: string; price: string };

/** Offre schema.org d'une formule de content/data/pricing.json (prix HT, « à partir de » pour les offres en une fois). */
function planOffer(plan: Plan, monthly: boolean) {
  const price = euros(plan.price);
  return {
    "@type": "Offer",
    name: plan.name,
    description: plan.description,
    url: `${site.url}/#tarifs`,
    priceCurrency: "EUR",
    priceSpecification: monthly
      ? {
          "@type": "UnitPriceSpecification",
          price,
          priceCurrency: "EUR",
          unitText: "mois",
          valueAddedTaxIncluded: false,
        }
      : {
          "@type": "PriceSpecification",
          minPrice: price,
          priceCurrency: "EUR",
          valueAddedTaxIncluded: false,
        },
    itemOffered: { "@type": "Service", name: plan.name },
  };
}

/** Offres des formules demandées par identifiant (« site », « pack », « abonnement-pro »…). */
export function planOffers(ids: string[]) {
  return [
    ...pricing.plans.filter((p) => ids.includes(p.id)).map((p) => planOffer(p, false)),
    ...pricing.subscriptions.plans.filter((p) => ids.includes(p.id)).map((p) => planOffer(p, true)),
  ];
}

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
    areaServed: areaServedAll,
    priceRange: "€€",
    // NEOBATYS est une activité de TAG Delme SARL (mentions légales)
    parentOrganization: {
      "@type": "Organization",
      name: legalInfo.companyName,
      vatID: filled(legalInfo.vat),
      address: { "@type": "PostalAddress", addressCountry: site.address.country },
    },
    // Toutes les formules et leurs prix de départ HT (content/data/pricing.json)
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Formules NEOBATYS",
      itemListElement: planOffers([
        ...pricing.plans.map((p) => p.id),
        ...pricing.subscriptions.plans.map((p) => p.id),
      ]),
    },
    // Profils officiels sur les réseaux, omis tant qu'aucun n'est renseigné
    sameAs: socials.length > 0 ? socials : undefined,
  };
}

export function serviceJsonLd(
  name: string,
  description: string,
  path: string,
  { areaServed = areaServedAll, offers }: { areaServed?: Place | Place[]; offers?: object[] } = {},
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: new URL(path, site.url).toString(),
    serviceType: name,
    provider: { "@id": `${site.url}/#entreprise` },
    areaServed,
    offers: offers && offers.length > 0 ? offers : undefined,
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
