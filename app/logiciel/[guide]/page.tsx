import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Download } from "lucide-react";
import {
  softwareGuideLinks,
  softwareGuides,
  softwareGuidesSection,
  tvaCalculator,
} from "@/content/software";
import { tradeSiteLinks } from "@/content/trade-sites";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ProseSections } from "@/components/sections/ProseSections";
import { TvaCalculator } from "@/components/sections/TvaCalculator";
import { LinkCards } from "@/components/sections/LinkCards";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

// Seules les pages listées dans content/data/software-guides.json existent (sinon notFound)
export function generateStaticParams() {
  return softwareGuides.map((g) => ({ guide: g.slug }));
}

const findGuide = (slug: string) => softwareGuides.find((g) => g.slug === slug);

export async function generateMetadata({ params }: PageProps<"/logiciel/[guide]">) {
  const guide = findGuide((await params).guide);
  return guide ? pageMetadata({ ...guide.seo, path: `/logiciel/${guide.slug}` }) : {};
}

export default async function GuidePage({ params }: PageProps<"/logiciel/[guide]">) {
  const guide = findGuide((await params).guide);
  if (!guide) notFound();
  const path = `/logiciel/${guide.slug}`;
  // Fichiers à télécharger (modèles), seulement sur les guides qui en ont
  const downloads = guide.downloads ?? [];
  // Page « site internet » du même métier, s'il y en a une
  const site = tradeSiteLinks.find((t) => t.slug === guide.slug);

  return (
    <>
      <PageHero
        {...guide.hero}
        breadcrumb={guide.breadcrumb}
        parent={{ label: "Logiciel de gestion", href: "/logiciel" }}
      >
        {downloads.map((d) => (
          // Lien simple (pas next/link) : c'est un fichier, pas une page
          <a key={d.href} href={d.href} download className={buttonClasses({ size: "lg" })}>
            <Download aria-hidden="true" className="size-4" />
            {d.label}
          </a>
        ))}
        {downloads.length === 0 && (
          <Button href="/contact?service=logiciel" size="lg" arrow>
            Demander une démo
          </Button>
        )}
        <Button href="/logiciel#demo" size="lg" variant="ghost">
          {downloads.length > 0 ? "Essayer le logiciel" : "Voir le logiciel"}
        </Button>
      </PageHero>
      <section className="bg-white py-16 sm:py-24">
        <Container className="max-w-3xl">
          <p className="mb-10 text-sm text-ardoise-dark">Mis à jour le {guide.updated}</p>
          {guide.tool === "tva" && <TvaCalculator labels={tvaCalculator} />}
          <ProseSections sections={guide.sections} />
          {site && (
            <Link
              href={site.href}
              className="group mt-14 flex items-center justify-between gap-4 rounded-2xl bg-sable p-6 ring-1 ring-nuit/5 hover:ring-nuit/20"
            >
              <span>
                <span className="block font-bold">{site.label}</span>
                <span className="mt-1 block text-ardoise-dark">{site.summary}</span>
              </span>
              <ArrowRight aria-hidden="true" className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
          {guide.sources.length > 0 && (
            <div className="mt-14 border-t border-nuit/10 pt-8">
              <h2 className="text-lg font-bold">Sources officielles</h2>
              <ul className="mt-4 space-y-2 text-sm text-ardoise-dark">
                {guide.sources.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:text-nuit"
                    >
                      {s.label}
                      <span className="sr-only"> (nouvel onglet)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>
      <Faq items={guide.faq} />
      <LinkCards
        id="guides-titre"
        heading={softwareGuidesSection}
        links={softwareGuideLinks.filter((g) => g.slug !== guide.slug)}
        cta="Lire le guide"
      />
      <FinalCta />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Logiciel de gestion", path: "/logiciel" },
          { name: guide.breadcrumb, path },
        ])}
      />
      <JsonLd data={faqJsonLd(guide.faq)} />
    </>
  );
}
