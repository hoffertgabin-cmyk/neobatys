import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { tradeSiteLinks, tradeSites, tradeSitesSection } from "@/content/trade-sites";
import { softwareGuideLinks } from "@/content/software";
import { mockupProject } from "@/content/projects";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PlaceholderBadge } from "@/components/ui/Badge";
import { ScaledCanvas } from "@/components/mockups/ScaledCanvas";
import { MOCKUP_HEIGHT, MOCKUP_WIDTH, TradeSiteMockup } from "@/components/mockups/TradeSiteMockup";
import { PageHero } from "@/components/sections/PageHero";
import { ProseSections } from "@/components/sections/ProseSections";
import { LinkCards } from "@/components/sections/LinkCards";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

// Seuls les métiers listés dans content/data/trade-sites.json existent (sinon notFound)
export function generateStaticParams() {
  return tradeSites.map((t) => ({ metier: t.slug }));
}

const findTrade = (slug: string) => tradeSites.find((t) => t.slug === slug);

export async function generateMetadata({ params }: PageProps<"/sites-internet/[metier]">) {
  const trade = findTrade((await params).metier);
  return trade ? pageMetadata({ ...trade.seo, path: `/sites-internet/${trade.slug}` }) : {};
}

export default async function TradeSitePage({ params }: PageProps<"/sites-internet/[metier]">) {
  const trade = findTrade((await params).metier);
  if (!trade) notFound();
  const path = `/sites-internet/${trade.slug}`;
  const project = mockupProject(trade.mockup);
  const guide = softwareGuideLinks.find((g) => g.slug === trade.slug);

  return (
    <>
      <PageHero
        {...trade.hero}
        breadcrumb={trade.breadcrumb}
        parent={{ label: "Sites internet", href: "/sites-internet" }}
      >
        <Button href={`/contact?service=site&maquette=${encodeURIComponent(trade.breadcrumb)}`} size="lg" arrow>
          Demander un devis
        </Button>
        <Button href="/sites-internet#realisations" size="lg" variant="ghost">
          Voir toutes les maquettes
        </Button>
      </PageHero>
      <section className="bg-white py-16 sm:py-24">
        <Container className="max-w-3xl">
          {project && (
            <figure className="mb-14">
              <div
                className="overflow-hidden rounded-2xl p-4 ring-1 ring-nuit/8 sm:p-6"
                style={{ backgroundColor: project.theme.soft }}
              >
                <div className="overflow-hidden rounded-xl shadow-lift ring-1 ring-nuit/8">
                  <ScaledCanvas width={MOCKUP_WIDTH} height={MOCKUP_HEIGHT}>
                    <TradeSiteMockup project={project} />
                  </ScaledCanvas>
                </div>
              </div>
              <figcaption className="mt-3 flex flex-wrap items-center gap-2 text-sm text-ardoise-dark">
                <PlaceholderBadge label="Maquette" className="text-ardoise-dark" />
                {project.brand} est une entreprise fictive : la maquette montre le site type, pas un
                client.
              </figcaption>
            </figure>
          )}
          <ProseSections sections={trade.sections} />
          {guide && (
            <Link
              href={guide.href}
              className="group mt-14 flex items-center justify-between gap-4 rounded-2xl bg-sable p-6 ring-1 ring-nuit/5 hover:ring-nuit/20"
            >
              <span>
                <span className="block font-bold">{guide.label}</span>
                <span className="mt-1 block text-ardoise-dark">{guide.summary}</span>
              </span>
              <ArrowRight aria-hidden="true" className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </Container>
      </section>
      <Faq items={trade.faq} />
      <LinkCards
        id="metiers-titre"
        heading={tradeSitesSection}
        links={tradeSiteLinks.filter((t) => t.slug !== trade.slug)}
        cta="Voir la page"
      />
      <FinalCta />
      <JsonLd data={serviceJsonLd(trade.label, trade.seo.description, path)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Sites internet", path: "/sites-internet" },
          { name: trade.breadcrumb, path },
        ])}
      />
      <JsonLd data={faqJsonLd(trade.faq)} />
    </>
  );
}
