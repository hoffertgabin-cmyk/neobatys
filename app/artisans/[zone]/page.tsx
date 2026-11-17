import { notFound } from "next/navigation";
import { zoneLinks, zones, zonesRelated, zonesSection } from "@/content/zones";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  pageMetadata,
  planOffers,
  serviceJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ProseSections } from "@/components/sections/ProseSections";
import { SourcesList } from "@/components/sections/SourcesList";
import { LinkCards } from "@/components/sections/LinkCards";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

// Seules les zones listées dans content/data/zones.json existent (sinon notFound)
export function generateStaticParams() {
  return zones.map((z) => ({ zone: z.slug }));
}

const findZone = (slug: string) => zones.find((z) => z.slug === slug);

export async function generateMetadata({ params }: PageProps<"/artisans/[zone]">) {
  const zone = findZone((await params).zone);
  return zone ? pageMetadata({ ...zone.seo, path: `/artisans/${zone.slug}` }) : {};
}

export default async function ZonePage({ params }: PageProps<"/artisans/[zone]">) {
  const zone = findZone((await params).zone);
  if (!zone) notFound();
  const path = `/artisans/${zone.slug}`;

  return (
    <>
      <PageHero {...zone.hero} breadcrumb={zone.breadcrumb}>
        <Button href="/contact" size="lg" arrow>
          Demander un devis
        </Button>
        <Button href="/#tarifs" size="lg" variant="ghost">
          Voir les tarifs
        </Button>
      </PageHero>
      <section className="bg-white py-16 sm:py-24">
        <Container className="max-w-3xl">
          <p className="mb-10 text-sm text-ardoise-dark">Mis à jour le {zone.updated}</p>
          <ProseSections sections={zone.sections} />
          <SourcesList sources={zone.sources} />
        </Container>
      </section>
      <Faq items={zone.faq} />
      <LinkCards id="solutions-titre" {...zonesRelated} cta="Découvrir" />
      <LinkCards
        id="zones-titre"
        heading={zonesSection}
        links={zoneLinks.filter((z) => z.slug !== zone.slug)}
        cta="Voir la page"
      />
      <FinalCta />
      <JsonLd
        data={serviceJsonLd(zone.hero.title, zone.seo.description, path, {
          areaServed: { "@type": zone.areaType, name: zone.areaName },
          offers: planOffers(["site", "pack", "ia", "abonnement-essentiel", "abonnement-pro"]),
        })}
      />
      <JsonLd
        data={articleJsonLd({
          headline: zone.hero.title,
          description: zone.seo.description,
          path,
          updated: zone.updated,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: zone.breadcrumb, path },
        ])}
      />
      <JsonLd data={faqJsonLd(zone.faq)} />
    </>
  );
}
