import type { LegalSection } from "@/content/legal";
import { legalInfo } from "@/content/legal";
import { Container } from "@/components/ui/Container";
import { PageHero } from "./PageHero";

export function LegalPage({ title, sections }: { title: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero eyebrow="Informations légales" title={title} breadcrumb={title} compact />
      <section className="bg-white py-16 sm:py-24">
        <Container className="max-w-3xl">
          <p className="text-sm text-ardoise-dark">Dernière mise à jour : {legalInfo.lastUpdate}</p>
          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-2xl font-bold">{section.title}</h2>
                <div className="mt-4 space-y-3 leading-relaxed text-ardoise-dark">
                  {section.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
