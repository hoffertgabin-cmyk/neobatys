import { stats } from "@/content/stats";
import { sectionsCopy } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";
import { PlaceholderBadge } from "@/components/ui/Badge";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

/** Masquée tant qu'aucun chiffre réel n'est renseigné (les exemples sont filtrés dans content/stats.ts). */
export function Stats() {
  if (stats.length === 0) return null;
  return (
    <Section theme="light" aria-labelledby="chiffres-titre">
      <SectionHeading
        id="chiffres-titre"
        eyebrow={sectionsCopy.stats.eyebrow}
        title={sectionsCopy.stats.title}
      />
      <Stagger as="ul" className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <StaggerItem
            as="li"
            key={stat.label}
            className="relative rounded-3xl bg-white p-6 text-center shadow-soft ring-1 ring-nuit/5 sm:p-8"
          >
            {stat.placeholder && (
              <PlaceholderBadge className="mb-3 text-ardoise" />
            )}
            <p className="font-display text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 text-sm leading-snug text-ardoise-dark sm:text-base">{stat.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
