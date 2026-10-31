import { logicielPage } from "@/content/pages";
import { softwareOffer } from "@/content/offers";
import { pageMetadata, faqJsonLd, softwareApplicationJsonLd } from "@/lib/seo";
import { isFilled } from "@/lib/placeholders";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { SoftwareOffer } from "@/components/sections/SoftwareOffer";
import { SoftwareTour } from "@/components/sections/SoftwareTour";
import { SoftwareOnboarding, SoftwareWeek } from "@/components/sections/SoftwareWeek";
import { Included } from "@/components/sections/Included";
import { Stats } from "@/components/sections/Stats";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { SoftwareGuides } from "@/components/sections/SoftwareGuides";
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
        <Button href="#demo" size="lg" variant="ghost">
          Essayer la démo en ligne
        </Button>
      </PageHero>
      <SoftwareTour />
      <SoftwareWeek />
      <SoftwareOffer showCta={false} />
      <SoftwareOnboarding />
      <Included {...logicielPage.included} />
      <Stats />
      <Pricing />
      <Faq items={logicielPage.faq} />
      <SoftwareGuides />
      <FinalCta />
      <JsonLd
        data={softwareApplicationJsonLd(
          softwareOffer.subtitle,
          logicielPage.included.groups.flatMap((g) => g.items.filter(isFilled)),
        )}
      />
      <JsonLd data={faqJsonLd(logicielPage.faq)} />
    </>
  );
}
