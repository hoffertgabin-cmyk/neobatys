import { ArrowDown, X } from "lucide-react";
import { painPoints } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export function PainPoints() {
  return (
    <Section theme="sand" pattern aria-labelledby="galeres-titre">
      <SectionHeading
        id="galeres-titre"
        eyebrow={painPoints.eyebrow}
        title={painPoints.title}
        subtitle={painPoints.subtitle}
      />
      <Stagger as="ul" className="mt-14 grid gap-5 md:grid-cols-2">
        {painPoints.items.map((item) => (
          <StaggerItem as="li" key={item.problem} className="h-full">
            <div className="h-full rounded-2xl bg-white p-6 shadow-soft ring-1 ring-nuit/5 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sable text-ardoise-dark">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <p className="pt-2 font-medium text-ardoise-dark">
                  <X aria-hidden="true" className="mr-1.5 inline size-4 text-red-600" />
                  <span className="sr-only">Problème : </span>
                  {item.problem}
                </p>
              </div>
              <ArrowDown aria-hidden="true" className="my-3 ml-3 size-5 text-chantier" />
              <div className="rounded-xl bg-nuit p-4 text-white">
                <p className="font-display font-semibold">
                  <span className="sr-only">Notre réponse : </span>
                  {item.solution}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
