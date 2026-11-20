import { site } from "@/content/site";
import { legalInfo } from "@/content/legal";
import { pricing } from "@/content/pricing";
import { faq } from "@/content/faq";
import {
  contactPage,
  digitalisationPage,
  iaPage,
  logicielPage,
  sitesPage,
  tarifsPage,
  guidesPage,
} from "@/content/pages";
import { softwareGuides } from "@/content/software";
import { tradeSites } from "@/content/trade-sites";
import { zones } from "@/content/zones";
import { isFilled } from "@/lib/placeholders";

/**
 * /llms.txt : résumé du site en Markdown pour les assistants IA (proposition llmstxt.org).
 * Aucun moteur ne s'engage à le lire : c'est un complément sans coût, généré depuis content/,
 * donc toujours à jour avec les pages et les tarifs.
 */
const link = (path: string, title: string, description: string) =>
  `- [${title}](${new URL(path, site.url)}): ${description}`;

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.tagline}. ${site.zone}`,
    "",
    `${site.name} est une activité de ${legalInfo.companyName} (${legalInfo.legalForm}), ${site.address.street}, ${site.address.postalCode} ${site.address.city}, Luxembourg.` +
      (isFilled(site.email) ? ` Contact : ${site.email}.` : ""),
    "",
    "## Formules (prix HT)",
    "",
    ...pricing.plans.map(
      (p) =>
        `- ${p.name} : ${pricing.pricePrefix.toLowerCase()} ${p.price}, ${p.maintenance ?? pricing.maintenance}. ${p.description}`,
    ),
    ...pricing.subscriptions.plans.map(
      (p) =>
        `- ${p.name} (abonnement) : ${p.price} ${pricing.subscriptions.priceSuffix}, ${pricing.subscriptions.terms}. ${p.description}`,
    ),
    "",
    pricing.note,
    "",
    "## Offres",
    "",
    link("/intelligence-artificielle", iaPage.seo.title, iaPage.seo.description),
    link("/logiciel", logicielPage.seo.title, logicielPage.seo.description),
    link("/sites-internet", sitesPage.seo.title, sitesPage.seo.description),
    link("/tarifs", tarifsPage.seo.title, tarifsPage.seo.description),
    link("/guides", guidesPage.seo.title, guidesPage.seo.description),
    link(
      "/digitaliser-son-entreprise",
      digitalisationPage.seo.title,
      digitalisationPage.seo.description,
    ),
    "",
    "## Où nous intervenons",
    "",
    ...zones.map((z) => link(`/artisans/${z.slug}`, z.seo.title, z.seo.description)),
    "",
    "## Sites internet par métier",
    "",
    ...tradeSites.map((t) => link(`/sites-internet/${t.slug}`, t.seo.title, t.seo.description)),
    "",
    "## Guides pratiques",
    "",
    ...softwareGuides.map((g) => link(`/logiciel/${g.slug}`, g.seo.title, g.seo.description)),
    "",
    "## Questions fréquentes",
    "",
    ...faq.map((q) => `- ${q.question} ${q.answer}`),
    "",
    "## Contact",
    "",
    link("/contact", contactPage.seo.title, contactPage.seo.description),
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
