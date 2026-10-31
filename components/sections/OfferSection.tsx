import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Section, type SectionTheme } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

type Offer = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  benefits: string[];
  features: { icon: string; title: string; text: string }[];
  cta: { label: string; href: string };
};

type Props = {
  offer: Offer;
  theme: SectionTheme;
  visual?: React.ReactNode;
  reverse?: boolean;
  showCta?: boolean;
};

/** Présentation d'une offre : bénéfices + visuel éventuel, puis grille de fonctionnalités. */
export function OfferSection({ offer, theme, visual, reverse = false, showCta = true }: Props) {
  const dark = theme === "dark";
  const headingId = `${offer.id}-titre`;
  return (
    <Section id={offer.id} theme={theme} pattern={dark} aria-labelledby={headingId}>
      <div className={cn("grid items-center gap-14 lg:gap-16", visual && "lg:grid-cols-2")}>
        <div className={cn(reverse && "lg:order-2")}>
          <SectionHeading
            id={headingId}
            align="left"
            theme={dark ? "dark" : "light"}
            eyebrow={offer.eyebrow}
            title={offer.title}
            subtitle={offer.subtitle}
          />
          <Stagger as="ul" className="mt-8 space-y-3">
            {offer.benefits.map((b) => (
              <StaggerItem as="li" key={b} className="flex items-start gap-3 text-lg">
                <CircleCheck aria-hidden="true" className="mt-1 size-5 shrink-0 text-chantier" />
                <span className={dark ? "text-white" : "text-nuit"}>{b}</span>
              </StaggerItem>
            ))}
          </Stagger>
          {showCta && (
            <Reveal className="mt-10">
              <Button href={offer.cta.href} size="lg" variant={dark ? "light" : "primary"} arrow>
                {offer.cta.label}
              </Button>
            </Reveal>
          )}
        </div>
        {visual && (
          <Reveal delay={0.1} y={32} className={cn("relative", reverse && "lg:order-1")}>
            <div
              aria-hidden="true"
              className="absolute inset-x-8 inset-y-4 -z-10 rounded-full bg-chantier/20 blur-[90px]"
            />
            {visual}
          </Reveal>
        )}
      </div>

      <Stagger as="ul" className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {offer.features.map((f) => (
          <StaggerItem as="li" key={f.title}>
            <SpotlightCard theme={dark ? "dark" : "light"} className="h-full">
              <span
                className={cn(
                  "grid size-11 place-items-center rounded-xl",
                  dark ? "bg-chantier/15 text-chantier-light" : "bg-chantier/12 text-chantier-dark",
                )}
              >
                <Icon name={f.icon} className="size-5" />
              </span>
              <h3 className={cn("mt-5 text-lg font-bold", dark ? "text-white" : "text-nuit")}>
                {f.title}
              </h3>
              <p
                className={cn("mt-2 leading-relaxed", dark ? "text-ardoise-light" : "text-ardoise")}
              >
                {f.text}
              </p>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
