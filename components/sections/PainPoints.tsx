import { Check, Sparkles, X } from "lucide-react";
import { painPoints } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/** Avant / après : ce qui se fait à la main, puis ce que NEOBATYS automatise. */
export function PainPoints() {
  return (
    <Section theme="light" aria-labelledby="galeres-titre">
      <SectionHeading id="galeres-titre" eyebrow={painPoints.eyebrow} title={painPoints.title} />
      <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-5">
        <Reveal className="rounded-3xl bg-sable p-7 ring-1 ring-nuit/5 sm:p-9">
          <h3 className="flex items-center gap-2 text-base font-semibold text-ardoise-dark">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-ardoise" />
            {painPoints.withoutLabel}
          </h3>
          <ul className="mt-6 space-y-4">
            {painPoints.items.map((item) => (
              <li key={item.problem} className="flex items-start gap-3 text-ardoise-dark">
                <X aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red-600" />
                <span>{item.problem}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          delay={0.1}
          className="relative rounded-3xl bg-nuit p-7 text-white shadow-lift sm:p-9"
        >
          <span
            aria-hidden="true"
            className="absolute -top-5 left-7 grid size-10 place-items-center rounded-xl bg-gradient-chantier text-nuit shadow-glow sm:left-9"
          >
            <Sparkles className="size-5" />
          </span>
          <h3 className="flex items-center gap-2 text-base font-semibold">
            {painPoints.withLabel}
          </h3>
          <ul className="mt-6 space-y-4">
            {painPoints.items.map((item) => (
              <li key={item.solution} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-emerald-500/15 text-emerald-400">
                  <Check aria-hidden="true" className="size-3.5" />
                </span>
                {item.solution}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {painPoints.proofs.map((proof) => (
              <div key={proof.title} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="font-semibold text-emerald-400">{proof.title}</p>
                <p className="mt-1 text-sm text-ardoise-light">{proof.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
