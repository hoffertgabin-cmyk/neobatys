import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { isFilled } from "@/lib/placeholders";

type Props = { title: string; groups: { title: string; items: string[] }[] };

/** Les points encore à vérifier (« … [À VÉRIFIER] ») ne sont pas affichés. */
export function Included({ title, groups }: Props) {
  return (
    <Section theme="sand" pattern aria-labelledby="inclus-titre">
      <SectionHeading id="inclus-titre" eyebrow="Inclus" title={title} />
      <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
        {groups.map((g) => (
          <StaggerItem
            key={g.title}
            className="rounded-2xl bg-white p-7 shadow-soft ring-1 ring-nuit/5"
          >
            <h3 className="text-xl font-bold">{g.title}</h3>
            <ul className="mt-5 space-y-3">
              {g.items.filter(isFilled).map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-ardoise-dark">
                  <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-chantier" />
                  {item}
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
