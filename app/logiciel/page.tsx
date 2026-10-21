import { logicielPage } from "@/content/pages";
import { softwareOffer } from "@/content/offers";
import { pageMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { SoftwareOffer } from "@/components/sections/SoftwareOffer";
import { Included } from "@/components/sections/Included";
import { Stats } from "@/components/sections/Stats";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = pageMetadata({
  ...logicielPage.seo,
  path: "/logiciel",
});

export default function LogicielPage() {
  return (
    <>
      <PageHero {...logicielPage.hero} breadcrumb="Logiciel de gestion">
        <Button href="/contact?service=logiciel" size="lg" arrow>
          Demander une démo
        </Button>
        <Button href="#tarifs" size="lg" variant="ghost">
          Voir les tarifs
        </Button>
      </PageHero>
      <SoftwareOffer showCta={false} />
      <Included {...logicielPage.included} />
      <Stats />
      <Pricing />
      <Faq items={logicielPage.faq} />
      <FinalCta />
      <JsonLd
        data={serviceJsonLd(
          "Logiciel de devis et factures pour artisans",
          softwareOffer.subtitle,
          "/logiciel",
        )}
      />
      <JsonLd data={faqJsonLd(logicielPage.faq)} />
    </>
  );
}
