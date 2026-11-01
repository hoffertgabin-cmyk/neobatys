import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { softwareGuides, softwareGuidesSection } from "@/content/software";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

/** Liens vers les pages guides du logiciel (par métier, facturation électronique). */
export function SoftwareGuides({ exclude }: { exclude?: string }) {
  const guides = softwareGuides.filter((g) => g.slug !== exclude);
  return (
    <Section theme="light" aria-labelledby="guides-titre">
      <SectionHeading
        id="guides-titre"
        eyebrow={softwareGuidesSection.eyebrow}
        title={softwareGuidesSection.title}
        subtitle={softwareGuidesSection.subtitle}
      />
      <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
        {guides.map((g) => (
          <StaggerItem key={g.slug}>
            <Link
              href={`/logiciel/${g.slug}`}
              className="group flex h-full flex-col rounded-2xl bg-white p-7 shadow-soft ring-1 ring-nuit/5 transition-shadow hover:ring-nuit/20"
            >
              <h3 className="text-xl font-bold">{g.label}</h3>
              <p className="mt-3 flex-1 text-ardoise-dark">{g.summary}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                Lire le guide
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
