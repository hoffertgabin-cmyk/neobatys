import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

type Props = {
  id: string;
  heading: { eyebrow: string; title: string; subtitle: string };
  links: { href: string; label: string; summary: string }[];
  cta: string;
};

/** Grille de liens vers des pages sœurs (guides du logiciel, sites par métier). */
export function LinkCards({ id, heading, links, cta }: Props) {
  return (
    <Section theme="light" aria-labelledby={id}>
      <SectionHeading id={id} {...heading} />
      <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
        {links.map((l) => (
          <StaggerItem key={l.href}>
            <Link
              href={l.href}
              className="group flex h-full flex-col rounded-2xl bg-white p-7 shadow-soft ring-1 ring-nuit/5 transition-shadow hover:ring-nuit/20"
            >
              <h3 className="text-xl font-bold">{l.label}</h3>
              <p className="mt-3 flex-1 text-ardoise-dark">{l.summary}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                {cta}
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
