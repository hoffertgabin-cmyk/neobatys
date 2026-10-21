import { Check, Globe, Plus, Calculator } from "lucide-react";
import { comboPack } from "@/content/offers";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { DimensionLine } from "@/components/ui/DimensionLine";

export function ComboPack() {
  return (
    <Section id={comboPack.id} theme="sand" aria-labelledby="pack-titre">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-nuit p-8 text-white shadow-lift sm:p-12 lg:p-16">
          <div aria-hidden="true" className="absolute inset-0 bg-blueprint-dark opacity-80" />
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 size-80 rounded-full bg-chantier/30 blur-[100px]"
          />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <Badge tone="light">{comboPack.eyebrow}</Badge>
              <h2 id="pack-titre" className="mt-5 text-3xl leading-tight font-bold sm:text-4xl">
                {comboPack.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ardoise-light">
                {comboPack.subtitle}
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {comboPack.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-chantier" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button href={comboPack.cta.href} size="lg" arrow>
                  {comboPack.cta.label}
                </Button>
                <span className="text-sm font-semibold text-chantier-light">{comboPack.badge}</span>
              </div>
            </div>
            {/* Schéma site + logiciel */}
            <div
              aria-hidden="true"
              className="relative mx-auto flex w-full max-w-sm items-center justify-between gap-3"
            >
              <div className="flex flex-1 flex-col items-center rounded-2xl glass p-6 text-center">
                <Globe className="size-8 text-chantier-light" />
                <p className="mt-3 font-display font-semibold">Site internet</p>
                <p className="mt-1 text-xs text-ardoise-light">Trouve les clients</p>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-chantier text-nuit shadow-glow">
                <Plus className="size-5" />
              </span>
              <div className="flex flex-1 flex-col items-center rounded-2xl glass p-6 text-center">
                <Calculator className="size-8 text-chantier-light" />
                <p className="mt-3 font-display font-semibold">Logiciel</p>
                <p className="mt-1 text-xs text-ardoise-light">Fait payer</p>
              </div>
              <DimensionLine
                label="1 seul interlocuteur"
                className="absolute inset-x-4 -bottom-10 text-ardoise-light"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
