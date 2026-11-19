import { navCta } from "@/content/navigation";
import { logicielPage } from "@/content/pages";
import { softwareOffer } from "@/content/offers";
import { softwareGuideLinks, softwareGuidesSection } from "@/content/software";
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
import { PricingTeaser } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { LinkCards } from "@/components/sections/LinkCards";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = pageMetadata({
  ...logicielPage.seo,
  path: "/logiciel",
});

export default function LogicielPage() {
  return (
    <>
      <PageHero {...logicielPage.hero} breadcrumb="Logiciel de gestion">
        <Button href={navCta.href} size="lg" arrow>
          {navCta.label}
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
      <PricingTeaser />
      <Faq items={logicielPage.faq} />
      <LinkCards
        id="guides-titre"
        heading={softwareGuidesSection}
        links={softwareGuideLinks}
        cta="Lire le guide"
      />
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
