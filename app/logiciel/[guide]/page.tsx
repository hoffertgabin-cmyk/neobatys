import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { softwareGuides } from "@/content/software";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { SoftwareGuides } from "@/components/sections/SoftwareGuides";
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
          <div className="space-y-12">
            {guide.sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-2xl font-bold sm:text-3xl">{section.title}</h2>
                <div className="mt-4 space-y-3 text-lg leading-relaxed text-ardoise-dark">
                  {section.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {section.items.length > 0 && (
                  <ul className="mt-5 list-disc space-y-2 pl-6 text-lg leading-relaxed text-ardoise-dark marker:text-chantier">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
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
      <SoftwareGuides exclude={guide.slug} />
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
