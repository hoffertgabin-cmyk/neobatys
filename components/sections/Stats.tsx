import { stats } from "@/content/stats";
import { site } from "@/content/site";
import { sectionsCopy } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";
import { PlaceholderBadge } from "@/components/ui/Badge";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Blobs } from "./Hero";

export function Stats() {
  return (
    <Section theme="dark" pattern aria-labelledby="chiffres-titre">
      <Blobs />
      <SectionHeading
        id="chiffres-titre"
        theme="dark"
        eyebrow={sectionsCopy.stats.eyebrow}
        title={sectionsCopy.stats.title}
      />
      <Stagger as="ul" className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <StaggerItem
            as="li"
            key={stat.label}
            className="relative rounded-2xl glass p-6 text-center sm:p-8"
          >
            {site.showPlaceholderBadges && stat.placeholder && (
              <PlaceholderBadge className="mb-3 text-ardoise-light" />
            )}
            <p className="font-display text-4xl font-extrabold sm:text-5xl">
              <span className="text-gradient">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
            </p>
            <p className="mt-3 text-sm leading-snug text-ardoise-light sm:text-base">
              {stat.label}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
