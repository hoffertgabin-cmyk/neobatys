import { digitalisationPage as page } from "@/content/pages";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ProseSections } from "@/components/sections/ProseSections";
import { SourcesList } from "@/components/sections/SourcesList";
import { LinkCards } from "@/components/sections/LinkCards";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

const path = "/digitaliser-son-entreprise";

export const metadata = pageMetadata({ ...page.seo, path });

export default function DigitaliserPage() {
  return (
    <>
      <PageHero {...page.hero} breadcrumb="Digitaliser son entreprise">
        <Button href="/contact" size="lg" arrow>
          Demander un devis
        </Button>
      </PageHero>
      <section className="bg-white py-16 sm:py-24">
        <Container className="max-w-3xl">
          <p className="mb-10 text-sm text-ardoise-dark">Mis à jour le {page.updated}</p>
          <ProseSections sections={page.sections} />
          <SourcesList sources={page.sources} />
        </Container>
      </section>
      <Faq items={page.faq} />
      <LinkCards
        id="solutions-titre"
        heading={page.related}
        links={page.relatedLinks}
        cta="Découvrir"
      />
      <FinalCta />
      <JsonLd
        data={articleJsonLd({
          headline: page.hero.title,
          description: page.seo.description,
          path,
          updated: page.updated,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Digitaliser son entreprise", path },
        ])}
      />
      <JsonLd data={faqJsonLd(page.faq)} />
    </>
  );
}
