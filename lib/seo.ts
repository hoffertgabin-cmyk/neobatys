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
