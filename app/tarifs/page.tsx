import { navCta } from "@/content/navigation";
import { tarifsPage } from "@/content/pages";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = pageMetadata({ ...tarifsPage.seo, path: "/tarifs" });

export default function TarifsPage() {
  return (
    <>
      <PageHero {...tarifsPage.hero} breadcrumb="Tarifs" compact>
        <Button href={navCta.href} size="lg" arrow>
          {navCta.label}
        </Button>
      </PageHero>
      <Pricing />
      <Faq items={tarifsPage.faq} />
      <FinalCta />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Tarifs", path: "/tarifs" },
        ])}
      />
      <JsonLd data={faqJsonLd(tarifsPage.faq)} />
    </>
  );
}
