import { iaPage } from "@/content/pages";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { AgentGroups } from "@/components/sections/AgentGroups";
import { ProseSections } from "@/components/sections/ProseSections";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = pageMetadata({ ...iaPage.seo, path: "/intelligence-artificielle" });

export default function IntelligenceArtificiellePage() {
  return (
    <>
      <PageHero {...iaPage.hero} breadcrumb="Intelligence artificielle">
        <Button href="/contact?service=ia" size="lg" arrow>
          Parler de mon projet
        </Button>
        <Button href="#tarifs" size="lg" variant="ghost">
          Voir le Pack IA
        </Button>
      </PageHero>
      <section className="bg-white py-16 sm:py-24">
        <Container className="max-w-3xl">
          <ProseSections sections={iaPage.sections} />
        </Container>
      </section>
      <AgentGroups heading={iaPage.agentsIntro} groups={iaPage.agentGroups} />
      <Pricing />
      <Faq items={iaPage.faq} />
      <FinalCta />
      <JsonLd
        data={serviceJsonLd(
          "Agents IA pour artisans du bâtiment",
          iaPage.seo.description,
          "/intelligence-artificielle",
        )}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Intelligence artificielle", path: "/intelligence-artificielle" },
        ])}
      />
      <JsonLd data={faqJsonLd(iaPage.faq)} />
    </>
  );
}
