import { guidesPage } from "@/content/pages";
import { softwareGuideLinks } from "@/content/software";
import { tradeSites } from "@/content/trade-sites";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { LinkCards } from "@/components/sections/LinkCards";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = pageMetadata({ ...guidesPage.seo, path: "/guides" });

// Les guides n'ont pas de champ « type » : les outils sont désignés ici, les guides métier par l'adresse du métier.
const toolSlugs = ["modele-devis", "calculateur-tva"];
const tradeSlugs = new Set(tradeSites.map((t) => t.slug));

const tools = softwareGuideLinks.filter((g) => toolSlugs.includes(g.slug));
const trades = softwareGuideLinks.filter((g) => tradeSlugs.has(g.slug));
const topics = softwareGuideLinks.filter(
  (g) => !toolSlugs.includes(g.slug) && !tradeSlugs.has(g.slug),
);

export default function GuidesPage() {
  return (
    <>
      <PageHero {...guidesPage.hero} breadcrumb="Guides et outils" compact />
      <LinkCards
        id="outils-titre"
        heading={guidesPage.tools.heading}
        links={tools}
        cta={guidesPage.tools.cta}
      />
      <LinkCards
        id="guides-titre"
        heading={guidesPage.topics.heading}
        links={[...topics, ...guidesPage.topics.extraLinks]}
        cta={guidesPage.topics.cta}
      />
      <LinkCards
        id="metiers-titre"
        heading={guidesPage.trades.heading}
        links={trades}
        cta={guidesPage.trades.cta}
      />
      <FinalCta />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Guides et outils", path: "/guides" },
        ])}
      />
    </>
  );
}
