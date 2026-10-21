import { sitesPage } from "@/content/pages";
import { websiteOffer } from "@/content/offers";
import { pageMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { WebsiteOffer } from "@/components/sections/WebsiteOffer";
import { Included } from "@/components/sections/Included";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = pageMetadata({
  ...sitesPage.seo,
  path: "/sites-internet",
});

export default function SitesInternetPage() {
  return (
    <>
      <PageHero {...sitesPage.hero} breadcrumb="Sites internet">
        <Button href="/contact?service=site" size="lg" arrow>
          Demander un devis
        </Button>
        <Button href="#realisations" size="lg" variant="outline-light">
          Voir des exemples
        </Button>
      </PageHero>
      <WebsiteOffer showCta={false} />
      <Included {...sitesPage.included} />
      <Process />
      <Projects />
      <Faq items={sitesPage.faq} />
      <FinalCta />
      <JsonLd
        data={serviceJsonLd(
          "Création de site internet pour artisans",
          websiteOffer.subtitle,
          "/sites-internet",
        )}
      />
      <JsonLd data={faqJsonLd(sitesPage.faq)} />
    </>
  );
}
