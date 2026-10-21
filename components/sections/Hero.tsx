import { Check, Sparkle } from "lucide-react";
import { hero } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { WordCascade } from "@/components/motion/WordCascade";
import { Reveal } from "@/components/motion/Reveal";
import { ConsoleMockup } from "@/components/mockups/ConsoleMockup";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-aurora pt-36 pb-20 sm:pt-44 lg:pb-28">
      <div className="container-site text-center">
        <div className="animate-fade-up">
          <Badge tone="outline">
            <span className="size-1.5 rounded-full bg-chantier" aria-hidden="true" />
            {hero.eyebrow}
          </Badge>
        </div>
        <WordCascade
          lines={hero.titleLines}
          highlight={hero.highlight}
          className="mx-auto mt-7 max-w-4xl text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.045em] sm:text-6xl lg:text-[4.75rem]"
        />
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ardoise-dark sm:text-xl">
          {hero.subtitle}
        </p>
        <div
          className="mt-9 flex animate-fade-up flex-col justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "0.45s" }}
        >
          <Button href={hero.primaryCta.href} size="lg" arrow>
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} size="lg" variant="ghost">
            {hero.secondaryCta.label}
          </Button>
        </div>
        <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ardoise-dark">
          {hero.reassurance.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check aria-hidden="true" className="size-4 text-chantier-dark" />
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-14 text-xs font-semibold tracking-[0.14em] text-ardoise uppercase">
          {hero.modelsLabel}
        </p>
        <ul className="mt-4 flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm font-medium text-ardoise-dark">
          {hero.models.map((model) => (
            <li key={model} className="flex items-center gap-2">
              <Sparkle aria-hidden="true" className="size-4 text-ardoise" />
              {model}
            </li>
          ))}
        </ul>

        <Reveal y={40} className="mx-auto mt-14 max-w-5xl text-left">
          <ConsoleMockup />
        </Reveal>
      </div>
    </section>
  );
}
